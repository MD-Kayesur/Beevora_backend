"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceService = exports.generateInvoicePDF = void 0;
const pdf_lib_1 = require("pdf-lib");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * Generates a branded PDF invoice for an order.
 * @param order Populated order object with user and product details.
 * @returns Path to the generated PDF file.
 */
const generateInvoicePDF = async (order) => {
    const pdfDoc = await pdf_lib_1.PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
    const { width, height } = page.getSize();
    const fontBold = await pdfDoc.embedFont(pdf_lib_1.StandardFonts.HelveticaBold);
    const fontRegular = await pdfDoc.embedFont(pdf_lib_1.StandardFonts.Helvetica);
    // Brand Color: Amber (Matching Beevora UI)
    const brandColor = (0, pdf_lib_1.rgb)(245 / 255, 158 / 255, 11 / 255);
    // --- HEADER ---
    // Logo / Company Name
    page.drawText('BEEVORA', {
        x: 50,
        y: height - 50,
        size: 28,
        font: fontBold,
        color: brandColor
    });
    page.drawText('PREMIUM ECOMMERCE EXPERIENCE', {
        x: 50,
        y: height - 68,
        size: 8,
        font: fontRegular,
        color: (0, pdf_lib_1.rgb)(0.5, 0.5, 0.5)
    });
    // Invoice Title & Info
    page.drawText('INVOICE', {
        x: width - 150,
        y: height - 50,
        size: 24,
        font: fontBold
    });
    page.drawText(`Order ID: #${order._id.toString().toUpperCase().slice(-8)}`, {
        x: width - 150,
        y: height - 70,
        size: 10,
        font: fontRegular
    });
    page.drawText(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, {
        x: width - 150,
        y: height - 85,
        size: 10,
        font: fontRegular
    });
    // --- CUSTOMER INFO ---
    page.drawText('BILL TO:', {
        x: 50,
        y: height - 130,
        size: 10,
        font: fontBold,
        color: (0, pdf_lib_1.rgb)(0.3, 0.3, 0.3)
    });
    page.drawText(order.user?.name || 'Valued Customer', {
        x: 50,
        y: height - 145,
        size: 12,
        font: fontBold
    });
    page.drawText(order.user?.email || '', {
        x: 50,
        y: height - 160,
        size: 10,
        font: fontRegular
    });
    // Shipping Address (with text wrapping simulation)
    const address = order.shippingAddress || 'N/A';
    page.drawText(address, {
        x: 50,
        y: height - 175,
        size: 10,
        font: fontRegular,
        maxWidth: 250,
        lineHeight: 12
    });
    // --- ITEMS TABLE ---
    const tableTop = height - 240;
    // Table Header Background
    page.drawRectangle({
        x: 50,
        y: tableTop - 5,
        width: width - 100,
        height: 25,
        color: (0, pdf_lib_1.rgb)(0.05, 0.08, 0.15) // Dark blue/slate
    });
    // Table Headers
    const headerY = tableTop + 8;
    page.drawText('ITEM DESCRIPTION', { x: 60, y: headerY, size: 9, font: fontBold, color: (0, pdf_lib_1.rgb)(1, 1, 1) });
    page.drawText('QTY', { x: 350, y: headerY, size: 9, font: fontBold, color: (0, pdf_lib_1.rgb)(1, 1, 1) });
    page.drawText('PRICE', { x: 410, y: headerY, size: 9, font: fontBold, color: (0, pdf_lib_1.rgb)(1, 1, 1) });
    page.drawText('TOTAL', { x: 490, y: headerY, size: 9, font: fontBold, color: (0, pdf_lib_1.rgb)(1, 1, 1) });
    // Table Items
    let currentY = tableTop - 30;
    order.items.forEach((item, index) => {
        // Zebra striping
        if (index % 2 === 0) {
            page.drawRectangle({
                x: 50,
                y: currentY - 10,
                width: width - 100,
                height: 25,
                color: (0, pdf_lib_1.rgb)(0.97, 0.97, 0.98)
            });
        }
        const productName = item.product?.name || `${item.productModel} Product`;
        page.drawText(productName, { x: 60, y: currentY, size: 10, font: fontRegular });
        page.drawText(item.quantity.toString(), { x: 350, y: currentY, size: 10, font: fontRegular });
        page.drawText(`$${item.price.toFixed(2)}`, { x: 410, y: currentY, size: 10, font: fontRegular });
        page.drawText(`$${(item.price * item.quantity).toFixed(2)}`, { x: 490, y: currentY, size: 10, font: fontRegular });
        currentY -= 25;
    });
    // --- TOTALS ---
    const totalsY = currentY - 20;
    // Divider
    page.drawLine({
        start: { x: width - 200, y: totalsY + 10 },
        end: { x: width - 50, y: totalsY + 10 },
        thickness: 1,
        color: (0, pdf_lib_1.rgb)(0.8, 0.8, 0.8)
    });
    page.drawText('GRAND TOTAL', {
        x: width - 200,
        y: totalsY - 10,
        size: 14,
        font: fontBold
    });
    page.drawText(`$${order.totalAmount.toFixed(2)}`, {
        x: width - 100,
        y: totalsY - 10,
        size: 16,
        font: fontBold,
        color: brandColor
    });
    // --- FOOTER ---
    const footerY = 50;
    page.drawLine({
        start: { x: 50, y: footerY + 20 },
        end: { x: width - 50, y: footerY + 20 },
        thickness: 0.5,
        color: (0, pdf_lib_1.rgb)(0.9, 0.9, 0.9)
    });
    page.drawText('Thank you for shopping with Beevora! For any queries, contact support@beevora.com', {
        x: width / 2 - 180,
        y: footerY,
        size: 8,
        font: fontRegular,
        color: (0, pdf_lib_1.rgb)(0.6, 0.6, 0.6)
    });
    // --- SAVE FILE ---
    const pdfBytes = await pdfDoc.save();
    const fileName = `invoice_${order._id}.pdf`;
    const uploadDir = path_1.default.join(process.cwd(), 'uploads', 'invoices');
    if (!fs_1.default.existsSync(uploadDir)) {
        fs_1.default.mkdirSync(uploadDir, { recursive: true });
    }
    const filePath = path_1.default.join(uploadDir, fileName);
    fs_1.default.writeFileSync(filePath, pdfBytes);
    return filePath;
};
exports.generateInvoicePDF = generateInvoicePDF;
exports.InvoiceService = {
    generateInvoicePDF: exports.generateInvoicePDF
};

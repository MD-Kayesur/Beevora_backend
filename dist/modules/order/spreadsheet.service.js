"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpreadsheetService = void 0;
const { google } = require('googleapis');
const env_1 = __importDefault(require("../../config/env"));
const logger_1 = __importDefault(require("../../config/logger"));
const path_1 = __importDefault(require("path"));
async function saveToSheet(order) {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: path_1.default.join(process.cwd(), 'credentials.json'),
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        const sheets = google.sheets({ version: 'v4', auth });
        const spreadsheetId = env_1.default.spreadsheet_id || 'YOUR_SHEET_ID';
        const values = [[
                order.user?.name || 'Customer',
                order.user?.email || 'N/A',
                order.shippingAddress,
                order.items.map((item) => `${item.product.name} (x${item.quantity})`).join(', '),
                order.totalAmount,
                "COD",
                order.status,
                new Date().toLocaleString()
            ]];
        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: 'Sheet1!A:H',
            valueInputOption: 'RAW',
            requestBody: {
                values,
            },
        });
        logger_1.default.info(`📊 Order recorded in Google Sheets via googleapis`);
    }
    catch (error) {
        logger_1.default.error('❌ Error recording order in Google Sheets:', error);
    }
}
exports.SpreadsheetService = {
    saveToSheet,
};

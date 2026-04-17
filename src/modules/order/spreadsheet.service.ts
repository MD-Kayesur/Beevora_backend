const { google } = require('googleapis');
import config from '../../config/env';
import logger from '../../config/logger';
import path from 'path';

async function saveToSheet(order: any) {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(process.cwd(), 'credentials.json'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = config.spreadsheet_id || 'YOUR_SHEET_ID';

    const values = [[
      order.user?.name || 'Customer',
      order.user?.email || 'N/A',
      order.shippingAddress,
      order.items.map((item: any) => `${item.product.name} (x${item.quantity})`).join(', '),
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

    logger.info(`📊 Order recorded in Google Sheets via googleapis`);
  } catch (error) {
    logger.error('❌ Error recording order in Google Sheets:', error);
  }
}

export const SpreadsheetService = {
  saveToSheet,
};

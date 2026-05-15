import { InvoiceService } from './src/modules/order/invoice.service';
import fs from 'fs';
import path from 'path';

// Mock Order Object (Plain JS)
const mockOrder: any = {
  _id: '645a1b2c3d4e5f6g7h8i9j0k',
  createdAt: new Date(),
  totalAmount: 159.98,
  shippingAddress: '123 Beevora St, Honey City, HC 56789',
  user: {
    name: 'Test Customer',
    email: 'customer@test.com'
  },
  items: [
    {
      product: { name: 'Premium Raw Honey' },
      quantity: 2,
      price: 49.99
    },
    {
      product: { name: 'Beevora Branded Hoodie' },
      quantity: 1,
      price: 59.99
    }
  ]
};

async function testInvoice() {
  console.log('Generating test invoice...');
  try {
    const filePath = await InvoiceService.generateInvoicePDF(mockOrder);
    console.log('Invoice generated at:', filePath);
    
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      console.log(`Success! File exists and size is ${stats.size} bytes.`);
    } else {
      console.error('Failure: File was not created.');
    }
  } catch (err) {
    console.error('Error during invoice generation:', err);
  }
}

testInvoice();

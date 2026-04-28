const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://Beevora:fs8jeVGkAjVJ1wl5@cluster0.6plf0.mongodb.net/Beevora?retryWrites=true&w=majority&appName=Cluster0';

const extraImages = [
  'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600'
];

async function updateImages() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB');
    const db = mongoose.connection.db;
    
    // Update Clothings
    const clothingResult = await db.collection('clothings').updateMany(
      {},
      { $addToSet: { images: { $each: extraImages } } }
    );
    console.log(`Updated ${clothingResult.modifiedCount} clothing items.`);

    // Update Honeys
    const honeyResult = await db.collection('honeys').updateMany(
      {},
      { $addToSet: { images: { $each: extraImages } } }
    );
    console.log(`Updated ${honeyResult.modifiedCount} honeys items.`);

    // Update Products
    const baseProductsResult = await db.collection('products').updateMany(
      {},
      { $addToSet: { images: { $each: extraImages } } }
    );
    console.log(`Updated ${baseProductsResult.modifiedCount} base products items.`);

    console.log('Done!');
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

updateImages();

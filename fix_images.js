const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://Beevora:fs8jeVGkAjVJ1wl5@cluster0.6plf0.mongodb.net/Beevora?retryWrites=true&w=majority&appName=Cluster0';

const honeyImages = [
  'https://images.unsplash.com/photo-1587049352847-4d4b126a31fc?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1587049352851-8d4e89134780?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&q=80&w=600'
];

const clothingImages = [
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=600'
];

async function updateImages() {
  try {
    await mongoose.connect(MONGODB_URI);
    const db = mongoose.connection.db;

    // Reset clothing
    const clothingsCursor = await db.collection('clothings').find({}).toArray();
    for(let p of clothingsCursor) {
       await db.collection('clothings').updateOne({ _id: p._id }, { $set: { images: [p.thumbnail, ...clothingImages] } });
    }
    console.log("updated clothings");

    // Reset honey
    const honeyCursor = await db.collection('honeys').find({}).toArray();
    for(let p of honeyCursor) {
       await db.collection('honeys').updateOne({ _id: p._id }, { $set: { images: [p.thumbnail, ...honeyImages] } });
    }
    console.log("updated honeys");

    // Reset base products
    const productsCursor = await db.collection('products').find({}).toArray();
    for(let p of productsCursor) {
       if (p.category === 'Clothing') {
           await db.collection('products').updateOne({ _id: p._id }, { $set: { images: [p.thumbnail, ...clothingImages] } });
       } else {
           await db.collection('products').updateOne({ _id: p._id }, { $set: { images: [p.thumbnail, ...honeyImages] } });
       }
    }
    console.log("updated products");
    
  } finally {
    await mongoose.disconnect();
  }
}
updateImages();

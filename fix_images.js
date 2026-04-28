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

const oldGarbageImages = [
  'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600'
];

async function updateImages() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB');
    const db = mongoose.connection.db;

    console.log('Removing old generic images...');
    await db.collection('clothings').updateMany({}, { $pull: { images: { $in: oldGarbageImages } } });
    await db.collection('honeys').updateMany({}, { $pull: { images: { $in: oldGarbageImages } } });
    await db.collection('products').updateMany({}, { $pull: { images: { $in: oldGarbageImages } } });

    console.log('Adding specific images based on category...');
    
    // Clothings
    const cRes = await db.collection('clothings').updateMany(
      {},
      { $addToSet: { images: { $each: clothingImages } } }
    );
    console.log(`Updated ${cRes.modifiedCount} clothing items with cloth images.`);
    
    // Honeys
    const hRes = await db.collection('honeys').updateMany(
      {},
      { $addToSet: { images: { $each: honeyImages } } }
    );
    console.log(`Updated ${hRes.modifiedCount} honey items with honey images.`);

    // Base Products Collection
    const productsCursor = await db.collection('products').find({}).toArray();
    let pModifiedCount = 0;
    for (let p of productsCursor) {
      if (p.category === 'Clothing') {
        await db.collection('products').updateOne({ _id: p._id }, { $addToSet: { images: { $each: clothingImages } } });
        pModifiedCount++;
      } else if (p.category === 'Honey') {
        await db.collection('products').updateOne({ _id: p._id }, { $addToSet: { images: { $each: honeyImages } } });
        pModifiedCount++;
      } else {
        await db.collection('products').updateOne({ _id: p._id }, { $addToSet: { images: { $each: honeyImages } } });
        pModifiedCount++;
      }
    }
    console.log(`Updated ${pModifiedCount} base product items with category specific images.`);

    console.log('Done fixing images!');
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

updateImages();

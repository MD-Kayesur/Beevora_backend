import { IProduct } from './product.interface';
import { Product } from './product.model';
import { Honey } from '../honey/honey.model';
import { Clothing } from '../clothing/clothing.model';

const createProduct = async (payload: IProduct): Promise<IProduct> => {
  console.log(payload);
  const result = await Product.create(payload);
  console.log(result);
  return result;
};

const getAllProducts = async (query: Record<string, unknown>) => {
  // Basic filtering for now
  const { searchTerm, category, minPrice, maxPrice, isFeatured, sort, page = 1, limit = 10, showInactive } = query;
  
  const anyQuery: any = {};
  if (showInactive !== 'true') {
    anyQuery.isActive = true;
  }
  if (searchTerm) {
    anyQuery.$or = [
      { name: { $regex: searchTerm, $options: 'i' } },
      { description: { $regex: searchTerm, $options: 'i' } },
    ];
  }
  const categoryStr = typeof category === 'string' ? category.toLowerCase().trim() : '';

  if (isFeatured) anyQuery.isFeatured = isFeatured === 'true';
  if (minPrice || maxPrice) {
    anyQuery.price = {};
    if (minPrice) anyQuery.price.$gte = Number(minPrice);
    if (maxPrice) anyQuery.price.$lte = Number(maxPrice);
  }

  const skip = (Number(page) - 1) * Number(limit);
  
  let products: any[] = [];
  let total = 0;

  if (categoryStr === 'honey') {
    products = await Honey.find(anyQuery).sort(sort as string || '-createdAt').skip(skip).limit(Number(limit));
    total = await Honey.countDocuments(anyQuery);
  } else if (categoryStr === 'clothing' || categoryStr === 'cloth') {
    products = await Clothing.find(anyQuery).sort(sort as string || '-createdAt').skip(skip).limit(Number(limit));
    total = await Clothing.countDocuments(anyQuery);
  } else if (!categoryStr || categoryStr === 'all') {
    // If no specific category, provide a mix as requested (6 each if possible)
    const [honeyProducts, clothingProducts, baseProducts] = await Promise.all([
      Honey.find(anyQuery).sort(sort as string || '-createdAt').limit(6),
      Clothing.find(anyQuery).sort(sort as string || '-createdAt').limit(6),
      Product.find(anyQuery).sort(sort as string || '-createdAt').limit(6)
    ]);
    
    products = [...honeyProducts, ...clothingProducts, ...baseProducts].slice(0, Number(limit));
    
    const [honeyTotal, clothingTotal, baseTotal] = await Promise.all([
      Honey.countDocuments(anyQuery),
      Clothing.countDocuments(anyQuery),
      Product.countDocuments(anyQuery)
    ]);
    total = honeyTotal + clothingTotal + baseTotal;
  } else {
    const searchCategoryName = categoryStr.replace(/-/g, ' ');
    anyQuery.category = { $regex: `^(${categoryStr}|${searchCategoryName})$`, $options: 'i' };
    products = await Product.find(anyQuery).sort(sort as string || '-createdAt').skip(skip).limit(Number(limit));
    total = await Product.countDocuments(anyQuery);
  }

  const totalPages = Math.ceil(total / Number(limit));

  return {
    products,
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages,
    },
  };
};

const getProductById = async (id: string): Promise<IProduct | null> => {
  let result = await Product.findById(id);
  if (!result) result = await Honey.findById(id);
  if (!result) result = await Clothing.findById(id);
  return result;
};

const updateProduct = async (id: string, payload: Partial<IProduct>): Promise<IProduct | null> => {
  const result = await Product.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteProduct = async (id: string): Promise<IProduct | null> => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};

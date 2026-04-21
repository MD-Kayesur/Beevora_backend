import { IProduct } from './product.interface';
import { Product } from './product.model';

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
  if (category) anyQuery.category = category;
  if (isFeatured) anyQuery.isFeatured = isFeatured === 'true';
  if (minPrice || maxPrice) {
    anyQuery.price = {};
    if (minPrice) anyQuery.price.$gte = Number(minPrice);
    if (maxPrice) anyQuery.price.$lte = Number(maxPrice);
  }

  const skip = (Number(page) - 1) * Number(limit);
  
  const products = await Product.find(anyQuery)
    .sort(sort as string || '-createdAt')
    .skip(skip)
    .limit(Number(limit));

  const total = await Product.countDocuments(anyQuery);
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
  const result = await Product.findById(id);
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

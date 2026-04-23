import { IClothing } from './clothing.model';
import { Clothing } from './clothing.model';

const createClothing = async (payload: IClothing): Promise<IClothing> => {
  const result = await Clothing.create(payload);
  return result;
};

const getAllClothing = async (query: Record<string, unknown>) => {
  const { searchTerm, minPrice, maxPrice, isFeatured, sort, page = 1, limit = 10 } = query;
  
  const anyQuery: any = { isActive: true };
  if (searchTerm) {
    anyQuery.$or = [
      { name: { $regex: searchTerm, $options: 'i' } },
      { description: { $regex: searchTerm, $options: 'i' } },
    ];
  }
  if (isFeatured) anyQuery.isFeatured = isFeatured === 'true';
  if (minPrice || maxPrice) {
    anyQuery.price = {};
    if (minPrice) anyQuery.price.$gte = Number(minPrice);
    if (maxPrice) anyQuery.price.$lte = Number(maxPrice);
  }

  const skip = (Number(page) - 1) * Number(limit);
  
  const products = await Clothing.find(anyQuery)
    .sort(sort as string || '-createdAt')
    .skip(skip)
    .limit(Number(limit));

  const total = await Clothing.countDocuments(anyQuery);
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

const getClothingById = async (id: string): Promise<IClothing | null> => {
  return await Clothing.findById(id);
};

const updateClothing = async (id: string, payload: Partial<IClothing>): Promise<IClothing | null> => {
  return await Clothing.findByIdAndUpdate(id, payload, { new: true });
};

const deleteClothing = async (id: string): Promise<IClothing | null> => {
  return await Clothing.findByIdAndDelete(id);
};

export const ClothingService = {
  createClothing,
  getAllClothing,
  getClothingById,
  updateClothing,
  deleteClothing,
};

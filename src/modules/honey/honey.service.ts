import { IHoney } from './honey.model';
import { Honey } from './honey.model';

const createHoney = async (payload: IHoney): Promise<IHoney> => {
  return await Honey.create(payload);
};

const getAllHoney = async (query: Record<string, unknown>) => {
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
  
  const products = await Honey.find(anyQuery)
    .sort(sort as string || '-createdAt')
    .skip(skip)
    .limit(Number(limit));

  const total = await Honey.countDocuments(anyQuery);
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

const getHoneyById = async (id: string): Promise<IHoney | null> => {
  return await Honey.findById(id);
};

const updateHoney = async (id: string, payload: Partial<IHoney>): Promise<IHoney | null> => {
  return await Honey.findByIdAndUpdate(id, payload, { new: true });
};

const deleteHoney = async (id: string): Promise<IHoney | null> => {
  return await Honey.findByIdAndDelete(id);
};

export const HoneyService = {
  createHoney,
  getAllHoney,
  getHoneyById,
  updateHoney,
  deleteHoney,
};

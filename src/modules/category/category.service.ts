import { Category, ICategory } from './category.model';

const createCategory = async (payload: Partial<ICategory>) => {
  const slug = payload.name!
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
  return await Category.create({ ...payload, slug });
};

const getAllCategories = async () => {
  return await Category.find({}).sort({ name: 1 });
};

const getCategoryById = async (id: string) => {
  return await Category.findById(id);
};

const updateCategory = async (id: string, payload: Partial<ICategory>) => {
  if (payload.name) {
    payload.slug = payload.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }
  return await Category.findByIdAndUpdate(id, payload, { new: true });
};

const deleteCategory = async (id: string) => {
  return await Category.findByIdAndDelete(id);
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};

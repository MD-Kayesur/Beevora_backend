"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("./user.model");
const getMyProfile = async (email) => {
    const result = await user_model_1.User.findOne({ email });
    return result;
};
const updateMyProfile = async (email, payload) => {
    const result = await user_model_1.User.findOneAndUpdate({ email }, payload, { new: true });
    return result;
};
const getAllUsers = async () => {
    const result = await user_model_1.User.find();
    return result;
};
const updateUserRole = async (id, role) => {
    const result = await user_model_1.User.findByIdAndUpdate(id, { role }, { new: true });
    return result;
};
const deleteUser = async (id) => {
    const result = await user_model_1.User.findByIdAndDelete(id);
    return result;
};
exports.UserService = {
    getMyProfile,
    updateMyProfile,
    getAllUsers,
    updateUserRole,
    deleteUser,
};

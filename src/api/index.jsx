// src/api.js
import axios from "axios";

// دالة GET لجلب قائمة المستخدمين
export const getUsers = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users:");
    throw error;
  }
};

// دالة GET لجلب بيانات مستخدم معين بناءً على ID
export const getUserById = async (id) => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};

// دالة POST لإضافة مستخدم جديد
export const addUser = async (user) => {
  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      user
    );
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

export const getChapters = async () => {
  const apiA = await axios.get("https://api.quran.com/api/v4/chapters");
  return apiA.data.chapters;
};

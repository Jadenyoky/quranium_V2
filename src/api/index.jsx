import axios from "axios";
import { supabase } from "../supabase";
import _ from "lodash";
import { useUser } from "@clerk/clerk-react";

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

// To Get Chapters list
export const getChapters = async () => {
  const apiA = await axios.get("https://api.quran.com/api/v4/chapters");
  return apiA.data.chapters;
};

// To Get Fav list
export const fav = async (id) => {
  const { data, error } = await supabase
    .from("actions_quranium_fav")
    .select("*")
    .eq("user_id", id);

  if (error) {
    return console.error("Error fetching favorites", error);
  } else {
    return data;
  }
};

// To Get Save list
export const save = async (id) => {
  const { data, error } = await supabase
    .from("actions_quranium_save")
    .select("*")
    .eq("user_id", id);

  if (error) {
    return console.error("Error fetching Saves", error);
  } else {
    return data;
  }
};

// To Toggle Fav
export const switchFav = async (chapter_id, user_id) => {
  const favList = await fav(user_id);
  const isFav = favList.some((fav) => fav.surah_id === chapter_id);

  if (isFav) {
    const { error } = await supabase
      .from("actions_quranium_fav")
      .delete()
      .eq("surah_id", chapter_id)
      .eq("user_id", user_id);

    if (error) {
      return console.log("Error removing favorite", error);
    } else {
      return favList.filter((fav) => fav.surah_id !== chapter_id);
    }
  } else {
    const { error } = await supabase.from("actions_quranium_fav").insert({
      user_id: user_id,
      surah_id: chapter_id,
    });

    if (error) {
      return console.log("Error adding favorite", error);
    } else {
      return [...favList, { surah_id: chapter_id }];
    }
  }
};

// To Toggle Save
export const switchSave = async (chapter_id, user_id) => {
  const saveList = await save(user_id);
  const isSave = saveList.some((save) => save.surah_id === chapter_id);

  if (isSave) {
    const { error } = await supabase
      .from("actions_quranium_save")
      .delete()
      .eq("surah_id", chapter_id)
      .eq("user_id", user_id);

    if (error) {
      return console.log("Error removing saves", error);
    } else {
      return saveList.filter((fav) => fav.surah_id !== chapter_id);
    }
  } else {
    const { error } = await supabase.from("actions_quranium_save").insert({
      user_id: user_id,
      surah_id: chapter_id,
    });

    if (error) {
      return console.log("Error adding saves", error);
    } else {
      return [...saveList, { surah_id: chapter_id }];
    }
  }
};

export const addActions = async (id, chapters) => {
  const favs = await fav(id);
  const saves = await save(id);

  const updatedChapters = _.map(chapters, (chapter) => {
    // البحث عن البوست في المفضلة
    const favChapter = _.find(favs, (fav) => fav.surah_id === chapter.id);

    // البحث عن البوست في الحفظ
    const saveChapter = _.find(saves, (save) => save.surah_id === chapter.id);

    return {
      ...chapter,
      isFavorited: !!favChapter, // إذا كان موجودًا في المفضلة، إضافة `isFavorited: true`، وإذا لم يكن، `false`
      favoriteDate: favChapter ? favChapter.created : null, // إذا كان موجودًا، أضف تاريخ التفضيل، وإلا `null`
      isSaved: !!saveChapter, // إذا كان موجودًا في المحفوظة، إضافة `isSaved: true`، وإذا لم يكن، `false`
      saveDate: saveChapter ? saveChapter.created : null, // إذا كان موجودًا، أضف تاريخ الحفظ، وإلا `null`
    };
  });

  console.log(updatedChapters);
};

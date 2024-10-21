import axios from "axios";
import { supabase } from "../supabase";
import _ from "lodash";

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

// To get Surah Name Font
export const fontSurahName = async () => {
  try {
    const fontFace = new FontFace(
      "surah",
      `url(https://quran.com/fonts/quran/surah-names/v1/sura_names.woff2)`
    );

    await fontFace.load();
    document.fonts.add(fontFace);
  } catch (error) {
    console.error("حدث خطأ أثناء تحميل خط السور:", error);
  }
};

// To get Font for each page and ayah by demand
export const getFont = async (type, page) => {
  const fontUrl = `https://quran.com/fonts/quran/hafs/${type}/woff2/p${page}.woff2`;
  const fontFace = new FontFace(`p${page}`, `url(${fontUrl})`);
  document.fonts.add(fontFace);

  try {
    await fontFace.load();
    console.log(`تم تحميل جميع الخطوط من صفحة بنجاح`);
  } catch (error) {
    console.error("حدث خطأ أثناء تحميل الخطوط:", error);
  }
};

export const ayahs = async (id, num, per) => {
  try {
    const apiA = await axios.get(
      `https://api.qurancdn.com/api/qdc/verses/by_chapter/${id}?words=true&page=${num}&per_page=${per}&fields=text_uthmani_tajweed,text_uthmani,text_imlaei_simple,code_v1,code_v2&word_fields=true,text_uthmani_tajweed,location,code_v1,code_v2,qpc_uthmani_hafs,text_uthmani,verse_key&mushaf=19`
    );
    return apiA.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const chapter = {
  // To Get Chapters list
  getChapters: async () => {
    try {
      const apiA = await axios.get("https://api.quran.com/api/v4/chapters");
      return apiA.data.chapters;
    } catch (error) {
      console.log("error", error);
    }
  },

  // To Get Chapter Info By Id
  getChapterInfo: async (id) => {
    try {
      const apiA = await axios.get(
        `https://api.quran.com/api/v4/chapters/${id}`
      );
      return apiA.data.chapter;
    } catch (error) {
      console.log("error", error);
    }
  },

  // To Get Chapter Verses By Id
  getChapterVerses: async (id, type, fromPage, toPage) => {},
};

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SignedIn, useUser } from "@clerk/clerk-react";
import { scaleItem, actionsAnim, actionsIcon, scale, chapter } from "./anim";
import Styles from "./chapter.module.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../../supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faStar as faStarSolid,
  faBookmark as faBookmarkSolid,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";

const Chapter = ({ surah, length, status }) => {
  const { user, isLoaded } = useUser();
  const navi = useNavigate();

  const [favorites, setFavorites] = useState([]);
  const [saves, setSaves] = useState([]);
  const [loadingFav, setloadingFav] = useState(false);
  const [loadingSave, setloadingSave] = useState(false);

  const isFav = (chapter_id) => {
    return favorites.some((fav) => fav.surah_id === chapter_id);
  };

  const isSave = (chapter_id) => {
    return saves.some((save) => save.surah_id === chapter_id);
  };

  const actions = [
    {
      name: "fav",
      icon: isFav(surah.id) ? (
        <motion.div variants={scale} initial="initial" animate="animate">
          <FontAwesomeIcon
            icon={faStarSolid}
            style={{
              fontSize: "1.5rem",
            }}
          />
        </motion.div>
      ) : (
        <motion.div variants={scale} initial="initial" animate="animate">
          <FontAwesomeIcon
            icon={faStar}
            style={{
              fontSize: "1.5rem",
            }}
          />
        </motion.div>
      ),
      load: (
        <FontAwesomeIcon
          icon={faSpinner}
          fade
          style={{
            fontSize: "1.5rem",
          }}
        />

        // <CircularProgress color="secondary" />
      ),
      move: actionsIcon,
      action: () => {
        toggleFav(surah.id);
        console.log("done fav");
      },
    },
    {
      name: "save",
      icon: isSave(surah.id) ? (
        <motion.div variants={scale} initial="initial" animate="animate">
          <FontAwesomeIcon
            icon={faBookmarkSolid}
            style={{
              fontSize: "1.5rem",
            }}
          />
        </motion.div>
      ) : (
        <motion.div variants={scale} initial="initial" animate="animate">
          <FontAwesomeIcon
            icon={faBookmark}
            style={{
              fontSize: "1.5rem",
            }}
          />
        </motion.div>
      ),
      load: (
        <FontAwesomeIcon
          icon={faSpinner}
          fade
          style={{
            fontSize: "1.5rem",
          }}
        />
      ),
      move: actionsIcon,
      action: () => {
        toggleSave(surah.id);
        console.log("done save");
      },
    },
  ];

  const fetchActions = async () => {
    if (!user) {
      return console.log("User not found");
    }

    const fav = async () => {
      setloadingFav(false);

      const { data, error } = await supabase
        .from("actions_quranium_fav")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching favorites", error);
      } else {
        setFavorites(data);
      }

      setloadingFav(true);
    };

    const save = async () => {
      setloadingSave(false);

      const { data, error } = await supabase
        .from("actions_quranium_save")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching favorites", error);
      } else {
        setSaves(data);
      }

      setloadingSave(true);
    };

    fav();
    save();
  };

  const toggleFav = async (chapter_id) => {
    setloadingFav(false);
    // setloadingSave(false);

    const isFav = favorites.some((fav) => fav.surah_id === chapter_id);

    if (isFav) {
      const { error } = await supabase
        .from("actions_quranium_fav")
        .delete()
        .eq("surah_id", chapter_id)
        .eq("user_id", user.id);

      if (error) {
        console.log("Error removing favorite", error);
      } else {
        setFavorites(favorites.filter((fav) => fav.surah_id !== chapter_id));
      }
    } else {
      const { error } = await supabase.from("actions_quranium_fav").insert({
        user_id: user.id,
        surah_id: chapter_id,
      });

      if (error) {
        console.log("Error adding favorite", error);
      } else {
        setFavorites([...favorites, { surah_id: chapter_id }]);
      }
    }

    setloadingFav(true);
    // setloadingSave(true);
  };

  const toggleSave = async (chapter_id) => {
    // setloadingFav(false);
    setloadingSave(false);

    const isSave = saves.some((save) => save.surah_id === chapter_id);

    if (isSave) {
      const { error } = await supabase
        .from("actions_quranium_save")
        .delete()
        .eq("surah_id", chapter_id)
        .eq("user_id", user.id);

      if (error) {
        console.log("Error removing save", error);
      } else {
        setSaves(saves.filter((save) => save.surah_id !== chapter_id));
      }
    } else {
      const { error } = await supabase.from("actions_quranium_save").insert({
        user_id: user.id,
        surah_id: chapter_id,
      });

      if (error) {
        console.log("Error adding save", error);
      } else {
        setSaves([...saves, { surah_id: chapter_id }]);
      }
    }

    // setloadingFav(true);
    setloadingSave(true);
  };

  useEffect(() => {
    fetchActions();
  }, [user]);

  return (
    <>
      <AnimatePresence mode="wait" key={length}>
        <motion.div
          key={status}
          variants={chapter}
          initial={"initial"}
          whileInView={"animate"}
          exit={"exit"}
          viewport={{ once: true, amount: 0.5 }}
          className={`${Styles.item} `}
        >
          <motion.span
            variants={scale}
            className={`${Styles.orderNum} `}
          >{`${surah.revelation_order}`}</motion.span>

          <AnimatePresence>
            {isFav(surah.id) && (
              <motion.div
                variants={scale}
                initial="initial"
                animate="animate"
                exit="exit"
                className={`${Styles.fav} `}
              ></motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isSave(surah.id) && (
              <motion.div
                variants={scale}
                initial="initial"
                animate="animate"
                exit="exit"
                className={`${Styles.save} `}
              ></motion.div>
            )}
          </AnimatePresence>

          <motion.div
            whileTap={{ scale: 0.95 }}
            className={`${Styles.titlesurah} `}
            onClick={() => {
              navi(`/read/${surah.id}`, {
                state: {
                  title: `${surah.name_arabic}`,
                },
              });
            }}
          >
            <div className={`${Styles.icon} `}>
              <span>
                {surah.id < 10
                  ? `00${surah.id}`
                  : surah.id < 100
                  ? `0${surah.id}`
                  : `${surah.id}`}
              </span>
              {surah.revelation_place === "madinah" ? (
                <i className="fi fi-sr-mosque"></i>
              ) : (
                <i className="fi fi-sr-kaaba"></i>
              )}
            </div>
            <div className={`${Styles.text} `}>
              <div>
                <span>
                  {surah.id < 10
                    ? `00${surah.id}`
                    : surah.id < 100
                    ? `0${surah.id}`
                    : `${surah.id}`}
                </span>
              </div>
              <div>
                <span>{`الآيات ${surah.verses_count}`}</span>
              </div>
            </div>
            <div className={`${Styles.arrowIcon} `}>
              <i className="fi fi-sr-angle-left"></i>
            </div>
          </motion.div>

          <SignedIn>
            <motion.div
              variants={actionsAnim}
              initial={"initial"}
              whileInView={"animate"}
              className={`${Styles.actions} `}
            >
              {actions.map((e, k) => {
                return (
                  <motion.div
                    className={`${Styles.icon} `}
                    key={k}
                    variants={e.move}
                    whileInView={"animate"}
                    onClick={e.action}
                  >
                    {e.name === "fav"
                      ? loadingFav
                        ? e.icon
                        : e.load
                      : e.name === "save"
                      ? loadingSave
                        ? e.icon
                        : e.load
                      : e.icon}
                  </motion.div>
                );
              })}
            </motion.div>
          </SignedIn>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Chapter;

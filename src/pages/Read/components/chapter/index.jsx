import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SignedIn, useUser, SignedOut } from "@clerk/clerk-react";
import {
  actionsAnim,
  actionsIcon,
  scale,
  moveY_Element,
} from "../../../../Styles/anim";
import Styles from "./chapter.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faStar as faStarSolid,
  faBookmark as faBookmarkSolid,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
import { fav, save, switchFav, switchSave } from "../../../../api";
import { useInView } from "react-intersection-observer";

const Chapter = ({ surah, length, status, index, load, number }) => {
  // User info from clerk
  const { user } = useUser();

  // Navigation to pages
  const navi = useNavigate();

  // States for list of fav , save chapters and loading them
  const [favorites, setFavorites] = useState([]);
  const [saves, setSaves] = useState([]);
  const [loadingFav, setloadingFav] = useState(false);
  const [loadingSave, setloadingSave] = useState(false);

  // To check if chapter is fav or not
  const isFav = (chapter_id) => {
    return favorites.some((fav) => fav.surah_id === chapter_id);
  };
  // To check if chapter is save or not
  const isSave = (chapter_id) => {
    return saves.some((save) => save.surah_id === chapter_id);
  };

  // Actions for chapter fav , save and loading to add or delete from list
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
      },
    },
  ];

  // To get fav , save list if user is logged in
  const fetchActions = async () => {
    if (!user) {
      return console.log("User not found");
    }

    const favList = await fav(user.id);
    setFavorites(favList);
    setloadingFav(true);

    const saveList = await save(user.id);
    setSaves(saveList);
    setloadingSave(true);
  };

  // To add or delete from fav , save list and loading until updating database
  const toggleFav = async (chapter_id) => {
    setloadingFav(false);

    const switcher = await switchFav(chapter_id, user.id);
    setFavorites(switcher);

    setloadingFav(true);
  };

  const toggleSave = async (chapter_id) => {
    setloadingSave(false);

    const switcher = await switchSave(chapter_id, user.id);
    setSaves(switcher);

    setloadingSave(true);
  };

  // To navigate to surah page and pass data
  const handleNavigate = () => {
    navi(`/read/${surah.id}`, {
      state: {
        title: `${surah.name_arabic}`,
      },
    });
  };

  // To get actions list with updates by user changer
  useEffect(() => {
    fetchActions();
  }, [user]);

  const { ref, inView, entry } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const middleIndex = Math.floor(number / 2) - 1;

  useEffect(() => {
    if (inView) {
      console.log(index, entry.target);
      console.log(middleIndex, index);

      if (index > middleIndex) {
        console.log("finally");
        load((prev) => prev + 20);
      }
    }
  }, [inView]);

  return (
    <>
      <AnimatePresence mode="wait" key={length}>
        <motion.div
          ref={ref}
          key={status}
          variants={moveY_Element}
          initial={"initial"}
          animate={inView ? "animate" : "initial"}
          exit={"exit"}
          transition={{
            duration: 0.5,
            type: "spring",
            delay: 1,
          }}
          viewport={{ once: true, amount: 0.3 }}
          className={`${Styles.item} `}
        >
          <SignedIn>
            <motion.span
              variants={scale}
              className={`${Styles.orderNum} `}
            >{`${surah.revelation_order}`}</motion.span>
          </SignedIn>

          <SignedOut>
            <motion.span
              variants={scale}
              className={`${Styles.orderNumOut} `}
            >{`${surah.revelation_order}`}</motion.span>
          </SignedOut>

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
              handleNavigate();
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

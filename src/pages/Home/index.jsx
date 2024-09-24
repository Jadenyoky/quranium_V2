import React, { useEffect, useState } from "react";
import Styles from "./home.module.css";
import { motion } from "framer-motion";
import { animCategories, animPage } from "./anim";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navi = useNavigate();

  useEffect(() => {}, []);

  const categories = [
    {
      title: "قراءة",
      subTitle: "114 سورة",
      motion: animCategories,
      bg: "url(src/assets/png/quran.png) no-repeat center center",
      bg_color: "var(--quran-bg-color)", // استبدال اللون بالمتغير
      bg_size: "contain",
      radius: "26% 74% 21% 79% / 76% 7% 93% 24%",
      class: Styles.one,
      navigate: () => {
        navi("/read", { state: { title: "Quran Read" } });
      },
    },

    {
      title: "بحث",
      subTitle: "قراءة",
      motion: animCategories,
      bg: "url(src/assets/png/search.png) no-repeat center center",
      bg_color: "var(--search-bg-color)", // استبدال اللون بالمتغير
      bg_size: "contain",
      radius: "86% 14% 86% 14% / 17% 77% 23% 83%",
      class: Styles.three,
      navigate: () => {
        navi("/read", { state: { title: "قراءة القرآن" } });
      },
    },

    {
      title: "استماع",
      subTitle: "قراءة",
      motion: animCategories,
      bg: "url(src/assets/png/listen.png) no-repeat center center",
      bg_color: "var(--listen-bg-color)", // استبدال اللون بالمتغير
      bg_size: "contain",
      radius: "26% 74% 21% 79% / 76% 7% 93% 24%",
      class: Styles.four,
      navigate: () => {
        navi("/read", { state: { title: "قراءة القرآن" } });
      },
    },
    {
      title: "تفسير",
      subTitle: "تفسير",
      motion: animCategories,
      bg: "url(src/assets/png/tafser.png) no-repeat center center",
      bg_color: "var(--tafser-bg-color)", // استبدال اللون بالمتغير
      bg_size: "contain",
      radius: "86% 14% 86% 14% / 17% 77% 23% 83%",
      class: Styles.two,
      navigate: () => {
        navi("/read", { state: { title: "Quran Read" } });
      },
    },
  ];

  return (
    <>
      <div className={`${Styles.page}`}>
        {/* <div className={`${Styles.header}`}>
          <motion.div
            variants={animSearch}
            initial="initial"
            animate="animate"
            className={`${Styles.search}`}
          >
            search
          </motion.div>
        </div> */}
        <div className={`${Styles.categories}`}>
          <motion.div
            variants={animPage}
            initial="initial"
            animate="animate"
            className={`${Styles.first}`}
          >
            {categories.map((e, k) => {
              return (
                <motion.div
                  key={k}
                  variants={e.motion}
                  initial="initial"
                  whileInView="animate"
                  whileTap={{ scale: 0.9 }}
                  viewport={{ once: true, amount: 0.5 }}
                  custom={k}
                  className={e.class}
                  style={{
                    background: e.bg,
                    backgroundSize: e.bg_size,
                    borderRadius: e.radius,
                    backgroundColor: e.bg_color,
                  }}
                  onClick={() => {
                    e.navigate();
                  }}
                >
                  <p>{e.title}</p>
                  {/* <div>{e.subTitle}</div> */}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Index;

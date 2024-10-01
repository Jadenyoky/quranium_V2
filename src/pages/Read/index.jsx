import React, { useEffect, useRef, useState } from "react";
import Styles from "./read.module.css";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  animPage,
  scale as scaleItem,
  moveY,
  opacity as show,
  scaleModal,
  movetoY,
} from "./anim";
import { useLocation, useNavigate } from "react-router-dom";
import { getChapters } from "../../api";
import _ from "lodash";
import { useUser } from "@clerk/clerk-react";

import Chapter from "./components/chapter";
import store from "store2";

const Index = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  console.log(user, isLoaded);

  const storeStatus = store("sortStatus");
  const storeCurrent = store("currentStatus");

  const [sortStatus, setsortStatus] = useState(
    storeStatus ? storeStatus : "ترتيب المصحف"
  );
  const [currentStatus, setcurrentStatus] = useState(
    storeCurrent ? storeCurrent : { query: "id", type: "asc" }
  );

  useEffect(() => {
    store("sortStatus", sortStatus);
    store("currentStatus", currentStatus);
  }, [sortStatus, currentStatus]);

  const [numResults, setnumResults] = useState(null);

  const navi = useNavigate();

  const [chapters, setChapters] = useState([]);
  const [loading, setloading] = useState(false);

  const [num, setnum] = useState(0);
  const changerNum = (n) => {
    return setnum(n);
  };

  const fetchChapters = async () => {
    setloading(false);

    const chaptersList = await getChapters();

    // setChapters(chaptersList);
    const filter = _.orderBy(
      chaptersList,
      currentStatus.query,
      currentStatus.type
    );

    setChapters(filter);

    changerNum(20);

    setloading(true);
  };

  const fetchSearch = async (query) => {
    setloading(false);

    changerNum(20);

    const chaptersList = await getChapters();
    const sort = _.orderBy(
      chaptersList,
      currentStatus.query,
      currentStatus.type
    );
    const filter = _.filter(sort, (o) => {
      return (
        o.name_arabic.includes(query) ||
        o.id.toString().includes(query) ||
        o.verses_count.toString().includes(query) ||
        o.revelation_order.toString().includes(query)
      );
    });

    setChapters(filter);

    setnumResults(query !== "" ? filter.length : null);

    setloading(true);
  };

  const fetchSort = async (query, type) => {
    setloading(false);

    scrollTo({ top: 42 });
    changerNum(20);

    setTimeout(() => {
      // const chaptersList = await getChapters();
      const filter = _.orderBy(chapters, query, type);
      setChapters(filter);
    }, 500);

    setloading(true);
  };

  const sortSwitcher = () => {
    switch (sortStatus) {
      case "ترتيب المصحف":
        setsortStatus("عدد الآيات");
        fetchSort("verses_count", "desc");
        setcurrentStatus({
          query: "verses_count",
          type: "desc",
        });
        break;
      case "عدد الآيات":
        setsortStatus("ترتيب النزول");
        fetchSort("revelation_order", "asc");
        setcurrentStatus({
          query: "revelation_order",
          type: "asc",
        });
        break;
      case "ترتيب النزول":
        setsortStatus("ترتيب المصحف");
        fetchSort("id", "asc");
        setcurrentStatus({
          query: "id",
          type: "asc",
        });
        break;
      default:
        setsortStatus("ترتيب المصحف");
        fetchSort("id", "asc");
        setcurrentStatus({
          query: "id",
          type: "asc",
        });
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 1500
    ) {
      // setnum(num + 20);
      changerNum(num + 20);
    }
  };

  useEffect(() => {
    fetchChapters();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [num]);

  const { pathname } = useLocation();
  useEffect(() => {
    changerNum(0);
  }, [pathname]);

  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [0, 30], [1, 0]);
  const translateY = useTransform(scrollY, [0, 30], [0, -80]);
  const scale = useTransform(scrollY, [30, 100], [1, 0.9]);

  return (
    <>
      {" "}
      <motion.div
        variants={animPage}
        initial="initial"
        animate="animate"
        className={`${Styles.page} `}
      >
        <motion.div
          style={{
            translateY,
            opacity,
          }}
          variants={show}
          className={`${Styles.header} `}
        >
          <motion.div className={`${Styles.title} `}>
            <h1>سور القرآن الكريم</h1>
            <i className="fi fi-sr-book-bookmark"></i>
          </motion.div>
          <div>
            <motion.div
              variants={scaleItem}
              whileTap={{ scale: 0.9 }}
              className={`${Styles.back} `}
              onClick={() => {
                navi(-1);
              }}
            >
              <i className="fi fi-rs-angle-small-left"></i>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={show}
          transition={{ delay: 5 }}
          className={`${Styles.headerShadow} `}
        ></motion.div>

        <motion.div variants={show} className={`${Styles.content} `}>
          <motion.div variants={show} className={`${Styles.filter} `}>
            <motion.div
              style={{
                scale,
              }}
              className={`${Styles.search} `}
            >
              <div>
                <i className="fi fi-rs-search"></i>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="بحث عن سورة"
                  onChange={(e) => {
                    fetchSearch(e.target.value);
                  }}
                />

                <p>
                  <AnimatePresence mode="popLayout">
                    {numResults !== null && (
                      <motion.p
                        key={numResults}
                        variants={movetoY}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        {numResults}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </p>
              </div>
            </motion.div>

            <motion.div
              style={{
                scale,
              }}
              whileTap={{ scale: 0.9 }}
              className={`${Styles.sort} `}
              onClick={() => {
                sortSwitcher();
              }}
            >
              <div>
                {sortStatus !== null && (
                  <motion.span
                    key={sortStatus}
                    variants={scaleItem}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    {sortStatus}
                  </motion.span>
                )}
              </div>

              <div>
                <i className="fi fi-br-bars-sort"></i>
              </div>
            </motion.div>
          </motion.div>

          {chapters.length > 0 && isLoaded ? (
            <AnimatePresence mode="wait" key={numResults}>
              <motion.div
                key={sortStatus}
                variants={moveY}
                initial={"initial"}
                animate={"animate"}
                exit={"exit"}
                className={`${Styles.surah} `}
              >
                {chapters.map(
                  (e, k) =>
                    k < num && (
                      <Chapter
                        opacity={opacity}
                        length={numResults}
                        key={k}
                        surah={e}
                        status={sortStatus}
                      />
                    )
                )}
              </motion.div>
            </AnimatePresence>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                variants={scaleModal}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="fixed left-2/4 top-2/4 translate-x-[-50%] text-2xl"
                style={{
                  fontFamily: "tebian",
                }}
              >
                لا يوجد نتائج
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </motion.div>
    </>
  );
};

export default Index;

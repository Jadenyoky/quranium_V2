import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { chapter, getFont, ayahs } from "../../../api";
import { useInView } from "react-intersection-observer";
import { AnimatePresence, motion } from "framer-motion";
import { movetoY, opacity, scale } from "../../../Styles/anim";
import Styles from "./surah.module.css";
import _ from "lodash";
import { Skeleton } from "@mui/material";
import Header from "./components/header";

const Index = () => {
  const navi = useNavigate();

  const params = useParams();
  const id = Number(params.id);
  console.log(id);

  const [searchParams, setSearchParams] = useSearchParams();
  const pageNumber = Number(searchParams.get("page"));

  const [loading, setloading] = useState(false);
  const [verses, setverses] = useState([]);
  const [typeFont, settypeFont] = useState("v1");
  const [chapterData, setchapterData] = useState([]);

  const [surahPages, setsurahPages] = useState([]);
  const [surahNumbers, setsurahNumbers] = useState([]);

  const [perEveryPage, setperEveryPage] = useState(15);
  const loopingSurahNumbers = async () => {
    const arr = _.range(1, 114 + 1);
    setsurahNumbers(arr);
    console.log(arr);
  };

  const fetchChapter = async () => {
    loopingSurahNumbers();

    const data = await chapter.getChapterInfo(id);
    setchapterData(data);
    console.log(data);

    setloading(false);
    await getFont(typeFont, pageNumber);

    const d = await ayahs(id, pageNumber, perEveryPage);
    const allVerses = d.verses;
    console.log(d.pagination);
    console.log(allVerses);
    setloading(true);

    if (
      pageNumber < d.pagination.current_page ||
      pageNumber > d.pagination.total_pages ||
      !pageNumber
    ) {
      setSearchParams({ page: 1 });
    }
    const result = allVerses.map((data) => data.words);
    console.log(_.flatMap(result));

    setverses(_.flatMap(result));
    setsurahPages(d.pagination);
  };

  const handleType = () => {
    switch (typeFont) {
      case "v4/colrv1":
        settypeFont("v1");
        break;
      case "v1":
        settypeFont("v2");
        break;
      case "v2":
        settypeFont("v4/colrv1");
        break;
      default:
        settypeFont("v4/colrv1");
        break;
    }
  };

  const handleNextPage = () => {
    const max = surahPages?.total_pages;
    if (pageNumber !== max) {
      setSearchParams({ page: pageNumber + 1 });
    }
  };

  const handlePrevPage = () => {
    if (pageNumber !== 1) {
      setSearchParams({ page: pageNumber - 1 });
    }
  };

  const handlePerPage = () => {
    if (surahPages.total_records >= perEveryPage) {
      setperEveryPage((prev) => prev + 5);
    }
  };

  useEffect(() => {
    fetchChapter();
  }, [typeFont]);

  const parentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const all = document.querySelectorAll("*");
      console.log(all.length);
    };
    if (parentRef.current) {
      const element = parentRef.current;
      element.addEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    fetchChapter();
  }, [searchParams, perEveryPage]);

  const animm = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        type: "spring",
        when: "beforeChildren",
        staggerChildren: 0.7,
      },
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <>
      <motion.div
        key={searchParams}
        variants={animm}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Header />

        <div className={Styles.cont}>
          {loading ? (
            <div className={`${Styles.ayat}`}>
              {verses.map((verse, index) => {
                return (
                  <Page
                    key={index}
                    params={searchParams}
                    pageNumber={verse.page_number}
                    words={verse}
                    typeFont={typeFont}
                    uniqueId={index}
                  />
                );
              })}
            </div>
          ) : (
            "loading"
          )}
        </div>

        <div>
          <button
            disabled={id === 114 ? true : false}
            onClick={() => {
              navi(`/read/${id + 1}`, { state: { title: "Quran Read" } });
            }}
          >
            Next
          </button>
          <button
            disabled={id === 1 ? true : false}
            onClick={() => {
              navi(`/read/${id - 1}`, { state: { title: "Quran Read" } });
            }}
          >
            Prev
          </button>
        </div>
      </motion.div>
    </>
  );
};

const Page = ({ pageNumber, words, typeFont, uniqueId, params }) => {
  const { ref, inView, entry } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const [loading, setloading] = useState(false);

  const getFontWord = async (typeFont, pageNumber) => {
    setloading(false);
    await getFont(typeFont, pageNumber);
    setloading(true);
  };

  useEffect(() => {
    if (inView) {
      getFontWord(typeFont, [pageNumber]);
    }
  }, [inView]);

  useEffect(() => {
    getFontWord(typeFont, [pageNumber]);
  }, [typeFont, params]);

  const animm = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        type: "spring",
      },
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <motion.div
      variants={animm}
      initial="initial"
      exit="exit"
      ref={ref}
      data-page={pageNumber}
    >
      <motion.p
        key={typeFont}
        variants={scale}
        className={Styles.word}
        style={{
          fontFamily: `p${pageNumber}`,
        }}
      >
        {typeFont === "v1" ? words.code_v1 : words.code_v2}
      </motion.p>
    </motion.div>
  );
};

export default Index;

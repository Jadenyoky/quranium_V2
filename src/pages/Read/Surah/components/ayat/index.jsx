import React, { useEffect, useState } from "react";
import { getFont } from "../../../../../api";
import { AnimatePresence, motion } from "framer-motion";
import { moveY_Element, opacity } from "../../../../../Styles/anim";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Index = ({ reff, typeFont, data }) => {
  const [loading, setloading] = useState(false);
  const font = async () => {
    setloading(false);

    await getFont(typeFont, [data.page_number]);

    setloading(true);
  };

  useEffect(() => {
    font();
  }, [data.page_number, typeFont]);

  return (
    <>
      {loading ? (
        <motion.span
          ref={reff}
          key={typeFont}
          style={{
            fontFamily: `p${data.page_number}`,
          }}
        >
          {`${typeFont === "v1" ? data.code_v1 : data.code_v2}`}
        </motion.span>
      ) : (
        <Skeleton count={1} />
      )}
    </>
  );
};

export default Index;

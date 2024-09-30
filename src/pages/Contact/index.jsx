import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const DynamicNavBar = () => {
  const controls = useAnimation(); // للتحكم في الأنيميشن
  const height = 60; // ارتفاع النافبار
  const [lastScrollY, setLastScrollY] = useState(0); // لمراقبة آخر سكرول
  const [scrollDirection, setScrollDirection] = useState("up"); // لمراقبة اتجاه التمرير
  const [screenHeight, setScreenHeight] = useState(window.innerHeight); // مراقبة ارتفاع الشاشة

  // لتحديث ارتفاع الشاشة عند تغيير حجم النافذة
  useEffect(() => {
    const updateScreenHeight = () => setScreenHeight(window.innerHeight);
    window.addEventListener("resize", updateScreenHeight);
    return () => window.removeEventListener("resize", updateScreenHeight);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // تحديد اتجاه التمرير
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

      // إخفاء النافبار عند التمرير لأسفل بعد تجاوز ارتفاع الجهاز
      if (currentScrollY >= screenHeight && scrollDirection === "down") {
        controls.start({ opacity: 0, transition: { duration: 0.3 } });
      }

      // إظهار النافبار عند التمرير لأعلى
      if (
        scrollDirection === "up" &&
        currentScrollY < lastScrollY &&
        currentScrollY < screenHeight
      ) {
        const delta = lastScrollY - currentScrollY;
        if (delta > 1) {
          controls.start({ opacity: 1, transition: { duration: 0.3 } });
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [controls, lastScrollY, screenHeight, scrollDirection]);

  return (
    <div
      style={{
        height: "500vh",
      }}
    >
      <motion.div
        style={{
          background: "lightblue",
          padding: "20px",
          position: "fixed",
          top: 0,
          width: "100%",
          textAlign: "center",
          zIndex: 1000,
        }}
        animate={controls} // التحكم في الأنيميشن عند التوقف
      >
        نافبار يظهر ويختفي بناءً على التمرير
      </motion.div>
    </div>
  );
};

export default DynamicNavBar;

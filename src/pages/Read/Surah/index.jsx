import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "odometer/themes/odometer-theme-default.css";
import Odometer from "odometer";

const Index = () => {
  const { id } = useParams();
  const [value, setvalue] = useState(0);
  const ref = useRef(null);

  const handleChange = () => {
    const odometer = new Odometer({
      el: ref.current,
      value: value,
      theme: "default",
    });
    odometer.render();

    odometer.update(value);
  };

  useEffect(() => {
    handleChange();
  }, [value]);
  return (
    <div dir="ltr">
      <h1>Surah {id}</h1>
      <button onClick={() => setvalue(value + 100)}>plus</button>
      <button onClick={() => setvalue(value - 100)}>minus</button>
      <div
        ref={ref}
        className="h-screen text-4xl flex justify-center items-center"
      >
        -----
      </div>
    </div>
  );
};

export default Index;

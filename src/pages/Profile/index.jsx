import loadable from "@loadable/component";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
// Lazy load the component
const LoadableComponent = loadable(() => import("./MyComponent.jsx"), {
  fallback: <div>Loading...</div>,
});

const App = () => {
  const [loading, setloading] = useState(false);

  const { ref, inView, entry } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  useEffect(() => {
    if (inView) {
      console.log("inView", entry?.target);
      setloading(true);
    }
    return setloading(false);
  }, [inView]);
  return (
    <div>
      <h1 className="text-5xl font-bold">Main Application</h1>
      <h1 className="text-5xl font-bold">Main Application</h1>
      <h1 className="text-5xl font-bold">Main Application</h1>
      <h1 className="text-5xl font-bold">Main Application</h1>
      <h1 className="text-5xl font-bold">Main Application</h1>
      <h1 className="text-5xl font-bold">Main Application</h1>
      <h1 className="text-5xl font-bold">Main Application</h1>
      <h1 className="text-5xl font-bold">Main Application</h1>
      <h1 className="text-5xl font-bold">Main Application</h1>
      <h1 className="text-5xl font-bold">Main Application</h1>
      <h1 className="text-5xl font-bold">Main Application</h1>
      <h1 className="text-5xl font-bold">Main Application</h1>
      <h1 className="text-5xl font-bold">Main Application</h1>
      <h1 className="text-5xl font-bold">Main Application</h1>
      <h1 className="text-5xl font-bold">Main Application</h1>
      <h1 className="text-5xl font-bold">Main Application</h1>
      <h1 className="text-5xl font-bold">Main Application</h1>
      <h1 className="text-5xl font-bold">Main Application</h1>
      <h1 className="text-5xl font-bold">Main Application</h1>
      <h1 className="text-5xl font-bold">Main Application</h1>
      <h1 className="text-5xl font-bold">Main Application</h1>
      <h1 className="text-5xl font-bold">Main Application</h1>
      <div ref={ref}>{loading && <LoadableComponent />}</div>

      <h1 className="text-5xl font-bold">Main Application</h1>
      <h1 className="text-5xl font-bold">Main Application</h1>
      <h1 className="text-5xl font-bold">Main Application</h1>
      <h1 className="text-5xl font-bold">Main Application</h1>
    </div>
  );
};

export default App;

import React from "react";
import Styles from "./contact.module.css";
const Index = () => {
  return (
    <div>
      <h1 className={Styles.title}>Contact page</h1>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
          <div className="flex-shrink-0">
            <svg
              className="h-12 w-12 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8c1.38 0 2.74.56 3.76 1.59A5.343 5.343 0 0117 12.34c.73.1 1.45.3 2.12.63A7.41 7.41 0 0020 9.35a7.35 7.35 0 00-6.64-7.3 7.35 7.35 0 00-7.24 6.64 7.41 7.41 0 004.45 8.4c.34-.66.55-1.38.63-2.11a5.354 5.354 0 01-3.75-1.76C7.07 12.74 7 10.38 8 8.93A5.354 5.354 0 0111.75 7H12z"
              />
            </svg>
          </div>
          <div>
            <div className="text-xl font-medium text-black">Tailwind CSS</div>
            <p className="text-gray-500">يعمل بنجاح في React مع Vite!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

import React, { useEffect, useState } from "react";
import Styles from "./profile.module.css";
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const { pathname } = useLocation();
  useEffect(() => {}, []);
  return (
    <div>
      <SignedOut>
        <div className="h-svh grid place-content-center">
          <SignIn fallbackRedirectUrl={pathname} />
        </div>
      </SignedOut>
      <SignedIn>
        <div className="font-bold text-sm fixed top-2 right-2 border p-2 rounded-full flex justify-center items-center gap-2 flex-row-reverse">
          <UserButton />
          <span>Jaden yoky</span>
        </div>
      </SignedIn>
    </div>
  );
};

export default Index;

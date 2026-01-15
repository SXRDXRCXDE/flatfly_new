"use client";

import { Suspense } from "react";
import AuthPage from "../../AuthPage/AuthPage";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import ScrollToTop from "../../../components/ScrollToTop/ScrollToTop";

export default function Auth() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Suspense fallback={<div className="w-full min-h-screen flex items-center justify-center">Loading...</div>}>
        <AuthPage />
      </Suspense>
      <Footer />
    </>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AddingPage from "../../AddingPage/AddingPage";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import ScrollToTop from "../../../components/ScrollToTop/ScrollToTop";
import { useAuth } from "../../contexts/AuthContext";

export default function Add() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth?redirect=/add");
    }
  }, [isAuthenticated, router]);

  // Показываем страницу только если пользователь аутентифицирован
  if (!isAuthenticated) {
    return null; // или можно показать загрузку
  }

  return (
    <>
      <ScrollToTop />
      <Header />
      <AddingPage />
      <Footer />
    </>
  );
}

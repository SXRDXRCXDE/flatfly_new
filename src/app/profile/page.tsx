"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ProfilePage from "../../ProfilePage/ProfilePage";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import ScrollToTop from "../../../components/ScrollToTop/ScrollToTop";
import { useAuth } from "../../contexts/AuthContext";

export default function Profile() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth?redirect=/profile");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <ScrollToTop />
      <Header />
      <ProfilePage />
      <Footer />
    </>
  );
}

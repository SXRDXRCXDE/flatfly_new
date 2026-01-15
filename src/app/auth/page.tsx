import AuthPage from "../../AuthPage/AuthPage";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import ScrollToTop from "../../../components/ScrollToTop/ScrollToTop";

export default function Auth() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <AuthPage />
      <Footer />
    </>
  );
}

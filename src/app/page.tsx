import HomePage from "../HomePage/HomePage";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

export default function Home() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <HomePage />
      <Footer />
    </>
  );
}

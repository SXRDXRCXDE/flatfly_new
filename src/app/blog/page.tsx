import BlogPage from "../../BlogPage/BlogPage";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import ScrollToTop from "../../../components/ScrollToTop/ScrollToTop";

export default function Blog() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <BlogPage />
      <Footer />
    </>
  );
}

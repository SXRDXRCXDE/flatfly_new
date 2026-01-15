import ApartmentsPage from "../../ApartmentsPage/ApartmentsPage";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import ScrollToTop from "../../../components/ScrollToTop/ScrollToTop";

export default function Apartments() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <ApartmentsPage />
      <Footer />
    </>
  );
}

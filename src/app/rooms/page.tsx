import RoomsPage from "../../RoomsPage/RoomsPage";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import ScrollToTop from "../../../components/ScrollToTop/ScrollToTop";

export default function Rooms() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <RoomsPage />
      <Footer />
    </>
  );
}

import ListingDetailPage from "../../../ListingDetailPage/ListingDetailPage";
import Header from "../../../../components/Header/Header";
import Footer from "../../../../components/Footer/Footer";
import ScrollToTop from "../../../../components/ScrollToTop/ScrollToTop";
import {ApartmentList} from "../../../data/mockData";

// В реальном приложении здесь будет запрос к API
// Для демо используем моковые данные
function getListingData(id: string) {
    const apartment = ApartmentList.find(item => item.id === id) || ApartmentList[0];
    
    return {
        id: apartment.id,
        type: "APARTMENT" as const,
        price: apartment.price,
        size: apartment.size,
        rooms: apartment.rooms,
        address: apartment.address,
        badges: apartment.badges,
        image: apartment.image,
        images: apartment.images,
        title: apartment.title,
        description: apartment.description,
        beds: apartment.beds,
        contactPhone: apartment.contactPhone,
        contactEmail: apartment.contactEmail
    };
}

export default function ApartmentDetail({ params }: { params: { id: string } }) {
    const listingData = getListingData(params.id);

    return (
        <>
            <ScrollToTop />
            <Header />
            <ListingDetailPage {...listingData} />
            <Footer />
        </>
    );
}

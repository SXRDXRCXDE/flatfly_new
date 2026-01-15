import ListingDetailPage from "../../../ListingDetailPage/ListingDetailPage";
import Header from "../../../../components/Header/Header";
import Footer from "../../../../components/Footer/Footer";
import ScrollToTop from "../../../../components/ScrollToTop/ScrollToTop";
import {RoomsList} from "../../../data/mockData";

// В реальном приложении здесь будет запрос к API
// Для демо используем моковые данные
function getListingData(id: string) {
    const room = RoomsList.find(item => item.id === id) || RoomsList[0];
    
    return {
        id: room.id,
        type: "ROOM" as const,
        price: room.price,
        size: room.size,
        address: room.address,
        badges: room.badges,
        image: room.image,
        images: room.images,
        title: room.title,
        description: room.description,
        beds: room.beds,
        contactPhone: room.contactPhone,
        contactEmail: room.contactEmail
    };
}

export default function RoomDetail({ params }: { params: { id: string } }) {
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

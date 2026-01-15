import ListingDetailPage from "../../../ListingDetailPage/ListingDetailPage";
import Header from "../../../../components/Header/Header";
import Footer from "../../../../components/Footer/Footer";
import ScrollToTop from "../../../../components/ScrollToTop/ScrollToTop";
import {NeighboursList} from "../../../data/mockData";

// В реальном приложении здесь будет запрос к API
// Для демо используем моковые данные
function getListingData(id: string) {
    const neighbour = NeighboursList.find(item => item.id === id) || NeighboursList[0];
    
    return {
        id: neighbour.id,
        type: "NEIGHBOUR" as const,
        name: neighbour.name,
        age: neighbour.age,
        from: neighbour.from,
        badges: neighbour.badges,
        image: neighbour.image,
        images: neighbour.images,
        title: neighbour.title,
        description: neighbour.description,
        contactPhone: neighbour.contactPhone,
        contactEmail: neighbour.contactEmail
    };
}

export default function NeighbourDetail({ params }: { params: { id: string } }) {
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

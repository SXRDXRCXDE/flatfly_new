"use client";

import {Icon} from "@iconify/react";
import {useLanguage} from "../../src/contexts/LanguageContext";
import {useState, useRef, useEffect} from "react";
import {X, ChevronDown} from "lucide-react";

interface FilterState {
    city: string;
    priceFrom: string;
    priceTo: string;
    propertyType: string;
    rooms: string;
    hasRoommates: string;
    rentalPeriod: string;
    amenities: string[];
    internet: string;
    utilities: string;
    petsAllowed: string;
    smokingAllowed: string;
    moveInDate: string;
}

export default function FilterPanel() {
    const { t } = useLanguage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    
    const [filters, setFilters] = useState<FilterState>({
        city: "",
        priceFrom: "",
        priceTo: "",
        propertyType: "",
        rooms: "",
        hasRoommates: "",
        rentalPeriod: "",
        amenities: [],
        internet: "",
        utilities: "",
        petsAllowed: "",
        smokingAllowed: "",
        moveInDate: "",
    });

    const RoomsCategories = [
        {title: t("filter.location"), subTitle: filters.city || t("filter.locationValue")},
        {title: t("filter.offerType"), subTitle: t("filter.offerTypeValue")},
        {title: t("filter.property"), subTitle: filters.propertyType || t("filter.propertyValue")},
        {title: t("filter.price"), subTitle: filters.priceFrom || filters.priceTo ? `${filters.priceFrom || "0"} - ${filters.priceTo || "∞"}` : t("filter.priceValue")},
    ];

    const propertyTypes = [
        {value: "room", label: t("filter.propertyTypeRoom")},
        {value: "apartment", label: t("filter.propertyTypeApartment")},
        {value: "house", label: t("filter.propertyTypeHouse")},
    ];

    const roomOptions = ["1", "2", "3", "4", "5+"];
    const yesNoOptions = [
        {value: "yes", label: t("filter.hasRoommatesYes")},
        {value: "no", label: t("filter.hasRoommatesNo")},
    ];

    const rentalPeriods = [
        {value: "short", label: t("filter.rentalPeriodShort")},
        {value: "long", label: t("filter.rentalPeriodLong")},
        {value: "flexible", label: t("filter.rentalPeriodFlexible")},
    ];

    const amenitiesOptions = [
        {key: "washing_machine", label: t("filter.amenityWashingMachine")},
        {key: "dishwasher", label: t("filter.amenityDishwasher")},
        {key: "microwave", label: t("filter.amenityMicrowave")},
        {key: "oven", label: t("filter.amenityOven")},
        {key: "refrigerator", label: t("filter.amenityRefrigerator")},
        {key: "tv", label: t("filter.amenityTV")},
        {key: "air_conditioning", label: t("filter.amenityAirConditioning")},
        {key: "heating", label: t("filter.amenityHeating")},
        {key: "balcony", label: t("filter.amenityBalcony")},
        {key: "parking", label: t("filter.amenityParking")},
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsModalOpen(false);
            }
        };

        if (isModalOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("touchstart", handleClickOutside);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
            document.body.style.overflow = '';
        };
    }, [isModalOpen]);

    const handleFilterChange = (key: keyof FilterState, value: string | string[]) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const toggleAmenity = (amenity: string) => {
        setFilters(prev => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity]
        }));
    };

    const handleReset = () => {
        setFilters({
            city: "",
            priceFrom: "",
            priceTo: "",
            propertyType: "",
            rooms: "",
            hasRoommates: "",
            rentalPeriod: "",
            amenities: [],
            internet: "",
            utilities: "",
            petsAllowed: "",
            smokingAllowed: "",
            moveInDate: "",
        });
    };

    const handleApply = () => {
        // Здесь будет логика применения фильтров
        console.log("Applied filters:", filters);
        setIsModalOpen(false);
    };

    return(
        <div className={`w-full flex flex-col interFont`}>

            {/* Десктопная версия */}
            <div className={`hidden min-[771px]:flex w-full h-[64px] items-center justify-between border border-[#DDDDDD] dark:border-gray-600 rounded-full shadow-md dark:shadow-gray-900/50 bg-white dark:bg-gray-800 overflow-hidden`}>

                <div className={`flex items-center h-full py-2 overflow-x-auto overflow-y-hidden`}>
                    {RoomsCategories.map((value, index)=>
                        <div key={index} className={`h-full flex-shrink-0 flex flex-col items-center justify-center px-14 ${index+1===RoomsCategories.length ? `` : `border-r border-[#E5E5E5] dark:border-gray-700`}  `}>
                            <span className={`font-bold text-[16px] text-black dark:text-white`}>{value.title}</span>
                            <span className={`font-semibold text-[12px] text-[#666666] dark:text-gray-400`}>{value.subTitle}</span>
                        </div>
                    )}
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className={`h-full flex items-center justify-center px-10 flex-shrink-0 gap-2 border-l border-[#E5E5E5] dark:border-gray-700 cursor-pointer hover:bg-[#F5F5F5] dark:hover:bg-gray-700 duration-300`}
                >
                    <Icon icon="mage:filter" className={`w-11 h-11 max-[1220px]:w-7 max-[1220px]:h-7 `} style={{color: `#08E2BE`}} />
                    <span className={`text-[30px] max-[1220px]:text-[20px] text-[#C505EB] font-bold`}>{t("filter.filters")}</span>
                </button>

            </div>

            {/* Мобильная версия с разделительными линиями */}
            <div className={`flex max-[770px]:flex min-[771px]:hidden w-full flex-col border border-[#DDDDDD] dark:border-gray-600 rounded-xl shadow-md dark:shadow-gray-900/50 bg-white dark:bg-gray-800 overflow-hidden`}>

                <div className={`flex flex-col`}>
                    {RoomsCategories.map((value, index)=>
                        <div key={index} className={`flex flex-col items-start px-4 py-3 ${index+1===RoomsCategories.length ? `` : `border-b border-[#E5E5E5] dark:border-gray-700`}  `}>
                            <span className={`font-bold text-sm text-black dark:text-white`}>{value.title}</span>
                            <span className={`font-semibold text-xs text-[#666666] dark:text-gray-400`}>{value.subTitle}</span>
                        </div>
                    )}
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className={`flex items-center justify-center px-4 py-3 gap-2 border-t border-[#E5E5E5] dark:border-gray-700 cursor-pointer hover:bg-[#F5F5F5] dark:hover:bg-gray-700 duration-300`}
                >
                    <Icon icon="mage:filter" className={`w-6 h-6`} style={{color: `#08E2BE`}} />
                    <span className={`text-lg text-[#C505EB] font-bold`}>{t("filter.filters")}</span>
                </button>

            </div>

            {/* Модальное окно фильтров */}
            {isModalOpen && (
                <>
                    {/* Overlay */}
                    <div 
                        className={`fixed inset-0 bg-black bg-opacity-50 z-[200] transition-opacity duration-300`}
                        onClick={() => setIsModalOpen(false)}
                    />
                    
                    {/* Modal */}
                    <div 
                        ref={modalRef}
                        className={`fixed inset-0 z-[201] flex items-center justify-center p-4 max-[770px]:p-2`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={`w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col`}>
                            {/* Header */}
                            <div className={`flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5] dark:border-gray-700`}>
                                <h2 className={`text-2xl font-bold text-black dark:text-white`}>{t("filter.filters")}</h2>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className={`p-2 rounded-full hover:bg-[#F5F5F5] dark:hover:bg-gray-700 duration-300`}
                                >
                                    <X size={24} className={`text-gray-700 dark:text-gray-300`} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className={`flex-1 overflow-y-auto px-6 py-4`}>
                                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
                                    {/* Город / Район */}
                                    <div className={`flex flex-col gap-2`}>
                                        <label className={`text-sm font-semibold text-black dark:text-white`}>{t("filter.city")}</label>
                                        <input
                                            type="text"
                                            value={filters.city}
                                            onChange={(e) => handleFilterChange("city", e.target.value)}
                                            placeholder={t("filter.cityPlaceholder")}
                                            className={`w-full px-4 py-2 rounded-lg border border-[#DDDDDD] dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#C505EB] dark:focus:border-[#C505EB] outline-0 duration-300`}
                                        />
                                    </div>

                                    {/* Тип жилья */}
                                    <div className={`flex flex-col gap-2`}>
                                        <label className={`text-sm font-semibold text-black dark:text-white`}>{t("filter.propertyType")}</label>
                                        <select
                                            value={filters.propertyType}
                                            onChange={(e) => handleFilterChange("propertyType", e.target.value)}
                                            className={`w-full px-4 py-2 rounded-lg border border-[#DDDDDD] dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#C505EB] dark:focus:border-[#C505EB] outline-0 duration-300`}
                                        >
                                            <option value="">{t("filter.propertyValue")}</option>
                                            {propertyTypes.map((type) => (
                                                <option key={type.value} value={type.value}>{type.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Цена от */}
                                    <div className={`flex flex-col gap-2`}>
                                        <label className={`text-sm font-semibold text-black dark:text-white`}>{t("filter.price")} ({t("filter.priceFrom")})</label>
                                        <input
                                            type="number"
                                            value={filters.priceFrom}
                                            onChange={(e) => handleFilterChange("priceFrom", e.target.value)}
                                            placeholder={t("filter.pricePlaceholder")}
                                            className={`w-full px-4 py-2 rounded-lg border border-[#DDDDDD] dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#C505EB] dark:focus:border-[#C505EB] outline-0 duration-300`}
                                        />
                                    </div>

                                    {/* Цена до */}
                                    <div className={`flex flex-col gap-2`}>
                                        <label className={`text-sm font-semibold text-black dark:text-white`}>{t("filter.price")} ({t("filter.priceTo")})</label>
                                        <input
                                            type="number"
                                            value={filters.priceTo}
                                            onChange={(e) => handleFilterChange("priceTo", e.target.value)}
                                            placeholder={t("filter.pricePlaceholder")}
                                            className={`w-full px-4 py-2 rounded-lg border border-[#DDDDDD] dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#C505EB] dark:focus:border-[#C505EB] outline-0 duration-300`}
                                        />
                                    </div>

                                    {/* Количество комнат */}
                                    <div className={`flex flex-col gap-2`}>
                                        <label className={`text-sm font-semibold text-black dark:text-white`}>{t("filter.rooms")}</label>
                                        <select
                                            value={filters.rooms}
                                            onChange={(e) => handleFilterChange("rooms", e.target.value)}
                                            className={`w-full px-4 py-2 rounded-lg border border-[#DDDDDD] dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#C505EB] dark:focus:border-[#C505EB] outline-0 duration-300`}
                                        >
                                            <option value="">{t("filter.roomsPlaceholder")}</option>
                                            {roomOptions.map((room) => (
                                                <option key={room} value={room}>{room}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Наличие соседей */}
                                    <div className={`flex flex-col gap-2`}>
                                        <label className={`text-sm font-semibold text-black dark:text-white`}>{t("filter.hasRoommates")}</label>
                                        <select
                                            value={filters.hasRoommates}
                                            onChange={(e) => handleFilterChange("hasRoommates", e.target.value)}
                                            className={`w-full px-4 py-2 rounded-lg border border-[#DDDDDD] dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#C505EB] dark:focus:border-[#C505EB] outline-0 duration-300`}
                                        >
                                            <option value="">-</option>
                                            {yesNoOptions.map((option) => (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Срок аренды */}
                                    <div className={`flex flex-col gap-2`}>
                                        <label className={`text-sm font-semibold text-black dark:text-white`}>{t("filter.rentalPeriod")}</label>
                                        <select
                                            value={filters.rentalPeriod}
                                            onChange={(e) => handleFilterChange("rentalPeriod", e.target.value)}
                                            className={`w-full px-4 py-2 rounded-lg border border-[#DDDDDD] dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#C505EB] dark:focus:border-[#C505EB] outline-0 duration-300`}
                                        >
                                            <option value="">-</option>
                                            {rentalPeriods.map((period) => (
                                                <option key={period.value} value={period.value}>{period.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Интернет */}
                                    <div className={`flex flex-col gap-2`}>
                                        <label className={`text-sm font-semibold text-black dark:text-white`}>{t("filter.internet")}</label>
                                        <select
                                            value={filters.internet}
                                            onChange={(e) => handleFilterChange("internet", e.target.value)}
                                            className={`w-full px-4 py-2 rounded-lg border border-[#DDDDDD] dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#C505EB] dark:focus:border-[#C505EB] outline-0 duration-300`}
                                        >
                                            <option value="">-</option>
                                            <option value="yes">{t("filter.internetYes")}</option>
                                            <option value="no">{t("filter.internetNo")}</option>
                                        </select>
                                    </div>

                                    {/* Коммунальные услуги */}
                                    <div className={`flex flex-col gap-2`}>
                                        <label className={`text-sm font-semibold text-black dark:text-white`}>{t("filter.utilities")}</label>
                                        <select
                                            value={filters.utilities}
                                            onChange={(e) => handleFilterChange("utilities", e.target.value)}
                                            className={`w-full px-4 py-2 rounded-lg border border-[#DDDDDD] dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#C505EB] dark:focus:border-[#C505EB] outline-0 duration-300`}
                                        >
                                            <option value="">-</option>
                                            <option value="included">{t("filter.utilitiesIncluded")}</option>
                                            <option value="not_included">{t("filter.utilitiesNotIncluded")}</option>
                                        </select>
                                    </div>

                                    {/* Разрешены животные */}
                                    <div className={`flex flex-col gap-2`}>
                                        <label className={`text-sm font-semibold text-black dark:text-white`}>{t("filter.petsAllowed")}</label>
                                        <select
                                            value={filters.petsAllowed}
                                            onChange={(e) => handleFilterChange("petsAllowed", e.target.value)}
                                            className={`w-full px-4 py-2 rounded-lg border border-[#DDDDDD] dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#C505EB] dark:focus:border-[#C505EB] outline-0 duration-300`}
                                        >
                                            <option value="">-</option>
                                            <option value="yes">{t("filter.petsAllowedYes")}</option>
                                            <option value="no">{t("filter.petsAllowedNo")}</option>
                                        </select>
                                    </div>

                                    {/* Разрешено курение */}
                                    <div className={`flex flex-col gap-2`}>
                                        <label className={`text-sm font-semibold text-black dark:text-white`}>{t("filter.smokingAllowed")}</label>
                                        <select
                                            value={filters.smokingAllowed}
                                            onChange={(e) => handleFilterChange("smokingAllowed", e.target.value)}
                                            className={`w-full px-4 py-2 rounded-lg border border-[#DDDDDD] dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#C505EB] dark:focus:border-[#C505EB] outline-0 duration-300`}
                                        >
                                            <option value="">-</option>
                                            <option value="yes">{t("filter.smokingAllowedYes")}</option>
                                            <option value="no">{t("filter.smokingAllowedNo")}</option>
                                        </select>
                                    </div>

                                    {/* Дата заселения */}
                                    <div className={`flex flex-col gap-2`}>
                                        <label className={`text-sm font-semibold text-black dark:text-white`}>{t("filter.moveInDate")}</label>
                                        <input
                                            type="date"
                                            value={filters.moveInDate}
                                            onChange={(e) => handleFilterChange("moveInDate", e.target.value)}
                                            className={`w-full px-4 py-2 rounded-lg border border-[#DDDDDD] dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#C505EB] dark:focus:border-[#C505EB] outline-0 duration-300`}
                                        />
                                    </div>

                                    {/* Оснащение */}
                                    <div className={`flex flex-col gap-2 md:col-span-2`}>
                                        <label className={`text-sm font-semibold text-black dark:text-white`}>{t("filter.amenities")}</label>
                                        <div className={`grid grid-cols-2 md:grid-cols-3 gap-3`}>
                                            {amenitiesOptions.map((amenity) => (
                                                <label key={amenity.key} className={`flex items-center gap-2 cursor-pointer`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={filters.amenities.includes(amenity.key)}
                                                        onChange={() => toggleAmenity(amenity.key)}
                                                        className={`w-4 h-4 rounded border-[#DDDDDD] dark:border-gray-600 text-[#C505EB] focus:ring-[#C505EB]`}
                                                    />
                                                    <span className={`text-sm text-black dark:text-white`}>{amenity.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className={`flex items-center justify-between px-6 py-4 border-t border-[#E5E5E5] dark:border-gray-700 gap-4`}>
                                <button
                                    onClick={handleReset}
                                    className={`px-6 py-2 rounded-lg border border-[#DDDDDD] dark:border-gray-600 text-black dark:text-white hover:bg-[#F5F5F5] dark:hover:bg-gray-700 duration-300 font-semibold`}
                                >
                                    {t("filter.resetFilters")}
                                </button>
                                <button
                                    onClick={handleApply}
                                    className={`px-6 py-2 rounded-lg bg-gradient-to-r from-[#C505EB] to-[#BA00F8] text-white hover:from-[#BA00F8] hover:to-[#C505EB] duration-300 font-semibold`}
                                >
                                    {t("filter.applyFilters")}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

        </div>
    );
}

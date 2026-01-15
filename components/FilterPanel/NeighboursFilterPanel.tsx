"use client";

import {Icon} from "@iconify/react";
import {useLanguage} from "../../src/contexts/LanguageContext";
import {useState, useRef, useEffect} from "react";
import {X} from "lucide-react";

interface NeighbourFilterState {
    city: string;
    ageFrom: string;
    ageTo: string;
    gender: string;
    smoking: string;
    alcohol: string;
    sleepSchedule: string;
    profession: string;
    workFromHome: string;
    languages: string[];
    interests: string;
}

export default function NeighboursFilterPanel() {
    const { t } = useLanguage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    
    const [filters, setFilters] = useState<NeighbourFilterState>({
        city: "",
        ageFrom: "",
        ageTo: "",
        gender: "",
        smoking: "",
        alcohol: "",
        sleepSchedule: "",
        profession: "",
        workFromHome: "",
        languages: [],
        interests: "",
    });

    const NeighboursCategories = [
        {title: t("filter.location"), subTitle: filters.city || t("filter.locationValue")},
        {title: t("filter.neighbourAge"), subTitle: filters.ageFrom || filters.ageTo ? `${filters.ageFrom || "0"} - ${filters.ageTo || "∞"}` : "-"},
        {title: t("filter.neighbourGender"), subTitle: filters.gender || "-"},
        {title: t("filter.neighbourLifestyle"), subTitle: filters.smoking || filters.alcohol ? `${filters.smoking || "-"} / ${filters.alcohol || "-"}` : "-"},
    ];

    const genderOptions = [
        {value: "male", label: t("filter.neighbourGenderMale")},
        {value: "female", label: t("filter.neighbourGenderFemale")},
        {value: "other", label: t("filter.neighbourGenderOther")},
        {value: "any", label: t("filter.neighbourGenderAny")},
    ];

    const smokingOptions = [
        {value: "yes", label: t("filter.neighbourSmokingYes")},
        {value: "no", label: t("filter.neighbourSmokingNo")},
        {value: "sometimes", label: t("filter.neighbourSmokingSometimes")},
    ];

    const alcoholOptions = [
        {value: "yes", label: t("filter.neighbourAlcoholYes")},
        {value: "no", label: t("filter.neighbourAlcoholNo")},
        {value: "rarely", label: t("filter.neighbourAlcoholRarely")},
    ];

    const sleepScheduleOptions = [
        {value: "early", label: t("filter.neighbourSleepScheduleEarly")},
        {value: "late", label: t("filter.neighbourSleepScheduleLate")},
        {value: "flexible", label: t("filter.neighbourSleepScheduleFlexible")},
    ];

    const workFromHomeOptions = [
        {value: "yes", label: t("filter.neighbourWorkFromHomeYes")},
        {value: "no", label: t("filter.neighbourWorkFromHomeNo")},
    ];

    const languageOptions = [
        {key: "cz", label: t("profile.languages.cz")},
        {key: "en", label: t("profile.languages.en")},
        {key: "ru", label: t("profile.languages.ru")},
        {key: "de", label: t("profile.languages.de")},
        {key: "sk", label: t("profile.languages.sk")},
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

    const handleFilterChange = (key: keyof NeighbourFilterState, value: string | string[]) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const toggleLanguage = (language: string) => {
        setFilters(prev => ({
            ...prev,
            languages: prev.languages.includes(language)
                ? prev.languages.filter(l => l !== language)
                : [...prev.languages, language]
        }));
    };

    const handleReset = () => {
        setFilters({
            city: "",
            ageFrom: "",
            ageTo: "",
            gender: "",
            smoking: "",
            alcohol: "",
            sleepSchedule: "",
            profession: "",
            workFromHome: "",
            languages: [],
            interests: "",
        });
    };

    const handleApply = () => {
        // Здесь будет логика применения фильтров
        console.log("Applied neighbour filters:", filters);
        setIsModalOpen(false);
    };

    return(
        <div className={`w-full flex flex-col interFont`}>

            {/* Десктопная версия */}
            <div className={`hidden min-[771px]:flex w-full h-[64px] items-center justify-between border border-[#DDDDDD] dark:border-gray-600 rounded-full shadow-md dark:shadow-gray-900/50 bg-white dark:bg-gray-800 overflow-hidden`}>

                <div className={`flex items-center h-full py-2 overflow-x-auto overflow-y-hidden`}>
                    {NeighboursCategories.map((value, index)=>
                        <div key={index} className={`h-full flex-shrink-0 flex flex-col items-center justify-center px-14 ${index+1===NeighboursCategories.length ? `` : `border-r border-[#E5E5E5] dark:border-gray-700`}  `}>
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
                    {NeighboursCategories.map((value, index)=>
                        <div key={index} className={`flex flex-col items-start px-4 py-3 ${index+1===NeighboursCategories.length ? `` : `border-b border-[#E5E5E5] dark:border-gray-700`}  `}>
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
                                    {/* Город */}
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

                                    {/* Возраст от */}
                                    <div className={`flex flex-col gap-2`}>
                                        <label className={`text-sm font-semibold text-black dark:text-white`}>{t("filter.neighbourAge")} ({t("filter.neighbourAgeFrom")})</label>
                                        <input
                                            type="number"
                                            value={filters.ageFrom}
                                            onChange={(e) => handleFilterChange("ageFrom", e.target.value)}
                                            placeholder={t("filter.neighbourAgePlaceholder")}
                                            className={`w-full px-4 py-2 rounded-lg border border-[#DDDDDD] dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#C505EB] dark:focus:border-[#C505EB] outline-0 duration-300`}
                                        />
                                    </div>

                                    {/* Возраст до */}
                                    <div className={`flex flex-col gap-2`}>
                                        <label className={`text-sm font-semibold text-black dark:text-white`}>{t("filter.neighbourAge")} ({t("filter.neighbourAgeTo")})</label>
                                        <input
                                            type="number"
                                            value={filters.ageTo}
                                            onChange={(e) => handleFilterChange("ageTo", e.target.value)}
                                            placeholder={t("filter.neighbourAgePlaceholder")}
                                            className={`w-full px-4 py-2 rounded-lg border border-[#DDDDDD] dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#C505EB] dark:focus:border-[#C505EB] outline-0 duration-300`}
                                        />
                                    </div>

                                    {/* Пол */}
                                    <div className={`flex flex-col gap-2`}>
                                        <label className={`text-sm font-semibold text-black dark:text-white`}>{t("filter.neighbourGender")}</label>
                                        <select
                                            value={filters.gender}
                                            onChange={(e) => handleFilterChange("gender", e.target.value)}
                                            className={`w-full px-4 py-2 rounded-lg border border-[#DDDDDD] dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#C505EB] dark:focus:border-[#C505EB] outline-0 duration-300`}
                                        >
                                            <option value="">-</option>
                                            {genderOptions.map((option) => (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Курение */}
                                    <div className={`flex flex-col gap-2`}>
                                        <label className={`text-sm font-semibold text-black dark:text-white`}>{t("filter.neighbourSmoking")}</label>
                                        <select
                                            value={filters.smoking}
                                            onChange={(e) => handleFilterChange("smoking", e.target.value)}
                                            className={`w-full px-4 py-2 rounded-lg border border-[#DDDDDD] dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#C505EB] dark:focus:border-[#C505EB] outline-0 duration-300`}
                                        >
                                            <option value="">-</option>
                                            {smokingOptions.map((option) => (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Алкоголь */}
                                    <div className={`flex flex-col gap-2`}>
                                        <label className={`text-sm font-semibold text-black dark:text-white`}>{t("filter.neighbourAlcohol")}</label>
                                        <select
                                            value={filters.alcohol}
                                            onChange={(e) => handleFilterChange("alcohol", e.target.value)}
                                            className={`w-full px-4 py-2 rounded-lg border border-[#DDDDDD] dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#C505EB] dark:focus:border-[#C505EB] outline-0 duration-300`}
                                        >
                                            <option value="">-</option>
                                            {alcoholOptions.map((option) => (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Режим сна */}
                                    <div className={`flex flex-col gap-2`}>
                                        <label className={`text-sm font-semibold text-black dark:text-white`}>{t("filter.neighbourSleepSchedule")}</label>
                                        <select
                                            value={filters.sleepSchedule}
                                            onChange={(e) => handleFilterChange("sleepSchedule", e.target.value)}
                                            className={`w-full px-4 py-2 rounded-lg border border-[#DDDDDD] dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#C505EB] dark:focus:border-[#C505EB] outline-0 duration-300`}
                                        >
                                            <option value="">-</option>
                                            {sleepScheduleOptions.map((option) => (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Профессия / Университет */}
                                    <div className={`flex flex-col gap-2`}>
                                        <label className={`text-sm font-semibold text-black dark:text-white`}>{t("filter.neighbourProfession")}</label>
                                        <input
                                            type="text"
                                            value={filters.profession}
                                            onChange={(e) => handleFilterChange("profession", e.target.value)}
                                            placeholder={t("filter.neighbourProfessionPlaceholder")}
                                            className={`w-full px-4 py-2 rounded-lg border border-[#DDDDDD] dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#C505EB] dark:focus:border-[#C505EB] outline-0 duration-300`}
                                        />
                                    </div>

                                    {/* Удалённая работа */}
                                    <div className={`flex flex-col gap-2`}>
                                        <label className={`text-sm font-semibold text-black dark:text-white`}>{t("filter.neighbourWorkFromHome")}</label>
                                        <select
                                            value={filters.workFromHome}
                                            onChange={(e) => handleFilterChange("workFromHome", e.target.value)}
                                            className={`w-full px-4 py-2 rounded-lg border border-[#DDDDDD] dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#C505EB] dark:focus:border-[#C505EB] outline-0 duration-300`}
                                        >
                                            <option value="">-</option>
                                            {workFromHomeOptions.map((option) => (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Языки общения */}
                                    <div className={`flex flex-col gap-2 md:col-span-2`}>
                                        <label className={`text-sm font-semibold text-black dark:text-white`}>{t("filter.neighbourLanguages")}</label>
                                        <div className={`grid grid-cols-2 md:grid-cols-3 gap-3`}>
                                            {languageOptions.map((lang) => (
                                                <label key={lang.key} className={`flex items-center gap-2 cursor-pointer`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={filters.languages.includes(lang.key)}
                                                        onChange={() => toggleLanguage(lang.key)}
                                                        className={`w-4 h-4 rounded border-[#DDDDDD] dark:border-gray-600 text-[#C505EB] focus:ring-[#C505EB]`}
                                                    />
                                                    <span className={`text-sm text-black dark:text-white`}>{lang.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Совпадение интересов */}
                                    <div className={`flex flex-col gap-2 md:col-span-2`}>
                                        <label className={`text-sm font-semibold text-black dark:text-white`}>{t("filter.neighbourInterests")}</label>
                                        <input
                                            type="text"
                                            value={filters.interests}
                                            onChange={(e) => handleFilterChange("interests", e.target.value)}
                                            placeholder={t("filter.neighbourInterestsPlaceholder")}
                                            className={`w-full px-4 py-2 rounded-lg border border-[#DDDDDD] dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-[#C505EB] dark:focus:border-[#C505EB] outline-0 duration-300`}
                                        />
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

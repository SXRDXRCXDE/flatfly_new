"use client";

import FilterPanel from "../../components/FilterPanel/FilterPanel";
import SaleCard from "../../components/SaleCard/SaleCard";
import {useState} from "react";
import {ChevronRight, Search} from "lucide-react";
import {ApartmentList} from "../data/mockData";
import {useLanguage} from "../contexts/LanguageContext";


export default function ApartmentsPage(){
    const { t } = useLanguage();
    const [pagination,setPagination] = useState(0);

    return(
        <div className={`w-full min-h-screen flex flex-col items-center interFont text-black dark:text-white bg-white dark:bg-gray-900`}>

            <div className={`w-full max-w-[1440px] min-[1440px]:px-[110px] max-[1440px]:px-5 max-[770px]:px-2 flex flex-col items-center`}>

                <div className={`w-full flex flex-col items-start my-[150px]`}>

                    {/* Поиск */}
                    <div className={`w-full max-w-[450px] flex items-center h-12 relative mb-6`}>
                        <input className={`w-full h-12 rounded-full border border-[#DDDDDD] dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-[#999999] dark:focus:border-[#C505EB] pl-8 pr-12 duration-300 focus:shadow-md outline-0`} placeholder={t("header.searchPlaceholder")} />
                        <div className={`absolute right-4`}>
                            <Search size={30} color={`#C505EB`}/>
                        </div>
                    </div>

                    <FilterPanel/>

                    <div className={`w-full grid grid-cols-3 max-[870px]:grid-cols-2 max-[580px]:grid-cols-1 max-[870px]:gap-2 gap-6 mt-[50px]`}>
                        {ApartmentList.map((value, index)=>
                            <div key={index} className={`w-full flex items-center justify-center `}>
                                <SaleCard id={value.id} price={value.price} address={value.address} size={value.size} rooms={value.rooms} badges={value.badges} image={value.image} type={"APARTMENT"}/>
                            </div>
                        )}
                    </div>

                    <div className={`w-full flex flex-col items-center justify-center gap-1 mt-10`}>
                        <div className={`flex items-center justify-center gap-1 text-[#333333] dark:text-gray-300`}>
                            {Array.from({ length: 10 }).map((_, index) => (
                                <div onClick={()=>setPagination(index+1)} className={`${index+1===pagination&& `bg-[#C505EB] text-white`} flex items-center justify-center duration-300 cursor-pointer max-[1220px]:text-sm text-lg font-semibold max-[1220px]:w-6 max-[1220px]:h-6 w-8 h-8 rounded-full `} key={index}>
                                    {index + 1}
                                </div>
                            ))}
                        </div>
                        <div className={`flex items-center gap-1 text-black dark:text-white`}>
                            <span className={`text-lg font-semibold`}>Další</span>
                            <ChevronRight strokeWidth={1.7} />
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );

};
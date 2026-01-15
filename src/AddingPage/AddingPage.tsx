"use client";

import {Icon} from "@iconify/react";
import {useState, useRef, useEffect} from "react";
import {useLanguage} from "../contexts/LanguageContext";
import {X, ChevronLeft, ChevronRight} from "lucide-react";


export default function AddingPage() {
    const { t } = useLanguage();
    const [typeAd,setTypeAd] = useState(``);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dropZoneRef = useRef<HTMLDivElement>(null);

    const handleFileSelect = (files: FileList | null) => {
        if (!files) return;
        
        const imageFiles = Array.from(files).filter(file => 
            file.type.startsWith('image/') && (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png')
        );

        imageFiles.forEach(file => {
            if (file.size > 10 * 1024 * 1024) {
                alert(`File ${file.name} is too large. Maximum size is 10 MB.`);
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setUploadedImages(prev => [...prev, e.target!.result as string]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        handleFileSelect(e.dataTransfer.files);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const removeImage = (index: number) => {
        setUploadedImages(prev => prev.filter((_, i) => i !== index));
        if (currentImageIndex >= uploadedImages.length - 1 && currentImageIndex > 0) {
            setCurrentImageIndex(prev => prev - 1);
        }
    };

    const openModal = (index: number) => {
        setCurrentImageIndex(index);
        setIsModalOpen(true);
    };

    const nextImage = () => {
        if (isTransitioning || uploadedImages.length <= 1) return;
        setIsTransitioning(true);
        setCurrentImageIndex((prev) => (prev + 1) % uploadedImages.length);
        setTimeout(() => setIsTransitioning(false), 300);
    };

    const prevImage = () => {
        if (isTransitioning || uploadedImages.length <= 1) return;
        setIsTransitioning(true);
        setCurrentImageIndex((prev) => (prev - 1 + uploadedImages.length) % uploadedImages.length);
        setTimeout(() => setIsTransitioning(false), 300);
    };

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isModalOpen) {
                setIsModalOpen(false);
            }
        };

        if (isModalOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isModalOpen]);

    return(
        <div className={`w-full min-h-screen flex flex-col items-center interFont text-black dark:text-white bg-white dark:bg-gray-900`}>

            <div className={`w-full max-w-[1440px] min-[1440px]:px-[110px] max-[1440px]:px-5 max-[770px]:px-2 flex flex-col items-center`}>

                <div className={`w-full flex flex-col items-center mt-[124px] mb-[100px]`}>

                    <span className={`font-bold text-[32px] mb-6 text-black dark:text-white`}>{t("add.title")}</span>

                    <div className={`flex flex-col items-center w-full max-w-[850px] py-10 px-[72px] max-[770px]:py-5 max-[770px]:px-[20px] border border-[#666666] dark:border-gray-600 bg-white dark:bg-gray-800 rounded-[24px]`}>
                        <div className={`w-full flex items-center justify-between gap-2`}>
                            <div onClick={()=>setTypeAd(`APARTMENT`)} className={`cursor-pointer relative flex flex-col items-center ${typeAd==="APARTMENT"? `bg-[#C505EB] shadow-md`:``} duration-300 pt-9 max-[770px]:pt-4 max-[770px]:w-[100px] max-[770px]:h-[84px] w-[180px] h-[164px] rounded-[18px] border border-[#666666] dark:border-gray-600 gap-2`}>
                                <span className={`text-2xl max-[770px]:text-xs font-bold ${typeAd===`APARTMENT`? `text-white` : `text-[#C505EB]`} duration-300`}>{t("add.fullApartment")}</span>
                                <Icon className={`absolute bottom-5 duration-300 w-[64px] h-[64px] max-[770px]:w-[32px] max-[770px]:h-[32px]`} icon="lsicon:house-outline" width="64" height="64"  style={{color: typeAd===`APARTMENT`? `#ffffff` : `#08E2BE`}} />
                            </div>
                            <div onClick={()=>setTypeAd(`ROOM`)} className={`cursor-pointer relative flex flex-col items-center ${typeAd==="ROOM"? `bg-[#C505EB] shadow-md`:``} duration-300 pt-9 max-[770px]:pt-4 max-[770px]:w-[100px] max-[770px]:h-[84px] w-[180px] h-[164px] rounded-[18px] border border-[#666666] dark:border-gray-600 gap-2`}>
                                <span className={`text-2xl max-[770px]:text-xs font-bold ${typeAd===`ROOM`? `text-white` : `text-[#C505EB]`} duration-300`}>{t("add.room")}</span>
                                <Icon className={`absolute bottom-3 duration-300 w-[64px] h-[64px] max-[770px]:w-[32px] max-[770px]:h-[32px]`} icon="material-symbols-light:bed-outline" style={{color: typeAd===`ROOM`? `#ffffff` : `#08E2BE`}} />
                            </div>
                            <div onClick={()=>setTypeAd(`SHAREROOM`)} className={`cursor-pointer relative flex flex-col items-center text-center ${typeAd==="SHAREROOM"? `bg-[#C505EB] shadow-md`:``} duration-300 pt-9 max-[770px]:pt-4 max-[770px]:w-[100px] max-[770px]:h-[84px] w-[180px] h-[164px] rounded-[18px] border border-[#666666] dark:border-gray-600 gap-2 px-3`}>
                                <span className={`text-2xl max-[770px]:text-xs font-bold ${typeAd===`SHAREROOM`? `text-white` : `text-[#C505EB]`} duration-300 `}>{t("add.sharedRoom")}</span>
                                <Icon className={`absolute bottom-2 duration-300 w-[64px] h-[64px] max-[770px]:w-[32px] max-[770px]:h-[32px]`} icon="iconoir:sofa" style={{color:  typeAd===`SHAREROOM`? `#ffffff` : `#08E2BE`}} />
                            </div>
                        </div>
                        <div className={`w-full flex flex-col items-center mt-[90px] max-[770px]:mt-8`}>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/jpeg,image/jpg,image/png"
                                multiple
                                onChange={(e) => handleFileSelect(e.target.files)}
                                className="hidden"
                            />
                            <div 
                                ref={dropZoneRef}
                                onClick={() => fileInputRef.current?.click()}
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                className={`w-full flex flex-col items-center min-h-[200px] border border-[#666666] dark:border-gray-600 rounded-[16px] border-dashed cursor-pointer transition-colors duration-300 ${
                                    isDragging ? 'bg-[#C505EB]/10 border-[#C505EB]' : 'hover:bg-[#F9F9F9] dark:hover:bg-gray-700'
                                }`}
                            >
                                <div className={`w-full min-h-[200px] flex flex-col items-center justify-center gap-3 p-4`}>
                                    <Icon icon="mdi-light:cloud-upload" width="64" height="64" style={{color: `#08E2BE`}} />
                                    <span className={`text-[#C505EB] text-2xl font-semibold`}>{t("add.uploadPhotos")}</span>
                                    <span className={`text-[#666666] dark:text-gray-400 text-[14px] text-center`}>{t("add.uploadFormat")}</span>
                                </div>
                            </div>

                            {/* Превью загруженных изображений */}
                            {uploadedImages.length > 0 && (
                                <div className={`w-full mt-6 grid grid-cols-3 max-[770px]:grid-cols-2 gap-4`}>
                                    {uploadedImages.map((image, index) => (
                                        <div key={index} className={`relative group aspect-square rounded-lg overflow-hidden border border-[#E5E5E5] dark:border-gray-600`}>
                                            <img
                                                src={image}
                                                alt={`Uploaded ${index + 1}`}
                                                onClick={() => openModal(index)}
                                                className={`w-full h-full object-cover cursor-pointer hover:opacity-90 duration-300`}
                                            />
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeImage(index);
                                                }}
                                                className={`absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 duration-300`}
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={`w-full max-w-[850px] flex flex-col items-start my-6 gap-3`}>

                        <div className={`w-full flex flex-col items-start gap-1`}>
                            <span className={`max-[770px]:text-lg min-[770px]:text-xl font-bold text-black dark:text-white`}>{t("add.adTitle")}</span>
                            <input className={`w-full h-[50px] border border-[#E0E0E0] dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-[#999999] dark:focus:border-[#C505EB] duration-300 outline-0 rounded-xl px-4 py-1 text-[14px]`} placeholder={t("add.adTitlePlaceholder")}/>
                        </div>

                        <div className={`w-full flex flex-col items-start gap-1`}>
                            <span className={`max-[770px]:text-lg min-[770px]:text-xl font-bold text-black dark:text-white`}>{t("add.description")}</span>
                            <textarea className={`w-full h-[220px] border border-[#E0E0E0] dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-[#999999] dark:focus:border-[#C505EB] duration-300 outline-0 rounded-xl px-4 py-1 text-[14px] resize-none`} placeholder={t("add.descriptionPlaceholder")}/>
                        </div>

                        <div className={`w-full flex max-[770px]:flex-col items-center justify-between gap-4`}>
                            <div className={`w-full flex flex-col items-start gap-1`}>
                                <span className={`max-[770px]:text-lg min-[770px]:text-xl font-bold text-black dark:text-white`}>{t("add.layout")}</span>
                                <input className={`w-full h-[50px] border border-[#E0E0E0] dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-[#999999] dark:focus:border-[#C505EB] duration-300 outline-0 rounded-xl px-4 py-1 text-[14px]`} placeholder={t("add.layoutPlaceholder")}/>
                            </div>
                            <div className={`w-full flex flex-col items-start gap-1`}>
                                <span className={`max-[770px]:text-lg min-[770px]:text-xl font-bold text-black dark:text-white`}>{t("add.beds")}</span>
                                <input className={`w-full h-[50px] border border-[#E0E0E0] dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-[#999999] dark:focus:border-[#C505EB] duration-300 outline-0 rounded-xl px-4 py-1 text-[14px]`} placeholder={t("add.bedsPlaceholder")}/>
                            </div>
                            <div className={`w-full flex flex-col items-start gap-1`}>
                                <span className={`max-[770px]:text-lg min-[770px]:text-xl font-bold text-black dark:text-white`}>{t("add.price")}</span>
                                <input className={`w-full h-[50px] border border-[#E0E0E0] dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-[#999999] dark:focus:border-[#C505EB] duration-300 outline-0 rounded-xl px-4 py-1 text-[14px]`} placeholder={t("add.pricePlaceholder")}/>
                            </div>
                        </div>

                        <div className={`mt-12 max-[770px]:mt-4 w-full h-11 flex items-center justify-center rounded-full text-white text-xl font-semibold bg-[#C505EB]`}>
                            <span>{t("add.publish")}</span>
                        </div>

                    </div>

                </div>

            </div>

            {/* Модальное окно для полноэкранного просмотра */}
            {isModalOpen && uploadedImages.length > 0 && (
                <div 
                    className={`fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center animate-in fade-in duration-300`}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setIsModalOpen(false);
                        }
                    }}
                >
                    {/* Кнопка закрытия */}
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className={`absolute top-4 right-4 z-[10000] bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-300`}
                        aria-label="Close"
                    >
                        <X size={32} color="#ffffff" />
                    </button>

                    {/* Контейнер изображения */}
                    <div 
                        className={`relative w-full h-full flex items-center justify-center p-4`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Главное изображение в модальном окне */}
                        <div className={`relative w-full max-w-7xl h-full max-h-[90vh] flex items-center justify-center overflow-hidden`}>
                            {uploadedImages.map((img, index) => (
                                <div 
                                    key={index}
                                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out`}
                                    style={{ 
                                        opacity: index === currentImageIndex ? 1 : 0,
                                        pointerEvents: index === currentImageIndex ? 'auto' : 'none',
                                        zIndex: index === currentImageIndex ? 1 : 0
                                    }}
                                >
                                    <img 
                                        src={img} 
                                        alt={`Uploaded ${index + 1}`}
                                        className={`max-w-full max-h-full object-contain select-none pointer-events-none`}
                                        draggable={false}
                                    />
                                </div>
                            ))}

                            {/* Кнопки навигации в модальном окне */}
                            {uploadedImages.length > 1 && (
                                <>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            prevImage();
                                        }}
                                        disabled={isTransitioning}
                                        className={`absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed z-10 transition-all duration-300`}
                                        aria-label="Previous image"
                                    >
                                        <ChevronLeft size={32} color="#ffffff" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            nextImage();
                                        }}
                                        disabled={isTransitioning}
                                        className={`absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed z-10 transition-all duration-300`}
                                        aria-label="Next image"
                                    >
                                        <ChevronRight size={32} color="#ffffff" />
                                    </button>
                                </>
                            )}

                            {/* Индикатор в модальном окне */}
                            {uploadedImages.length > 1 && (
                                <div className={`absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/50 rounded-full px-6 py-3`}>
                                    <span className={`text-white text-lg font-semibold`}>
                                        {currentImageIndex + 1} / {uploadedImages.length}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Превью в модальном окне */}
                    {uploadedImages.length > 1 && (
                        <div 
                            className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-3 bg-black/50 rounded-2xl backdrop-blur-sm max-w-[90vw] overflow-x-auto scroll-smooth z-[10001]`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {uploadedImages.map((img, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        if (!isTransitioning && index !== currentImageIndex) {
                                            setIsTransitioning(true);
                                            setCurrentImageIndex(index);
                                            setTimeout(() => setIsTransitioning(false), 300);
                                        }
                                    }}
                                    disabled={isTransitioning || index === currentImageIndex}
                                    className={`flex-shrink-0 w-[80px] h-[60px] max-[770px]:w-[70px] max-[770px]:h-[52px] rounded-lg overflow-hidden border-2 transition-all duration-300 ease-in-out ${
                                        currentImageIndex === index 
                                            ? 'border-white scale-110 shadow-lg' 
                                            : 'border-white/30 hover:border-white/60 hover:scale-105'
                                    } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                    <img 
                                        src={img} 
                                        alt={`Preview ${index + 1}`}
                                        className={`w-full h-full object-cover transition-opacity duration-300 select-none pointer-events-none`}
                                        draggable={false}
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

        </div>
    );

}
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  OrnamentalDivider,
  CardCornerMotif,
  DiyaMotif,
  MarigoldMotif,
  KalashMotif,
} from "./Motifs";
import {
  Download,
  Upload,
  Lock,
  Unlock,
  Trash2,
  Image as ImageIcon,
  Eye,
  X,
  Plus,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import {
  GalleryImage,
  getAllGalleryImages,
  saveGalleryImage,
  deleteGalleryImage,
  downloadImage,
} from "@/utils/galleryStorage";

// High quality starter images including authentic Bride & Groom portraits
const DEFAULT_CEREMONY_IMAGES: GalleryImage[] = [
  {
    id: "couple-groom",
    name: "आयुष्मान् राम उदय सिंह (वर)",
    dataUrl: "/images/groom.jpg",
    uploadedAt: "2026-11-22",
    category: "couple",
    isDefault: true,
  },
  {
    id: "couple-bride",
    name: "आयुष्मती कुमारी ज्योती (वधू)",
    dataUrl: "/images/bride.jpg",
    uploadedAt: "2026-11-22",
    category: "couple",
    isDefault: true,
  },
  {
    id: "default-1",
    name: "पावन सप्तपदी एवं अग्नि फेरे",
    dataUrl:
      "data:image/svg+xml;utf8," +
      encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#410718"/>
            <stop offset="50%" stop-color="#8a1c3c"/>
            <stop offset="100%" stop-color="#26131c"/>
          </linearGradient>
          <radialGradient id="fire" cx="50%" cy="60%" r="40%">
            <stop offset="0%" stop-color="#ffe699"/>
            <stop offset="30%" stop-color="#ff9933"/>
            <stop offset="70%" stop-color="#cc3300"/>
            <stop offset="100%" stop-color="transparent"/>
          </radialGradient>
        </defs>
        <rect width="800" height="600" fill="url(#bg)"/>
        <circle cx="400" cy="360" r="180" fill="url(#fire)" opacity="0.6"/>
        <rect x="80" y="80" width="30" height="460" fill="#c8962b" rx="6"/>
        <rect x="690" y="80" width="30" height="460" fill="#c8962b" rx="6"/>
        <path d="M60 80 Q400 30 740 80 L740 110 Q400 60 60 110 Z" fill="#e8741a"/>
        <polygon points="300,450 500,450 460,530 340,530" fill="#c8962b"/>
        <polygon points="320,450 480,450 450,510 350,510" fill="#903614"/>
        <path d="M400 300 Q370 380 400 440 Q430 380 400 300 Z" fill="#ffcc00"/>
        <path d="M400 340 Q385 390 400 440 Q415 390 400 340 Z" fill="#ffffff"/>
        <text x="400" y="240" fill="#ffeaa7" font-size="34" font-family="serif" text-anchor="middle" font-weight="bold">पावन सप्तपदी एवं अग्नि फेरे</text>
        <text x="400" y="280" fill="#f8c291" font-size="20" font-family="sans-serif" text-anchor="middle">उदय संग ज्योती • शुभ विवाह</text>
      </svg>
    `),
    uploadedAt: "2026-11-22",
    category: "ceremony",
    isDefault: true,
  },
  {
    id: "default-2",
    name: "हल्दी कलश एवं मेहंदी का उल्लास",
    dataUrl:
      "data:image/svg+xml;utf8," +
      encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
        <defs>
          <linearGradient id="haldi-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#903614"/>
            <stop offset="50%" stop-color="#e8741a"/>
            <stop offset="100%" stop-color="#c8962b"/>
          </linearGradient>
        </defs>
        <rect width="800" height="600" fill="url(#haldi-bg)"/>
        <circle cx="400" cy="300" r="160" fill="#fffdfa" opacity="0.15"/>
        <circle cx="400" cy="300" r="110" fill="#fffdfa" opacity="0.2"/>
        <text x="400" y="290" fill="#fffdfa" font-size="36" font-family="serif" text-anchor="middle" font-weight="bold">हल्दी कलश एवं सुहाग मेहंदी</text>
        <text x="400" y="340" fill="#ffeaa7" font-size="22" font-family="sans-serif" text-anchor="middle">मांगलिक गीत-संगीत एवं सखियों का स्नेह</text>
        <circle cx="200" cy="120" r="28" fill="#ff9933"/>
        <circle cx="270" cy="100" r="28" fill="#c8962b"/>
        <circle cx="340" cy="90" r="28" fill="#ff9933"/>
        <circle cx="410" cy="90" r="28" fill="#c8962b"/>
        <circle cx="480" cy="90" r="28" fill="#ff9933"/>
        <circle cx="550" cy="100" r="28" fill="#c8962b"/>
        <circle cx="620" cy="120" r="28" fill="#ff9933"/>
      </svg>
    `),
    uploadedAt: "2026-11-21",
    category: "ceremony",
    isDefault: true,
  },
  {
    id: "default-3",
    name: "मांगलिक वाद्य एवं बारात प्रस्थान",
    dataUrl:
      "data:image/svg+xml;utf8," +
      encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
        <defs>
          <linearGradient id="shehnai-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#042f2e"/>
            <stop offset="60%" stop-color="#0f766e"/>
            <stop offset="100%" stop-color="#8a1c3c"/>
          </linearGradient>
        </defs>
        <rect width="800" height="600" fill="url(#shehnai-bg)"/>
        <text x="400" y="270" fill="#fefaf2" font-size="36" font-family="serif" text-anchor="middle" font-weight="bold">मांगलिक वाद्य एवं बारात प्रस्थान</text>
        <text x="400" y="320" fill="#5eead4" font-size="22" font-family="sans-serif" text-anchor="middle">छड़ापट्टी से सिकरीयाही के लिए प्रस्थान</text>
        <polygon points="320,400 480,400 450,460 350,460" fill="#c8962b"/>
      </svg>
    `),
    uploadedAt: "2026-11-22",
    category: "ceremony",
    isDefault: true,
  },
  {
    id: "default-4",
    name: "शुभ तिलक एवं प्रीतिभोज उत्सव",
    dataUrl:
      "data:image/svg+xml;utf8," +
      encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
        <defs>
          <linearGradient id="tilak-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#73481e"/>
            <stop offset="50%" stop-color="#c8962b"/>
            <stop offset="100%" stop-color="#8a1c3c"/>
          </linearGradient>
        </defs>
        <rect width="800" height="600" fill="url(#tilak-bg)"/>
        <text x="400" y="280" fill="#ffffff" font-size="36" font-family="serif" text-anchor="middle" font-weight="bold">शुभ तिलक एवं प्रीतिभोज</text>
        <text x="400" y="330" fill="#ffeaa7" font-size="22" font-family="sans-serif" text-anchor="middle">पारिवारिक मिलन एवं स्नेहिल आशीर्वाद</text>
      </svg>
    `),
    uploadedAt: "2026-11-20",
    category: "family",
    isDefault: true,
  },
];

export const Gallery: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>(DEFAULT_CEREMONY_IMAGES);
  const [filter, setFilter] = useState<string>("all");
  const [activeLightbox, setActiveLightbox] = useState<GalleryImage | null>(null);

  // Admin Mode States
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [showAdminLoginModal, setShowAdminLoginModal] = useState<boolean>(false);
  const [adminPin, setAdminPin] = useState<string>("");
  const [adminLoginError, setAdminLoginError] = useState<string>("");

  // Upload States
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [uploadName, setUploadName] = useState<string>("");
  const [uploadCategory, setUploadCategory] = useState<"all" | "ceremony" | "family" | "couple">("ceremony");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load from IndexedDB on mount
  useEffect(() => {
    async function loadStoredPhotos() {
      try {
        const stored = await getAllGalleryImages();
        if (stored && stored.length > 0) {
          // Merge custom uploaded images with defaults
          setImages([...stored, ...DEFAULT_CEREMONY_IMAGES]);
        } else {
          setImages(DEFAULT_CEREMONY_IMAGES);
        }
      } catch {
        setImages(DEFAULT_CEREMONY_IMAGES);
      }
    }
    loadStoredPhotos();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPin.trim() === "2026" || adminPin.trim() === "admin") {
      setIsAdmin(true);
      setShowAdminLoginModal(false);
      setAdminPin("");
      setAdminLoginError("");
      showToast("व्यवस्थापक (Admin) मोड सक्रिय हो गया है!");
    } else {
      setAdminLoginError("अमान्य पिन (PIN)। कृपया सही पिन '2026' दर्ज करें।");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (!uploadName) {
        setUploadName(file.name.replace(/\.[^/.]+$/, ""));
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setUploadPreview(ev.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadPreview) {
      alert("कृपया कोई तस्वीर चुनें।");
      return;
    }

    setIsUploading(true);
    try {
      const newImage: GalleryImage = {
        id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        name: uploadName.trim() || "विवाह स्मृति",
        dataUrl: uploadPreview,
        uploadedAt: new Date().toISOString().split("T")[0],
        category: uploadCategory,
        isDefault: false,
      };

      await saveGalleryImage(newImage);
      setImages((prev) => [newImage, ...prev]);
      setShowUploadModal(false);
      setUploadName("");
      setSelectedFile(null);
      setUploadPreview("");
      showToast("तस्वीर सफलतापूर्वक अपलोड हो गई!");
    } catch {
      alert("तस्वीर सहेजने में त्रुटि हुई। कृपया पुनः प्रयास करें।");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`क्या आप "${name}" को हटाना चाहते हैं?`)) return;
    try {
      await deleteGalleryImage(id);
      setImages((prev) => prev.filter((img) => img.id !== id));
      if (activeLightbox?.id === id) setActiveLightbox(null);
      showToast("तस्वीर हटा दी गई है।");
    } catch {
      alert("तस्वीर हटाने में त्रुटि हुई।");
    }
  };

  const filteredImages = images.filter((img) => {
    if (filter === "all") return true;
    return img.category === filter;
  });

  return (
    <section
      id="gallery"
      className="py-16 sm:py-24 px-4 bg-cream-100 dark:bg-darkbg-900 transition-colors"
    >
      <div className="max-w-6xl mx-auto">
        <OrnamentalDivider title="शुभ स्मृतियाँ (फोटो गैलरी)" icon="marigold" className="mb-4" />

        <p className="text-center text-sm sm:text-base text-maroon-800/80 dark:text-gold-300/80 max-w-xl mx-auto mb-8 font-medium">
          विवाह उत्सव की पावन स्मृतियाँ देखें, डाउनलोड करें अथवा व्यवस्थापक द्वारा नई तस्वीरें जोड़ें
        </p>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="max-w-md mx-auto mb-6 p-3 rounded-xl bg-teal-600 text-white text-center text-sm font-semibold shadow-lg flex items-center justify-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Controls Bar: Filters & Admin Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-3 sm:p-4 rounded-2xl bg-cream-50/80 dark:bg-darkbg-850/80 border border-gold-400/30 shadow-sm">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "सभी तस्वीरें" },
              { id: "couple", label: "वर-वधू" },
              { id: "ceremony", label: "मांगलिक रस्में" },
              { id: "family", label: "पारिवारिक" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  filter === tab.id
                    ? "bg-maroon-800 text-gold-300 shadow-md border border-gold-500"
                    : "bg-cream-100 dark:bg-darkbg-900 text-maroon-900 dark:text-cream-200 border border-gold-400/20 hover:border-gold-500"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Admin Mode Controls */}
          <div className="flex items-center gap-2">
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Admin Mode
                </span>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-saffron-500 hover:bg-saffron-600 text-white shadow-md transition-all hover:scale-105"
                  aria-label="नई तस्वीर अपलोड करें"
                >
                  <Plus className="w-4 h-4" />
                  <span>अपलोड करें</span>
                </button>
                <button
                  onClick={() => {
                    setIsAdmin(false);
                    showToast("व्यवस्थापक मोड से बाहर निकले।");
                  }}
                  className="p-1.5 rounded-xl text-xs font-medium text-maroon-700 dark:text-gold-400 hover:bg-gold-500/10 border border-gold-400/30"
                  title="लॉगआउट"
                >
                  <Unlock className="w-4 h-4 text-teal-600" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAdminLoginModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium bg-cream-100 dark:bg-darkbg-900 text-maroon-800 dark:text-gold-300 border border-gold-400/40 hover:border-gold-500 hover:bg-gold-500/10 transition-all shadow-sm"
                aria-label="व्यवस्थापक लॉगिन"
              >
                <Lock className="w-3.5 h-3.5 text-gold-500" />
                <span>Admin Upload</span>
              </button>
            )}
          </div>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group relative rounded-3xl overflow-hidden bg-cream-50 dark:bg-darkbg-850 border border-gold-400/40 hover:border-gold-500 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Preview Container */}
              <div
                onClick={() => setActiveLightbox(image)}
                className="relative aspect-[4/3] w-full overflow-hidden cursor-pointer bg-maroon-950/20"
              >
                <img
                  src={image.dataUrl}
                  alt={image.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Hover overlay with Eye icon */}
                <div className="absolute inset-0 bg-maroon-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <span className="p-2.5 rounded-full bg-cream-50/90 text-maroon-900 shadow-lg hover:scale-110 transition-transform">
                    <Eye className="w-5 h-5 text-maroon-800" />
                  </span>
                </div>

                {/* Admin delete */}
                {isAdmin && !image.isDefault && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(image.id, image.name);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 transition-colors z-10"
                    title="तस्वीर हटाएं"
                    aria-label="तस्वीर हटाएं"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Card Footer with Title and Download Button */}
              <div className="p-4 flex items-center justify-between gap-2 border-t border-gold-400/20">
                <div className="min-w-0">
                  <h4 className="font-heading font-bold text-sm sm:text-base text-maroon-900 dark:text-gold-200 truncate">
                    {image.name}
                  </h4>
                  <span className="text-[11px] text-maroon-700/70 dark:text-cream-400 block">
                    {image.uploadedAt}
                  </span>
                </div>

                {/* User Download Button */}
                <button
                  onClick={() => downloadImage(image.dataUrl, `${image.name}.jpg`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-maroon-800 hover:bg-maroon-700 text-gold-300 hover:text-white border border-gold-500 shadow-sm transition-all flex-shrink-0"
                  aria-label={`${image.name} डाउनलोड करें`}
                  title="तस्वीर डाउनलोड करें"
                >
                  <Download className="w-3.5 h-3.5 text-gold-400" />
                  <span className="hidden xs:inline">डाउनलोड</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-16 text-maroon-800/70 dark:text-gold-400">
            <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>इस श्रेणी में अभी कोई तस्वीर उपलब्ध नहीं है।</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] bg-darkbg-900 border border-gold-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-gold-500/30 flex items-center justify-between text-gold-300">
              <h3 className="font-heading font-bold text-lg">{activeLightbox.name}</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => downloadImage(activeLightbox.dataUrl, `${activeLightbox.name}.jpg`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-saffron-500 text-white text-xs font-bold shadow hover:bg-saffron-600 transition-all"
                  aria-label="तस्वीर डाउनलोड करें"
                >
                  <Download className="w-4 h-4" />
                  <span>डाउनलोड करें</span>
                </button>
                <button
                  onClick={() => setActiveLightbox(null)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
                  aria-label="बंद करें"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Body */}
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center">
              <img
                src={activeLightbox.dataUrl}
                alt={activeLightbox.name}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}

      {/* Admin Login Modal */}
      {showAdminLoginModal && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowAdminLoginModal(false)}
        >
          <div
            className="relative max-w-md w-full bg-cream-50 dark:bg-darkbg-850 border-2 border-gold-400 rounded-3xl p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gold-400/30">
              <div className="flex items-center gap-2 text-maroon-800 dark:text-gold-300 font-heading font-bold text-lg">
                <Lock className="w-5 h-5 text-saffron-500" />
                <span>व्यवस्थापक (Admin) प्रमाणीकरण</span>
              </div>
              <button
                onClick={() => setShowAdminLoginModal(false)}
                className="p-1 text-maroon-700 dark:text-gold-300 hover:text-maroon-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-maroon-900/80 dark:text-cream-200 mb-4">
              गैलरी में नई तस्वीरें अपलोड करने हेतु कृपया व्यवस्थापक पिन (PIN) दर्ज करें।
              <br />
              <span className="text-saffron-600 dark:text-gold-400 font-semibold">
                (संकेत: विवाह वर्ष 2026)
              </span>
            </p>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-maroon-800 dark:text-gold-300 mb-1">
                  व्यवस्थापक पिन (PIN):
                </label>
                <input
                  type="password"
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  placeholder="उदा० 2026"
                  required
                  autoFocus
                  className="w-full px-4 py-2.5 rounded-xl border border-gold-400/50 bg-cream-100 dark:bg-darkbg-900 text-maroon-900 dark:text-cream-100 text-center text-lg font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>

              {adminLoginError && (
                <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {adminLoginError}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-maroon-800 hover:bg-maroon-700 text-gold-300 font-bold text-sm shadow-md transition-all border border-gold-500"
              >
                लॉगिन करें (Admin Access)
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Image Upload Modal */}
      {showUploadModal && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowUploadModal(false)}
        >
          <div
            className="relative max-w-lg w-full bg-cream-50 dark:bg-darkbg-850 border-2 border-gold-400 rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gold-400/30">
              <div className="flex items-center gap-2 text-maroon-800 dark:text-gold-300 font-heading font-bold text-lg">
                <Upload className="w-5 h-5 text-saffron-500" />
                <span>नई तस्वीर अपलोड करें</span>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1 text-maroon-700 dark:text-gold-300 hover:text-maroon-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              {/* File input */}
              <div>
                <label className="block text-xs font-bold text-maroon-800 dark:text-gold-300 mb-1">
                  तस्वीर चुनें (JPEG, PNG, WebP):
                </label>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  required
                  className="w-full text-xs text-maroon-900 dark:text-cream-200 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-saffron-500 file:text-white hover:file:bg-saffron-600 cursor-pointer"
                />
              </div>

              {/* Preview */}
              {uploadPreview && (
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-gold-400/50 bg-black/10">
                  <img
                    src={uploadPreview}
                    alt="Upload Preview"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              {/* Title input */}
              <div>
                <label className="block text-xs font-bold text-maroon-800 dark:text-gold-300 mb-1">
                  शीर्षक / विवरण (Title):
                </label>
                <input
                  type="text"
                  value={uploadName}
                  onChange={(e) => setUploadName(e.target.value)}
                  placeholder="उदा० शुभ जयमाला, हल्दी उत्सव"
                  required
                  className="w-full px-4 py-2 rounded-xl border border-gold-400/50 bg-cream-100 dark:bg-darkbg-900 text-maroon-900 dark:text-cream-100 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-maroon-800 dark:text-gold-300 mb-1">
                  श्रेणी (Category):
                </label>
                <select
                  value={uploadCategory}
                  onChange={(e) =>
                    setUploadCategory(e.target.value as "all" | "ceremony" | "family" | "couple")
                  }
                  className="w-full px-4 py-2 rounded-xl border border-gold-400/50 bg-cream-100 dark:bg-darkbg-900 text-maroon-900 dark:text-cream-100 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                >
                  <option value="couple">वर-वधू (Couple)</option>
                  <option value="ceremony">मांगलिक रस्में (Ceremony)</option>
                  <option value="family">पारिवारिक (Family)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isUploading}
                className="w-full py-2.5 rounded-xl bg-saffron-500 hover:bg-saffron-600 disabled:opacity-50 text-white font-bold text-sm shadow-md transition-all"
              >
                {isUploading ? "अपलोड हो रहा है..." : "गैलरी में सहेजें"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

'use client';

import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { useLanguage } from '@/context/language-context';
import React, { useState } from "react";

export default function Footer() {
  const { language, setLanguage, t } = useLanguage();
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'mk', name: 'Македонски', flag: '🇲🇰' },
    { code: 'al', name: 'Shqip', flag: '🇦🇱' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <footer className="bg-gray-100 py-16 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/images/logo.png"
                alt="VibeStrings Logo"
                width={200}
                height={200}
              />
            </div>
            <p className="text-gray-600">{t('footer.contact.email')}</p>
            <p className="text-gray-600">{t('footer.contact.location')}</p>
          </div>

          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">{t('footer.pages')}</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/">{t('footer.pages.brands')}</Link></li>
              <li><Link href="/">{t('footer.pages.about')}</Link></li>
              <li><Link href="/">{t('footer.pages.collections')}</Link></li>
              <li><Link href="/">{t('footer.pages.support')}</Link></li>
            </ul>
          </div>

          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">{t('footer.product')}</h3>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/">{t('footer.product.terms')}</Link></li>
              <li><Link href="/">{t('footer.product.shipping')}</Link></li>
              <li><Link href="/">{t('footer.product.privacy')}</Link></li>
              <li><Link href="/">{t('footer.product.copyright')}</Link></li>
            </ul>
          </div>

         
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">{t('footer.follow')}</h3>
            <div className="flex space-x-4">
              
              <div className="w-8 h-8 bg-black/60 rounded-[24px] flex items-center justify-center">
                <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                  <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2v-3h2v-2c0-2 1.2-3 3-3h2v3h-1.3c-1 0-1.2.5-1.2 1.1v1.9h2.6l-.4 3h-2.2v7A10 10 0 0 0 22 12z" />
                </svg>
              </div>

              
              <div className="w-8 h-8 bg-black/60 rounded-[24px] flex items-center justify-center">
                <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43.36a9.12 9.12 0 0 1-2.83 1.08A4.52 4.52 0 0 0 16.61 0c-2.5 0-4.5 2.17-4.5 4.84 0 .38.03.75.1 1.1C8.1 5.78 5.2 3.83 3.16 1a4.92 4.92 0 0 0-.6 2.43 4.84 4.84 0 0 0 2 4.06A4.49 4.49 0 0 1 2 6.13v.05c0 2.3 1.6 4.21 3.7 4.65a4.6 4.6 0 0 1-1.17.16c-.28 0-.57-.03-.84-.07a4.52 4.52 0 0 0 4.21 3.18A9.1 9.1 0 0 1 1 19.54 12.8 12.8 0 0 0 7.29 21c8.3 0 12.85-7.25 12.85-13.55v-.62A9.36 9.36 0 0 0 23 3z" />
                </svg>
              </div>

              
              <div className="w-8 h-8 bg-black/60 rounded-[24px] flex items-center justify-center">
                <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                  <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zm5 3a5 5 0 1 0 .001 10.001A5 5 0 0 0 12 7zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.5-3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                </svg>
              </div>
            </div>
          </div>

          
          <div className="relative">
            <h4 className="font-semibold text-gray-900 mb-2">{t('footer.language')}</h4>
            <div 
              className="relative cursor-pointer"
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            >
              <div className="flex items-center justify-between bg-white border border-gray-300 rounded-md px-3 py-2 min-w-[140px]">
                <div className="flex items-center space-x-2">
                  <span>{currentLanguage?.flag}</span>
                  <span className="text-sm text-gray-700">{currentLanguage?.name}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
              </div>

              
              {isLanguageDropdownOpen && (
                <div className="absolute bottom-full left-0 w-full mb-1 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                  {languages.map((lang) => (
                    <div
                      key={lang.code}
                      onClick={(e) => {
                        e.stopPropagation();
                        setLanguage(lang.code as 'en' | 'mk' | 'al');
                        setIsLanguageDropdownOpen(false);
                      }}
                      className={`flex items-center space-x-2 px-3 py-2 hover:bg-gray-50 cursor-pointer ${
                        language === lang.code ? 'bg-orange-50 text-orange-500' : 'text-gray-700'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span className="text-sm">{lang.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-gray-500">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'mk' | 'al';

type TranslationKey = keyof typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Home Page
    'home.hero.title': 'Browse top quality <orange>Guitars</orange> online',
    'home.hero.subtitle': 'Explore 500+ latest collections of branded guitars online with VibeStrings.',
    'home.brands.title': 'Featuring the <orange>Best Brands</orange>',
    'home.brands.subtitle': 'Select your preferred brand and explore our exquisite collection.',
    'home.why.title': 'Why try <orange>VibeStrings</orange>?',
    'home.why.browsing.title': 'SMOOTH BROWSING',
    'home.why.browsing.desc': 'Lorem ipsum Dolor sit amet consectetur adipisicing elit.',
    'home.why.delivery.title': 'EASY DELIVERY',
    'home.why.delivery.desc': 'Lorem ipsum Dolor sit amet consectetur adipisicing elit.',
    'home.why.payments.title': 'SWIFT PAYMENTS',
    'home.why.payments.desc': 'Lorem ipsum Dolor sit amet consectetur adipisicing elit.',
    'home.bottom.title': 'Browse and buy your <orange>favorite guitars</orange> with VibeStrings.',
    
    // Brand Models Page
    'brand.back': 'Back To List',
    'brand.hero.title': 'Play like a <orange>Rockstar</orange>',
    'brand.hero.subtitle': 'With a legacy dating back to the 1950s, {brandName} blends expert craftsmanship with cutting-edge innovation to deliver guitars that inspire creativity and elevate your performance. Trusted by top artists worldwide, these guitars are built to play fast, sound bold, and stand out on any stage.',
    'brand.selection.title': 'Check out the <orange>Selection</orange>',
    'brand.filter.type': 'Filter by type',
    'brand.search.placeholder': 'Search by name',
    'brand.loading': 'Loading more guitars...',
    'brand.results': 'SHOWING {displayed} RESULTS FROM {total}',
    'brand.end.message': "You've reached the end of the collection!",
    
    // Model Details Page
    'model.back': 'Back To List',
    'model.tabs.specs': 'Specification',
    'model.tabs.musicians': 'Who plays it?',
    'model.specs.description': 'The {modelName} is a modern take on the classic guitar design, featuring a sleek body shape and a comfortable neck profile for easy playability. It is equipped with dual active pickups that deliver a powerful and versatile tone, perfect for any genre from rock to funk. The onboard EQ allows players to shape their sound with precision, while the high-quality hardware ensures reliability on stage. With its striking finish options and attention to detail, the {modelName} is designed for both performance and style.',
    'model.specs.body': 'Body Wood',
    'model.specs.neck': 'Neck Wood',
    'model.specs.fingerboard': 'Fingerboard',
    'model.specs.pickups': 'Pickups',
    'model.specs.tuners': 'Tuners',
    'model.specs.scale': 'Scale Length',
    'model.specs.bridge': 'Bridge',
    'model.musicians.none': 'No musicians found for this guitar.',
    'model.musicians.noimage': 'No Image',
    
    // Footer
    'footer.pages': 'PAGES',
    'footer.pages.store': 'Store',
    'footer.pages.brands': 'Brands',
    'footer.pages.about': 'About Us',
    'footer.pages.collections': 'Collections',
    'footer.pages.support': 'Support',
    'footer.product': 'PRODUCT',
    'footer.product.terms': 'Terms',
    'footer.product.privacy': 'Privacy Policy',
    'footer.product.copyright': 'Copyright',
    'footer.product.shipping': 'Shipping Policy',
    'footer.contact.email': 'Email Us',
    'footer.contact.location': 'Our Location',
    'footer.follow': 'FOLLOW US',
    'footer.copyright': '© 2025 Copyright.VibeStrings',
    'footer.language': 'Language',
    
    // Common
    'loading': 'Loading...',
    'error': 'Error',
    'model.not.found': 'Model not found',
  },
  mk: {
    // Home Page
    'home.hero.title': 'Прелистувај висококвалитетни <orange>гитари</orange> онлајн',
    'home.hero.subtitle': 'Истражи 500+ најнови колекции на брендирани гитари онлајн со VibeStrings.',
    'home.brands.title': 'Ги претставуваме <orange>најдобрите брендови</orange>',
    'home.brands.subtitle': 'Избери го твојот омилен бренд и истражи ја нашата изискана колекција.',
    'home.why.title': 'Зошто да пробаш <orange>VibeStrings</orange>?',
    'home.why.browsing.title': 'ЛЕСНО ПРЕЛИСТУВАЊЕ',
    'home.why.browsing.desc': 'Lorem ipsum Dolor sit amet consectetur adipisicing elit.',
    'home.why.delivery.title': 'ЛЕСНА ДОСТАВА',
    'home.why.delivery.desc': 'Lorem ipsum Dolor sit amet consectetur adipisicing elit.',
    'home.why.payments.title': 'БРЗИ ПЛАЌАЊА',
    'home.why.payments.desc': 'Lorem ipsum Dolor sit amet consectetur adipisicing elit.',
    'home.bottom.title': 'Прелистувај и купувај ги твоите <orange>омилени гитари</orange> со VibeStrings.',
    
    // Brand Models Page
    'brand.back': 'Назад кон листа',
    'brand.hero.title': 'Свири како <orange>рокѕвезда</orange>',
    'brand.hero.subtitle': 'Со наследство што датира од 1950-тите, {brandName} ги комбинира експертската изработка со најсовремените иновации за да достави гитари што ја инспирираат креативноста и ја подигаат вашата изведба. Доверливи од врвни артисти ширум светот, овие гитари се изградени да свират брзо, да звучат смело и да се истакнат на секоја сцена.',
    'brand.selection.title': 'Погледни го <orange>изборот</orange>',
    'brand.filter.type': 'Филтрирај по тип',
    'brand.search.placeholder': 'Пребарај по име',
    'brand.loading': 'Се вчитуваат повеќе гитари...',
    'brand.results': 'ПРИКАЖАНИ {displayed} РЕЗУЛТАТИ ОД {total}',
    'brand.end.message': 'Стигна до крајот на колекцијата!',
    
    // Model Details Page
    'model.back': 'Назад кон листа',
    'model.tabs.specs': 'Спецификација',
    'model.tabs.musicians': 'Кој ја свири?',
    'model.specs.description': '{modelName} е модерен пристап кон класичниот дизајн на гитара, со елегантна форма на телото и удобен профил на вратот за лесно свирење. Опремена е со двојни активни пикапи што даваат моќен и разновиден тон, совршен за секој жанр од рок до фанк. Вградениот EQ им овозможува на свирачите да го обликуваат својот звук со прецизност, додека висококвалитетниот хардвер обезбедува доверливост на сцената. Со своите впечатливи опции за завршување и внимание кон деталите, {modelName} е дизајнирана за изведба и стил.',
    'model.specs.body': 'Дрво за тело',
    'model.specs.neck': 'Дрво за врат',
    'model.specs.fingerboard': 'Табла за прсти',
    'model.specs.pickups': 'Пикапи',
    'model.specs.tuners': 'Штимери',
    'model.specs.scale': 'Должина на скала',
    'model.specs.bridge': 'Мост',
    'model.musicians.none': 'Не се пронајдени музичари за оваа гитара.',
    'model.musicians.noimage': 'Нема слика',
    
    // Footer
    'footer.pages': 'СТРАНИЦИ',
    'footer.pages.store': 'Продавница',
    'footer.pages.collections': 'Колекции',
    'footer.pages.support': 'Поддршка',
    'footer.product': 'ПРОИЗВОД',
    'footer.product.terms': 'Услови',
    'footer.product.privacy': 'Политика за приватност',
    'footer.product.copyright': 'Авторски права',
    'footer.follow': 'СЛЕДИ НЕ',
    'footer.copyright': '© 2025 Авторски права.VibeStrings',
    'footer.language': 'Јазик',
    'footer.pages.brands': 'Бренди',
    'footer.pages.about': 'За нас',
    'footer.product.shipping': 'Достава',
    'footer.contact.email': 'Емаил',
    'footer.contact.location': 'Наша локација',

    
    // Common
    'loading': 'Се вчитува...',
    'error': 'Грешка',
    'model.not.found': 'Моделот не е пронајден',
  },
  al: {
    // Home Page
    'home.hero.title': 'Shfleto <orange>kitara</orange> cilësore online',
    'home.hero.subtitle': 'Eksploro 500+ koleksione të fundit të kitarave në VibeStrings.',
    'home.brands.title': 'Prezentojmë <orange>markat më të mira</orange>',
    'home.brands.subtitle': 'Zgjidh markën tënde të preferuar dhe eksploro koleksionin e tyre në VibeStrings.',
    'home.why.title': 'Pse të provosh <orange>VibeStrings</orange>?',
    'home.why.browsing.title': 'SHFLETIM MË I LEHTË',
    'home.why.browsing.desc': 'Lorem ipsum Dolor sit amet consectetur adipisicing elit.',
    'home.why.delivery.title': 'KARGO E LEHTË',
    'home.why.delivery.desc': 'Lorem ipsum Dolor sit amet consectetur adipisicing elit.',
    'home.why.payments.title': 'PAGESA TË SHPEJTA',
    'home.why.payments.desc': 'Lorem ipsum Dolor sit amet consectetur adipisicing elit.',
    'home.bottom.title': 'Shfleto dhe bli <orange>kitarat e tua të preferuara</orange> me VibeStrings.',
    
    // Brand Models Page
    'brand.back': 'Mbrapa',
    'brand.hero.title': 'Luaj si një <orange>yll rroku</orange>',
    'brand.hero.subtitle': 'Me një trashëgimi që daton nga vitet 1950, {brandName} kombinon mjeshtërinë eksperte me inovacionin më të fundit për të ofruar kitara që frymëzojnë kreativitetin dhe ngritin performancën tuaj. E besuar nga artistë të nivelit të lartë në mbarë botën, kitarat e tyre janë ndërtuar për të luajtur shpejt, për të tingëlluar guximshëm dhe për të dalë në pah në çdo skenë.',
    'brand.selection.title': 'Shfleto <orange>përzgjedhjen</orange>',
    'brand.filter.type': 'Filtro sipas llojit',
    'brand.search.placeholder': 'Kërko sipas emrit',
    'brand.loading': 'Po ngarkohen më shumë kitara...',
    'brand.results': 'DUKE TREGUAR {displayed} REZULTATE NGA {total}',
    'brand.end.message': 'Ke arritur në fund të koleksionit!',
    
    // Model Details Page
    'model.back': 'Mbrapa',
    'model.tabs.specs': 'Specifikimet',
    'model.tabs.musicians': 'Muzikantët?',
    'model.specs.description': '{modelName} është një qasje moderne ndaj dizajnit klasik të kitarës, me një formë elegante të trupit dhe një profil të rehatshëm të qafës për luajtje të lehtë. Është e pajisur me pickup-a të dyfishtë aktivë që ofrojnë një ton të fuqishëm dhe të gjithanshëm, të përsosur për çdo zhanër nga rok-u në funk. EQ-ja e integruar u mundëson lojtarëve të formësojnë zërin e tyre me precizion, ndërsa hardware-i i cilësisë së lartë siguron besueshmëri në skenë. Me opsionet e saj mbresëlënëse të përfundimit dhe vëmendjen ndaj detajeve, {modelName} është dizajnuar për performancë dhe stil.',
    'model.specs.body': 'Druri i trupit',
    'model.specs.neck': 'Druri i qafës',
    'model.specs.fingerboard': 'Tabela e gishtërinjve',
    'model.specs.pickups': 'Pickup-at',
    'model.specs.tuners': 'Akorduesit',
    'model.specs.scale': 'Gjatësia e shkallës',
    'model.specs.bridge': 'Ura',
    'model.musicians.none': 'Nuk u gjetën muzikantë për këtë kitarë.',
    'model.musicians.noimage': 'Nuk ka imazh',
    
    // Footer
    'footer.pages': 'FAQET',
    'footer.pages.store': 'Dyqani',
    'footer.pages.collections': 'Koleksionet',
    'footer.pages.support': 'Support',
    'footer.product': 'PRODUKTI',
    'footer.product.terms': 'Terms',
    'footer.product.privacy': 'Privacy Policy',
    'footer.product.copyright': 'E drejta e autorit',
    'footer.follow': 'NA NDIQ',
    'footer.copyright': '© 2025 E drejta e autorit.VibeStrings',
    'footer.language': 'Gjuha',
    'footer.pages.brands': 'Brendet',
    'footer.pages.about': 'Per ne',
    'footer.product.shipping': 'Kargo',
    'footer.contact.email': 'Email',
    'footer.contact.location': 'Lokacioni ynë',
    
    // Common
    'loading': 'Po ngarkohet...',
    'error': 'Gabim',
    'model.not.found': 'Modeli nuk u gjet',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('vibestrings-language') as Language;
    if (savedLanguage && ['en', 'mk', 'al'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('vibestrings-language', lang);
  };

  const t = (key: TranslationKey, params?: Record<string, string>) => {
    let translation =
      (translations[language] as typeof translations.en)[key] ||
      translations.en[key] ||
      key;
    
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{${param}}`, value);
      });
    }
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function renderWithOrange(text: string, textColor: string = 'text-gray-900') {
  return text.split('<orange>').map((part, index) => {
    if (index === 0) {
      return <span key={index} className={textColor}>{part}</span>;
    }
    const [orangeText, ...rest] = part.split('</orange>');
    return (
      <React.Fragment key={index}>
        <span className="text-orange-500">{orangeText}</span>
        {rest.length > 0 && <span className={textColor}>{rest.join('</orange>')}</span>}
      </React.Fragment>
    );
  });
}
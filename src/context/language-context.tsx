// 'use client';

// import React, { createContext, useContext, useState, useEffect } from 'react';

// type Language = 'en' | 'mk' | 'al';

// type TranslationKey = keyof typeof translations.en;

// interface LanguageContextType {
//   language: Language;
//   setLanguage: (lang: Language) => void;
//   t: (key: TranslationKey, params?: Record<string, string>) => string;
// }

// const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// const translations = {
//   en: {
//     // Home Page
//     'home.hero.title': 'Browse top quality Guitars online',
//     'home.hero.subtitle': 'Explore 500+ latest collections of branded guitars online with VibeStrings.',
//     'home.brands.title': 'Featuring the Best Brands',
//     'home.brands.subtitle': 'Select your preferred brand and explore our exquisite collection.',
//     'home.why.title': 'Why try VibeStrings?',
//     'home.why.browsing.title': 'SMOOTH BROWSING',
//     'home.why.browsing.desc': 'Lorem ipsum Dolor sit amet consectetur adipisicing elit.',
//     'home.why.delivery.title': 'EASY DELIVERY',
//     'home.why.delivery.desc': 'Lorem ipsum Dolor sit amet consectetur adipisicing elit.',
//     'home.why.payments.title': 'SWIFT PAYMENTS',
//     'home.why.payments.desc': 'Lorem ipsum Dolor sit amet consectetur adipisicing elit.',
//     'home.bottom.title': 'Browse and buy your favorite guitars with VibeStrings.',
    
//     // Brand Models Page
//     'brand.back': 'Back To List',
//     'brand.hero.title': 'Play like a Rockstar',
//     'brand.hero.subtitle': 'With a legacy dating back to the 1950s, {brandName} blends expert craftsmanship with cutting-edge innovation to deliver guitars that inspire creativity and elevate your performance. Trusted by top artists worldwide, {brandName} guitars are built to play fast, sound bold, and stand out on any stage.',
//     'brand.selection.title': 'Check out the Selection',
//     'brand.filter.type': 'Filter by type',
//     'brand.search.placeholder': 'Search by name',
//     'brand.loading': 'Loading more guitars...',
//     'brand.results': 'SHOWING {displayed} RESULTS FROM {total}',
//     'brand.end.message': "You've reached the end of the collection!",
    
//     // Model Details Page
//     'model.back': 'Back To List',
//     'model.tabs.specs': 'Specification',
//     'model.tabs.musicians': 'Who plays it?',
//     'model.specs.description': 'The {modelName} is a modern take on the classic guitar design, featuring a sleek body shape and a comfortable neck profile for easy playability. It is equipped with dual active pickups that deliver a powerful and versatile tone, perfect for any genre from rock to funk. The onboard EQ allows players to shape their sound with precision, while the high-quality hardware ensures reliability on stage. With its striking finish options and attention to detail, the {modelName} is designed for both performance and style.',
//     'model.specs.body': 'Body Wood',
//     'model.specs.neck': 'Neck Wood',
//     'model.specs.fingerboard': 'Fingerboard',
//     'model.specs.pickups': 'Pickups',
//     'model.specs.tuners': 'Tuners',
//     'model.specs.scale': 'Scale Length',
//     'model.specs.bridge': 'Bridge',
//     'model.musicians.none': 'No musicians found for this guitar.',
//     'model.musicians.noimage': 'No Image',
    
//     // Footer
//     'footer.pages': 'PAGES',
//     'footer.pages.store': 'Store',
//     'footer.pages.collections': 'Collections',
//     'footer.pages.support': 'Support',
//     'footer.product': 'PRODUCT',
//     'footer.product.terms': 'Terms',
//     'footer.product.privacy': 'Privacy Policy',
//     'footer.product.copyright': 'Copyright',
//     'footer.follow': 'FOLLOW US',
//     'footer.copyright': '© 2022 Copyright.VibeStrings',
//     'footer.language': 'Language',
    
//     // Common
//     'loading': 'Loading...',
//     'error': 'Error',
//     'model.not.found': 'Model not found',
//   },
//   mk: {
//     // Home Page
//     'home.hero.title': 'Прелистувај висококвалитетни гитари онлајн',
//     'home.hero.subtitle': 'Истражи 500+ најнови колекции на брендирани гитари онлајн со VibeStrings.',
//     'home.brands.title': 'Ги претставуваме најдобрите брендови',
//     'home.brands.subtitle': 'Избери го твојот омилен бренд и истражи ја нашата изискана колекција.',
//     'home.why.title': 'Зошто да пробаш VibeStrings?',
//     'home.why.browsing.title': 'ЛЕСНО ПРЕЛИСТУВАЊЕ',
//     'home.why.browsing.desc': 'Lorem ipsum Dolor sit amet consectetur adipisicing elit.',
//     'home.why.delivery.title': 'ЛЕСНА ДОСТАВА',
//     'home.why.delivery.desc': 'Lorem ipsum Dolor sit amet consectetur adipisicing elit.',
//     'home.why.payments.title': 'БРЗИ ПЛАЌАЊА',
//     'home.why.payments.desc': 'Lorem ipsum Dolor sit amet consectetur adipisicing elit.',
//     'home.bottom.title': 'Прелистувај и купувај ги твоите омилени гитари со VibeStrings.',
    
//     // Brand Models Page
//     'brand.back': 'Назад кон листа',
//     'brand.hero.title': 'Свири како рокѕвезда',
//     'brand.hero.subtitle': 'Со наследство што датира од 1950-тите, {brandName} ги комбинира експертската изработка со најсовремените иновации за да достави гитари што ја инспирираат креативноста и ја подигаат вашата изведба. Доверливи од врвни артисти ширум светот, {brandName} гитарите се изградени да свират брзо, да звучат смело и да се истакнат на секоја сцена.',
//     'brand.selection.title': 'Погледни го изборот',
//     'brand.filter.type': 'Филтрирај по тип',
//     'brand.search.placeholder': 'Пребарај по име',
//     'brand.loading': 'Се вчитуваат повеќе гитари...',
//     'brand.results': 'ПРИКАЖАНИ {displayed} РЕЗУЛТАТИ ОД {total}',
//     'brand.end.message': 'Стигна до крајот на колекцијата!',
    
//     // Model Details Page
//     'model.back': 'Назад кон листа',
//     'model.tabs.specs': 'Спецификација',
//     'model.tabs.musicians': 'Кој ја свири?',
//     'model.specs.description': '{modelName} е модерен пристап кон класичниот дизајн на гитара, со елегантна форма на телото и удобен профил на вратот за лесно свирење. Опремена е со двојни активни пикапи што даваат моќен и разновиден тон, совршен за секој жанр од рок до фанк. Вградениот EQ им овозможува на свирачите да го обликуваат својот звук со прецизност, додека висококвалитетниот хардвер обезбедува доверливост на сцената. Со своите впечатливи опции за завршување и внимание кон деталите, {modelName} е дизајнирана за изведба и стил.',
//     'model.specs.body': 'Дрво за тело',
//     'model.specs.neck': 'Дрво за врат',
//     'model.specs.fingerboard': 'Табла за прсти',
//     'model.specs.pickups': 'Пикапи',
//     'model.specs.tuners': 'Штимери',
//     'model.specs.scale': 'Должина на скала',
//     'model.specs.bridge': 'Мост',
//     'model.musicians.none': 'Не се пронајдени музичари за оваа гитара.',
//     'model.musicians.noimage': 'Нема слика',
    
//     // Footer
//     'footer.pages': 'СТРАНИЦИ',
//     'footer.pages.store': 'Продавница',
//     'footer.pages.collections': 'Колекции',
//     'footer.pages.support': 'Поддршка',
//     'footer.product': 'ПРОИЗВОД',
//     'footer.product.terms': 'Услови',
//     'footer.product.privacy': 'Политика за приватност',
//     'footer.product.copyright': 'Авторски права',
//     'footer.follow': 'СЛЕДИ НЕ',
//     'footer.copyright': '© 2022 Авторски права.VibeStrings',
//     'footer.language': 'Јазик',
    
//     // Common
//     'loading': 'Се вчитува...',
//     'error': 'Грешка',
//     'model.not.found': 'Моделот не е пронајден',
//   },
//   al: {
//     // Home Page
//     'home.hero.title': 'Shfleto kitara cilësore online',
//     'home.hero.subtitle': 'Eksploro 500+ koleksione të fundit të kitarave me markë online me VibeStrings.',
//     'home.brands.title': 'Duke prezantuar markat më të mira',
//     'home.brands.subtitle': 'Zgjidh markën tënde të preferuar dhe eksploro koleksionin tonë të shkëlqyer.',
//     'home.why.title': 'Pse të provosh VibeStrings?',
//     'home.why.browsing.title': 'SHFLETIM I LEHTË',
//     'home.why.browsing.desc': 'Lorem ipsum Dolor sit amet consectetur adipisicing elit.',
//     'home.why.delivery.title': 'DËRGIM I LEHTË',
//     'home.why.delivery.desc': 'Lorem ipsum Dolor sit amet consectetur adipisicing elit.',
//     'home.why.payments.title': 'PAGESA TË SHPEJTA',
//     'home.why.payments.desc': 'Lorem ipsum Dolor sit amet consectetur adipisicing elit.',
//     'home.bottom.title': 'Shfleto dhe bli kitarat e tua të preferuara me VibeStrings.',
    
//     // Brand Models Page
//     'brand.back': 'Kthehu në listë',
//     'brand.hero.title': 'Luaj si një yll rrok',
//     'brand.hero.subtitle': 'Me një trashëgimi që daton nga vitet 1950, {brandName} kombinon mjeshtërinë eksperte me inovacionin më të fundit për të ofruar kitara që frymëzojnë kreativitetin dhe ngritin performancën tuaj. I besuar nga artistë të nivelit të lartë në mbarë botën, kitarat {brandName} janë ndërtuar për të luajtur shpejt, për të tingëlluar guximshëm dhe për të dalë në pah në çdo skenë.',
//     'brand.selection.title': 'Shiko përzgjedhjen',
//     'brand.filter.type': 'Filtro sipas llojit',
//     'brand.search.placeholder': 'Kërko sipas emrit',
//     'brand.loading': 'Po ngarkohen më shumë kitara...',
//     'brand.results': 'DUKE TREGUAR {displayed} REZULTATE NGA {total}',
//     'brand.end.message': 'Ke arritur në fund të koleksionit!',
    
//     // Model Details Page
//     'model.back': 'Kthehu në listë',
//     'model.tabs.specs': 'Specifikimi',
//     'model.tabs.musicians': 'Kush e luan?',
//     'model.specs.description': '{modelName} është një qasje moderne ndaj dizajnit klasik të kitarës, me një formë elegante të trupit dhe një profil të rehatshëm të qafës për luajtje të lehtë. Është e pajisur me pickup-a të dyfishtë aktivë që ofrojnë një ton të fuqishëm dhe të gjithanshëm, të përsosur për çdo zhanër nga rok-u në funk. EQ-ja e integruar u mundëson lojtarëve të formësojnë zërin e tyre me precizion, ndërsa hardware-i i cilësisë së lartë siguron besueshmëri në skenë. Me opsionet e saj mbresëlënëse të përfundimit dhe vëmendjen ndaj detajeve, {modelName} është dizajnuar për performancë dhe stil.',
//     'model.specs.body': 'Druri i trupit',
//     'model.specs.neck': 'Druri i qafës',
//     'model.specs.fingerboard': 'Tabela e gishtërinjve',
//     'model.specs.pickups': 'Pickup-at',
//     'model.specs.tuners': 'Akorduesit',
//     'model.specs.scale': 'Gjatësia e shkallës',
//     'model.specs.bridge': 'Ura',
//     'model.musicians.none': 'Nuk u gjetën muzikantë për këtë kitarë.',
//     'model.musicians.noimage': 'Nuk ka imazh',
    
//     // Footer
//     'footer.pages': 'FAQET',
//     'footer.pages.store': 'Dyqani',
//     'footer.pages.collections': 'Koleksionet',
//     'footer.pages.support': 'Mbështetja',
//     'footer.product': 'PRODUKTI',
//     'footer.product.terms': 'Kushtet',
//     'footer.product.privacy': 'Politika e privatësisë',
//     'footer.product.copyright': 'E drejta e autorit',
//     'footer.follow': 'NA NDIQ',
//     'footer.copyright': '© 2022 E drejta e autorit.VibeStrings',
//     'footer.language': 'Gjuha',
    
//     // Common
//     'loading': 'Po ngarkohet...',
//     'error': 'Gabim',
//     'model.not.found': 'Modeli nuk u gjet',
//   }
// };

// export function LanguageProvider({ children }: { children: React.ReactNode }) {
//   const [language, setLanguage] = useState<Language>('en');

//   useEffect(() => {
//     const savedLanguage = localStorage.getItem('vibestrings-language') as Language;
//     if (savedLanguage && ['en', 'mk', 'al'].includes(savedLanguage)) {
//       setLanguage(savedLanguage);
//     }
//   }, []);

//   const handleSetLanguage = (lang: Language) => {
//     setLanguage(lang);
//     localStorage.setItem('vibestrings-language', lang);
//   };

//   const t = (key: TranslationKey, params?: Record<string, string>) => {
//     let translation = translations[language][key] || translations.en[key] || key;
    
//     if (params) {
//       Object.entries(params).forEach(([param, value]) => {
//         translation = translation.replace(`{${param}}`, value);
//       });
//     }
    
//     return translation;
//   };

//   return (
//     <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// }

// export function useLanguage() {
//   const context = useContext(LanguageContext);
//   if (context === undefined) {
//     throw new Error('useLanguage must be used within a LanguageProvider');
//   }
//   return context;
// }

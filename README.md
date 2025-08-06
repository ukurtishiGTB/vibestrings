# VibeStrings 

A modern, multilingual guitar e-commerce platform built with Next.js, GraphQL, and Apollo Client. Browse premium guitars from top brands with an elegant, responsive design.

## Features

### Multi-language Support
- **English**, **Macedonian**, and **Albanian** translations
- Context-aware language switching with localStorage persistence
- Dynamic text rendering with custom orange highlights

### Core Functionality
- **Brand Discovery**: Explore top guitar brands with detailed information
- **Guitar Catalog**: Browse extensive guitar collections with filtering and search
- **Model Details**: Comprehensive specifications and musician endorsements
- **Infinite Scrolling**: Seamless pagination for large catalogs
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Design Highlights
- Custom orange gradient hero sections
- Smooth animations and hover effects
- Professional typography with Satoshi font family
- Dark/light theme sections for visual contrast

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Fetching**: Apollo Client + GraphQL
- **State Management**: React Context API
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image component

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                 # Homepage
│   └── brands/
│       └── [brandId]/
│           └── models/
│               ├── page.tsx     # Brand models listing
│               └── [modelId]/
│                   └── page.tsx # Guitar model details
├── components/
│   └── footer.tsx               # Reusable footer component
├── context/
│   └── language-context.tsx     # Multi-language context & translations
├── graphql/
│   └── queries.ts               # GraphQL queries
└── lib/
    └── apollo-client.ts         # Apollo Client configuration
```

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone (https://github.com/ukurtishiGTB/vibestrings)
   cd vibestrings
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_GRAPHQL_ENDPOINT=your_graphql_endpoint_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Integration

The application connects to a GraphQL API with the following main queries:

- `GET_ALL_BRANDS` - Fetch all guitar brands
- `GET_BRAND_BY_ID` - Get specific brand details
- `FIND_BRAND_MODELS` - Retrieve guitar models for a brand
- `FIND_UNIQUE_MODEL` - Get detailed model information with specifications

## Styling & Design

### Color Palette
- **Primary Orange**: `#FF8A5D` / `#FF5B1C` (gradients)
- **Text Dark**: `#1F2937` (gray-900)
- **Text Light**: `#6B7280` (gray-500)
- **Background**: `#FFFFFF` / `#000000`

### Key Components
- **Hero Sections**: Custom rounded containers with orange gradients
- **Filter System**: Custom dropdown with hover states
- **Guitar Cards**: Hover animations with scale transforms
- **Pagination**: Dot-style navigation for musicians

## Internationalization

Languages are managed through the `LanguageContext` with support for:

```typescript
// Example translation structure
'home.hero.title': 'Browse top quality <orange>Guitars</orange> online'
'brand.hero.title': 'Play like a <orange>Rockstar</orange>'
```

The `<orange>` tags are automatically converted to styled spans with orange color.

## Responsive Design

- **Mobile First**: Optimized for small screens
- **Tablet**: Adjusted layouts for medium screens  
- **Desktop**: Full featured experience with sidebars and expanded grids
- **Large Screens**: Maximum width containers for optimal viewing

## Performance Features

- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic route-based splitting
- **Apollo Caching**: Intelligent GraphQL query caching
- **Infinite Scroll**: Efficient loading of large datasets

## Development

### Key Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Code Style
- TypeScript strict mode enabled
- ESLint configuration for Next.js
- Consistent component structure with hooks
- Custom hooks for shared logic


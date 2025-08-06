'use client';
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_ALL_BRANDS } from "@/graphql/queries";
import Footer from "@/components/footer";

export default function HomePage() {
  const { data, loading, error } = useQuery(GET_ALL_BRANDS);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error.message}</div>;

  const brands = data?.findAllBrands || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="min-h-screen pt-8 flex flex-col">
              {/* Top-left logo */}
              <div className="absolute top-8 left-8 space-y-4 z-20">
                       
                        <div className="ml-8 py-10">
                          <Image
                            src="/images/logo.png"
                            width={150}
                            height={50}
                            alt="VibeStrings"
                          />
                        </div>
              </div>

              {/* Main content */}
              <div className="flex-1 flex flex-col justify-center items-center text-center space-y-30">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Browse top quality <span className="text-orange-500">Guitars</span> online
                </h1>
                <p className="text-lg text-gray-600 max-w-md -mt-24">
                  Explore 500+ latest collections of branded guitars online with VibeStrings.
                </p>
              </div>
            </div>



            <div className="absolute top-0 right-0 z-10 flex flex-col items-center">
              {/* Guitar image in rounded container */}
              <div
                style={{
                  width: "672px",
                  height: "586px",
                  borderRadius: "0px 0px 151px 360px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Image
                  src="/images/homepageGuitar.jpg"
                  alt="Guitar Hero Image"
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "center -400px",
                  }}
                  priority
                />
              </div>

              {/* Symbol image - separate from the container, just overlapping */}
              <div
                style={{
                  marginTop: "-32px",
                  marginRight: "-160px",
                  zIndex: 20,
                }}
              >
                <Image
                  src="/images/symbol.png"
                  alt="symbol"
                  width={64}
                  height={64}
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brands Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featuring the <span className="text-orange-500">Best Brands</span>
            </h2>
            <p className="text-lg text-gray-600">
              Select your preferred brand and explore our exquisite collection.
            </p>
          </div>

          {/* Brand Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center">
            {brands.map((brand: any) => (
              <Link
                key={brand.id}
                href={`/brands/${brand.id}/models`}
                className="flex items-center justify-center p-8 bg-white rounded-lg hover:shadow-lg transition-shadow duration-300 group"
              >
                {brand.image ? (
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={120}
                    height={60}
                    className="object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                  />
                ) : (
                  <div className="w-32 h-16 flex items-center justify-center bg-gray-100 rounded">
                    <span className="text-gray-500 font-semibold text-lg">{brand.name}</span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Why VibeStrings Section */}
      <div className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">
              Why try <span className="text-orange-500">VibeStrings</span>?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Smooth Browsing */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">SMOOTH BROWSING</h3>
              <p className="text-gray-400">
                Lorem ipsum Dolor sit amet consectetur adipisicing elit.
              </p>
            </div>

            {/* Easy Delivery */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">EASY DELIVERY</h3>
              <p className="text-gray-400">
                Lorem ipsum Dolor sit amet consectetur adipisicing elit.
              </p>
            </div>

            {/* Swift Payments */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">SWIFT PAYMENTS</h3>
              <p className="text-gray-400">
                Lorem ipsum Dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6">
              <h2 className="text-4xl lg:text-5xl text-gray-900 leading-tight">
                Browse and buy your{" "}
                <span className="text-orange-500">favorite guitars</span> with
                VibeStrings.
              </h2>

              {/* App Store Buttons */}
              <div className="flex space-x-4">
                <Link href="#">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
                    alt="Get it on Google Play"
                    width={150}
                    height={35}
                    className="object-contain"

                  />
                </Link>

                <Link href="#">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/2560px-Download_on_the_App_Store_Badge.svg.png"
                    alt="Download on the App Store"
                    width={150}
                    height={35}
                    className="object-contain"

                  />
                </Link>

              </div>
            </div>

            {/* Right Image - Mobile App Mockup */}
            <div className="relative flex justify-center items-center py-16">
              {/* Orange ellipse image background */}
              <Image
                src="/images/Ellipse 6.png"
                alt=""
                width={800}
                height={800}
                className="absolute z-0"
              />

              {/* Phone mockups container */}
              <div className="flex items-start space-x-8 relative z-10">
                {/* First Phone */}
                <div className="mt-0">
                  <Image
                    src="/images/feed.png"
                    alt="VibeStrings app - Your Feed page"
                    width={250}
                    height={540}
                    className="rounded-3xl shadow-2xl"
                  />
                </div>

                {/* Second Phone */}
                <div className="mt-12">
                  <Image
                    src="/images/guitar-detail.png"
                    alt="VibeStrings app - Guitar detail page"
                    width={250}
                    height={540}
                    className="rounded-3xl shadow-2xl"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}


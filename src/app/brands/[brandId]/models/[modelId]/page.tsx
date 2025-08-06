'use client';

import { useQuery } from "@apollo/client";
import { FIND_UNIQUE_MODEL } from "@/graphql/queries";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft } from 'lucide-react';
import Footer from "@/components/footer";

export default function ModelDetailsPage() {
  const { brandId, modelId } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('specs');
  const [musiciansPage, setMusiciansPage] = useState(0);

  const { data, loading, error } = useQuery(FIND_UNIQUE_MODEL, {
    variables: { brandId, modelId }
  });

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">Error: {error.message}</p>;

  const model = data?.findUniqueModel;
  if (!model) return <p className="text-center mt-4">Model not found</p>;

  const musiciansPerPage = 2;
  const totalMusicians = model.musicians?.length || 0;
  const totalPages = Math.ceil(totalMusicians / musiciansPerPage);
  const currentMusicians = model.musicians?.slice(
    musiciansPage * musiciansPerPage,
    (musiciansPage + 1) * musiciansPerPage
  ) || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[586px] overflow-hidden">
        {/* Top-left logo and back button */}
        <div className="absolute top-8 left-8 space-y-4 z-20">
          <button 
            onClick={() => router.back()} 
            className="flex items-center text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back To List
          </button>
          <div className="ml-8">
            <Image
              src="/images/logo.png"
              width={150}
              height={50}
              alt="VibeStrings"
            />
          </div>
        </div>

        {/* Left side - Guitar name centered */}
        <div className="absolute left-0 top-0 w-1/2 h-full flex items-center justify-center">
          <h1 className="text-6xl font-bold text-gray-900 leading-tight text-center max-w-md" style={{ transform: 'translateY(-40px)' }}>
            {model.name}
          </h1>
        </div>

        {/* Right side - Orange gradient with guitar image */}
        <div className="absolute top-0 right-0 z-10">
          {/* Orange gradient container with guitar image */}
          <div
            style={{
              width: "672px",
              height: "459px",
              borderRadius: "0px 0px 151px 360px",
              background: "linear-gradient(180deg, #FF8C60 0%, #FF5B1C 100%)",
              backdropFilter: "blur(20px)",
              overflow: "hidden",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Guitar image */}
            <Image
              src={model.image || "/placeholder.svg"}
              alt={model.name}
              width={400}
              height={300}
              style={{
                objectFit: "contain",
                transform: "rotate(-50deg)",
              }}
            />
          </div>

          {/* Symbol image */}
          <div
            style={{
              position: "absolute",
              bottom: "-40px",
              right: "250px",
              zIndex: 20,
            }}
          >
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <Image
                src="/images/symbol.png"
                alt="symbol"
                width={75}
                height={75}
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Tabs */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '0px',
          position: 'relative',
          width: '1440px',
          height: '69px',
          left: 'calc(50% - 1440px/2)',
          marginBottom: '32px'
        }}>
          {/* Specification Tab */}
          <div style={{
            width: '711px',
            height: '69px',
            flex: 'none',
            order: 0,
            flexGrow: 0,
            position: 'relative',
            cursor: 'pointer'
          }}
          onClick={() => setActiveTab('specs')}>
            {/* Base */}
            <div style={{
              position: 'absolute',
              left: '0%',
              right: '0%',
              top: '0%',
              bottom: '2.44%',
              background: '#FFFFFF'
            }} />
            {/* Line */}
            <div style={{
              position: 'absolute',
              left: '0%',
              right: '0.08%',
              top: activeTab === 'specs' ? '92.75%' : '97.5%',
              bottom: '0%',
              background: activeTab === 'specs' ? '#FF8A5D' : '#EBECEF'
            }} />
            {/* Text */}
            <div style={{
              position: 'absolute',
              left: '39.57%',
              right: '39.9%',
              top: '27.5%',
              bottom: '24.67%',
              fontFamily: 'Satoshi, sans-serif',
              fontStyle: 'normal',
              fontWeight: activeTab === 'specs' ? 700 : 400,
              fontSize: '19.15px',
              lineHeight: '33px',
              textAlign: 'center',
              color: activeTab === 'specs' ? '#FF8A5D' : '#9292A3'
            }}>
              Specification
            </div>
          </div>

          {/* Who plays it Tab */}
          <div style={{
            width: '667px',
            height: '69px',
            flex: 'none',
            order: 1,
            flexGrow: 0,
            position: 'relative',
            cursor: 'pointer'
          }}
          onClick={() => setActiveTab('musicians')}>
            {/* Base */}
            <div style={{
              position: 'absolute',
              left: '0%',
              right: '0%',
              top: '0%',
              bottom: '2.44%',
              background: '#FFFFFF'
            }} />
            {/* Line */}
            <div style={{
              position: 'absolute',
              left: '0%',
              right: '0%',
              top: activeTab === 'musicians' ? '92.75%' : '97.5%',
              bottom: '0%',
              background: activeTab === 'musicians' ? '#FF8A5D' : '#EBECEF'
            }} />
            {/* Text */}
            <div style={{
              position: 'absolute',
              left: '39.38%',
              right: '39.18%',
              top: '27.5%',
              bottom: '24.67%',
              fontFamily: 'Satoshi, sans-serif',
              fontStyle: 'normal',
              fontWeight: activeTab === 'musicians' ? 700 : 400,
              fontSize: '19.15px',
              lineHeight: '33px',
              textAlign: 'center',
              color: activeTab === 'musicians' ? '#FF8A5D' : '#9292A3'
            }}>
              Who plays it?
            </div>
          </div>
        </div>
            
        {/* Tab Content */}
        {activeTab === 'specs' && (
          <div className="max-w-4xl mx-auto font-light">
            <div className="bg-white">
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {model.description || `The ${model.name} is a modern take on the classic guitar design, featuring a sleek body shape and a comfortable neck profile for easy playability. It is equipped with dual active pickups that deliver a powerful and versatile tone, perfect for any genre from rock to funk. The onboard EQ allows players to shape their sound with precision, while the high-quality hardware ensures reliability on stage. With its striking finish options and attention to detail, the ${model.name} is designed for both performance and style.`}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul className="space-y-0.2 text-lg text-gray-700 list-disc pl-6">
                    <li>Body Wood: {model.specs?.bodyWood || "Alder"}</li>
                    <li>Neck Wood: {model.specs?.neckWood || "Maple"}</li>
                    <li>Fingerboard: {model.specs?.fingerboardWood || "Rosewood"}</li>
                    <li>Pickups: {model.specs?.pickups || "Dual Active Pickups"}</li>
                    <li>Tuners: {model.specs?.tuners || "Vintage-Style"}</li>
                    <li>Scale Length: {model.specs?.scaleLength || "25.5 inches"}</li>
                    <li>Bridge: {model.specs?.bridge || "6-Saddle Synchronized Tremolo"}</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'musicians' && (
          <div className="max-w-6xl mx-auto">
            {totalMusicians === 0 ? (
              <p className="text-center text-gray-500">No musicians found for this guitar.</p>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {currentMusicians.map((musician: any, index: number) => (
                    <div
                      key={index}
                      style={{
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '24px',
                        gap: '25px',
                        width: '492px',
                        height: '549px',
                        background: '#FFEFE8',
                        border: '1px solid #EBECEF',
                        borderRadius: '4px',
                        flex: 'none',
                        order: 0,
                        flexGrow: 0
                      }}
                      className="mx-auto"
                    >
                      {/* Musician Image */}
                      {musician.musicianImage ? (
                        <div style={{
                          width: '444px',
                          height: '444px',
                          borderRadius: '4px',
                          backgroundImage: `url(${musician.musicianImage})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          flex: 'none',
                          order: 0,
                          alignSelf: 'stretch',
                          flexGrow: 0
                        }} />
                      ) : (
                        <div style={{
                          width: '444px',
                          height: '444px',
                          borderRadius: '4px',
                          backgroundColor: '#f0f0f0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flex: 'none',
                          order: 0,
                          alignSelf: 'stretch',
                          flexGrow: 0
                        }}>
                          <span style={{ color: '#666666' }}>No Image</span>
                        </div>
                      )}

                      {/* Musician Name */}
                      <h3 style={{
                        width: '444px',
                        height: '32px',
                        fontFamily: 'Satoshi, sans-serif',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        fontSize: '24px',
                        lineHeight: '32px',
                        textAlign: 'center',
                        color: '#666666',
                        flex: 'none',
                        order: 1,
                        alignSelf: 'stretch',
                        flexGrow: 0,
                        margin: 0
                      }}>
                        {musician.name}
                      </h3>
                    </div>
                  ))}
                </div>

                {/* Pagination Dots */}
                {totalPages > 1 && (
                  <div className="flex justify-center space-x-2 mt-8">
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={`page-${index}`}
                        onClick={() => setMusiciansPage(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === musiciansPage
                            ? 'bg-orange-500'
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}



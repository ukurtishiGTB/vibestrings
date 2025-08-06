'use client';

import { useQuery } from "@apollo/client";
import { FIND_UNIQUE_MODEL } from "@/graphql/queries";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft } from 'lucide-react';
import Footer from "@/components/footer";
import { useLanguage } from "@/context/language-context";

export default function ModelDetailsPage() {
  const { brandId, modelId } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('specs');
  const [musiciansPage, setMusiciansPage] = useState(0);
  const { t } = useLanguage();

  const { data, loading, error } = useQuery(FIND_UNIQUE_MODEL, {
    variables: { brandId, modelId }
  });

  if (loading) return <p className="text-center mt-4">{t('loading')}</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{t('error')}: {error.message}</p>;

  const model = data?.findUniqueModel;
  if (!model) return <p className="text-center mt-4">{t('model.not.found')}</p>;

  const musiciansPerPage = 2;
  const totalMusicians = model.musicians?.length || 0;
  const totalPages = Math.ceil(totalMusicians / musiciansPerPage);
  const currentMusicians = model.musicians?.slice(
    musiciansPage * musiciansPerPage,
    (musiciansPage + 1) * musiciansPerPage
  ) || [];

  return (
    <div className="min-h-screen bg-white">
      
      <div className="relative h-[586px] overflow-hidden">
       
        <div className="absolute top-8 left-8 space-y-4 z-20">
          <button 
            onClick={() => router.back()} 
            className="flex items-center text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            {t('model.back')}
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

        
        <div className="absolute left-0 top-0 w-1/2 h-full flex items-center justify-center">
          <h1 className="font-bold text-gray-900 leading-tight text-center max-w-md" style={{ fontSize: '56px', transform: 'translateY(-40px)' }}>
            {model.name}
          </h1>
        </div>

        
        <div className="absolute top-0 right-0 z-10">
          
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

     
      <div className="max-w-7xl mx-auto px-4 py-12">
        
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
            
            <div style={{
              position: 'absolute',
              left: '0%',
              right: '0%',
              top: '0%',
              bottom: '2.44%',
              background: '#FFFFFF'
            }} />
            
            <div style={{
              position: 'absolute',
              left: '0%',
              right: '0.08%',
              top: activeTab === 'specs' ? '92.75%' : '97.5%',
              bottom: '0%',
              background: activeTab === 'specs' ? '#FF8A5D' : '#EBECEF'
            }} />
            
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
              {t('model.tabs.specs')}
            </div>
          </div>

          
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
            
            <div style={{
              position: 'absolute',
              left: '0%',
              right: '0%',
              top: '0%',
              bottom: '2.44%',
              background: '#FFFFFF'
            }} />
            
            <div style={{
              position: 'absolute',
              left: '0%',
              right: '0%',
              top: activeTab === 'musicians' ? '92.75%' : '97.5%',
              bottom: '0%',
              background: activeTab === 'musicians' ? '#FF8A5D' : '#EBECEF'
            }} />
            
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
              {t('model.tabs.musicians')}
            </div>
          </div>
        </div>
            
        
        {activeTab === 'specs' && (
          <div className="max-w-4xl mx-auto font-light">
            <div className="bg-white">
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {model.description || t('model.specs.description', { modelName: model.name })}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul className="text-lg text-gray-700 list-disc pl-6 font-light">
                    <li>{t('model.specs.body')}: {model.specs?.bodyWood || "Alder"}</li>
                    <li>{t('model.specs.neck')}: {model.specs?.neckWood || "Maple"}</li>
                    <li>{t('model.specs.fingerboard')}: {model.specs?.fingerboardWood || "Rosewood"}</li>
                    <li>{t('model.specs.pickups')}: {model.specs?.pickups || "Dual Active Pickups"}</li>
                    <li>{t('model.specs.tuners')}: {model.specs?.tuners || "Vintage-Style"}</li>
                    <li>{t('model.specs.scale')}: {model.specs?.scaleLength || "25.5 inches"}</li>
                    <li>{t('model.specs.bridge')}: {model.specs?.bridge || "6-Saddle Synchronized Tremolo"}</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'musicians' && (
          <div className="max-w-6xl mx-auto">
            {totalMusicians === 0 ? (
              <p className="text-center text-gray-500">{t('model.musicians.none')}</p>
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
                          <span style={{ color: '#666666' }}>{t('model.musicians.noimage')}</span>
                        </div>
                      )}

                      
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
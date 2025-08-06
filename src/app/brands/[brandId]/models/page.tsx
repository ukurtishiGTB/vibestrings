"use client"

import { useQuery } from "@apollo/client"
import { FIND_BRAND_MODELS, GET_BRAND_BY_ID } from "@/graphql/queries"
import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ChevronLeft, Search, Filter, ChevronDown } from "lucide-react"
import Footer from "@/components/footer"
import { useLanguage, renderWithOrange } from "@/context/language-context"

interface Model {
  id: string
  name: string
  price: number
  type: string
  image: string
}

interface Brand {
  id: string
  name: string
  image?: string
}

export default function BrandModelsPage() {
  const { brandId } = useParams()
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [displayedModels, setDisplayedModels] = useState<Model[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasInitialized, setHasInitialized] = useState(false)
  const router = useRouter()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  const MODELS_PER_PAGE = 3

  
  const { data: brandData, loading: brandLoading } = useQuery(GET_BRAND_BY_ID, {
    variables: { id: brandId },
  })


  const {
    data: modelsData,
    loading: modelsLoading,
    error,
  } = useQuery(FIND_BRAND_MODELS, {
    variables: { id: brandId, sortBy: { field: "name", order: "ASC" } },
  })

  const isLoading = brandLoading || modelsLoading

 
  const models = useMemo(() => {
    return modelsData?.findBrandModels || []
  }, [modelsData?.findBrandModels])

  const brand: Brand = brandData?.findUniqueBrand || {}
  const brandName = brand?.name || "Brand"
  const brandImage = brand?.image

  
  const filteredModels = useMemo(() => {
    return models.filter(
      (model: Model) =>
        model.name.toLowerCase().includes(search.toLowerCase()) &&
        (typeFilter ? model.type?.toLowerCase().includes(typeFilter.toLowerCase()) : true),
    )
  }, [models, search, typeFilter])

  
  useEffect(() => {
    setDisplayedModels([])
    setCurrentPage(1)
    setSearch("")
    setTypeFilter("")
    setHasInitialized(false)
  }, [brandId])

  
  useEffect(() => {
    if (models.length > 0 && !hasInitialized) {
      const initialModels = models.slice(0, MODELS_PER_PAGE)
      setDisplayedModels(initialModels)
      setCurrentPage(1)
      setHasInitialized(true)
    }
  }, [models.length, hasInitialized, MODELS_PER_PAGE])

  
  useEffect(() => {
    if (hasInitialized) {
      const newModels = filteredModels.slice(0, MODELS_PER_PAGE)
      setDisplayedModels(newModels)
      setCurrentPage(1)
    }
  }, [search, typeFilter, filteredModels, hasInitialized, MODELS_PER_PAGE])

  
  const loadMoreModels = useCallback(() => {
    if (loading || displayedModels.length >= filteredModels.length) return

    const startIndex = displayedModels.length
    const endIndex = startIndex + MODELS_PER_PAGE
    const newModels = filteredModels.slice(startIndex, endIndex)

    if (newModels.length > 0) {
      setLoading(true)
      
      setTimeout(() => {
        setDisplayedModels((prev) => {
          
          const existingIds = new Set(prev.map((model) => model.id))
          const uniqueNewModels = newModels.filter((model: Model) => !existingIds.has(model.id))
          return [...prev, ...uniqueNewModels]
        })
        setCurrentPage((prev) => prev + 1)
        setLoading(false)
      }, 600)
    }
  }, [displayedModels.length, filteredModels, loading, MODELS_PER_PAGE])

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const filterOptions = [
    { value: "", label: t('brand.filter.type') },
    { value: "Bass", label: "Bass" },
    { value: "Acoustic", label: "Acoustic" },
    { value: "Electric", label: "Electric" }
  ]

  const handleFilterSelect = (value: string) => {
    setTypeFilter(value)
    setIsDropdownOpen(false)
  }


  useEffect(() => {
    const handleScroll = () => {
      if (displayedModels.length > 0 && displayedModels.length < filteredModels.length && !loading) {
        const scrollTop = document.documentElement.scrollTop
        const windowHeight = window.innerHeight
        const docHeight = document.documentElement.offsetHeight
        
        if (scrollTop > 300 && windowHeight + scrollTop >= docHeight - 800) {
          loadMoreModels()
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [loadMoreModels, displayedModels.length, filteredModels.length, loading])

  if (isLoading && displayedModels.length === 0) {
    return <p className="text-center mt-4">{t('loading')}</p>
  }

  if (error) {
    return <p className="text-center mt-4 text-red-500">{t('error')}: {error.message}</p>
  }

  return (
    <div className="min-h-screen bg-white">
      
      <div className="relative">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
             <div className="pt-4 flex flex-col h-[586px]">
              
              <div className="absolute top-8 left-8 space-y-4 z-20">
                        <button 
                          onClick={() => router.back()} 
                          className="flex items-center text-gray-600 hover:text-gray-800 cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4 mr-1" />
                          {t('brand.back')}
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

              
              <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  {renderWithOrange(t('brand.hero.title'))}
                </h1>
                <p className="text-lg text-gray-600 max-w-md">
                  {t('brand.hero.subtitle', { brandName })}
                </p>
                </div>
            </div>

            
            <div className="absolute top-0 right-0 z-10 flex flex-col items-center">
              
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
                
                {brandImage ? (
                  <Image
                    src={brandImage}
                    alt={brandName}
                    width={300}
                    height={150}
                    style={{
                      objectFit: "contain",
                      opacity: 0.3,
                    }}
                  />
                ) : (
                  <div className="text-8xl font-bold text-white/30 italic">{brandName}</div>
                )}
              </div>

              
              <div
                style={{
                  marginTop: "-16px",
                  marginRight: "-80px",
                  zIndex: 20,
                }}
              >
                <Image
                  src="/images/symbol.png"
                  alt="symbol"
                  width={32}
                  height={32}
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          {renderWithOrange(t('brand.selection.title'))}
        </h2>

      
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
          
          <div className="relative max-w-xs" ref={dropdownRef}>
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`pl-10 pr-8 py-3 rounded-md bg-white cursor-pointer w-full flex items-center justify-between min-h-[48px] transition-colors ${
                isDropdownOpen || typeFilter 
                  ? 'border border-orange-500 text-orange-500' 
                  : 'border border-gray-300 text-gray-400'
              }`}
              style={{width: '200px'}}
            >
              <span className={isDropdownOpen || typeFilter ? 'text-orange-500' : 'text-gray-400'}>
                {typeFilter || t('brand.filter.type')}
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''} ${
                isDropdownOpen || typeFilter ? 'text-orange-500' : 'text-gray-500'
              }`} />
            </div>
            <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              isDropdownOpen || typeFilter ? 'text-orange-500' : 'text-gray-400'
            }`} />
            
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 w-full mt-1 z-50">
                
                <div
                  style={{
                    background: '#FFFFFF',
                    boxShadow: '3.80343px 3.80343px 28.5257px rgba(0, 34, 65, 0.18)',
                    borderRadius: '7.60685px',
                  }}
                  className="w-full"
                >
                  
                  <div className="flex flex-col">
                    {filterOptions.map((option, index) => (
                      <div
                        key={option.value}
                        onClick={() => handleFilterSelect(option.value)}
                        className={`
                          flex items-center px-4 py-3 cursor-pointer transition-colors
                          ${index === 0 ? 'rounded-t-lg' : ''}
                          ${index === filterOptions.length - 1 ? 'rounded-b-lg' : ''}
                          ${typeFilter === option.value 
                            ? 'bg-orange-50 text-orange-500 border border-gray-200' 
                            : 'bg-white text-gray-500 hover:bg-gray-50'
                          }
                        `}
                        style={{
                          height: '62px',
                          fontSize: '16px',
                          fontWeight: '450',
                          lineHeight: '42px'
                        }}
                      >
                        <span className="w-full">{option.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

         
          <div className="relative max-w-sm">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              search ? 'text-orange-500' : 'text-gray-400'
            }`} />
            <input
              type="text"
              placeholder={t('brand.search.placeholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`pl-10 pr-4 py-3 rounded-md bg-white w-full transition-colors ${
                search 
                  ? 'border border-orange-500 text-orange-500 focus:ring-2 focus:ring-orange-500 focus:border-orange-500' 
                  : 'border border-gray-300 text-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder:text-gray-400'
              }`}
            />
          </div>
        </div>

        
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {displayedModels.map((model: Model) => (
            <div
              key={model.id}
              onClick={() => router.push(`/brands/${brandId}/models/${model.id}`)}
              className="bg-white rounded-lg hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="aspect-square bg-gray-50 rounded-t-lg overflow-hidden mb-4">
                <Image
                  src={model.image || "/placeholder.svg"}
                  alt={model.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="px-2 pb-4">
                <h3 className="font-semibold text-lg mb-1 text-black">{model.name}</h3>
                <p className="text-black font-medium">${model.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            <span className="ml-2 text-black">{t('brand.loading')}</span>
          </div>
        )}

        
        <div className="flex justify-center items-center space-x-2 mb-8">
          <span className="text-black text-sm">
            {t('brand.results', { displayed: displayedModels.length.toString(), total: filteredModels.length.toString() })}
          </span>
        </div>

        
         {displayedModels.length >= filteredModels.length && filteredModels.length > 0 && (
          <div className="text-center py-8">
            <p className="text-black">{t('brand.end.message')}</p>
          </div>
        )}
      </div>

      
      <Footer />
    </div>
  )
}
'use client';
import { useQuery } from "@apollo/client";
import { FIND_UNIQUE_MODEL } from "@/graphql/queries";
import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function ModelDetailsPage() {
    const { brandId, modelId } = useParams();
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
        <div className="p-6 max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                    <Image
                        src={model.image}
                        alt={model.name}
                        width={400}
                        height={300}
                        className="object-cover w-full h-80 rounded-lg"
                    />
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-4">{model.name}</h1>
                    <p className="text-xl text-gray-600 mb-2">{model.type}</p>
                    <p className="text-2xl font-bold text-green-600 mb-4">${model.price}</p>
                    <p className="text-gray-700">{model.description}</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab('specs')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'specs'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        Specifications
                    </button>
                    <button
                        onClick={() => setActiveTab('musicians')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'musicians'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        Musicians ({totalMusicians})
                    </button>
                </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'specs' && (
                <div className="bg-white rounded-lg border p-6">
                    <h2 className="text-2xl font-bold mb-4">Specifications</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <div>
                                <span className="font-semibold text-gray-700">Body Wood:</span>
                                <span className="ml-2">{model.specs.bodyWood}</span>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-700">Neck Wood:</span>
                                <span className="ml-2">{model.specs.neckWood}</span>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-700">Fingerboard Wood:</span>
                                <span className="ml-2">{model.specs.fingerboardWood}</span>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-700">Pickups:</span>
                                <span className="ml-2">{model.specs.pickups}</span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <span className="font-semibold text-gray-700">Tuners:</span>
                                <span className="ml-2">{model.specs.tuners}</span>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-700">Scale Length:</span>
                                <span className="ml-2">{model.specs.scaleLength}</span>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-700">Bridge:</span>
                                <span className="ml-2">{model.specs.bridge}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'musicians' && (
                <div className="bg-white rounded-lg border p-6">
                    <h2 className="text-2xl font-bold mb-4">Musicians Who Use This Guitar</h2>
                    
                    {totalMusicians === 0 ? (
                        <p className="text-gray-500">No musicians found for this guitar.</p>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                {currentMusicians.map((musician: any, index:number) => (
                                    <div key={index} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                                        <div className="flex items-start space-x-4">
                                            {musician.musicianImage ? (
                                                <Image
                                                    src={musician.musicianImage}
                                                    alt={musician.name}
                                                    width={80}
                                                    height={80}
                                                    className="object-cover w-20 h-20 rounded-full"
                                                />
                                            ) : (
                                                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                                                    <span className="text-gray-500 text-xs">No Image</span>
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold">{musician.name}</h3>
                                                <p className="text-sm text-blue-600 mb-2">
                                                    {musician.bands && Array.isArray(musician.bands)
                                                        ? musician.bands.join(', ')
                                                        : musician.bands}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination Dots */}
                            {totalPages > 1 && (
                                <div className="flex justify-center space-x-2">
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <button
                                            key={`page-${index}`}
                                            onClick={() => setMusiciansPage(index)}
                                            className={`w-3 h-3 rounded-full ${
                                                index === musiciansPage
                                                    ? 'bg-blue-500'
                                                    : 'bg-gray-300 hover:bg-gray-400'
                                            }`}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            {totalPages > 1 && (
                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={() => setMusiciansPage(Math.max(0, musiciansPage - 1))}
                                        disabled={musiciansPage === 0}
                                        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    >
                                        Previous
                                    </button>
                                    <span className="self-center text-sm text-gray-600">
                                        Page {musiciansPage + 1} of {totalPages}
                                    </span>
                                    <button
                                        onClick={() => setMusiciansPage(Math.min(totalPages - 1, musiciansPage + 1))}
                                        disabled={musiciansPage === totalPages - 1}
                                        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

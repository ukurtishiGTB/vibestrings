'use client';
import { useQuery } from "@apollo/client";
import { GET_ALL_BRANDS } from "@/graphql/queries";
import Image from "next/image";
import Link from "next/link";

export default function brandsPage(){
    const { data, loading, error}=useQuery(GET_ALL_BRANDS);

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error: {error.message}</p>;

    return(
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Guitar Brands</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data.findAllBrands.map((brand: any)=> (
                    <Link
                        key={brand.id}
                        href={`/brands/${brand.id}/models`}
                        className="border rounded-lg p-4 hover:shadow-lg transition-shadow duration-200 block"
                    >
                        {brand.image && (
                            <div className="mb-3 w-full h-40 relative">
                                <Image
                                    src={brand.image}
                                    alt={brand.name}
                                    layout="fill"
                                    className="object-contain"
                                    />
                            </div>
                        )}
                        <h2 className="text-lg font-semibold">{brand.name}</h2>
                        <p className="text-sm text-gray-600">Origin: {brand.origin}</p>
                        {brand.categories?.length>0 && (
                            <p className="text-sm text-gray-400 mt-1">
                                Categories: {brand.categories.join(', ')}
                            </p>
                        )}
                        </Link>
                        
                ))}
            </div>
        </div>
    );
}
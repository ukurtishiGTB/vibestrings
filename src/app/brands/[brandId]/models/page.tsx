'use client';
import { useQuery } from "@apollo/client";
import { FIND_BRAND_MODELS } from "@/graphql/queries";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function BrandModelsPage() {
    const { brandId } = useParams();
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [sortBy, setSortBy] = useState({ field: 'name', order: 'ASC' }); 

    const router = useRouter();

    const { data, loading, error } = useQuery(FIND_BRAND_MODELS, 
        { variables: { id: brandId, sortBy } }
    );

    if (loading) return <p className="text-center mt-4">Loading...</p>;
    if (error) return <p className="text-center mt-4 text-red-500">Error: {error.message}</p>;

    const models = data?.findBrandModels || [];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        
    };

    const filteredModels = models.filter((model: any) =>
        model.name.toLowerCase().includes(search.toLowerCase()) &&
        (typeFilter ? model.type?.toLowerCase().includes(typeFilter.toLowerCase()) : true)
    );

    return (
    <div className="p-4">
      <form onSubmit={handleSearch} className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search model..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border px-2 py-1 rounded flex-1"
        />
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">All Types</option>
          <option value="Electric">Electric</option>
          <option value="Acoustic">Acoustic</option>
          <option value="Bass">Bass</option>
        </select>
        <select
          value={sortBy.field}
          onChange={e => setSortBy(prev => ({ ...prev, field: e.target.value }))}
          className="border px-2 py-1 rounded"
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
          <option value="type">Sort by Type</option>
        </select>
        <select
          value={sortBy.order}
          onChange={e => setSortBy(prev => ({ ...prev, order: e.target.value }))}
          className="border px-2 py-1 rounded"
        >
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredModels.map((model: any, index: number) => (
          <div
            key={model.id}
            onClick={() => router.push(`/brands/${brandId}/models/${model.id}`)}
            className="border rounded shadow-md p-4 hover:shadow-lg cursor-pointer"
          >
            <Image
              src={model.image}
              alt={model.name}
              width={300}
              height={200}
              className="object-cover w-full h-40 mb-2 rounded"
            />
            <h3 className="text-lg font-semibold">{model.name}</h3>
            <p className="text-sm text-gray-600">{model.type}</p>
            <p className="text-sm text-gray-500 mt-1">{model.description}</p>
            <p className="text-lg font-bold mt-2">${model.price.toFixed(2)}</p>
            {model.specs && (
              <div className="mt-2 text-sm text-gray-500">
                <p>Body Wood: {model.specs.bodyWood}</p>
                <p>Neck Wood: {model.specs.neckWood}</p>
                <p>Fingerboard Wood: {model.specs.fingerboardWood}</p>
                <p>Pickups: {model.specs.pickups}</p>
                <p>Tuners: {model.specs.tuners}</p>
                <p>Scale Length: {model.specs.scaleLength}</p>
                <p>Bridge: {model.specs.bridge}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

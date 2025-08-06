import { gql} from "@apollo/client";
export const GET_ALL_BRANDS = gql`
    query GetAllBrands {
        findAllBrands {
            id
            name
            origin
            image
            categories
           }
        }
`;

export const GET_BRAND_BY_ID = gql`
    query GetBrandById($id: ID!) {
        findUniqueBrand(id: $id) {
            id
            name
            origin
            image
            categories
        }
    }
`;

export const FIND_BRAND_MODELS= gql`
    query FindBrandModels($id: ID!, $sortBy: sortBy!) {
        findBrandModels(id: $id, sortBy: $sortBy) {
            id
            name
            type
            image
            description
            price
            specs {
                bodyWood
                neckWood
                fingerboardWood
                pickups
                tuners
                scaleLength
                bridge
            }
        }
    }
`;
export const FIND_UNIQUE_MODEL = gql`
    query FindUniqueModel($brandId: ID!, $modelId: ID!) {
        findUniqueModel(brandId: $brandId, modelId: $modelId) {
            id
            name
            type
            image
            description
            price
            specs {
                bodyWood
                neckWood
                fingerboardWood
                pickups
                tuners
                scaleLength
                bridge
            }
            musicians {
                name
                musicianImage
                bands
            }
        }
    }
`;
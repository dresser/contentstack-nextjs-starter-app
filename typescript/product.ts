import { Image } from "./action";

type ProductSpec = {
    value: string;
    unit: string;
    property: string;
}

type ProductVariant = {
    variant_name: string;
    variant_image: Image
}

export type ProductPage = {
    title:string;
    url: string;
    specifications: [ProductSpec]
    product_variants: [ProductVariant]
}
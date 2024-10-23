type ProductSpec = {
    value: string;
    unit: string;
    property: string;
}

export type ProductPage = {
    title:string;
    url: string;
    specifications: [ProductSpec]
}
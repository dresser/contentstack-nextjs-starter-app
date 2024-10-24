import React from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';
import { ProductColorBlockModel } from "../typescript/component"
import { ProductPage } from '../typescript/product';
import { useState } from 'react';

export default function ProductColorBlock({ productColorBlock }: {productColorBlock : ProductColorBlockModel}) {

    const product = productColorBlock.product[0];
    const imageCount = product.product_variants.length;
    const initialImageIndex = 0;
    const [currentImage, setCurrentImage] = useState(product.product_variants[initialImageIndex].variant_image);

    const handleImageClick = (event, index) => {
        event.preventDefault();
        setCurrentImage(product.product_variants[index].variant_image)
    }

    return (
        <div className='product-color-block'  data-component="Product Color Block">
            <div className='title-block'>
                <h2>{productColorBlock.title} {product.title}</h2>
                <div className='subtitle'>{productColorBlock.subtitle}</div>
            </div>
            <div className='image-wrapper'>
            {currentImage ? (
              <img
                alt={currentImage.filename}
                src={currentImage.url}
                width="800px"
                height="600px"
                {...currentImage.$?.url as {}}
              />
            ) : (
              ''
            )}
            </div>
            <div className='row color-selectors'>
            {product.product_variants && (
                product.product_variants.map((productVariant, index) => {
                    return (
                        <div className='col-2'>
                            <a href="#" onClick={e => handleImageClick(e, index)}>
                                <img
                                        alt={productVariant.variant_image.filename}
                                        src={productVariant.variant_image.url+'?width=217'}
                                        width="217px"
                                        height="217px"
                                    />
                            </a>
                        </div>
                    );
                })
            )}
            </div>
        </div>
    );
}
import React from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';
import { ProductHero } from "../typescript/component"
import { ProductPage } from '../typescript/product';
import { useState } from 'react';

export default function ProductHeroBlock({ hero }: {hero : ProductHero}) {

  const banner = hero;
  const [imageIndex, setImageIndex] = useState(0);
  const imageCount = banner.images.length;
  const [currentImage, setCurrentImage] = useState(banner.images[imageIndex]);
  const selectedProduct = banner.selected_product[0];

  function handlePrevClick() {
    var newIndex = 0;
    if (imageIndex > 0) {
      newIndex = imageIndex - 1;
    } else {
      newIndex = imageCount - 1;
    }
    setImageIndex(newIndex);
    setCurrentImage(banner.images[newIndex]);
  }

  function handleNextClick() {
    var newIndex = 0;
    if (imageIndex < (imageCount - 1)) {
      newIndex = imageIndex + 1;
    } else {
      newIndex = 0;
    }
    setImageIndex(newIndex);
    setCurrentImage(banner.images[newIndex]);
  }

  return (
    <div  data-component="Product Hero">
      <div className='row mb-2'>
        <div className='col-md-6'>
          {banner.title && (
            <div {...banner.$?.title as {}}>{parse(banner.title)}</div>
          )}
          {banner.strapline ? (
            <p>
              {banner?.strapline}
            </p>
          ) : (
            ''
          )}
          <div className='cta-wrapper'>
            {banner.button.title && banner.button.link[0]?.url ? (
              (<Link
                href={banner?.button.link[0].url}
                className='btn tertiary-btn'>
                {banner?.button.title}
              </Link>)
            ) : (
              ''
            )}
          </div>
        </div>
        <div className='col-md-6'>
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
          <div className='row scroll-wrapper'>
            <div className='col-2 scroll-wrapper-index'>
              {(imageIndex + 1).toString().padStart(2, '0')}
            </div>
            <div className='col-2 scroll-wrapper-image-controls'>
              <button onClick={handlePrevClick}>&lt;</button>
              <button onClick={handleNextClick}>&gt;</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
      {selectedProduct && (
        selectedProduct.specifications.map((productInfo) => {
          return (
            <div key={productInfo.property} className='col-2'>
              <div className='product-attribute'>
                <div className='product-attribute-value'>
                  <span className='product-attribute-value-number'>
                    {productInfo.value}
                  </span>
                  <span className='product-attribute-value-unit'>
                    {productInfo.unit}
                  </span>
                </div>
                <div className='product-attribute-property'>
                  {productInfo.property}
                </div>
              </div>
            </div>);
        })
      )}
      </div>
    </div>
  );
}

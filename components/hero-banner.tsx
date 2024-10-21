import React from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';
import { Image, Action, VideoCta, ButtonCta } from "../typescript/action";
import {ProductHero } from "../typescript/component"

{/*
type AdditionalParam = {
  title: string;
  strapline: string;
}

type ProductHero = {
  title:string;
  strapline: string;
  images: [Image];
  button: ButtonCta;
  video: VideoCta;
  $: AdditionalParam;
}
*/}

export default function HeroBanner({ hero }: {hero : ProductHero}) {

  const banner = hero;
  const firstImage = banner.images[0];

  return (
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
        {firstImage ? (
          <img
            alt={firstImage.filename}
            src={firstImage.url}
            width="800px"
            height="600px"
            {...firstImage.$?.url as {}}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

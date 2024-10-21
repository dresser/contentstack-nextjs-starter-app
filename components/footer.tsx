import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';
import { onEntryChange } from '../contentstack-sdk';
import { getFooterRes } from '../helper';
import Skeleton from 'react-loading-skeleton';
import { FooterProps, Entry, Links } from "../typescript/layout";
import { StrictMode } from 'react';

export default function Footer({ footer, entries }: {footer: FooterProps, entries: Entry}) {

  const [getFooter, setFooter] = useState(footer);
  
  function buildNavigation(ent: Entry, ft: FooterProps) {
    let newFooter = { ...ft };
    /*
    if (ent.length !== newFooter.navigation.link.length) {
      ent.forEach((entry) => {
        const fFound = newFooter?.navigation.link.find(
          (nlink: Links) => nlink.title === entry.title
        );
        if (!fFound) {
          newFooter.navigation.link?.push({
            title: entry.title,
            href: entry.url,
            $: entry.$,
          });
        }
      });
    }*/
    return newFooter;
  }

  async function fetchData() {
    try {
      if (footer && entries) {
        const footerRes = await getFooterRes();
        const newfooter = buildNavigation(entries, footerRes);
        setFooter(newfooter);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    onEntryChange(() => fetchData());
  }, [footer]);

  const footerData = getFooter ? getFooter : undefined;

  return (
    <footer className='text-white bg-dark' key={Math.random()}>
      <StrictMode>
      <div className='max-width footer-div row'>
        <div className='col-6'>
          {footerData && footerData.footer_image ? (
            (<Link href='/' className='logo-tag'>

              <img
                src={footerData.footer_image.url}
                alt={footerData.title}
                title={footerData.title}
                {...footer.footer_image.$?.url as {}}
                className='logo footer-logo'
              />

            </Link>)
          ) : (
            <Skeleton width={150} />
          )}
        </div>
        <div className='col-6'>
          <div className='row'>
              {footerData ? (
                footerData.navigation.map((menuItem, index) => (
                  <div className='col-4' key={menuItem.label}>
                    {menuItem.label}
                    <ul>
                    {footerData.navigation[index].links.map((menuItemLink) => (
                        <li key={menuItemLink.title}>
                          <Link href={menuItemLink.href} legacyBehavior>{menuItemLink.title}</Link>
                        </li>
                      ))
                    }
                    </ul>
                  </div>
                ))
              ) : (
                <Skeleton width={300} />
              )}
          </div>
          <div className='row'>
            <div className='col-4 align-self-end'>
              {footerData ? (
                footerData.social?.map((social) => (
                  <a
                    href={social.link.href}
                    title={social.link.title}
                    key={social.link.title}
                  >
                    {social.icon && (
                      <img
                        src={social.icon.url}
                        alt={social.link.title}
                        {...social.icon.$?.url as {}}
                      />
                    )}
                  </a>
                ))
              ) : (
                <Skeleton width={200} />
              )}
            </div>
          </div>
        </div>
      </div>
      {footerData && typeof footerData.copyright === 'string' ? (
        <div className='copyright' {...footer.$?.copyright as {}}>
          {parse(footerData.copyright)}
        </div>
      ) : (
        <div className='copyright'>
          <Skeleton width={500} />
        </div>
      )}
      </StrictMode>
    </footer>
  );
}
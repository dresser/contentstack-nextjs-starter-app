import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import parse from 'html-react-parser';
import { onEntryChange } from '../contentstack-sdk';
import { getHeaderRes } from '../helper';
import Skeleton from 'react-loading-skeleton';
import { HeaderProps, Entry, NavLinks, HeaderNavItem } from "../typescript/layout";

export default function Header({ header, entries }: {header: HeaderProps, entries: Entry}) {

  const router = useRouter();
  const [getHeader, setHeader] = useState(header);

  function buildNavigation(ent: Entry, hd: HeaderProps) {
    let newHeader={...hd};
    if (ent.length!== newHeader.navigation_menu.length) {
          ent.forEach((entry) => {
            const hFound = newHeader?.navigation_menu.find(
              (navLink: NavLinks) => navLink.label === entry.title
            );
            
            if (!hFound) {
              newHeader.navigation_menu?.push({
                label: entry.title,
                page_reference: [
                  { title: entry.title, url: entry.url, $: entry.$ },
                ]//,
                //subitems: [] as HeaderNavItem[]
              });
            }
            
          });
    }
    return newHeader
  }

  async function fetchData() {
    try {
      if (header && entries) {
      const headerRes = await getHeaderRes();
      const newHeader = buildNavigation(entries,headerRes)
      setHeader(newHeader);
    }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (header && entries) {
      onEntryChange(() => fetchData());
    }
  }, [header]);
  const headerData = getHeader ? getHeader : undefined;
  
  return (
    <header className='header'>
      <div className='max-width header-div'>
        <div className='wrapper-logo'>
          {headerData ? (
            (<Link href='/' className='logo-tag' title='Contentstack'>

              <img
                className='logo'
                src={headerData.logo.url}
                alt={headerData.title}
                title={headerData.title}
                {...headerData.logo.$?.url as {}}
              />

            </Link>)
          ) : (
            <Skeleton width={150} />
          )}
        </div>
        <input className='menu-btn' type='checkbox' id='menu-btn' />
        <label className='menu-icon' htmlFor='menu-btn'>
          <span className='navicon' />
        </label>
        <nav className='menu'>
          <ul className='nav-ul header-ul'>
            {headerData ? (
              headerData.navigation_menu.map((listItem) => {
                const className =
                  router.asPath === listItem.page_reference[0].url ? 'active' : '';
                return (
                  <li
                    key={listItem.label}
                    className='nav-li'
                    {...listItem.page_reference[0].$?.url as {}}
                  >
                    <Link href={listItem.page_reference[0].url} className={className}>
                      {listItem.label}
                    </Link>
                  </li>
                );
              })
            ) : (
              <Skeleton width={300} />
            )}
          </ul>
        </nav>
        <nav>
        <ul className='nav-ul header-ul'>
          {headerData ? (
              headerData.account_buttons.map((list) => {
                return (
              <li key={list.title}>
                <button type="button" className={'btn ' + list.button_style}>
                  {list.title}
                </button>
              </li>
                );
              })
            ) : (
              <Skeleton width={300} />
            )}
        </ul>
        </nav>
      </div>
    </header>
  );
}
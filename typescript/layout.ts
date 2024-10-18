import { Image } from "./action";
import { Component } from "../typescript/component";

type AdditionalParam = {
  title: {};
  copyright: string;
  announcement_text: string;
  label: {};
  url: string;
}

type EntryData = {
  title: string;
  url: string;
  $: AdditionalParam;
}

type Announcement = {
  show_announcement: boolean;
  announcement_text: string;
  $: AdditionalParam;
}

export type PageRef = {
  title: string;
  url: string;
  $: AdditionalParam;
}

type SocialLink = {
  link: Links;
  icon: Image;
}

type NavigationItem = {
  label: string;
  links: [Links];
}

type Author = {
  title: string;
  $: AdditionalParam;
}

type Blog = {
  url: string;
  body: string;
  title: string;
  $: AdditionalParam;
}

export type Posts = {
  locale: string;
  author: [Author];
  body: string;
  date: string;
  featured_image: {};
  is_archived: boolean;
  related_post: [Blog];
  seo: {};
  url:string;
  title: string;
  _owner: {}
}


export type HeaderProps = {
  locale:string;
  logo: Image;
  navigation_menu:[List]
  notification_bar: Announcement;
  title: string;
  uid: string;
  copyright: string;
  $: AdditionalParam;
  account_buttons:[Button];
}

export type Entry = [
  entry: EntryData
]

type List = {
  label?: string;
  page_reference: [PageRef];
  $: {};
  href?: string;
  sub_items:[List];
}

type Button = {
  title?: string;
  popup_type?: string;
  button_style?: string;
}

export type NavLinks = {
  label?: string;
}

export type Links = {
  label?: string;
  title: string;
  href: string;
  $:AdditionalParam;
}

export type PageProps = {
  locale: string;
  page_components: Component[];
  uid: string;
  url: string;
  title: string;
  seo: {};
}

export type FooterProps = {
  footer_image: Image;
  title: string;
  social: [SocialLink];
  navigation: [NavigationItem];
  copyright: string;
  locale: string, 
  uid: string;
  $: AdditionalParam;
}

export type ChilderenProps = {
  props: {};
  type: Function;
}
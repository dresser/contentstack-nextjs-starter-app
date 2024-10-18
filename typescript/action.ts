import { PageRef } from  "../typescript/layout";

type AdditionalParam = {
  url: string;
  title: {};
}

export type Action = {
    title: string;
    href: string;
    $: AdditionalParam;
  }

export type Image = {
    filename: string;
    url: string;
    $: AdditionalParam;
  }

export type VideoCta = {
  title: string;
  youTubeId: string;
  icon: Image;
}
  
export type ButtonCta = {
  title: string;
  link: [PageRef];
  icon: Image;
}
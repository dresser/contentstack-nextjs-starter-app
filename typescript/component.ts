import { Action, Image, VideoCta, ButtonCta } from "./action";
import { ProductPage } from "./product";

type AdditionalParam = {
  title: string;
  title_h2: string;
  title_h3: string;
  description: string;
  banner_title: string;
  banner_description: string;
  designation: string;
  name: string;
  html_code: string;
  body: string;
  date: string;
}

type Employee = {
  image: Image;
  name: string;
  designation: string;
  $: AdditionalParam;
}

type BucketList = [
  BucketArray:{
    title_h3: string;
    description: string;
    url: string;
    call_to_action: Action;
    icon: Image;
    $: AdditionalParam;
  }
]

type Card = [
  cardArray: {
    title_h3: string;
    description: string;
    call_to_action: Action;
    $: AdditionalParam;
    }
]

type Article = {
  href: string;
  title: string;
  $: AdditionalParam;
}

type FeaturedBlog = [
  BlogArray: {
    title: string;
    featured_image: Image;
    body: string;
    url: string;
    $: AdditionalParam;
  }
]

type Widget = {
  title_h2: string;
  type?: string;
  $: AdditionalParam;
}

export type Component = {
  product_hero_block?: ProductHero;
  section?: SectionProps;
  section_with_buckets?: SectionWithBucket;
  from_blog?: FeaturedBlogData;
  section_with_cards?: Cards;
  section_with_html_code?: AdditionalParamProps;
  our_team?: TeamProps;
  widget?: Widget;
}

export type SectionWithBucket = {
    bucket_tabular: boolean
    title_h2: string;
    buckets: BucketList;
    description: string;
    $: AdditionalParam;
  }

export type Cards = {
    cards: Card;
  }
  
export type Product = {
  name: string;
}

export type ProductHero = {
    title:string;
    strapline: string;
    images: [Image];
    button: ButtonCta;
    video: VideoCta;
    $: AdditionalParam;
    selected_product: [ProductPage];
  }
  
export type AdditionalParamProps = {
    html_code_alignment: string;
    title: string;
    $: AdditionalParam;
    description: string;
    html_code: string;
  }
  
export type SectionProps = {
    title_h2: String;
    description: string;
    call_to_action: Action;
    image: Image;
    image_alignment: string;
    $: AdditionalParam;
  } 
  
export type TeamProps = {
    title_h2: string;
    description: string;
    $: AdditionalParam;
    employees: [Employee];
  }
  
export type FeaturedBlogData = {
    title_h2: string;
    view_articles: Article;
    featured_blogs: FeaturedBlog;
    $: AdditionalParam;
}

export type RenderProps = {
  blogPost?: boolean;
  contentTypeUid: string;
  entryUid: string;
  locale: string;
  pageComponents:Component[];
}
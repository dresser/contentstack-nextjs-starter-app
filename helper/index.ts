import { addEditableTags } from "@contentstack/utils";
import { Page, BlogPosts } from "../typescript/pages";
import getConfig from "next/config";
import { FooterProps, HeaderProps } from "../typescript/layout";
import { getEntry, getEntryByUrl } from "../contentstack-sdk";

const { publicRuntimeConfig } = getConfig();
const envConfig = process.env.CONTENTSTACK_API_KEY
  ? process.env
  : publicRuntimeConfig;

const liveEdit = envConfig.CONTENTSTACK_LIVE_EDIT_TAGS === "true";

export const getHeaderRes = async (): Promise<HeaderProps> => {
  const response = (await getEntry({
    contentTypeUid: "header",
    referenceFieldPath: ["navigation_menu.page_reference"],
    jsonRtePath: ["notification_bar.announcement_text"],
  })) as HeaderProps[][];

  liveEdit && addEditableTags(response[0][0], "header", true);
  return response[0][0];
};

export const getFooterRes = async (): Promise<FooterProps> => {
  const response = (await getEntry({
    contentTypeUid: "footer",
    referenceFieldPath: undefined,
    jsonRtePath: ["copyright"],
  })) as FooterProps[][];
  liveEdit && addEditableTags(response[0][0], "footer", true);
  return response[0][0];
};

export const getAllEntries = async (): Promise<Page[]> => {
  const response = (await getEntry({
    contentTypeUid: "home_page",
    referenceFieldPath: undefined,
    jsonRtePath: undefined,
  })) as Page[][];
  liveEdit &&
    response[0].forEach((entry) => addEditableTags(entry, "home_page", true));
  return response[0];
};

export const getPageRes = async (entryUrl: string): Promise<Page> => {
  const response = (await getEntryByUrl({
    contentTypeUid: "home_page",
    entryUrl,
    referenceFieldPath: [
      "page_components.product_hero_block.selected_product",
      "page_components.product_hero_block.button.link",
      "page_components.product_color_block.product"
    ],
    jsonRtePath: [
      "page_components.product_hero_block.title"
    ],
  })) as Page[];
  liveEdit && addEditableTags(response[0], "home_page", true);
  return response[0];
};

export const getBlogListRes = async (): Promise<BlogPosts[]> => {
  const response = (await getEntry({
    contentTypeUid: "blog_post",
    referenceFieldPath: ["author", "related_post"],
    jsonRtePath: ["body"],
  })) as BlogPosts[][];
  liveEdit &&
    response[0].forEach((entry) => addEditableTags(entry, "blog_post", true));
  return response[0];
};

export const getBlogPostRes = async (entryUrl: string): Promise<BlogPosts> => {
  const response = (await getEntryByUrl({
    contentTypeUid: "blog_post",
    entryUrl,
    referenceFieldPath: ["author", "related_post"],
    jsonRtePath: ["body", "related_post.body"],
  })) as BlogPosts[];
  liveEdit && addEditableTags(response[0], "blog_post", true);
  return response[0];
};

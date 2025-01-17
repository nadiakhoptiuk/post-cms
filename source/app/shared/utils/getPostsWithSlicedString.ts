import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";

import type { TPost } from "../types/react";

export const getPostsWithSlicedString = (posts: Array<TPost>) => {
  const { window: serverWindow } = new JSDOM("");
  const purify = DOMPurify(serverWindow);

  return posts.map((item) => {
    const sanitizedString = purify
      .sanitize(item.content, {
        ALLOWED_TAGS: [],
        ALLOWED_ATTR: [],
      })
      .slice(0, 250);
    return { ...item, content: sanitizedString };
  });
};

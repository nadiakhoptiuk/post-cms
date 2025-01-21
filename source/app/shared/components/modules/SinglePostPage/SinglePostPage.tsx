import { PostContent, PostHeading } from "../../ui/PostElements";

import type { TDBPostRecord, TPost, TPostToTag } from "~/shared/types/react";

export const SinglePostPage = ({
  post,
  location,
}: {
  post: TDBPostRecord & TPost & { tags: TPostToTag[] };
  location: "dashboard" | "site" | "profile";
}) => {
  return (
    <>
      <PostHeading post={post} location={location} />
      <PostContent content={post.content} title={post.title} tags={post.tags} />
    </>
  );
};

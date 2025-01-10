import { PostContent, PostHeading } from "../../ui/PostElements";

import type { TDBPostRecord, TPost } from "~/shared/types/react";

export const SinglePostPage = ({ post }: { post: TPost & TDBPostRecord }) => {
  return (
    <>
      <PostHeading post={post} />
      <PostContent content={post.content} title={post.title} />
    </>
  );
};

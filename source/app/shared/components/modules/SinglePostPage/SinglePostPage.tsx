import { useTranslation } from "react-i18next";
import { IconAlertSquareRounded } from "@tabler/icons-react";

import { PostContent, PostHeading } from "../../ui/PostElements";

import type { TDBPostRecord, TPost } from "~/shared/types/react";
import { StyledLink } from "../../ui/StyledLink";

export const SinglePostPage = ({
  post,
  userId,
}: {
  post: TPost & TDBPostRecord;
  userId: number;
}) => {
  const { t } = useTranslation("common");

  return (
    <>
      <PostHeading post={post} />
      <PostContent content={post.content} title={post.title} />

      {/* TODO check if admin is able to complain */}
      {userId && userId !== post.ownerId && (
        <StyledLink
          to="complain"
          variant="unstyled"
          fill="outline"
          style={{ marginTop: 30 }}
        >
          <IconAlertSquareRounded />
          {t("buttons.button.complain")}
        </StyledLink>
      )}
    </>
  );
};

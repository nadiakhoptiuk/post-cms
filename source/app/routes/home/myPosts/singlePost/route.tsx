import { Box, Container } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";

import { PostForm } from "~/shared/components/modules/PostForm";
import { StyledLink } from "~/shared/components/ui/StyledLink";
import { TimestampItem } from "~/shared/components/ui/TimestampItem";
import { NavigationLink } from "~/shared/constants/navigation";
import { formatDateWithTime } from "~/shared/utils/dateFormat";
import type { TLoaderData } from "./loader";

export const handle = { i18n: ["posts", "common"] };

export { loader } from "./loader";
export { action } from "./action";

export default function HomeMyCurrentPostPage() {
  const { post } = useLoaderData<TLoaderData>();
  const { t } = useTranslation("posts");

  const {
    createdAt,
    updatedAt,
    updatedBy,
    publishedAt,
    moderatedBy,
    title,
    content,
    slug,
  } = post;

  const createdDate = formatDateWithTime(createdAt);
  const publicationDate = formatDateWithTime(publishedAt);
  const updatedDate = formatDateWithTime(updatedAt);

  return (
    <Box component="section" py="lg">
      <Container>
        <StyledLink
          to={NavigationLink.MY_POSTS}
          variant="unstyled"
          fill="filled"
          style={{ marginBottom: "20px" }}
        >
          <IconArrowNarrowLeft size={18} />
          {t("link.toMyPosts")}
        </StyledLink>

        <Box mb={25}>
          <TimestampItem type="created" date={createdDate} />

          {publicationDate && moderatedBy && (
            <TimestampItem
              type="published"
              date={publicationDate}
              madeBy={moderatedBy}
            />
          )}

          {updatedDate && updatedBy && (
            <TimestampItem
              type="updated"
              date={updatedDate}
              madeBy={updatedBy}
            />
          )}
        </Box>

        <PostForm postData={{ title, content, slug }} formType="update" />
      </Container>
    </Box>
  );
}

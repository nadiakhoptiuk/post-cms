import { Box, Container } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";

import { PostForm } from "~/shared/components/modules/PostForm";
import { StyledLink } from "~/shared/components/ui/StyledLink";
import { TimestampItem } from "~/shared/components/ui/TimestampItem";
import { NavigationLink } from "~/shared/constants/navigation";
import type { TLoaderData } from "./loader";

export const handle = { i18n: ["posts", "common"] };

export { loader } from "./loader";
export { action } from "./action";

export default function HomeMyCurrentPostPage() {
  const { post, allTags } = useLoaderData<TLoaderData>();
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
    tags,
  } = post;

  return (
    <Box component="section" py="lg">
      <Container>
        <StyledLink
          to={NavigationLink.MY_POSTS}
          mb="md"
          leftSection={<IconArrowNarrowLeft size={18} />}
        >
          {t("link.toMyPosts")}
        </StyledLink>

        <Box mb={25}>
          <TimestampItem type="created" date={createdAt} relative />

          {publishedAt && moderatedBy && (
            <TimestampItem
              type="published"
              date={publishedAt}
              madeBy={moderatedBy}
              relative
            />
          )}

          {updatedAt && updatedBy && (
            <TimestampItem
              type="updated"
              date={updatedAt}
              madeBy={updatedBy}
              relative
            />
          )}
        </Box>

        <PostForm
          postData={{ title, content, slug, tags }}
          formType="update"
          allTags={allTags}
        />
      </Container>
    </Box>
  );
}

import { Box, Container } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router";

import { PostForm } from "~/shared/components/modules/PostForm";
import { StyledLink } from "~/shared/components/ui/StyledLink";
import { TimestampItem } from "~/shared/components/ui/TimestampItem";
import { NavigationLink } from "~/shared/constants/navigation";
import { formatDateWithTime } from "~/shared/utils/dateFormat";

export const handle = { i18n: ["posts", "common"] };

export { loader } from "./loader";

export default function DashBoardMyCurrentPostPage() {
  const { t } = useTranslation("posts");
  const { post } = useLoaderData();

  const {
    createdAt,
    updatedAt,
    updatedBy,
    deletedAt,
    deletedBy,
    publishedAt,
    moderatedBy,
    ...postData
  } = post;

  const createdDate = formatDateWithTime(createdAt);
  const publicationDate = formatDateWithTime(publishedAt);
  const updatedDate = formatDateWithTime(updatedAt);
  const deletedDate = formatDateWithTime(deletedAt);

  return (
    <Box component="section">
      <Container>
        <StyledLink
          to={NavigationLink.DASHBOARD_MY_POSTS}
          variant="unstyled"
          fill="filled"
          style={{ marginBottom: "20px" }}
        >
          <IconArrowNarrowLeft size={18} />
          {t("link.backToMyPosts")}
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

          {deletedDate && deletedBy && (
            <TimestampItem
              type="deleted"
              date={deletedDate}
              madeBy={deletedBy}
            />
          )}
        </Box>

        <PostForm
          postData={post}
          formType="update"
          action={NavigationLink.UPDATE_POST}
        />
      </Container>
    </Box>
  );
}

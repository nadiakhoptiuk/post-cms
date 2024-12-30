import { Box, Container, Text, Title } from "@mantine/core";
import { StyledLink } from "~/shared/components/ui/StyledLink";

export default function NotFoundPage() {
  return (
    <Box component="section" py="xl">
      <Container
        styles={{
          root: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        <Title order={1} mb="md">
          404 - Page Not Found
        </Title>
        <Text mb="md">The page you are looking for does not exist.</Text>

        <StyledLink to="/" variant="accent">
          Go back to Home
        </StyledLink>
      </Container>
    </Box>
  );
}

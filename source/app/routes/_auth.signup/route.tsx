import { Box, Container } from "@mantine/core";

import { SignupForm } from "~/shared/components/modules/forms/SignupForm";

export { action } from "./action";

export const handle = {
  i18n: ["auth", "common", "user"],
};

export default function SignupPage() {
  return (
    <Box component="section" py="lg">
      <Container
        styles={{
          root: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        <SignupForm />
      </Container>
    </Box>
  );
}

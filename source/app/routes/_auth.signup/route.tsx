import { Box, Container } from "@mantine/core";

import { AuthForm } from "~/shared/components/modules/forms/AuthForm";

export { action } from "./action";

export const handle = {
  i18n: "auth",
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
        <AuthForm
          defaultValues={{ email: "", password: "" }}
          formType="signup"
        />
      </Container>
    </Box>
  );
}

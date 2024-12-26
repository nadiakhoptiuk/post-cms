import { Box, Container } from "@mantine/core";

import { AuthForm } from "~/shared/components/modules/forms/LoginForm";

export { action } from "./action";

export const handle = {
  i18n: "auth",
};

export default function LoginPage() {
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
          formType="login"
        />
      </Container>
    </Box>
  );
}

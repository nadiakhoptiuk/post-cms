import { Box, Container } from "@mantine/core";
import { AuthForm } from "../AuthForm";

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
        <AuthForm formType="signup" />
      </Container>
    </Box>
  );
}

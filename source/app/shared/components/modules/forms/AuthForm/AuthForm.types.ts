export type TAuthForm = {
  defaultValues: {
    email: string;
    password: string;
  };
  formType: "signup" | "login";
};

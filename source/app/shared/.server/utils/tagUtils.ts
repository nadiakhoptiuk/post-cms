export const getTagDataFromRequest = (formData: FormData) => {
  const name = formData.get("name");

  if (typeof name !== "string") {
    throw new Error("Name is not a string");
  }

  return { name };
};

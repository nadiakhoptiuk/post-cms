import parse from "html-react-parser";
import { Box } from "@mantine/core";

export const Post = ({ content }: { content: string }) => {
  return <Box>{parse(content)}</Box>;
};

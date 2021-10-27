import React from "react";
import {
  useColorModeValue,
  Text,
  Heading,
  Box,
  Center,
} from "@chakra-ui/react";

const PostItem = ({ title, body }) => {
  return (
    <Box
      sx={{
        _hover: { bg: "#e1e1e1" },
        transition: ".3s ease-in-out",
        margin: "1rem",
      }}
      columns={{ sm: 1, md: 2 }}
      rounded="lg"
      bg={useColorModeValue("white", "gray.700")}
      boxShadow="lg"
      p={4}
    >
      <Center>
        <Heading marginBottom="15px">{title}</Heading>
      </Center>
      <Text isTruncated>{body}</Text>
    </Box>
  );
};

export default PostItem;

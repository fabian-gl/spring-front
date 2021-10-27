import React from "react";
import {
  useColorModeValue,
  Heading,
  Box,
  Center,
  Image,
} from "@chakra-ui/react";

const PhotoItem = ({ title, thumbnailUrl }) => {
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
        <Image src={thumbnailUrl} maxH="100%" maxW="100%" />
      </Center>
      <Center>
        <Heading textAlign="center" size="sm" marginBottom="15px">
          {title}
        </Heading>
      </Center>
    </Box>
  );
};

export default PhotoItem;

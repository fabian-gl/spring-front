import React, { useState, useEffect } from "react";

import { getPhotos } from "../utils/serverCalls";

import PhotoItem from "./PhotoItem";

import {
  Flex,
  useColorModeValue,
  Stack,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";

const Photos = () => {
  const [photos, setPhotos] = useState([]);

  const getAllPhotos = async () => {
    const fetchedPhotos = await getPhotos();
    setPhotos(fetchedPhotos);
  };
  useEffect(() => {
    getAllPhotos();
  }, []);

  return (
    <Flex
      minH="85vh"
      align="center"
      justify="center"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6} minW="80vw">
        <Stack align="center">
          <Heading fontSize="4xl">Photos</Heading>
        </Stack>
        <SimpleGrid
          columns={[1, 2, 3, 4, 5]}
          rounded="lg"
          bg={useColorModeValue("white", "gray.700")}
          boxShadow="lg"
          py={8}
          px={[0, 0, 8]}
        >
          {photos.map(({ id, title, thumbnailUrl }) => (
            <PhotoItem key={id} title={title} thumbnailUrl={thumbnailUrl} />
          ))}
        </SimpleGrid>
      </Stack>
    </Flex>
  );
};

export default Photos;

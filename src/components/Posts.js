import React, { useState, useEffect } from "react";
import { getPosts } from "../utils/serverCalls";

import PostItem from "./PostItem";

import {
  Flex,
  useColorModeValue,
  Stack,
  Heading,
  Box,
  Center,
} from "@chakra-ui/react";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    const fetchedPosts = await getPosts();
    setPosts(fetchedPosts);
  };
  useEffect(() => {
    getAllPosts();
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
          <Heading fontSize="4xl">Posts</Heading>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue("white", "gray.700")}
          boxShadow="lg"
          py={8}
          px={[0, 0, 8]}
        >
          {posts.map(({ title, body }) => (
            <PostItem title={title} body={body} />
          ))}
        </Box>
      </Stack>
    </Flex>
  );
};

export default Posts;

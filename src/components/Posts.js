import React, { useState, useEffect } from "react";
import { getPosts } from "../utils/serverCalls";
import Swal from "sweetalert2";
import PostItem from "./PostItem";
import NothingToShow from "./NothingToShow";

import { Flex, useColorModeValue, Stack, Heading, Box } from "@chakra-ui/react";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    try {
      const posts = await getPosts();
      setPosts(posts);
    } catch (error) {
      Swal.fire(error, "", "error");
    }
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
          {posts.length ? (
            posts.map(({ id, title, body }) => (
              <PostItem key={id} title={title} body={body} />
            ))
          ) : (
            <NothingToShow message="No posts to show" />
          )}
        </Box>
      </Stack>
    </Flex>
  );
};

export default Posts;

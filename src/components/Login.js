import React from "react";
import { useHistory } from "react-router-dom";

import * as Yup from "yup";
import { Formik, Form } from "formik";
import Swal from "sweetalert2";

import serverCalls from "../utils/serverCalls";

import {
  Flex,
  useColorModeValue,
  Stack,
  Heading,
  Box,
  Input,
} from "@chakra-ui/react";

import ChakraInput from "./ChakraInput";

import { useDispatch } from "react-redux";
import { login } from "../features/user/userSlice";

const loginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
});

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async (userData) => {
    try {
      const response = await serverCalls.login(userData);

      const { firstName, token } = response;
      dispatch(login({ userData: { firstName }, token }));
      history.push("/posts");
    } catch (error) {
      Swal.fire(error, "", "error");
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6} minW="60vw">
        <Stack align="center">
          <Heading fontSize="4xl">Login</Heading>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue("white", "gray.700")}
          boxShadow="lg"
          p={8}
        >
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <ChakraInput name="email" type="email" label="Email" />
              <ChakraInput name="password" type="password" label="Password" />

              <Input
                type="submit"
                bg="blue.400"
                color="white"
                width="100%"
                marginTop="10px"
                _hover={{
                  bg: "blue.500",
                }}
                value="Register"
              />
            </Form>
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;

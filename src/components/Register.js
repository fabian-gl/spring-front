import React from "react";
import { useHistory } from "react-router-dom";

import * as Yup from "yup";
import { Formik, Form } from "formik";
import Swal from "sweetalert2";

import { register } from "../utils/serverCalls";
import {
  Flex,
  useColorModeValue,
  Stack,
  Heading,
  Box,
  Input,
} from "@chakra-ui/react";

import ChakraInput from "./ChakraInput";

const registerSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
});

const Register = () => {
  const history = useHistory();

  const handleSubmit = async (userData) => {
    try {
      await register(userData);
      await Swal.fire(
        "You have been successfully registered",
        "Now log in please",
        "success"
      );
      history.push("/login");
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
          <Heading fontSize="4xl">Registration</Heading>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue("white", "gray.700")}
          boxShadow="lg"
          p={8}
        >
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            }}
            validationSchema={registerSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <ChakraInput name="firstName" type="text" label="First Name" />
              <ChakraInput name="lastName" type="text" label="Last Name" />
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

export default Register;

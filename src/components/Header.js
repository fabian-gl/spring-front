import logo from "../logo.svg";

import React, { useState } from "react";
import {
  Flex,
  Button,
  IconButton,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  Center,
  MenuItem,
  Image,
} from "@chakra-ui/react";
import { Link, useRouteMatch } from "react-router-dom";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";

const Header = ({
  webLinks = [
    { name: "Posts", path: "/posts" },
    { name: "Photos", path: "/photos" },
  ],
  userLinks = [
    { name: "Register", path: "/register" },
    { name: "Login", path: "/login" },
  ],
}) => {
  const activeTextColor = "blue.200";
  const [display, setDisplay] = useState("none");

  const isAuth = false;

  let itemsNav = webLinks.map((link, index) => (
    <ActiveLink
      key={index}
      activeOnlyWhenExact={true}
      to={link.path}
      label={link.name}
      activeTextColor={activeTextColor}
    />
  ));
  let userNav = userLinks.map((link, index) => (
    <ActiveLink
      key={index}
      activeOnlyWhenExact={true}
      to={link.path}
      label={link.name}
      activeTextColor={activeTextColor}
    />
  ));

  const handleLogout = () => {
    // dispatch(logout());
  };

  return (
    <nav>
      <Flex>
        <Flex display={["none", "none", "flex", "flex"]}>
          <Link to="/">
            <Center>
              <Image h="30px" src={logo} alt="Redux" margin="auto" />
            </Center>
          </Link>
          {itemsNav}
        </Flex>
        <Spacer />
        {!isAuth ? (
          <Flex align="center" ml="auto" mr={5}>
            <Flex display={["none", "none", "flex", "flex"]}>{userNav}</Flex>
          </Flex>
        ) : (
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              user
              <ChevronDownIcon />
            </MenuButton>
            <MenuList alignItems={"center"}>
              <MenuItem color="red" onClick={handleLogout}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        )}
        <Flex m={2} p={2}>
          <IconButton
            aria-label="Open Menu"
            size="lg"
            mr={2}
            my={3}
            icon={<HamburgerIcon />}
            display={["flex", "flex", "none", "none"]}
            onClick={() => setDisplay("flex")}
          />
        </Flex>
        <Flex
          w="100vw"
          bgColor="gray.50"
          zIndex={20}
          h="100vh"
          pos="fixed"
          top="0"
          left="0"
          overflowY="auto"
          flexDir="column"
          display={display}
        >
          <Flex justify="flex-end">
            <IconButton
              aria-label="Close Menu"
              mt={3}
              mr={3}
              size="md"
              icon={<CloseIcon />}
              onClick={() => setDisplay("none")}
            />
          </Flex>
          <Flex flexDir="column" align="center">
            {itemsNav}
            <hr />
            {userNav}
          </Flex>
        </Flex>
      </Flex>
    </nav>
  );
};
function ActiveLink({ activeOnlyWhenExact, to, label, activeTextColor }) {
  let activeMatch = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });
  if (activeMatch) {
    return (
      <Button
        as="a"
        href={to}
        variant="ghost"
        my={3}
        w="100%"
        color={activeTextColor}
      >
        {label}
      </Button>
    );
  } else {
    return (
      <div>
        <Button as="a" variant="ghost" my={3} w="100%" href={to}>
          {label}
        </Button>
      </div>
    );
  }
}

export default Header;

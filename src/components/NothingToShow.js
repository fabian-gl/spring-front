import nothingToShowImage from "../assets/nothing-to-show.png";

import { Heading, Center } from "@chakra-ui/react";

const NothingToShow = ({ message }) => {
  return (
    <Center flexDir="column">
      <img src={nothingToShowImage} alt="" />
      <Heading size="md" marginTop="-35px">
        {message}
      </Heading>
    </Center>
  );
};

export default NothingToShow;

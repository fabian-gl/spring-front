import React, { useState, useEffect } from "react";

import ReactPaginate from "react-paginate";
import "./paginator.css";
import Swal from "sweetalert2";

import { getPhotos } from "../utils/serverCalls";
import PhotoItem from "./PhotoItem";
import useWindowSize from "../hooks/useWindowSize";
import NothingToShow from "./NothingToShow";

import {
  Flex,
  useColorModeValue,
  Stack,
  Heading,
  SimpleGrid,
  Box,
  Center,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Image,
} from "@chakra-ui/react";

const PhotosSlice = ({ photosSlice, loading }) => {
  const colorMode = useColorModeValue("gray.50", "gray.800");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleClick = (title, url) => {
    setTitle(title);
    setUrl(url);
    onOpen();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={url} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Flex minH="85vh" align="center" justify="center" bg={colorMode}>
        <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6} minW="80vw">
          <Stack align="center">
            <Heading fontSize="4xl">Photos</Heading>
          </Stack>

          {photosSlice.length ? (
            <SimpleGrid
              columns={[1, 2, 3, 4, 5]}
              rounded="lg"
              bg={colorMode}
              boxShadow="lg"
              py={8}
              px={[0, 0, 8]}
            >
              {photosSlice.map(({ id, title, thumbnailUrl, url }) => (
                <PhotoItem
                  onClick={() => handleClick(title, url)}
                  key={id}
                  title={title}
                  thumbnailUrl={thumbnailUrl}
                />
              ))}
            </SimpleGrid>
          ) : (
            <Box
              rounded="lg"
              bg={colorMode}
              boxShadow="lg"
              py={8}
              px={[0, 0, 8]}
            >
              {loading ? (
                <Center>
                  <Spinner />
                </Center>
              ) : (
                <NothingToShow message="No pictures to show" />
              )}
            </Box>
          )}
        </Stack>
      </Flex>
    </>
  );
};

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const [pageCount, setPageCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pageRange, setPageRange] = useState(2);

  // Used custom hook to get the window width
  const [width] = useWindowSize();
  useEffect(() => {
    // On width change, update the number of items the paginator shows
    let numItems = 1;
    if (width < 400) numItems = 1;
    else if (width < 500) numItems = 2;
    else if (width < 700) numItems = 4;
    else numItems = 5;
    setPageRange(numItems);
  }, [width]);

  useEffect(() => {
    const getSomePhotos = async () => {
      try {
        setLoading(true);
        const response = await getPhotos(limit, offset);

        setTotalCount(response.count);
        setPhotos(response.photos);
        setPageCount(Math.ceil(response.count / limit));
        setLoading(false);
      } catch (error) {
        Swal.fire(error, "", "error");
      }
    };

    getSomePhotos();
  }, [offset]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * limit) % totalCount;
    setOffset(newOffset);
    window.scrollTo(0, 0);
  };
  return (
    <>
      <PhotosSlice photosSlice={photos} loading={loading} />
      <Flex maxW="100vw">
        <ReactPaginate
          breakLabel="..."
          nextLabel=" >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={pageRange}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel="< "
          renderOnZeroPageCount={null}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </Flex>
    </>
  );
};

export default Photos;

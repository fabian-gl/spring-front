import React, { useState, useEffect } from "react";

import ReactPaginate from "react-paginate";
import "./paginator.css";

import { getPhotos } from "../utils/serverCalls";
import PhotoItem from "./PhotoItem";

import NothingToShow from "./NothingToShow";

import {
  Flex,
  useColorModeValue,
  Stack,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";

const PhotosSlice = ({ photosSlice }) => {
  const colorMode = useColorModeValue("gray.50", "gray.800");
  return (
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
            {photosSlice.map(({ id, title, thumbnailUrl }) => (
              <PhotoItem key={id} title={title} thumbnailUrl={thumbnailUrl} />
            ))}
          </SimpleGrid>
        ) : (
          <NothingToShow message="No pictures to show" />
        )}
      </Stack>
    </Flex>
  );
};

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [offset, setOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const limit = 10;

  useEffect(() => {
    const getSomePhotos = async () => {
      const response = await getPhotos(limit, offset);
      setTotalCount(response.count);
      setPhotos(response.photos);
      setPageCount(Math.ceil(response.count / limit));
    };

    // getSomePhotos();
  }, [offset]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * limit) % totalCount;
    setOffset(newOffset);
  };

  return (
    <>
      <PhotosSlice photosSlice={photos} />
      <Flex>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </Flex>
    </>
  );
};

export default Photos;

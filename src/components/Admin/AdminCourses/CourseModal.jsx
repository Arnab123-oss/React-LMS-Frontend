import {
  AspectRatio,
  Box,
  Button,
  Grid,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { fileUpload } from '../../Auth/Register';

const CourseModal = ({ isOpen,
  onClose,
  id,
  deleteButtonHandler,
  addLectureHandler,
  courseTitle,
  lectures = [1, 2, 3, 4, 5, 6, 7, 8] }) => {

  const { title, setTitle } = useState('');
  const { desccription, setDescription } = useState('');
  const { video, setVideo } = useState('');
  const { videoPrev, setVideoPrev } = useState('');

  const changeVideoHandler = e => {
    // console.warn(e.target.files);
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };
  const handleClose = () => {
    setTitle('');
    setDescription('');
    setVideo('');
    setVideoPrev('');
    onClose();

  };

  return (
    <Modal isOpen={isOpen} size={'full'} onClose={handleClose} scrollBehavior="inside" >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{courseTitle}</ModalHeader>

        <ModalCloseButton />
        <ModalBody p="16">
          <Grid templateColumns={['1fr', '3fr 1fr']}>
            <Box px={['0', '16']}>

              <Box my={'5'}>
                <Heading children={courseTitle} />
                <Heading children={`#${id}`} size={'sm'} opacity={0.4} />
              </Box>

              <Heading children={"Lectures"} size={'lg'} />

              {
                lectures.map((item, i) => (
                  <VideoCard
                    key={i}
                    num={i + 1}
                    title="React course"
                    description="React course description"
                    lectureId={"tghhggg"}
                    courseId={id}
                    deleteButtonHandler={deleteButtonHandler} />
                ))
              }


            </Box>

            <Box>
              <form onSubmit={e => addLectureHandler(e, id, title, desccription, video)}>
                <VStack spacing={'4'}>

                  <Heading children="Add Lecture"
                    size={'md'}
                    textTransform={'uppercase'} />

                  <Input focusBorderColor="purple.300"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)} />

                  <Input focusBorderColor="purple.300"
                    placeholder="Description"
                    value={desccription}
                    onChange={e => setDescription(e.target.value)} />

                  <Input
                    accept="video/mp4"
                    required
                    type={'file'}
                    focusBorderColor="purple.300"
                    css={{
                      '&::file-selector-button': {
                        ...fileUpload,
                        color: 'purple',
                      },
                    }}
                    onChange={changeVideoHandler}
                  />
                  console.log(videoPreview);

                  {videoPrev && (
                    <video controlsList='nodownload' controls src={videoPrev}></video>


                    // <AspectRatio maxW='250px' >
                    //   <iframe
                    //    title={title}
                    //     src={videoPreview}
                    //     allowFullScreen
                    //     controlsList='nodowmload'
                    //   />
                    // </AspectRatio>
                  )}


                  <Button w={'full'} colorScheme='purple' type="submit">Upload</Button>

                </VStack>
              </form>
            </Box>

          </Grid>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CourseModal;


function VideoCard({ num, title, description, lectureId, courseId, deleteButtonHandler }) {
  return (
    <Stack
      direction={['column', 'row']}
      my="8"
      borderRadius={'lg'}
      boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
      justifyContent={['flex-start', 'space-between']}
      p={["4", "8"]}>
      <Box>
        <Heading size={'sm'} children={`#${num} ${title}`} />
        <Text children={description} />
      </Box>
      <Button color={"purple.600"} onClick={() => deleteButtonHandler(courseId, lectureId)}>
        <RiDeleteBin7Fill />
      </Button>

    </Stack>

  )
}
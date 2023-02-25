import {
  Avatar,
  Button,
  Container,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Input,
  ModalFooter,
  useDisclosure,
  ModalHeader,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { fileUpload } from '../Auth/Register';

const Profile = () => {
  const user = {
    name: 'Abhishek',
    email: 'abhi@gmail.com',
    createdAt: String(new Date().toISOString()),
    role: 'user',
    subscription: {
      status: 'active',
    },
    playlist: [
      {
        course: 'gdghjhj',
        poster:
          'https://media.istockphoto.com/id/1137985887/photo/two-beautiful-young-cats-walk-in-a-sunny-meadow-on-a-clear-spring-day-raising-their-tails-and.jpg?s=612x612&w=0&k=20&c=1uaefu-4_odFMbXC39L0GS9PI528ZzwWKitRwPzoXtA=',
      },
      {
        course: 'gdghjhj',
        poster:
          'https://media.istockphoto.com/id/1304562677/photo/portrait-of-black-cat-between-two-young-women-being-kissed.jpg?s=612x612&w=0&k=20&c=104XvoInMZ536WNiwbMtT8Lnr_ybNkV6sZO19sfMFQk=',
      },
      {
        course: 'gdghjhj',
        poster:
          'https://media.istockphoto.com/id/1308388643/photo/two-cute-beautiful-cats-lie-in-an-autumn-sunny-garden-among-fallen-leaves.jpg?s=612x612&w=0&k=20&c=x8toepA6AeJqh2nHQG9t91NU23xVLhiM6pzAM4oLMaI=',
      },
    ],
  };

  const removeFromPlaylistHandler = id => {
    console.warn('hjfdhjdfgkj');
  };

  const { isOpen, onClose, onOpen } = useDisclosure();
  const changeImageSubmitHandler = (e, image) => {
    e.preventDefault();
    console.log(image);
  };

  return (
    <Container minH={'95vh'} minW={'lg'} py={'8'}>
      <Heading children="Profile" m={'8'} textTransform={'uppercase'} />

      <Stack
        justifyContent={'flex-start'}
        direction={['column', 'row']}
        alignItems={'center'}
        spacing={['8', '16']}
        padding={'8'}
      >
        <VStack>
          <Avatar boxSize={'48'} />
          <Button colorScheme={'pink'} variant={'ghost'} onClick={onOpen}>
            Change Photo
          </Button>
        </VStack>

        <VStack spacing={'4'} alignItems={['center', 'flex-start']}>
          <HStack>
            <Text children="Name" fontWeight={'bold'} />
            <Text children={user.name} />
          </HStack>
          <HStack>
            <Text children="Email" fontWeight={'bold'} />
            <Text children={user.email} />
          </HStack>
          <HStack>
            <Text children="CreatedAt" fontWeight={'bold'} />
            <Text children={user.createdAt.split('T')[0]} />
          </HStack>
          {user.role !== 'admin' && (
            <HStack>
              <Text children="Subscription" fontWeight={'bold'} />
              {user.subscription.status === 'active' ? (
                <Button color={'pink.500'} variant={'unstyled'}>
                  Cancel Subscription
                </Button>
              ) : (
                <Link to={'/subscribe'}>
                  <Button colorScheme={'pink'}>Subscribe</Button>
                </Link>
              )}
            </HStack>
          )}

          <Stack direction={['column', 'row']} alignItems={'center'}>
            <Link to="/updateprofile">
              <Button>Update Profile</Button>
            </Link>

            <Link to="/changepassword">
              <Button>Change Password</Button>
            </Link>
          </Stack>
        </VStack>
      </Stack>

      <Heading children="Playlist" size={'md'} my={'8'} p={'4'} />
      {user.playlist.length > 0 && (
        <Stack
          direction={['column', 'row']}
          alignItems={'center'}
          flexWrap="wrap"
        >
          {user.playlist.map(element => (
            <VStack w="48" m="2" key={element.course}>
              <Image
                boxSize={'full'}
                objectFit="contain"
                src={element.poster}
              />
              <HStack>
                <Link to={`/course/${element.course}`}>
                  <Button variant={'ghost'} colorScheme="pink">
                    Watch Now
                  </Button>
                </Link>
                <Button
                  onClick={() => removeFromPlaylistHandler(element.course)}
                >
                  <RiDeleteBin7Fill />
                </Button>
              </HStack>
            </VStack>
          ))}
        </Stack>
      )}

      <ChangePhotoBox
        changeImageSubmitHandler={changeImageSubmitHandler}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Container>
  );
};

export default Profile;

function ChangePhotoBox({ isOpen, onClose, changeImageSubmitHandler }) {
  const [imagePreview, setImagePrev] = useState('');
  const [image, setImage] = useState('');

  const changeImage = e => {
    console.warn(e.target.files);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };

    // console.log(e.target.files);
    // setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
  const closeHandler = () => {
    onClose();
    setImagePrev(' ');
    setImage(' ');
  };
  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <ModalOverlay backdropFilter={'blur(10px)'} />
      <ModalContent>
        <ModalHeader>Change Photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container>
            <form onSubmit={e => changeImageSubmitHandler(e, image)}>
              <VStack spacing={'8'}>
                {imagePreview && <Avatar src={imagePreview} boxSize={'48'} />}
                <Input
                  type={'file'}
                  css={{ '&::file-selector-button': fileUpload }}
                  onChange={changeImage}
                />
                <Button w={'full'} colorScheme="pink" type="submit">
                  Change
                </Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button mr={'3'} onClick={closeHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

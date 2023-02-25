import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
export const fileUpload = {
  cursor: 'pointer',
  marginLeft: '-5%',
  width: '100%',
  height: '100%',
  border: 'none',
  color: '#ECC948',
  backgroundColor: 'white',
};
const fileUploadStyle = {
  '&::file-selector-button': {
    cursor: 'pointer',
    marginLeft: '-5%',
    width: '110%',
    height: '100%',
    border: 'none',
    color: '#ECC948',
    backgroundColor: 'white',
  },
};

const Register = () => {
  const { name, setName } = useState();
  const { email, setEmail } = useState();
  const { password, setPassword } = useState();
  const { imagePreview, setImagePrev } = useState();
  const { image, setImage } = useState();

  const changeFileHandler = e => {
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
  return (
    <container h={'100vh'}>
      <VStack h={'110vh'} justifyContent="center" spacing={'16'}>
        <Heading textTransform={'uppercase'} children="Registration" />

        <form>
          <Box my={'4'} display={'flex'} justifyContent={'center'}>
            <Avatar src={imagePreview} size={'xl'} />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="name" children="Name" />
            <Input
              requred
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="abc"
              type={'text'}
              focusBorderColor="purple.500"
            />
          </Box>

          <Box my={'4'}>
            <FormLabel htmlFor="email" children="Email Address" />
            <Input
              requred
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              type={'email'}
              focusBorderColor="purple.500"
            />
          </Box>

          <Box my={'4'}>
            <FormLabel htmlFor="password" children="password" />
            <Input
              requred
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="password"
              type={'password'}
              focusBorderColor="purple.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="chooseAvatar" children="Choose Avatar" />
            <Input
              accept="image/*"
              requred
              id="chooseAvatar"
              type={'file'}
              focusBorderColor="purple.500"
              css={fileUploadStyle}
              onChange={changeFileHandler}
            />
          </Box>

          <Button my="4" colorScheme={'pink'} type="submit">
            Sign Up
          </Button>

          <Box my="4">
            Already Signup{' '}
            <Link to="/login">
              <Button colorScheme={'pink'} variant={'link'}>
                Login
              </Button>{' '}
              here
            </Link>
          </Box>
        </form>
      </VStack>
    </container>
  );
};

export default Register;

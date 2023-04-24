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
import { useDispatch } from 'react-redux';
import { register } from '../../redux/actions/user';
export const fileUpload = {
  cursor: 'pointer',
  marginLeft: '-5%',
  width: '100%',
  height: '100%',
  border: 'none',
  color: '#F38996',
  backgroundColor: 'white',
};
const fileUploadStyle = {
  '&::file-selector-button': {
    cursor: 'pointer',
    marginLeft: '-5%',
    width: '110%',
    height: '100%',
    border: 'none',
    color: '#F38996',
    backgroundColor: 'white',
  },
};

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [imagePreview, setImagePrev] = useState();
  const [image, setImage] = useState();

  const dispatch = useDispatch();

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

  const submitHandler = e => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.append('name', name);
    myForm.append('email', email);
    myForm.append('password', password);
    myForm.append('file', image);

    dispatch(register(myForm));
  };

  return (
    <container h={'100vh'}>
      <VStack h={'110vh'} justifyContent="center" spacing={'16'}>
        <Heading textTransform={'uppercase'} children="Registration" />

        <form onSubmit={submitHandler} >
          <Box my={'4'} display={'flex'} justifyContent={'center'}>
            <Avatar src={imagePreview} size={'xl'} />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="name" children="Name" />
            <Input
              required
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="abc"
              type={'text'}
              focusBorderColor="#F4CACF"
            />
          </Box>

          <Box my={'4'}>
            <FormLabel htmlFor="email" children="Email Address" />
            <Input
              required
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              type={'email'}
              focusBorderColor="#F4CACF"
            />
          </Box>

          <Box my={'4'}>
            <FormLabel htmlFor="password" children="password" />
            <Input
              required
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="password"
              type={'password'}
              focusBorderColor="#F4CACF"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="chooseAvatar" children="Choose Avatar" />
            <Input
              accept="image/*"
              required
              id="chooseAvatar"
              type={'file'}
              focusBorderColor="#F4CACF"
              css={fileUploadStyle}
              onChange={changeFileHandler}
            />
          </Box>

          <Button my="4" colorScheme={'teal'} type="submit">
            Sign Up
          </Button>

          <Box my="4">
            Already Signup{' '}
            <Link to="/login">
              <Button colorScheme={'teal'} variant={'link'}>
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

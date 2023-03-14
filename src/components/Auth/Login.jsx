import React, { useState } from 'react';
import {
  Container,
  Box,
  Button,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/user';



const Login = () => {
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();
  
  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(login(email,password));
  };
  return (
    <Container h={'95vh'}>
      <VStack h={'90vh'} justifyContent="center" spacing={'16'}>
        <Heading children="Welcome to our Lms" />

        <form onSubmit={submitHandler}>
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

          <Box>
            <Link to="/fogetpassword">
              <Button fontSize={'sm'} variant={'link'}>
                Forget Password
              </Button>
            </Link>
          </Box>
          <Button my="4" colorScheme={'pink'} type="submit">
            Login
          </Button>

          <Box my="4">
            New User ?{' '}
            <Link to="/register">
              <Button colorScheme={'pink'} variant={'link'}>
                Sign Up
              </Button>{' '}
              here
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Login;

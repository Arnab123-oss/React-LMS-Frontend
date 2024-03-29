import {
  Box,
  Button,
  Container,
  FormLabel,
  Input,
  VStack,
  Heading
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { contactUs } from '../../redux/actions/other';
import { toast } from 'react-hot-toast';


const Contact = () => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [message, setMessage] = useState();

  const dispatch = useDispatch();

const {loading,error,message:stateMessage } = useSelector(state=>state.other)

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(contactUs(name, email, message));
  };

    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch({ type: 'clearError' });
      }
  
      if (stateMessage) {
        toast.success(stateMessage);
        dispatch({ type: 'clearMessage' });
      }
    }, [dispatch, error, stateMessage]);
  
  return (
    <Container h={'92vh'}>
      <VStack h={'full'} justifyContent={'center'} spacing={'12'}>
        <Heading children="Contact Us" />

        <form onSubmit={submitHandler} style={{ width: '100%' }}>
          <Box my={'4'}>
            <FormLabel htmlFor="name" children="Name" />
            <Input
              required
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your name"
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
            <FormLabel htmlFor="message" children="message" />
            <Input
              required
              id="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Enter your message"
              focusBorderColor="#F4CACF"
            />
          </Box>

          <Button  isLoading={loading} my="4" colorScheme={'teal'} type="submit">
            Send Mail
          </Button>
          <Box my="4">
            Request for a course{' '}
            <Link to="/request">
              <Button colorScheme={'teal'} variant={'link'}>
                Click
              </Button>{' '}
              here
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Contact;

import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { courseRequest } from '../../redux/actions/other';
import { toast } from 'react-hot-toast';

const Request = () => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [course, setCourse] = useState();

  const dispatch = useDispatch();

  const {loading,error,message} = useSelector(state=>state.other)

  const submitHandler = e => {
    e.preventDefault();
    dispatch(courseRequest(name,email,course));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  return (
    <Container h={'92vh'}>
      <VStack h={'full'} justifyContent={'center'} spacing={'12'}>
        <Heading children="Request New Course" />

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
            <FormLabel htmlFor="course" children="Course" />
            <Input
              required
              id="course"
              value={course}
              onChange={e => setCourse(e.target.value)}
              placeholder="Explain the course...."
              focusBorderColor="#F4CACF"
            />
          </Box>

          <Button  isLoading={loading} my="4" colorScheme={'teal'} type="submit">
            Send Mail
          </Button>
          <Box my="4">
            see available courses!{' '}
            <Link to="/courses">
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

export default Request;

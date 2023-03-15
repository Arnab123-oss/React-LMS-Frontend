import React, { useState } from 'react';
import { Container, Heading, VStack, Input, Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.profile);
  const submitHandler = async e => {
    e.preventDefault();

    await dispatch(updateProfile(name, email));
    dispatch(loadUser());
    navigate('/profile');
  };

  return (
    <Container py={'16'} minH={'90vh'}>
      <form onSubmit={submitHandler}>
        <Heading
          children="Update Profile"
          textTransform={'uppercase'}
          my={'16'}
          textAlign={['center', 'left']}
        />

        <VStack spacing={'8'}>
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="name"
            type={'text'}
            focusBorderColor="purple.500"
          />{' '}
          <Input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            type={'email'}
            focusBorderColor="purple.500"
          />
          <Button
            isLoading={loading}
            w={'full'}
            colorScheme="pink"
            type="submit"
          >
            Update
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default UpdateProfile;

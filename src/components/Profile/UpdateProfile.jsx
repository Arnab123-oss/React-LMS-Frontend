import React, { useState } from 'react';
import { Container, Heading, VStack, Input, Button } from '@chakra-ui/react';

const UpdateProfile = () => {
  const { Name, setName } = useState();
  const { email, setEmail } = useState();
  return (
    <Container py={'16'} minH={'90vh'}>
      <form>
        <Heading
          children="Update Profile"
          textTransform={'uppercase'}
          my={'16'}
          textAlign={['center', 'left']}
        />

        <VStack spacing={'8'}>
          <Input
            value={Name}
            onChange={e => setName(e.target.value)}
            placeholder="Name"
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
          <Button w={'full'} colorScheme="pink" type="submit">
            Update
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default UpdateProfile;

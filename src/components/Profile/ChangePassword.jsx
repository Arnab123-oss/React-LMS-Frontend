import { Container, Heading, VStack, Input, Button } from '@chakra-ui/react';
import React, { useState } from 'react';

const ChangePassword = () => {
  const { oldpassword, setOldPassword } = useState();
  const { newpassword, setNewPassword } = useState();
  return (
    <Container py={'16'} minH={'90vh'}>
      <form>
        <Heading
          children="Change Password"
          textTransform={'uppercase'}
          my={'16'}
          textAlign={['center', 'left']}
        />

        <VStack spacing={'8'}>
          <Input
            requred
            value={oldpassword}
            onChange={e => setOldPassword(e.target.value)}
            placeholder="Old Password"
            type={'password'}
            focusBorderColor="purple.500"
          />

          <Input
            requred
            value={newpassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="New Password"
            type={'password'}
            focusBorderColor="purple.500"
          />

          <Button w={'full'} colorScheme="pink" type="submit">Change</Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ChangePassword;

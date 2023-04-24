import { Spinner, VStack } from '@chakra-ui/react';
import React from 'react';

const Loader = ({ color = '#64C9AE' }) => {
  return (
    <VStack h="100vh" justifyContent={'center'}>
      <div style={{ transform: "scale(4)" }}>
        <Spinner
          thickness="1px"
          speed="0.65s"
          emptyColor="#F5EEF8"
          color={color}
          size="sm"
        />
      </div>
    </VStack>
  );
};

export default Loader;

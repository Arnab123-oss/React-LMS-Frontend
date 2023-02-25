import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
const Contact = () => {

    const { email, setEmail } = useState();
    const { name, setName } = useState();
    const { massege, setMassege } = useState();
  return <Container h={'92vh'}>
    <VStack h={'full'} justifyContent= {'center'} spacing={'12'}>
        <Heading  children="Contact Us" />

        <form>
        <Box my={"4"}>
                    <FormLabel htmlFor="name" children="Name" />
                    <Input requred id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Enter your name'
                        type={"password"}
                        focusBorderColor='purple.500' />
                </Box>
                <Box my={"4"}>
                    <FormLabel htmlFor="email" children="Email Address" />
                    <Input requred id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='abc@gmail.com'
                        type={"email"}
                        focusBorderColor='purple.500' />
                </Box>
                <Box my={"4"}>
                    <FormLabel htmlFor="massege" children="Massege" />
                    <Input requred id="massege"
                        value={massege}
                        onChange={(e) => setMassege(e.target.value)}
                        placeholder='Enter your Massege'
                        focusBorderColor='purple.500' />
                </Box>


                <Button my="4" colorScheme={'pink'} type="submit"> 
                        Send Mail
                 </Button>
                 <Box my = '4'>
                   Request for a course {' '}
                   <Link to="/request">
                   <Button colorScheme={'pink'} variant={"link"}>
                   Click
                    </Button> {' '}
                    here
                    </Link> 
                 </Box>
            </form>

    </VStack>

  </Container>
}

export default Contact
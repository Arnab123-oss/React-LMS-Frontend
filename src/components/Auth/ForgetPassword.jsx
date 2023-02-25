import { Button,Input,Container, Heading, VStack } from '@chakra-ui/react'
import React ,{useState} from 'react'

const ForgetPassword = () => {
    const { email, setEmail } = useState("");
  return <Container padding={'16'} h={'90vh'}>
    <form>
        <Heading children="Forget password" my="16" 
        textTransform={'uppercase'} textAlign={["center","left"]}/>
        <VStack spacing={"8"}>
      
                    <Input requred id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='abc@gmail.com'
                        type={"email"}
                        focusBorderColor='purple.500' />

                <Button type="submit" width="full" colorScheme='pink'>
                    Send Reset Link
                </Button>
        </VStack>
    </form>



  </Container>
}

export default ForgetPassword
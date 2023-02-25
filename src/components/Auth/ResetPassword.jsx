import { Button,Input,Container, Heading, VStack } from '@chakra-ui/react'
import React ,{useState} from 'react'
import {useParams} from 'react-router-dom'
const ResetPassword = () => {
    const { passsword, setPasssword } = useState("");
    const params = useParams();
  return <Container padding={'16'} h={'90vh'}>
    <form>
        <Heading children="Reset Password" my="16" 
        textTransform={'uppercase'} textAlign={["center","left"]}/>
        <VStack spacing={"8"}>
      
                    <Input requred 
                        value={passsword}
                        onChange={(e) => setPasssword(e.target.value)}
                        placeholder='New Password'
                        type={"passsword"}
                        focusBorderColor='purple.500' />

                <Button type="submit" width="full" colorScheme='pink'>
                    Reset Password
                </Button>
        </VStack>
    </form>



  </Container>
}

export default ResetPassword
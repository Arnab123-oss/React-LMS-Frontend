import { Box, Text, Avatar, Container, Heading, Stack, VStack, Button, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import introvideo from '../../assets/images/introvideo.mp4'
import { RiSecurePaymentFill } from 'react-icons/ri'
const Founder = () => (

    <Stack direction={["column", "row"]}
        spacing={['4', '16']}
        padding={'8'}>

        <VStack >
            <Avatar boxSize={['40', '48']} src="https://cdn.pixabay.com/photo/2023/02/02/13/27/cat-7762887_960_720.jpg" />
            <Text children="Co-Founder" opacity={0.7} />
        </VStack>

        <VStack justifyContent={"center"} alignItems={['center', 'flex-start']}>
            <Heading children="Arnab Ghosh" size={['md', 'xl']} />
            <Text children={`Hi......`}
                textAlign={['center', 'left']} />
        </VStack>
    </Stack>
)

const VideoPlayer = () => (
    <Box>
        <video autoPlay controls
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            disableRemotePlayback
            src={introvideo}>

        </video>
    </Box>
)
const TANDC = ({termsAndConditions}) =>(
        <Box>
            <Heading size="md" children="Terms and condition" textAlign={['centre', 'left']} 
            my={'4'}/>
            <Box h="3rem" p="4" overflowY={'scroll'}>
                    <Text textAlign={['centre', 'left']} letterSpacing={"widest"}
                    fontFamily={'heading'} >
                        {termsAndConditions}
                    </Text>
                    <Heading size="xs" children="Refund only applicable for canellation within 7 days" my={'4'}/>
            </Box>
        </Box>
) ;
const About = () => {
    return <Container maxW={"container.lg"} padding={"16"} boxShadow={'lg'}>
        <Heading children="About Us" textAlign={['centre', 'left']} />
        {/* Founder component */}
        <Founder />

        <Stack m="8" direction={["column", "row"]} alignItems={'center'}>
            <Text fontFamily={'cursive'} m="8" textAlign={['center', 'left']}>
                We are a video streamming platfrom with some premium courses available
                only for premium users.
            </Text>

            <Link to="/subscribe">
                <Button variant={'ghost'} colorScheme="pink">
                    Checkout Our Plan
                </Button>


            </Link>
        </Stack>
        {/* VideoPlayer component */}
        <VideoPlayer />

        <TANDC termsAndConditions={'termsAndConditions'} />

        <HStack my={'4'} p={'4'}>
            <RiSecurePaymentFill />
            <Heading size={"xs"} fontFamily={"sans-serif"}
                children={"payment is sucered by RaZorpay"}
                textTransform={'uppercase'} />
        </HStack>
    </Container>
}

export default About
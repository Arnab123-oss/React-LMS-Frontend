import React from 'react'
import { Box, HStack, Heading, Stack, VStack } from '@chakra-ui/react'
import { TiSocialYoutubeCircular, TiSocialInstagramCircular } from "react-icons/ti"
import { DiGithub } from "react-icons/di"
const Footer = () => {
    return <Box padding={'4'} bg="#F5F1BF" minH={'10vh'}>
        <Stack direction={["column", "row"]}>
            <VStack alignItems={["center", "flex-start"]} width="full">
                <Heading children="All Rights Reserved" size='sm' color={"black"} />
                <Heading fontFamily={'body'} size='sm' children="@Arnab Ghosh" color={"purple.500"} />

            </VStack>
            <HStack spacing={["2", "5"]} justifyContent={'center'}
                color={'black'} fontSize={'30'}>
                <a href='https://www.youtube.com/' target='_blank' rel="noreferrer" >
                    <TiSocialYoutubeCircular />
                </a>
                <a href='https://www.instagram.com/' target='_blank' rel="noreferrer" >
                    <TiSocialInstagramCircular />
                </a>
                <a href='https://www.github.com/' target='_blank' rel="noreferrer" >
                    <DiGithub />
                </a>

            </HStack>
        </Stack>
    </Box>
}

export default Footer
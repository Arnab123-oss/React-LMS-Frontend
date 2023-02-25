import { Image, VStack, Stack, Text, Container, HStack, Heading, Input, Button, Card } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import courseimg from '../../assets/images/couple-gd47e0bad9_1920.jpg';


const addToPlaylistHandler = () => {
    console.warn("Add to Play List");
}


const Course = ({ views, title, imageSrc, id, addToPlaylistHandler, creator, description, lectureCount }) => {
    return (

        <VStack className="course" alignItems={["center", "flex-start"]}>
            <Image src={imageSrc} boxSize="60" objectFit={'contain'} />
            <Heading textAlign={["center", "left"]} maxW="200px" fontFamily={"sans-serif"}
                noOfLines={3} children={title} size={'sm'} />
            <Text noOfLines={2} children={description} />
            <HStack>
                <Text fontWeight={'bold'}
                    textTransfrom="uppercase"
                    children={'creator'} />

                <Text fontFamily={'body'}
                    textTransfrom="uppercase" children={creator} size="xs" />

            </HStack>

            <Heading textAlign={"center"}
                size="xs"
                children={`Lectures - ${lectureCount}`}
                textTransfrom="uppercase" />

            <Heading
                size="xs"
                children={`Views - ${views}`}
                textTransfrom="uppercase" />

            <Stack direction={["column", "row"]} alignItems="center">
                <Link to={`/course/${id}`}>

                    <Button colorScheme={"pink"}> Watch Now</Button>

                </Link>

                <Button variant={"ghost"} colorScheme={"pink"}
                    onClick={() => addToPlaylistHandler(id)}
                > Add To PlayList</Button>

            </Stack>


        </VStack>



    )
}

const Courses = () => {
    const [keyword, setKeyword] = useState();
    const [Category, setCategory] = useState();
    const Categories = [
        "Bachelor of Rural Studies", "Ethical Hacking", "Cloud Computing",
        "Artificial Intelligence", "Machine Learning and Deep Learning",
        "Full Stack Developer", "Digital Marketing", "Cybersecurity"
    ]
    return <Container minH={'95vh'} maxW="container.lg" paddingY={'8'}>
        <Heading children="All Courses" m={'8'} />
        <Input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Search a course..."
            type="text" focusBorderColor="purple.600" />

        <HStack overflowX={"auto"} paddingY={'8'} css={{ '&::-webkit-scrollbar': { display: 'none', }, }}>
            {
                Categories.map((item, index) => (
                    <Button key={index} onClick={() => setCategory(item)} minW={'60'}>
                        <Text children={item} />
                    </Button>
                ))
            }

        </HStack>

        <Stack direction={["column", "row"]}
            flexWrap="wrap"
            justifyContent={["flex-start", "space-evenly"]}
            alignItems={["center", "flex-start"]}
        >
            <Course
                title={"sample"}
                description={"sample1"}
                views={23}
                imageSrc={courseimg}
                id={"sample1"}
                creator={"Sample boy"}
                lectureCount={2}
                addToPlaylistHandler={addToPlaylistHandler}
            />

        </Stack>
    </Container>



}
export default Courses
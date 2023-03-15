import {
  Image,
  VStack,
  Stack,
  Text,
  Container,
  HStack,
  Heading,
  Input,
  Button,
  Card,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../redux/actions/course';
import { toast } from 'react-hot-toast';

const Course = ({
  views,
  title,
  imageSrc,
  id,
  addToPlaylistHandler,
  creator,
  description,
  lectureCount,
}) => {
  return (
    <VStack className="course" alignItems={['center', 'flex-start']}>
      <Image src={imageSrc} boxSize="60" objectFit={'contain'} />
      <Heading
        textAlign={['center', 'left']}
        maxW="200px"
        fontFamily={'sans-serif'}
        noOfLines={3}
        children={title}
        size={'sm'}
      />
      <Text noOfLines={2} children={description} />
      <HStack>
        <Text
          fontWeight={'bold'}
          textTransfrom="uppercase"
          children={'creator'}
        />

        <Text
          fontFamily={'body'}
          textTransfrom="uppercase"
          children={creator}
          size="xs"
        />
      </HStack>

      <Heading
        textAlign={'center'}
        size="xs"
        children={`Lectures - ${lectureCount}`}
        textTransfrom="uppercase"
      />

      <Heading
        size="xs"
        children={`Views - ${views}`}
        textTransfrom="uppercase"
      />

      <Stack direction={['column', 'row']} alignItems="center">
        <Link to={`/course/${id}`}>
          <Button colorScheme={'pink'}> Watch Now</Button>
        </Link>

        <Button
          variant={'ghost'}
          colorScheme={'pink'}
          onClick={() => addToPlaylistHandler(id)}
        >
          {' '}
          Add To PlayList
        </Button>
      </Stack>
    </VStack>
  );
};

const Courses = () => {
  const [keyword, setKeyword] = useState();
  const [Category, setCategory] = useState();

  const dispatch = useDispatch();

  const addToPlaylistHandler = courseId => {
    console.warn('Add to Play List', courseId);
  };
  const Categories = [
    'Bachelor of Rural Studies',
    'Ethical Hacking',
    'Cloud Computing',
    'Artificial Intelligence',
    'Machine Learning and Deep Learning',
    'Full Stack Developer',
    'Digital Marketing',
    'Cybersecurity',
  ];
  const { loading, courses, error } = useSelector(state => state.course);

  useEffect(() => {
    dispatch(getAllCourses(Category, keyword));

    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
  }, [Category, keyword, dispatch, error]);

  return (
    <Container minH={'95vh'} maxW="container.lg" paddingY={'8'}>
      <Heading children="All Courses" m={'8'} />
      <Input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search a course..."
        type="text"
        focusBorderColor="purple.600"
      />

      <HStack
        overflowX={'auto'}
        paddingY={'8'}
        css={{ '&::-webkit-scrollbar': { display: 'none' } }}
      >
        {Categories.map((item, index) => (
          <Button key={index} onClick={() => setCategory(item)} minW={'60'}>
            <Text children={item} />
          </Button>
        ))}
      </HStack>

      <Stack
        direction={['column', 'row']}
        flexWrap="wrap"
        justifyContent={['flex-start', 'space-evenly']}
        alignItems={['center', 'flex-start']}
      >
        {courses.length > 0 ? (
          courses.map(item => (
            <Course
              key={item._id}
              title={item.title}
              description={item.description}
              views={item.views}
              imageSrc={item.poster.url}
              id={item._id}
              creator={item.createdBy}
              lectureCount={item.numOfVideos}
              addToPlaylistHandler={addToPlaylistHandler}
            />
          ))
        ) : (
          <Heading opacity={0.5} mt="4" children="Courses Not Found" color={'pink.500'} />
        )}
      </Stack>
    </Container>
  );
};
export default Courses;

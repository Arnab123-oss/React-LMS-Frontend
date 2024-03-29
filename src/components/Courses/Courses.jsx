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
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../redux/actions/course';
import { toast } from 'react-hot-toast';
import { addToPlaylist } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';
import { FiArrowRightCircle } from 'react-icons/fi';
const Course = ({
  views,
  title,
  imageSrc,
  id,
  addToPlaylistHandler,
  creator,
  description,
  lectureCount,
  loading,
}) => {
  return (
    <VStack className="course" alignItems={['center', 'flex-start']}>
      <Image
        src={imageSrc}
        boxSize="60"
        objectFit={'contain'}
        borderRadius={10}
      />
      <Heading
        textAlign={['center', 'left']}
        maxW="200px"
        fontFamily={'sans-serif'}
        noOfLines={1}
        children={title}
        size={'sm'}
      />
      <Text noOfLines={1} children={description} />
      <HStack>
        <Text
          fontWeight={'bold'}
          textTransform="uppercase"
          children={'creator :'}
        />

        <Text
          fontFamily={'body'}
          textTransform="uppercase"
          children={creator}
          size="xs"
        />
      </HStack>

      <Heading
        textAlign={'center'}
        size="xs"
        children={`Lectures : ${lectureCount}`}
        textTransform="uppercase"
      />

      <Heading
        size="xs"
        children={`Views : ${views}`}
        textTransform="uppercase"
      />

      <Stack direction={['column', 'row']} alignItems="center">
        <Link to={`/course/${id}`}>
          <Button colorScheme={'teal'}> Watch Now</Button>
        </Link>

        <Button
          isLoading={loading}
          variant={'ghost'}
          colorScheme={'teal'}
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

  const addToPlaylistHandler = async courseId => {
    await dispatch(addToPlaylist(courseId));
    dispatch(loadUser());
  };
  const refresh = () => {
    dispatch(loadUser());
  };
  const Categories = [
    'Web Development',
    'Ethical Hacking',
    'Cloud Computing',
    'Artificial Intelligence',
    'Machine Learning',
    'Deep Learning',
    'Full Stack Developer',
    'Digital Marketing',
    'Cybersecurity',
  ];
  const { loading, courses, error, message } = useSelector(
    state => state.course
  );

  useEffect(() => {
    dispatch(getAllCourses(Category, keyword));

    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [Category, keyword, dispatch, error, message]);

  return (
    <Container minH={'95vh'} maxW="container.lg" paddingY={'8'}  >
      {/* <Heading children="All Courses"/> */}
      <Text fontSize="3xl" m={8} textAlign={["center","left"]} >
        All Courses
        <Link to={'/courses'}>
          <Button
            fontSize={'25'}
            variant={'link'}
            colorScheme={'teal'}
            rounded= "full"
            onClick={() => refresh()}
            top="1" left="1"
          >
            <FiArrowRightCircle />
          </Button>
        </Link>
      </Text>


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
        position={""}
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
              loading={loading}
            />
          ))
        ) : (
          <Heading
            opacity={0.5}
            mt="4"
            children="Courses Not Found"
            color={'pink.500'}
          />
        )}
      </Stack>
    </Container>
  );
};
export default Courses;

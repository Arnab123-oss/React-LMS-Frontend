import { Box, Button, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams, Link } from 'react-router-dom';
import { getAllLectures } from '../../redux/actions/course';
import Loader from '../Layout/Loader/Loader';
import { RiErrorWarningFill } from 'react-icons/ri';

const CoursePage = ({ user }) => {
  const [lectureNumber, setLectureNumber] = useState(0);

  const { lectures, loading } = useSelector(state => state.course);

  const dispatch = useDispatch();

  const params = useParams();

  useEffect(() => {
    dispatch(getAllLectures(params.id));
  }, [dispatch, params.id]);

  if (
    user.role !== 'admin' &&
    (user.subscription === undefined || user.subscription.status !== 'active')
  ) {
    return <Navigate to={'/subscribe'} />;
  }

  return loading ? (
    <Loader />
  ) : (
    <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
      {lectures && lectures.length > 0 ? (
        <>
          <Box px={'12'} py={'20'}>
            <video
              autoPlay
              controls
              width={'100%'}
              controlsList="nodownload noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
              src={lectures[lectureNumber].video.url}
            ></video>
            <Heading
              m="4"
              children={`#${lectureNumber + 1} ${
                lectures[lectureNumber].title
              }`}
            />
            <Heading m="4" children="Description" />
            <Text m="4" children={lectures[lectureNumber].description} />
          </Box>

          <VStack>
            {lectures.map((element, index) => (
              <button
                key={element._id}
                onClick={() => setLectureNumber(index)}
                style={{
                  width: '80%',
                  padding: '1rem',
                  textAlign: 'center',
                  margin: 0,
                  borderBottom: '1px solid rgba(0,0,0,0.2)',
                }}
              >
                <Text>
                  #{index + 1} {element.title}
                </Text>
              </button>
            ))}
          </VStack>
        
        </>
        
      ) : (
        // <Heading children="No Lectures" />
        
      <VStack justifyContent={['center']} h="full" spacing={'4'} paddingLeft={['0','300px']} >
          <RiErrorWarningFill size={'5rem'} />
          <Heading>Oops No Lecture Available</Heading>
          <Link to="/courses">
            <Button variant={'ghost'} bg={'pink.100'} colorScheme="pink">
              Go to course
            </Button>
          </Link>
        </VStack>
      )}
      </Grid>
  );
};

export default CoursePage;

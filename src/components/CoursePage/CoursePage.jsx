import { Box, Grid, Heading, Text, VStack,Navigator } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import introvideo from '../../assets/images/introvideo.mp4';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllLectures } from '../../redux/actions/course';

const CoursePage = ({ user }) => {
  const [lectureNumber, setLectureNumber] = useState(0);
  const lectures = [
    {
      _id: 'sdsddfdfgguhjhjhkjk',
      title: 'sample',
      description: 'sample description',
      video: {
        url: 'ngrgn',
      },
    },
    {
      _id: 'sdsddfdfgg1',
      title: 'sample1',
      description: 'sample description1',
      video: {
        url: 'ngrgn',
      },
    },
    {
      _id: 'sdsddfdfgg2',
      title: 'sample2',
      description: 'sample description2',
      video: {
        url: 'ngrgn',
      },
    },
    {
      _id: 'sdsddfdfgg3',
      title: 'sample3',
      description: 'sample description3',
      video: {
        url: 'ngrgn',
      },
    },
  ];
  const dispatch = useDispatch();

  const params = useParams();

  useEffect(() => {
    dispatch(getAllLectures(params.id));
  }, [dispatch, params.id]);

  if (
    user.role !== 'admin' &&
    (user.subscription === undefined || user.subscription.status !== 'active')
  ) {
  
  }

  return (
    <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
      {/* px={'12'} py={'20'} */}
      <Box px={'12'} py={'20'}>
        <video
          autoPlay
          controls
          width={'100%'}
          controlsList="nodownload noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          src={introvideo}
        ></video>
        <Heading
          m="4"
          children={`#${lectureNumber + 1} ${lectures[lectureNumber].title}`}
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
    </Grid>
  );
};

export default CoursePage;

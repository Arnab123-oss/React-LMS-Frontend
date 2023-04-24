import {
  Grid,
  Box,
  TableContainer,
  Table,
  Heading,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  HStack,
  Button,
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import CourseModal from './CourseModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses, getAllLectures } from '../../../redux/actions/course';
import {
  addLecture,
  deleteCourse,
  deleteLecture,
} from '../../../redux/actions/admin';
import { toast } from 'react-hot-toast';

// const Row = items => {
//   console.log(items);
//   return (
//     <Tr>
//       <Td>#12{items._id}</Td>
//       <Td>{items.name}</Td>
//       <Td>{items.email}</Td>
//       <Td>{items.role}</Td>
//       <Td>
//        {items.subscription.status ==='active' ? 'Active' : 'Not Active'}
//       </Td>
//       <Td isNumeric>
//         <HStack justifyContent={'flex-end'}>
//           <Button variant={'outline'} color={'purple.500'}>
//             Change Role
//           </Button>

//           <Button color={'purple.600'}>
//             <RiDeleteBin7Fill />
//           </Button>
//         </HStack>
//       </Td>
//     </Tr>
//   );
// };

const AdminCourses = () => {
  const { courses, lectures } = useSelector(state => state.course);
  const { loading, error, message } = useSelector(state => state.admin);
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [courseId, setCourseId] = useState('');
  const [courseTitle, setCourseTitle] = useState('');

  const courseDetailsHandler = (courseId, title) => {
    dispatch(getAllLectures(courseId));
    onOpen();
    setCourseId(courseId);
    setCourseTitle(title);
  };

  const deleteButtonHandler = courseId => {
    // console.log(courseId);
    dispatch(deleteCourse(courseId));
  };

  const deleteLectureButtonHandler = async (courseId, lectureId) => {
    await dispatch(deleteLecture(courseId, lectureId));
    dispatch(getAllLectures(courseId));
  };

  const addLectureHandler = async (e, courseId, title, description, video) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('file', video);

    await dispatch(addLecture(courseId, myForm));
    dispatch(getAllLectures(courseId));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    dispatch(getAllCourses());
  }, [dispatch, error, message]);

  return (
    <Grid
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
      css={{ cursor: `url(${cursor}),default` }}
    >
      <Box p={['0', '8']} overflowX={'auto'}>
        <Heading
          textTransform={'uppercase'}
          children="All Courses"
          my={'16'}
          textAlign={['center', 'left']}
        />
        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'} size={'lg'}>
            <TableCaption>All available Courses in the database</TableCaption>

            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Poster</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Creator</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Lectures</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {courses.map(e => (
                // <Row key={e._id} items={e} />

                <Tr>
                  <Td>#{e._id}</Td>
                  <Td>
                    <Image src={e.poster.url} />
                  </Td>
                  <Td>{e.title}</Td>
                  <Td textTransform={'uppercase'}>{e.category}</Td>
                  <Td>{e.createdBy}</Td>
                  <Td isNumeric>{e.views}</Td>
                  <Td isNumeric>{e.numOfVideos}</Td>
                  <Td isNumeric>
                    <HStack justifyContent={'flex-end'}>
                      <Button
                        variant={'outline'}
                        color={'purple.500'}
                        onClick={() => courseDetailsHandler(e._id, e.title)}
                        isLoading={loading}
                      >
                        View Lectures
                      </Button>

                      <Button
                        color={'purple.600'}
                        onClick={() => deleteButtonHandler(e._id)}
                        isLoading={loading}
                      >
                        <RiDeleteBin7Fill />
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <CourseModal
          isOpen={isOpen}
          onClose={onClose}
          id={courseId}
          courseTitle={courseTitle}
          deleteButtonHandler={deleteLectureButtonHandler}
          addLectureHandler={addLectureHandler}
          lectures={lectures}
          loading={loading}
        />
      </Box>

      <Sidebar />
    </Grid>
  );
};

export default AdminCourses;

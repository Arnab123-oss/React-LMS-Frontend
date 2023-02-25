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
import React from 'react';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import CourseModal from './CourseModal';

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
  const courses = [
    {
      _id: 'u1',
      title: 'React',
      category: 'Web Development',
      poster: 'admin',
      poster: {
        url: 'https://cdn.pixabay.com/photo/2023/01/23/09/26/cat-7738210__340.jpg',
      },
      createdBy: 'Arnab Ghosh',
      views: 123,
      numOfVideos: 12,
    },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();

  const courseDetailsHandler = userId => {
    onOpen();
  };

  const deleteButtonHandler = userId => {
    console.log(userId);
  };

  const deleteLectureButtonHandler = (courseId, lectureId) => {
    console.log(courseId);
    console.log(lectureId);
  }

  const addLectureHandler = (e, courseId, title, desccription, video) => {
    e.preventDefault();
  }

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
                        onClick={() => courseDetailsHandler(e._id)}
                      >
                        View Lectures
                      </Button>

                      <Button
                        color={'purple.600'}
                        onClick={() => deleteButtonHandler(e._id)}
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

        <CourseModal isOpen={isOpen} onClose={onClose}
          id={"hfdhjgfj"}
          courseTitle={"jhdhjhhjz"}
          deleteButtonHandler={deleteLectureButtonHandler}
          addLectureHandler={addLectureHandler} />
      </Box>

      <Sidebar />
    </Grid>
  );
};

export default AdminCourses;

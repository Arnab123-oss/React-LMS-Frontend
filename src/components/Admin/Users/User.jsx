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
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUsers, updateUserRole } from '../../../redux/actions/admin';
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

const User = () => {
  // const users = [
  //   {
  //     _id: 'u1',
  //     name: 'Arnab Ghosh',
  //     email: 'arnab@gmail.com',
  //     role: 'admin',
  //     subscription: { status: 'active' },
  //   },
  // ];
  const { users, loading,message,error } = useSelector(state => state.admin);

  const dispatch = useDispatch();

  const updateHandler = userId => {
    dispatch(updateUserRole(userId))
  };

  const deleteButtonHandler = userId => {
 dispatch(deleteUser(userId))
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
    dispatch(getAllUsers());
  }, [dispatch,error,message]);

  return (
    <Grid
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
      css={{ cursor: `url(${cursor}),default` }}
    >
        <Box p={['0', '16']} overflowX={'auto'}>
          <Heading
            textTransform={'uppercase'}
            children="All Users"
            my={'16'}
            textAlign={['center', 'left']}
          />
          <TableContainer w={['100vw', 'full']}>
            <Table variant={'simple'} size={'lg'}>
              <TableCaption>All available users in the database</TableCaption>

              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Role</Th>
                  <Th>Subscription</Th>
                  <Th isNumeric>Action</Th>
                </Tr>
              </Thead>

              <Tbody>
                {users &&
                  users.map(e => (
                    // <Row key={e._id} items={e} />

                    <Tr>
                      <Td>#{e._id}</Td>
                      <Td>{e.name}</Td>
                      <Td>{e.email}</Td>
                      <Td>{e.role}</Td>
                      <Td>
                        {e.subscription && e.subscription.status === 'active'
                          ? 'Active'
                          : 'Not Active'}
                      </Td>
                      <Td isNumeric>
                        <HStack justifyContent={'flex-end'}>
                          <Button
                            variant={'outline'}
                            color={'purple.500'}
                            onClick={() => updateHandler(e._id)}
                            isLoading={loading}
                          >
                            Change Role
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
        </Box>

      <Sidebar />
    </Grid>
  );
};

export default User;

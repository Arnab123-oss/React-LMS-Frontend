import {
  Grid,
  Box,
  Text,
  Heading,
  Stack,
  HStack,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri';
import { DoughnutChart, LineChart } from './Chart';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardStats } from '../../../redux/actions/admin';
import Loader from '../../Layout/Loader/Loader';

const Databox = ({ title, qty, qtyPercentage, profit }) => (
  <Box
    w={['fill', '20%']}
    boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
    p={'8'}
    borderRadius={'lg'}
  >
    <Text children={title} />

    <HStack spacing={'6'}>
      <Text fontSize={'2xl'} fontWeight="bold" children={qty} />
      <HStack>
        <Text children={`${profit ? qtyPercentage : -qtyPercentage}%`} />
        {profit ? (
          <RiArrowUpLine color="green" />
        ) : (
          <RiArrowDownLine color="red" />
        )}
      </HStack>
    </HStack>
    <Text opacity={0.6} children={'Since Last Month'} />
  </Box>
);

const Bar = ({ title, value, profit }) => (
  <Box py={'4'} px={['0', '20']}>
    <Heading children={title} mb={'2'} size={'sm'} textAlign={'center'} />

    {/* <HStack w={'full'} alignItems={'center'}>
      <Text children={profit ? '0%' : `${value}%`} />
      <Progress
        w={'full'}
        value={profit ? value : 0}
        colorScheme="purple"
        borderRadius={'full'}
      />
      <Text children={`${value > 100 ? value : 100}%`} />
    </HStack> */}

    {profit ? (
      <CircularProgress
        value={value}
        color="green.400"
        size="100px"
        thickness="8px"
      >
        <CircularProgressLabel fontSize="md">{`${value}%`}</CircularProgressLabel>
      </CircularProgress>
    ) : (
      <CircularProgress
        value={value}
        color="red.400"
        size="100px"
        thickness="8px"
      >
        <CircularProgressLabel fontSize="md" color={'red.400'}>{`${value}%`}</CircularProgressLabel>
      </CircularProgress>
    )}
  </Box>
);
const Dashboard = () => {
  const dispatch = useDispatch();

  const {
    loading,
    stats,
    usersCount,
    subscriptionCount,
    viewsCount,
    userProfit,
    viewsProfit,
    subscriptionProfit,
    userPercentage,
    viewsPercentage,
    subscriptionPercentage,
  } = useSelector(state => state.admin);

  // console.log(userProfit, viewsProfit, subscriptionProfit);

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  return (
    <Grid
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
      css={{ cursor: `url(${cursor}),default` }}
    >
      {loading || !stats ? (
        <Loader color="purple.500" />
      ) : (
        <Box boxSizing="border-box" py={'16'} px={['4', '0']}>
          <Text textAlign={'center'} opacity={0.5}>
            {`Last change was on ${
              String(new Date(stats[11].createdAt)).split('G')[0]
            }`}
          </Text>
          <Heading
            children="Dashboard"
            ml={['0', '16']}
            mb={'16'}
            textAlign={['center', 'left']}
          />

          <Stack
            direction={['column', 'row']}
            minH={'24'}
            justifyContent={'space-evenly'}
          >
            <Databox
              title="views"
              qty={viewsCount}
              qtyPercentage={viewsPercentage}
              profit={viewsProfit}
            />
            <Databox
              title="Users"
              qty={usersCount}
              qtyPercentage={userPercentage}
              profit={userProfit}
            />
            <Databox
              title="Subscription"
              qty={subscriptionCount}
              qtyPercentage={subscriptionPercentage}
              profit={subscriptionProfit}
            />
          </Stack>

          <Box
            m={['0', '16']}
            borderRadius={'lg'}
            p={['0', '16']}
            mt={['4', '16']}
            boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
          >
            <Heading
              textAlign={['center', 'left']}
              size={'md'}
              children="Views Graph"
              pt={['8', '0']}
              ml={['0', '16']}
            />
            {/* Line Graph Here */}

            <LineChart viewsArray={stats.map(item => item.views)} />
          </Box>
          <Grid templateColumns={['1fr', '2fr 1fr']}>
            <Box p="4" alignItems={'center'}>
              <Heading
                textAlign={'center'}
                size={'md'}
                children="Progress Bar"
                ml={['0', '16']}
                my="8"
              />
              <HStack w={'full'} mt={["0px","110px"]} >
                <Bar
                  profit={viewsProfit}
                  title="Views"
                  value={viewsPercentage}
                />
                <Bar profit={userProfit} title="Users" value={userPercentage} />
                <Bar
                  profit={subscriptionProfit}
                  title="Subscription"
                  value={subscriptionPercentage}
                />
              </HStack>
            </Box>
            <Box p={['0', '16']} boxSizing="border-box" py="4">
              <Heading textAlign={'center'} size="md" mb="4" children="Users" />

              {/* Doughnut Graph */}

              <DoughnutChart
                users={[subscriptionCount, usersCount - subscriptionCount]}
              />
            </Box>
          </Grid>
        </Box>
      )}

      <Sidebar />
    </Grid>
  );
};

export default Dashboard;

import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { server } from '../../redux/store';
import { buySubscription } from '../../redux/actions/user';
import { toast } from 'react-hot-toast';
import vg from '../../assets/images/download.png';


const Subscribe = ({user}) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState('');

  const { loading, error, subscriptionId } = useSelector(state => state.subscription);

  const { error: courseError } = useSelector(state => state.course);

  const subscribeHandler = async () => {
    const {
      data: { key },
    } = await axios.get(`${server}/razorpaykey`);
    setKey(key);
    dispatch(buySubscription());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (courseError) {
      toast.error(courseError);
      dispatch({ type: 'clearError' });
    }

    if (subscriptionId) {
      const openPopUp = () => {
        const options = {
          key,
          name:"CourseBundler",
          description:"Get access to all premium content",
          image:vg,
          subscription_id:subscriptionId,
          callback_url:`${server}/paymentverification`,
          prefill:{
            name:user.name,
            email:user.email,
            contact:""
          },
          notes:{
            address:"Last lamppost in Baruipur"
          },
          theme:{
            color:"#FFC800"
          }
        };
        const razor = new window.Razorpay(options);
        razor.open();
      };
      openPopUp();
    }
  }, [courseError, subscriptionId, error, dispatch,user.name,user.email,key]);

  return (
    <Container h={'90vh'} p={'16'}>
      <Heading children="Welcome" my={'8'} textAlign={'center'} />

      <VStack
        boxShadow={'lg'}
        alignItems="stretch"
        borderRadius={'lg'}
        spacing="0"
      >
        <Box bg={'pink.400'} p={'4'} css={{ borderRadius: '8px 8px 0 0' }}>
          <Text color={'black'} children={`Pro Pack - ₹299.00`} />
        </Box>
        <Box p={'4'}>
          <VStack textAlign={'center'} px={'8'} mt={'4'} spacing={'8'}>
            <Text children={`Join pro pack and get access to all content.`} />
            <Heading size={'md'} children={'₹399 only'} />
          </VStack>

          <Button
            my={'8'}
            width={'full'}
            colorScheme={'pink'}
            onClick={subscribeHandler}
            isLoading={loading}
          >
            Buy Now
          </Button>
        </Box>
        <Box
          bg={'blackAlpha.600'}
          p={'4'}
          css={{ borderRadius: '0 0 8px 8px' }}
        >
          <Heading
            size={'sm'}
            children={'100% refund at cancellation'}
            color={'white'}
            textTransform={'uppercase'}
          />
          <Text
            fontSize={'xs'}
            color={'white'}
            children={'*Terms & Condition'}
          />
        </Box>
      </VStack>
    </Container>
  );
};

export default Subscribe;

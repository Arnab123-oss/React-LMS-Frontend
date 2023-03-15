import { Button, Input, Container, Heading, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../../redux/actions/profile';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const ResetPassword = () => {
  const [passsword, setPasssword] = useState('');
  const params = useParams();
  const navigate = useNavigate();

  const { loading, message, error } = useSelector(state => state.profile);
  const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault();
    dispatch(resetPassword(params.token, passsword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
      navigate('/login');
    }
  }, [dispatch, message, error]);

  return (
    <Container padding={'16'} h={'90vh'}>
      <form onSubmit={submitHandler}>
        <Heading
          children="Reset Password"
          my="16"
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
        />
        <VStack spacing={'8'}>
          <Input
            requred
            value={passsword}
            onChange={e => setPasssword(e.target.value)}
            placeholder="New Password"
            type={'Password'}
            focusBorderColor="purple.500"
          />

          <Button
            isLoading={loading}
            type="submit"
            width="full"
            colorScheme="pink"
          >
            Reset Password
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ResetPassword;

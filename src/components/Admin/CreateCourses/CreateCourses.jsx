import {
  Grid,
  Container,
  Heading,
  VStack,
  Input,
  Select,
  Image,
  Button,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import { fileUpload } from '../../Auth/Register';
import { createCourse } from '../../../redux/actions/admin';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const CreateCourses = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [categories, setCategories] = useState('');
  const [image, setImage] = useState();
  const [imagePrev, setImagePrev] = useState('');

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector(state => state.admin);

  const Category = [
    'Bachelor of Rural Studies',
    'Ethical Hacking',
    'Cloud Computing',
    'Artificial Intelligence',
    'Machine Learning and Deep Learning',
    'Full Stack Developer',
    'Digital Marketing',
    'Cybersecurity',
  ];

  const changeFileHandler = e => {
    // console.warn(e.target.files);
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };

    // console.log(e.target.files);
    // setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
  const submitHandler = e => {
    e.preventDefault();
    //title, description, category, createdBy ,file
    const myForm = new FormData();

    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('category', categories);
    myForm.append('createdBy', createdBy);
    myForm.append('file', image);

    dispatch(createCourse(myForm));
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
  }, [dispatch, error, message]);

  return (
    <Grid
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
      css={{ cursor: `url(${cursor}),default` }}
    >
      <Container py={'16'}>
        <form onSubmit={submitHandler}>
          <Heading
            textTransform={'uppercase'}
            children="Create Crouse"
            my={'16'}
            textAlign={['center', 'left']}
          />
          <VStack m={'auto'} spacing={'8'}>
            <Input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Title"
              type={'text'}
              focusBorderColor="purple.300"
            />

            <Input
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Description"
              type={'text'}
              focusBorderColor="purple.300"
            />

            <Input
              value={createdBy}
              onChange={e => setCreatedBy(e.target.value)}
              placeholder="Creator Name"
              type={'text'}
              focusBorderColor="purple.300"
            />

            <Select
              focusBorderColor="purple.300"
              value={categories}
              onChange={e => setCategories(e.target.value)}
            >
              <option value="">Category</option>

              {Category.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>

            <Input
              accept="image/*"
              required
              type={'file'}
              focusBorderColor="purple.300"
              css={{
                '&::file-selector-button': {
                  ...fileUpload,
                  color: 'purple',
                },
              }}
              onChange={changeFileHandler}
            />
            {imagePrev && (
              <Image
                src={imagePrev}
                boxSize="150px"
                objectFit={'contain'}
                // borderRadius="20px"
              />
            )}

            <Button  isLoading={loading} w="full" colorScheme={'purple'} type={'submit'}>
              Create
            </Button>
          </VStack>
        </form>
      </Container>

      <Sidebar />
    </Grid>
  );
};

export default CreateCourses;

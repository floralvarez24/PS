import React, {useEffect} from 'react';
import Layout from './Layout';
import FormEditFlete from '../components/FormEditFlete';
import { useDispatch } from 'react-redux';

import { getMe } from '../features/authSlice';

const EditFlete = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  
  
  return (
    <Layout>
      <FormEditFlete />
    </Layout>
  )
}

export default EditFlete;
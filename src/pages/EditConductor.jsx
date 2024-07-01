import React, {useEffect} from 'react';
import Layout from './Layout';
import FormEditConductor from '../components/FormEditConductor';
import { useDispatch } from 'react-redux';

import { getMe } from '../features/authSlice';

const EditConductor = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  
  
  return (
    <Layout>
      <FormEditConductor />
    </Layout>
  )
}

export default EditConductor;
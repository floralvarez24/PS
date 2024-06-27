import React, {useEffect} from 'react';
import Layout from './Layout';
import FormEditVehiculo from '../components/FormEditVehiculo';
import { useDispatch } from 'react-redux';

import { getMe } from '../features/authSlice';

const EditVehiculo = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  
  
  return (
    <Layout>
      <FormEditVehiculo />
    </Layout>
  )
}

export default EditVehiculo;
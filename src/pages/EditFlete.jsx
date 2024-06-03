import React, {useEffect} from 'react';
import Layout from './Layout';
import FormEditFlete from '../components/FormEditFlete';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const EditFlete = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError, user} = useSelector((state) => state.auth);
  
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  
  useEffect(() => {
    if (isError) {
      navigate('/');
    }
    if (user && user.rol !== '1') {
      navigate('/dashboard');
    }
  }, [isError, user,  navigate]);
  return (
    <Layout>
      <FormEditFlete />
    </Layout>
  )
}

export default EditFlete;
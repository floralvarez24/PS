import React, {useEffect} from 'react';
import Layout from './Layout';
import FormAddFlete from '../components/FormAddFlete';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const AddFlete = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError} = useSelector((state) => state.auth);
  
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  
  useEffect(() => {
    if (isError) {
      navigate('/');
    }
  }, [isError, navigate]);
  return (
    <Layout>
      <FormAddFlete />
    </Layout>
  )
}

export default AddFlete;
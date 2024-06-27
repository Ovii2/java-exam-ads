import { useForm } from 'react-hook-form';
import { useState, useContext, useEffect } from 'react';
import { postCategory } from '../../services/post';
import { getCategories } from '../../services/get';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';

import './CategoriesForm.css';
import CategoriesContext from '../../Context/CategoriesContext/CategoriesContext';

const CategoriesForm = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [error, setError] = useState('');
  const { setUpdate, setCategories } = useContext(CategoriesContext);
  const [existingCategories, setExistingCategories] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const fetchCategories = async () => {
    try {
      const categories = await getCategories();
      setExistingCategories(categories);
    } catch (error) {
      setError(error.message);
      toast.error('Error fetching categories');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const formSubmitHandler = async (data) => {
    const categoryExists = existingCategories.some(
      (category) => category.title.toLowerCase() === data.title.toLowerCase()
    );

    if (categoryExists) {
      toast.error('Category already exists');
      return;
    }
    try {
      const response = await postCategory(data);
      setUpdate((update) => update + 1);
      setIsFormOpen(false);
      reset();
      toast.success('Category added!');
      return response;
    } catch (error) {
      setError(error.message);
      toast.error('Error adding category');
    }
  };

  return (
    <div className='categories-form-container'>
      <button className='categories-btn' onClick={() => setIsFormOpen(!isFormOpen)}>
        +Add category
      </button>
      {isFormOpen && (
        <form className='categories-form' noValidate onSubmit={handleSubmit(formSubmitHandler)}>
          <TextField
            required
            id='title'
            label='Title'
            placeholder='Add title'
            {...register('title', {
              required: { message: 'Title is required' },
            })}
          />
          {errors.title && <div className='error'>{errors.title.message}</div>}
          <button type='submit' className='categories-btn'>
            Add
          </button>
        </form>
      )}
    </div>
  );
};

export default CategoriesForm;

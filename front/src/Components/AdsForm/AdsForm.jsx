import { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { toast } from 'react-toastify';
import './AdsForm.css';

import { postAd } from '../../services/post';
import { getCategories } from '../../services/get';
import CategoriesContext from '../../Context/CategoriesContext/CategoriesContext';
import { getUserRoleFromToken } from '../../utils/jwt';
import AdsContext from '../../Context/AdsContext/AdsContext';

const AdsForm = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [error, setError] = useState('');

  const { setUpdate, setAds } = useContext(AdsContext);
  const { categories, setCategories } = useContext(CategoriesContext);

  const token = localStorage.getItem('token');
  const role = getUserRoleFromToken(token);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      city: '',
      price: '',
      categoryId: '',
    },
  });

  const fetchCategories = async () => {
    if (role === 'ADMIN') {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        setError(error.message);
        toast.error('Error fetching categories');
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [setCategories, role]);

  const formSubmitHandler = async (data) => {
    console.log(data);
    try {
      const response = await postAd(data);
      setUpdate((update) => update + 1);
      setIsFormOpen(false);
      reset();
      toast.success('Ad created!');
    } catch (error) {
      setError(error.message);
      toast.error('Error creating ad');
    }
  };

  return (
    <div className='ads-form-container'>
      {role === 'ADMIN' && (
        <>
          <button className='ads-btn' onClick={() => setIsFormOpen(!isFormOpen)}>
            +Create ad
          </button>
          {isFormOpen && (
            <form className='ads-form' noValidate onSubmit={handleSubmit(formSubmitHandler)}>
              <FormControl fullWidth>
                <InputLabel required id='category-label'>
                  Category
                </InputLabel>
                <Select
                  required
                  labelId='category-label'
                  id='categoryId'
                  label='Category'
                  {...register('categoryId', {
                    required: { value: true, message: 'Category is required' },
                  })}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors.categoryId && <div className='error'>{errors.categoryId.message}</div>}

              <TextField
                sx={{
                  '& :-webkit-autofill': {
                    transitionDelay: '9999s',
                  },
                }}
                required
                id='title'
                label='Title'
                placeholder='Add title'
                {...register('title', {
                  required: { value: true, message: 'Title is required' },
                })}
              />
              {errors.title && <div className='error'>{errors.title.message}</div>}

              <TextField
                sx={{
                  '& :-webkit-autofill': {
                    transitionDelay: '9999s',
                  },
                }}
                required
                id='description'
                label='Description'
                multiline
                rows={4}
                placeholder='Add description'
                {...register('description', {
                  required: { value: true, message: 'Description is required' },
                })}
              />
              {errors.description && <div className='error'>{errors.description.message}</div>}

              <TextField
                sx={{
                  '& :-webkit-autofill': {
                    transitionDelay: '9999s',
                  },
                }}
                required
                id='price'
                label='Price'
                placeholder='Add price'
                {...register('price', {
                  required: { value: true, message: 'Price is required' },
                })}
              />
              {errors.price && <div className='error'>{errors.price.message}</div>}

              <TextField
                sx={{
                  '& :-webkit-autofill': {
                    transitionDelay: '9999s',
                  },
                }}
                required
                id='city'
                label='City'
                placeholder='Add city'
                {...register('city', {
                  required: { value: true, message: 'City is required' },
                })}
              />
              {errors.city && <div className='error'>{errors.city.message}</div>}

              <button type='submit' className='ads-btn'>
                Add
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default AdsForm;

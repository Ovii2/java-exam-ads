import { useContext, useEffect, useState } from 'react';
import { getOneAd } from '../../../services/get';
import { toast } from 'react-toastify';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import { NavLink, useParams } from 'react-router-dom';
import { updateDataAuth } from '../../../services/update';
import { getUserRoleFromToken } from '../../../utils/jwt';
import { useForm } from 'react-hook-form';
import CategoriesContext from '../../../Context/CategoriesContext/CategoriesContext';
import AdsContext from '../../../Context/AdsContext/AdsContext';

import './AdDetailsCard.css';

const AdDetailsCard = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [ad, setAd] = useState(null);
  const { id } = useParams();
  const { setUpdate } = useContext(AdsContext);
  const { categories } = useContext(CategoriesContext);
  const token = localStorage.getItem('token');
  const role = getUserRoleFromToken(token);

  const [editTitle, setEditTitle] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [editPrice, setEditPrice] = useState(false);
  const [editCity, setEditCity] = useState(false);
  const [editDescription, setEditDescription] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const fetchAd = async (id) => {
    try {
      const data = await getOneAd(id);
      setAd(data);
    } catch (error) {
      setError(error.message);
      toast.error('Error fetching ad details');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAd(id);
    if (ad) {
      setValue('title', ad.title);
      setValue('category', ad.category.title);
      setValue('city', ad.city);
      setValue('price', ad.price);
      setValue('description', ad.description);
    }
  }, [id, setValue]);

  const handleAdDescriptionChange = async (data) => {
    try {
      if (role === 'ADMIN') {
        await updateDataAuth(`ads/${ad.id}`, { description: data.description });
        setUpdate((prev) => !prev);
        setEditDescription(false);
        fetchAd(id);
      }
    } catch (error) {
      console.error('Error updating description:', error.message);
    }
  };

  const handleAdPriceChange = async (data) => {
    try {
      if (role === 'ADMIN') {
        await updateDataAuth(`ads/${ad.id}`, { pages: data.pages });
        setUpdate((prev) => !prev);
        setEditCity(false);
        fetchAd(id);
      }
    } catch (error) {
      console.error('Error updating price:', error.message);
    }
  };

  const handleAdCityChange = async (data) => {
    try {
      if (role === 'ADMIN') {
        await updateDataAuth(`ads/${ad.id}`, { isbn: data.isbn });
        setUpdate((prev) => !prev);
        setEditPrice(false);
        fetchAd(id);
      }
    } catch (error) {
      console.error('Error updating city:', error.message);
    }
  };

  const handleAdCategoryChange = async (data) => {
    try {
      if (role === 'ADMIN') {
        await updateDataAuth(`ads/${ad.id}`, { categoryId: data.category });
        setUpdate((prev) => !prev);
        setEditCategory(false);
        fetchAd(id);
      }
    } catch (error) {
      console.error('Error updating category:', error.message);
    }
  };

  const handleAdTitleChange = async (data) => {
    try {
      if (role === 'ADMIN') {
        await updateDataAuth(`ads/${ad.id}`, { title: data.title });
        setUpdate((prev) => !prev);
        setEditTitle(false);
        fetchAd(id);
      }
    } catch (error) {
      console.error('Error updating pages:', error.message);
    }
  };

  return (
    <div className='ad-details-container'>
      <NavLink to={`/ads`} className='back-arrow'>
        <ArrowCircleLeftOutlinedIcon />
        <p>Back to ads</p>
      </NavLink>
      {ad ? (
        <div className='ad-details-card'>
          <div className='ad-details-card-info'>
            {editTitle && role === 'ADMIN' ? (
              <div className='input-ad-title'>
                <input
                  className='input-title'
                  {...register('title')}
                  defaultValue={ad.title}
                  onChange={(e) => setValue('title', e.target.value)}
                />
                <div className='cancel-check'>
                  <CheckIcon
                    sx={{ color: 'green', cursor: 'pointer' }}
                    onClick={handleSubmit(handleAdTitleChange)}
                  />
                  <CancelIcon
                    sx={{ color: 'tomato', cursor: 'pointer' }}
                    onClick={() => setEditTitle(false)}
                  />
                </div>
              </div>
            ) : (
              <p>
                <b>Title:</b> {ad.title}{' '}
                {role === 'ADMIN' && (
                  <EditIcon
                    sx={{ cursor: 'pointer', fontSize: '1rem' }}
                    onClick={() => setEditTitle(true)}
                  />
                )}
              </p>
            )}
            {editCategory && role === 'ADMIN' ? (
              <div className='input-category'>
                <select
                  {...register('category')}
                  defaultValue={ad.category.id}
                  onChange={(e) => {
                    setValue('category', e.target.value);
                    handleAdCategoryChange({ category: e.target.value });
                    setEditCategory(false);
                  }}
                  onBlur={() => setEditCategory(false)}
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <p>
                <b>Category:</b> {ad.category.title}{' '}
                {role === 'ADMIN' && (
                  <EditIcon
                    sx={{ cursor: 'pointer', fontSize: '1.1rem' }}
                    onClick={() => setEditCategory(true)}
                  />
                )}
              </p>
            )}

            {editPrice && role === 'ADMIN' ? (
              <div className='input-price'>
                <input
                  {...register('price')}
                  defaultValue={ad.price}
                  onChange={(e) => setValue('price', e.target.value)}
                />
                <div className='cancel-check'>
                  <CheckIcon
                    sx={{ color: 'green', cursor: 'pointer' }}
                    onClick={handleSubmit(handleAdCityChange)}
                  />
                  <CancelIcon
                    sx={{ color: 'tomato', cursor: 'pointer' }}
                    onClick={() => setEditPrice(false)}
                  />
                </div>
              </div>
            ) : (
              <p>
                <b>Price:</b> {ad.price}
                {role === 'ADMIN' && (
                  <EditIcon
                    sx={{ cursor: 'pointer', fontSize: '1rem' }}
                    onClick={() => setEditPrice(true)}
                  />
                )}
              </p>
            )}
            {editCity && role === 'ADMIN' ? (
              <div className='input-city'>
                <input
                  {...register('city')}
                  defaultValue={ad.city}
                  onChange={(e) => setValue('city', e.target.value)}
                />
                <div className='cancel-check'>
                  <CheckIcon
                    sx={{ color: 'green', cursor: 'pointer' }}
                    onClick={handleSubmit(handleAdPriceChange)}
                  />
                  <CancelIcon
                    sx={{ color: 'tomato', cursor: 'pointer' }}
                    onClick={() => setEditCity(false)}
                  />
                </div>
              </div>
            ) : (
              <p>
                <b>City:</b> {ad.city}{' '}
                {role === 'ADMIN' && (
                  <EditIcon
                    sx={{ cursor: 'pointer', fontSize: '1rem' }}
                    onClick={() => setEditCity(true)}
                  />
                )}
              </p>
            )}
            {editDescription && role === 'ADMIN' ? (
              <div>
                <textarea
                  {...register('description')}
                  className='edit-ad-description'
                  defaultValue={ad.description}
                  onChange={(e) => setValue('description', e.target.value)}
                />
                <div className='cancel-check'>
                  <CheckIcon
                    sx={{ color: 'green', cursor: 'pointer' }}
                    onClick={handleSubmit(handleAdDescriptionChange)}
                  />
                  <CancelIcon
                    sx={{ color: 'tomato', cursor: 'pointer' }}
                    onClick={() => setEditDescription(false)}
                  />
                </div>
              </div>
            ) : (
              <p>
                <b>Description:</b> {ad.description}{' '}
                {role === 'ADMIN' && (
                  <EditIcon
                    sx={{ cursor: 'pointer', fontSize: '1rem' }}
                    onClick={() => setEditDescription(true)}
                  />
                )}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className='no-ad-details'>No ad details found</div>
      )}
    </div>
  );
};

export default AdDetailsCard;

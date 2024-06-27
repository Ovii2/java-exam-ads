import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { NavLink } from 'react-router-dom';

import './AdCard.css';
import { getUserRoleFromToken } from '../../../utils/jwt';
import { deleteAd } from '../../../services/delete';
import { toast } from 'react-toastify';

const AdCard = ({ ad, setUpdate }) => {
  const { category, title, description, city, price, id } = ad;
  const [error, setError] = useState(null);
  const { setValue } = useForm();

  const token = localStorage.getItem('token');
  const role = getUserRoleFromToken(token);

  const handleDelete = async () => {
    try {
      const confirmed = window.confirm(`Are you sure you want to delete ${title}?`);
      if (confirmed && role === 'ADMIN') {
        await deleteAd(id);
        setUpdate((update) => update + 1);
      }
    } catch (error) {
      toast.error(`Error deleting ad: ${error.message}`);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (ad) {
      setValue('category', ad.category);
      setValue('title', ad.title);
      setValue('description', ad.description);
      setValue('city', ad.image);
      setValue('price', ad.pages);
    }
  }, [category, setValue]);

  return (
    <div className='card-container'>
      {role === 'ADMIN' && (
        <HighlightOffIcon
          className='delete-icon'
          sx={{ cursor: 'pointer', color: 'var(--tomato)' }}
          onClick={() => handleDelete(id)}
        />
      )}
      <NavLink to={`/ads/${id}`} ad={ad}>
        <div className='ad-card'>
          <div className='ad-info'>
            <p>Title: {title}</p>
            <p>Category: {category.title}</p>
            <p>City: {city}</p>
            <p>Price: {price}</p>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default AdCard;

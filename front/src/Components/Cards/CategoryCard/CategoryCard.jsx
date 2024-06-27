import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';
import { getUserRoleFromToken } from '../../../utils/jwt';
// import DeleteCategoryModal from '../../DeleteCategoryModal/DeleteCateogryModal';
import { updateDataAuth } from '../../../services/update';
import { deleteCategory } from '../../../services/delete';
import ClearIcon from '@mui/icons-material/Clear';

import './CategoryCard.css';

const CategoryCard = ({ category, setUpdate }) => {
  const { title, id } = category;
  const [editTitle, setEditTitle] = useState(false);
  const { register, setValue, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');
  const role = getUserRoleFromToken(token);

  const handleCategoryTitleChange = async (data) => {
    try {
      if (role === 'ADMIN') {
        await updateDataAuth(`categories/${category.id}`, { title: data.title });
        setUpdate((prev) => !prev);
        setEditTitle(false);
      }
    } catch (error) {
      console.error('Error updating title:', error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const confirmed = window.confirm(`Are you sure you want to delete category ${title}?`);
      if (confirmed && role === 'ADMIN') {
        await deleteCategory(id);
        setUpdate((update) => update + 1);
      }
    } catch (error) {
      toast.error('Error deleting category:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (category) {
      setValue('title', category.title);
    }
  }, [category, setValue]);

  return (
    <div className='category-card'>
      <ClearIcon
        category={category}
        sx={{ color: 'tomato', cursor: 'pointer' }}
        onClick={() => handleDelete()}
      />

      {editTitle && role === 'ADMIN' ? (
        <div className='edit-title'>
          <input {...register('title')} defaultValue={title} />
          <CheckIcon
            sx={{ color: 'green', cursor: 'pointer' }}
            onClick={handleSubmit(handleCategoryTitleChange)}
          />
          <CancelIcon
            sx={{ color: 'tomato', cursor: 'pointer' }}
            onClick={() => setEditTitle(false)}
          />
        </div>
      ) : (
        <h4>
          Title: {title}
          <ModeOutlinedIcon
            sx={{ color: 'brown', cursor: 'pointer', marginLeft: '0.2rem' }}
            onClick={() => {
              setEditTitle(true);
            }}
          />
        </h4>
      )}
    </div>
  );
};

export default CategoryCard;

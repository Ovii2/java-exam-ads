import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CommentsContext from '../../Context/CommentsContext/CommentsContext';
import CommentsForm from '../../Components/CommentsForm/CommentsForm';

import './AdDetailsPage.css';

import CommentsList from '../../Components/Lists/CommentsList/CommentsList';
import { getAllCommentsAuth } from '../../services/get';
import { useParams } from 'react-router-dom';
import AdDetailsCard from '../../Components/Cards/AdDetailsCard/AdDetailsCard';

const AdDetailsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { update, comments, setComments } = useContext(CommentsContext);
  const { id: bookId, commentId } = useParams();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await getAllCommentsAuth(bookId);
      setComments(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (bookId) {
      fetchData();
    }
  }, [update, bookId, commentId]);

  return (
    <div className='ad-details-page-container'>
      <AdDetailsCard />
      <CommentsForm />
      {isLoading ? (
        <p>Loading...</p>
      ) : comments.length === 0 ? (
        <p className='no-comments'>No comments available</p>
      ) : (
        <CommentsList className='comments-list' />
      )}
    </div>
  );
};

export default AdDetailsPage;

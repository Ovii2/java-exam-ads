import AdsForm from '../../Components/AdsForm/AdsForm';
import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import './AdsPage.css';
import { getAllAdsAuth } from '../../services/get';
import AdsList from '../../Components/Lists/AdsList/AdsList';
import AdsContext from '../../Context/AdsContext/AdsContext';

const AdsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { update, setAds, ads } = useContext(AdsContext);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await getAllAdsAuth();
      setAds(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [update]);

  return (
    <>
      <h1 className='ads-title'>Ads</h1>
      <div className='ads-page'>
        <AdsForm />
        {isLoading ? (
          <p>Loading...</p>
        ) : ads.length === 0 ? (
          <p className='no-ads'>No ads available</p>
        ) : (
          <AdsList />
        )}
      </div>
    </>
  );
};

export default AdsPage;

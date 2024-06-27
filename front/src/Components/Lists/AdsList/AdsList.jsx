import { useContext } from 'react';
import AdsContext from '../../../Context/AdsContext/AdsContext';

import './AdsList.css';
import AdCard from '../../Cards/AdCard/AdCard';

const AdsList = ({ filteredAds }) => {
  const { setUpdate, ads } = useContext(AdsContext);

  //   return (
  //     <>
  //       <div className='ads-list'>
  //         {ads.map((ad) => (
  //           <AdCard key={ad.id} ad={ad} setUpdate={setUpdate} />
  //         ))}
  //       </div>
  //     </>
  //   );
  // };

  return (
    <>
      <div className='ads-list'>
        {filteredAds.map((ad) => (
          <AdCard key={ad.id} ad={ad} setUpdate={setUpdate} />
        ))}
      </div>
    </>
  );
};

export default AdsList;

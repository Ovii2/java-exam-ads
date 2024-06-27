import { createContext, useState } from 'react';

const AdsContext = createContext();

export const AdsProvider = ({ children }) => {
  const [ads, setAds] = useState([]);
  const [update, setUpdate] = useState(0);

  return (
    <AdsContext.Provider value={{ ads, setAds, update, setUpdate }}>{children}</AdsContext.Provider>
  );
};

AdsContext.displayName = 'AdsContext';

export default AdsContext;

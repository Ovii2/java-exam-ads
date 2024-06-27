import { useState, useEffect, useContext } from 'react';
import './SearchBar.css';
import AdsContext from '../../Context/AdsContext/AdsContext';

function SearchBar({ setFilteredAds }) {
  const { ads } = useContext(AdsContext);
  const [searchText, setSearchText] = useState('');
  const [sortOption, setSortOption] = useState('title');

  useEffect(() => {
    let filtered = ads.filter(
      (ad) =>
        ad.title.toLowerCase().includes(searchText.toLowerCase()) ||
        (typeof ad.category === 'string' &&
          ad.category.toLowerCase().includes(searchText.toLowerCase()))
    );

    if (sortOption) {
      filtered.sort((a, b) => {
        if (a[sortOption] < b[sortOption]) return -1;
        if (a[sortOption] > b[sortOption]) return 1;
        return 0;
      });
    }

    setFilteredAds(filtered);
  }, [searchText, sortOption, ads, setFilteredAds]);

  return (
    <div className='search-bar'>
      <input
        id='search'
        className='search-input'
        type='text'
        placeholder='Search by title or category...'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className='sort-options'>
        <select
          className='select-btn'
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value='title'>Title</option>
          <option value='category'>Category</option>
        </select>
      </div>
    </div>
  );
}

export default SearchBar;

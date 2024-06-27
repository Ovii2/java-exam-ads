import './Header.css';
import '../../../src/variables.css';
import Navigation from '../Navigation/Navigation';

const Header = () => {
  return (
    <div className='header'>
      <img className='header-logo' src='/img/logo.png' alt='logo' />
      <Navigation />
    </div>
  );
};

export default Header;

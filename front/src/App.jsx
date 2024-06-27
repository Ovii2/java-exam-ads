import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import UserContext from './Context/UserContext/UserContext';
import { CategoriesProvider } from './Context/CategoriesContext/CategoriesContext';
import { AdsProvider } from './Context/AdsContext/AdsContext';
import { CommentsProvider } from './Context/CommentsContext/CommentsContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import CategoriesPage from './pages/CategoriesPage/CategoriesPage';
import AdsPage from './pages/AdsPage/AdsPages';
import AdDetailsPage from './pages/AdDetailsPage/AdDetailsPage';

function App() {
  const [user, setUser] = useState({});
  const [update, setUpdate] = useState(0);

  return (
    <>
      <ToastContainer autoClose={800} position='top-center' />
      <Header />
      <CommentsProvider>
        <AdsProvider>
          <CategoriesProvider>
            <UserContext.Provider value={{ user, setUser, update, setUpdate }}>
              <Routes>
                <Route path='/' element={<Navigate to='/register' />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route
                  path='/categories'
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <CategoriesPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/ads'
                  element={
                    <ProtectedRoute>
                      <AdsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/ads/:id'
                  element={
                    <ProtectedRoute>
                      <AdDetailsPage />
                    </ProtectedRoute>
                  }
                />
                <Route path='*' element={<NotFoundPage />} />
              </Routes>
            </UserContext.Provider>
          </CategoriesProvider>
        </AdsProvider>
      </CommentsProvider>
      <Footer />
    </>
  );
}

export default App;

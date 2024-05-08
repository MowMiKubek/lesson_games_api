import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './pages/layouts/MainLayout.jsx';
import MainPage from './pages/main.jsx';
import TestPage from './pages/test.jsx';
import LoginPage from './pages/login.jsx';
import ProfilePage from './pages/profile.jsx';
import GamePage from './pages/game.jsx';

import { AuthProvider } from './lib/AuthContext.jsx';
import RegisterPage from './pages/register.jsx';
import UpdateProfilePage from './pages/update_profile.jsx';
import ChangePasswordPage from './pages/change_password.jsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/game/:id" element={<GamePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile/update" element={<UpdateProfilePage />}/>
            <Route path="/profile/change_password" element={<ChangePasswordPage />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

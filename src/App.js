import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FileUpload from './pages/file-upload.page';
import Login from './pages/login.page';
import SignUp from './pages/sign-up.page';
import Details from './pages/details.page';
import { AppContext } from './AppContext';
import { useState } from 'react';

function App() {
  const [userInfo, setUserInfo] = useState({});

  return (
    <AppContext.Provider value={{ 
      userInfo,
      setUserInfo 
    }}>
      <Router>
        <Routes>
          <Route path="/" element={<FileUpload />} />
          <Route path="/details" element={<Details />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;

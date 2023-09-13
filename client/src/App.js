import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';
import CreateAccount from './pages/CreateAccount';
import Header from './components/Header';
import Profile from './pages/Profile';
import GenerateRanDEK from './components/GenerateRanDEK';
import FileAccessControl from './files/FileAccessControl';
import FileUploads from './files/FileUploads'
import RetrieveFile from './files/RetrieveFile';
import FileDownload from './files/FileDownload';
import EncryptFiles from './files/EncryptFiles';

function App() {
  
  return (
    <BrowserRouter>
    <div>
      <Header/>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='*' element={<NotFound/>} />
        <Route path='/create-user' element={<CreateAccount/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/uploads' element={<FileUploads/>} />
        
      </Routes>
      <RetrieveFile />
      <GenerateRanDEK />
      <FileAccessControl/> 
      <FileDownload />
      <EncryptFiles/>
    </div>
    </BrowserRouter>
  );
}

export default App;

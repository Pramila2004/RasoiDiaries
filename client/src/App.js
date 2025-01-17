
import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SinglePage from './pages/Singlepage'
import Profile from './pages/Profile';
import Add_recepie from './pages/Add_recepie'
import Profile_Update from './pages/Profile_Update'
import Liked from './pages/Liked'
import MyRecipes from './pages/MyRecipes';


function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/singlepage" element={<SinglePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/updateProfile" element={<Profile_Update />} />
        <Route path="/addRecipe" element={<Add_recepie />} />
        <Route path="/liked" element={<Liked />} />
        <Route path="/myRecipes" element={<MyRecipes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

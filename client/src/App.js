
import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SinglePage from './pages/Singlepage'
import Profile from './pages/Profile';
import ProfileUpdate from './pages/Profile_Update';
import AddRecipe from './pages/Add_recepie';
import Liked from './pages/Liked'
import MyRecipes from './pages/MyRecipes';
import Navbar from './components/Home_Components/Navbar';
import Search from './pages/Search'
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  return (
    <BrowserRouter>
          <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/singlepage/:id" element={<SinglePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/updateProfile" element={<ProfileUpdate />} />
        <Route path="/addRecipe" element={<AddRecipe />} />
        <Route path="/liked" element={<Liked />} />
        <Route path="/myRecipes" element={<MyRecipes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

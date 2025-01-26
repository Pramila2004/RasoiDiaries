/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from "react";
import Logo from "../Assets/Rasoi.png";
import '../Navbar/Navbar.css'
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import { AuthContext } from "../../context/AuthContext.js";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState(false);

  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
      link: "/",
    },
    {
      text: "Recipes",
      icon: <InfoIcon />,
      link: "/search",
    },
    {
      text: "About",
      icon: <CommentRoundedIcon />,
      link: "/about",
    },
    {
      text: "Contact",
      icon: <PhoneRoundedIcon />,
      link: "/contact",
    },
    {
      text: "Login",
      icon: <PhoneRoundedIcon />,
      link: "/login",
      condition: !currentUser,
    },
    {
      text: "Signup",
      icon: <PhoneRoundedIcon />,
      link: "/register",
      condition: !currentUser,
    },
    {
      text: "profile",
      icon: <PhoneRoundedIcon />,
      link: "/profile",
      condition: currentUser,
    },
  ];

  return (
    <nav>
      <div className="nav-logo-container">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="navbar-links-container">
        <a href="/">Home</a>
        <a href="/search">Recipes</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <>
          {!currentUser ? (
              <>
                <a href="/login">
                  <button className="secondary-button">Login</button>
                </a>
                <a href="/register">
                  <button className="secondary-button">Signup</button>
                </a>
              </>
          
          ) : (
            <>
              {/* <a href="/profile" className="profile-link">
                
                  <img
                  style={{width:'36px',height:'36px'}}
                    src={currentUser.avatar}
                    alt="User Avatar"
                    className="user-img"
                  />
                  <span className="username">{currentUser.username}</span>
                
              </a> */}
              <a href="/profile">
                  <button className="secondary-button">Profile</button>
                </a>
            </>
          )}
       </>
    </div>
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>

      <Drawer
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        anchor="right"
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions
              .filter((item) => item.condition === undefined || item.condition)
              .map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton component="a" href={item.link}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;

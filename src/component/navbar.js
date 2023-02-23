import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLoggedUser, handleLoggedUser } from "../redux/slices/userSlice";
import { auth, logOut } from "../services/firebase";

const pages = [{ id: 1, tooltip: "Home", route: "/home" }, { id: 2, tooltip: "Favourites", route: "/favourites" }];
const settings = ["Profile", "Logout"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedUser = useSelector(getLoggedUser);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) {
      localStorage.removeItem("loggedUser");
      return navigate("/");
    }
    fetchUserDetails();
  }, [user, loading]);

  const fetchUserDetails = () => {
    let user_obj = JSON.parse(localStorage.getItem("loggedUser"));
    console.log(user_obj);
    if (user_obj) {
      dispatch(handleLoggedUser(user_obj));
    } else {
      dispatch(handleLoggedUser({}));
    }
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    if (setting === "Profile") {
      navigate("/profile");
    } else if (setting === "Logout") {
      logOut();
      localStorage.removeItem("loggedUser");
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Let's Cook
          </Typography>
          <Box
            sx={{
              display: { md: "flex" },
              justifyContent: "end",
              marginRight: "6px"
            }}
          >
            {pages.map((page) => (
              <Tooltip title={page.tooltip} key={page.tooltip}>
                <IconButton
                  size="large"
                  onClick={() => navigate(page.route)}
                  color="inherit"
                >
                  {page.id==2 && <FavoriteBorderIcon alt={page.tooltip} />}
                </IconButton>
              </Tooltip>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={"User Image"} src={loggedUser.photoURL} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;

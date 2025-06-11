import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import toast from "react-hot-toast";

const Header = () => {
  const isLogin = !!localStorage.getItem("userId");
  const navigate = useNavigate();
  const [value, setValue] = useState();

  // Logout handler
  const handleLogout = () => {
    try {
      localStorage.clear();
      toast.success("Logout Successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h4">My Blog APP</Typography>
          {isLogin && (
            <Box display="flex" marginLeft="auto" marginRight="auto">
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab label="Blogs" component={Link} to="/blogs" />
                <Tab label="My Blogs" component={Link} to="/my-blogs" />
                <Tab label="Create Blog" component={Link} to="/create-blog" />
              </Tabs>
            </Box>
          )}
          <Box display="flex" marginLeft="auto">
            {!isLogin ? (
              <>
                <Button sx={{ margin: 1, color: "white" }} component={Link} to="/login">
                  Login
                </Button>
                <Button sx={{ margin: 1, color: "white" }} component={Link} to="/register">
                  Register
                </Button>
              </>
            ) : (
              <Button onClick={handleLogout} sx={{ margin: 1, color: "white" }}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;

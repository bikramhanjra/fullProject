import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { NavLink } from "react-router-dom";
import "../../styles/NavigationStyle.css";
import ListIcon from "@mui/icons-material/List";
import { useState } from "react";
import { brown } from "@mui/material/colors";

export default function Header() {
  const [moblieOpen, setMobileOpen] = useState(false);
  const handleDrawerToogle = () => {
    setMobileOpen(!moblieOpen);
  };
  const drawerContent = () => (
    <Box onClick={handleDrawerToogle} sx={{ textAlign: "center", width: 250 }}>
      <Typography
        variant="h5"
        color="white"
        component={"div"}
        sx={{ flexGrow: 1, my: 2 }}
      >
        <FastfoodIcon fontSize="large" />
        My School
      </Typography>
      <Divider />
      <ul className="mobile-navigation">
        <li>
          <NavLink activeClassName={"active"} to={"/"}>
            Student
          </NavLink>
        </li>
        <li>
          <NavLink to={"/teacher"}>Teacher</NavLink>
        </li>
        <li>
          <NavLink to={"/course"}>Courses</NavLink>
        </li>
      </ul>
    </Box>
  );

  return (
    <>
      <Box>
        <AppBar component={"nav"} sx={{ bgcolor: brown[900] }}>
          <Toolbar>
            <IconButton
              onClick={handleDrawerToogle}
              color="inherit"
              aria-label="open drawer"
              edge={"start"}
              sx={{ display: { sm: "none" } }}
            >
              <ListIcon />
            </IconButton>
            <Typography
              variant="h5"
              color="white"
              component={"div"}
              sx={{ flexGrow: 1 }}
            >
              <FastfoodIcon fontSize="large" />
              My School
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <ul className="navigation-menu">
                <li>
                  <NavLink activeclassname="acitve" to={"/"}>
                    Student
                  </NavLink>
                </li>
                <li>
                  <NavLink activeclassname="acitve" to={"/teacher"}>
                    Teacher
                  </NavLink>
                </li>
                <li>
                  <NavLink activeclassname="acitve" to={"/course"}>
                    Course
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink activeClassName="acitve" to={"/contact"}>
                    Contact
                  </NavLink>
                </li> */}
              </ul>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component={"nav"}>
          <Drawer
            variant="temporary"
            open={moblieOpen}
            onClose={handleDrawerToogle}
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            {drawerContent()}
          </Drawer>
        </Box>
      </Box>
      <Toolbar />
    </>
  );
}

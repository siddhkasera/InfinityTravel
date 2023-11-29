import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";

export const mainListItems = (
  <React.Fragment>

    {/* <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <Link to="/home">  <ListItemText primary="Home" /> </Link>
    </ListItemButton> */}

    <ListItemButton>
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <Link to="/search" sx={{ textDecoration: 'none' }}><ListItemText primary="Search" /></Link>
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <Link to="/support"><ListItemText primary="Support" /></Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <NotificationsIcon />
      </ListItemIcon>
      <Link to="/notification"><ListItemText primary="Notifications" /></Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
      <Link to="/account">  <ListItemText primary="Account" /></Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>

  </React.Fragment>
);
import React from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  InputBase,
  IconButton,
  Badge,
  makeStyles,
  Typography,
  MenuItem,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useClaims from "./Claims";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#66b3ff",
  },
}));

export default function Header() {
  const classes = useStyles();

  const { data: claims, isLoading } = useClaims();
  let logoutUrl = claims?.find((claim) => claim.type === "bff:logout_url");
  let nameDict = claims?.find((claim) => claim.type === "name");
  console.log(
    "Hi from headers",
    claims?.find((claim) => claim.type === "sub")?.value
  );
  let username = nameDict?.value;

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <MenuItem>
          <Typography variant="h6" color="inherit" noWrap>
            Home
          </Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant="h6" color="inherit" noWrap>
            <Link to="/About">
              <Typography variant="h6" color="inherit" noWrap>
                About
              </Typography>
            </Link>
          </Typography>
        </MenuItem>
        <MenuItem>
          {!username ? (
            <Link to="/bff/login?returnUrl=/signin-oidc">
              <Typography variant="h6" color="inherit" noWrap>
                Login
              </Typography>
            </Link>
          ) : (
            <div className="flex-shrink-0 block">
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="block text-base font-medium text-blue-500 md:text-sm">{`Hi, ${username}!`}</p>
                  <a
                    href={logoutUrl?.value}
                    className="block mt-1 text-sm font-medium text-blue-200 hover:text-blue-500 md:text-xs"
                  >
                    Logout
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* //AFTER LOGIN CONDITIONALLY RENDER STUDENT / TEACHER / ADMIN
            HOMEPAGE
            <nav>
              <ul>
                <li>
                  <Link to="/studenthomepage">Home</Link>
                </li>
                {/* <li>
            <Link to="dashboard">Dashboard</Link>
          </li> 
           <li>
            <Link to="about">About</Link>
          </li>    */}
          {/* </ul>
            </nav> */}
        </MenuItem>
      </Toolbar>
    </AppBar>
  );
}

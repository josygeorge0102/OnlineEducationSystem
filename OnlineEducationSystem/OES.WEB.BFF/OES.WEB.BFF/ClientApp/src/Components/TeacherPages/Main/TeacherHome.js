import CustomBtn from "../../CustomBtn";
import "./style.css";
import {
  createTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import Grid from "../../../Components/Grid";
import Img3 from "../../../Assests/img3.png";
import Img4 from "../../../Assests/img4.png";
import Img5 from "../../../Assests/img5.png";

import { Route, Router, Routes, Link } from "react-router-dom";

import Custombar from "../../../Components/ResponsiveAppBar";

import * as React from "react";
import Quiz from "../../StudentPages/Quiz/quizes";
<link
  rel="stylesheet"
  href="https://unpkg.com/tachyons@4.12.0/css/tachyons.min.css"
/>;

let theme = createTheme({
  palette: {
    primary: {
      main: "#2e1667",
    },
    secondary: {
      main: "#c7d8ed",
    },
  },
  typography: {
    fontFamily: ["Roboto"],
    h4: {
      fontWeight: 600,
      fontSize: 28,
      lineHeight: "2rem",
    },
    h5: {
      fontWeight: 100,
      lineHeight: "2rem",
    },
  },
});

theme = createTheme(theme, {
  palette: {
    info: {
      main: theme.palette.secondary.main,
    },
  },
});

const styles = makeStyles({
  wrapper: {
    width: "65%",
    margin: "auto",
    textAlign: "center",
  },
  bigSpace: {
    marginTop: "5rem",
  },
  littleSpace: {
    marginTop: "2.5rem",
  },
  grid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
});

function TeacherHome() {
  const classes = styles();
  return (
    <div className="Main">
      <ThemeProvider theme={theme}>
        <Custombar></Custombar>
        <div
          className={`${classes.grid} ${classes.bigSpace} ${classes.bigSpace}`}
        >
          <Link to="/TeacherClassroom">
            <Grid
              icon={<img src={Img3} height="100" width="200" />}
              btnTitle="Classroom1"
            ></Grid>
          </Link>
          <Link to="/TeacherClassroom">
            <Grid
              icon={<img src={Img4} height="100" width="200" />}
              btnTitle="Classroom2"
            />
          </Link>
          <Link to="/TeacherClassroom">
          <Grid
            icon={<img src={Img5} height="100" width="200" />}
            btnTitle="Classroom3"
          />
           </Link>
        </div>
        <div className={classes.bigSpace}></div>
      </ThemeProvider>
    </div>
  );
}
export default TeacherHome;

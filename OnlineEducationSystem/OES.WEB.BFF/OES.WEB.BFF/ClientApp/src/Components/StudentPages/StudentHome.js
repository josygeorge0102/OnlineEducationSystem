import CustomBtn from "../CustomBtn";
import "./style.css";
import {
  createTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import { Route, Router, Routes, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import useClaims from "../Claims";
import Custombar from "./ResponsiveAppBar";
import { useNavigate } from "react-router";
import * as React from "react";
import Quiz from "./Quiz/quizes";
import Classroom from "./Classroom";
import ClassroomCard from "./ClassroomCard";
{
  /* <link
  rel="stylesheet"
  href="https://unpkg.com/tachyons@4.12.0/css/tachyons.min.css"
/>; */
}

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

function StudentHome() {
  const [classrooms, setClassrooms] = useState([]);

  const { data: claims, isLoading } = useClaims();
  let studentId = claims?.find((claim) => claim.type === "sub")?.value;

  const config = {
    headers: {
      "X-CSRF": "1",
    },
  };
  const url = `/api/classroomservice/classrooms/students/${studentId}/classrooms`;

  useEffect(() => {
    (async () => {
      axios
        .get(url, config)
        .then((res) => {
          console.log(res.data);
          setClassrooms(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    })();
  }, [url]);

  const classes = styles();

  return (
    <div className="Main">
      <ThemeProvider theme={theme}>
        <Custombar></Custombar>
        <div
          className={`${classes.grid} ${classes.bigSpace} ${classes.bigSpace}`}
        >
          <Grid container>
            {classrooms.map((cl) => {
              return (
                <>
                  <Grid item key={cl.classroomId}>
                    <ClassroomCard classroom={cl} />
                  </Grid>
                </>
              );
            })}
          </Grid>
          {/* <Link to={`/api/classroomservice/classrooms/${classroomId}/students/${studentId}/classroom`}>
            <Grid
              icon={<img src={Img3} height="100" width="200" />}
              btnTitle="Classroom1"
            ></Grid>
          </Link>
          <Grid
            icon={<img src={Img4} height="100" width="200" />}
            btnTitle="Classroom2"
          />
          <Grid
            icon={<img src={Img5} height="100" width="200" />}
            btnTitle="Classroom3"
          />
        </div>
        <div className={`${classes.grid} ${classes.bigSpace}`}>
          <Grid
            icon={<img src={Img6} height="100" width="200" />}
            btnTitle="Classroom4"
          />
          <Grid
            icon={<img src={Img7} height="100" width="200" />}
            btnTitle="Classroom5"
          />
          <Grid
            icon={<img src={Img8} height="100" width="200" />}
            btnTitle="Classroom6"
          /> */}
        </div>
        <div className={classes.bigSpace}></div>
      </ThemeProvider>
    </div>
  );
}
export default StudentHome;

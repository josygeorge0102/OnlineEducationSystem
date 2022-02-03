import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "bootstrap/dist/css/bootstrap.min.css";
import "tachyons";
import { Link } from "react-router-dom";
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

function TeacherClassroom() {
  return (
    <div>
      <div className="tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Quiz 1
            </Typography>
            <Typography variant="h5" component="div">
              Conducted On:21/12/2021
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Avg Score:20/30
            </Typography>
            <Typography variant="body2">
              Students Attempted:
              <br />
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div className="tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Quiz 2
            </Typography>
            <Typography variant="h5" component="div">
              Conducted On:21/12/2021
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Avg Score:20/30
            </Typography>
            <Typography variant="body2">
              Students Attempted:
              <br />
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div className="tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Quiz 3
            </Typography>
            <Typography variant="h5" component="div">
              Due Date On:21/01/2022
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Avg Score:
            </Typography>
            <Typography variant="body2">
              Students Attempted:
              <br />
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
export default TeacherClassroom;

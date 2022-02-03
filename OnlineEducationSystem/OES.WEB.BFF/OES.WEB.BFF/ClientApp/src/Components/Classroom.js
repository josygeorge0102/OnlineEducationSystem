import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "bootstrap/dist/css/bootstrap.min.css";
import "tachyons";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import useClaims from "./Claims";
import { useState, useEffect } from "react";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const Classroom = () => {
  let { id } = useParams();
  const classroomId = id;
  const [tests, setTests] = useState([]);
  const { data: claims, isLoading } = useClaims();

  console.log("classroom  Id from card is", id);

  let studentId = claims?.find((claim) => claim.type === "sub")?.value;
  const config = {
    headers: { "X-CSRF": "1" },
  };
  console.log(`student id i s:${studentId}`);
  console.log(`student id i s:${classroomId}`);

  const url = `/api/classroomservice/tests/students/${studentId}/classrooms/${classroomId}/tests`;

  useEffect(() => {
    (async () => {
      axios
        .get(url, config)
        .then((res) => {
          console.log(res.data);
          setTests(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    })();
  }, [url]);

  return (
    <div>
      {tests.map((test) => (
        <div className="tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5">
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Quiz {test.testId}
              </Typography>
              <Typography variant="h5" component="div">
                {/* Conducted On:21/12/2021 */}
                {test.testName}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {new Date(test.testDate).getDate()} {"/"}
                {new Date(test.testDate).getMonth() + 1} {"/"}
                {new Date(test.testDate).getFullYear()}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Click to View</Button>
            </CardActions>
          </Card>
        </div>
      ))}
    </div>
  );
};
export default Classroom;

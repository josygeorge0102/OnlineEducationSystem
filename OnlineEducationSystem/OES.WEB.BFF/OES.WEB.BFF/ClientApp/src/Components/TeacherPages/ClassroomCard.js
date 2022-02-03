import { Link } from "react-router-dom";
import Grid from "../../Components/Grid";
import Classroom from "./Classroom";
import { useNavigate } from "react-router";
import { useState } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Img3 from "../../Assests/img3.png";

const ClassroomCard = (props) => {
  // const navigate = useNavigate();

  // const handleClassroomRoute = (classroomId) => {
  //   navigate(`/Classroom/${classroomId}`);
  // };
  console.log("Classroom id rom card is here");
  console.log(props.classroom.classroomId);
  return (
    <Link to={"/Classroom/" + props.classroom.classroomId}>
      <Grid
        icon={<img src={Img3} height="100" width="200" />}
        btnTitle={props.classroom.name}
      ></Grid>
    </Link>
  );
};

export default ClassroomCard;

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import admin from "../Assests/admin.jpg";
import teacher from "../Assests/teacher.png";
import student from "../Assests/student.jpg";
import { Link } from "react-router-dom";

export default function MediaCard() {
  return (
    <Stack sx={{ pt: 4 }} direction="row" spacing={10} justifyContent="center">
      <Card sx={{ maxWidth: 300 }}>
        <CardMedia component="img" height="140" image={admin} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            ADMIN LOGIN
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            component={Link}
            to="/Login"
            state={{ User: 'Admin' }}
          >
            Login
          </Button>
        </CardActions>
      </Card>

      <Card sx={{ maxWidth: 300 }}>
        <CardMedia component="img" height="140" image={teacher} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            STUDENT LOGIN
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            component={Link}
            to="/Login"
            state={{ User: 'Student' }}
          >
            Login
          </Button>
        </CardActions>
      </Card>
      <Card sx={{ maxWidth: 300 }}>
        <CardMedia component="img" height="140" image={student} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            TEACHER LOGIN
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            component={Link}
            to="/Login"
            state={{ User: 'Teacher' }}
          >
            Login
          </Button>
        </CardActions>
      </Card>
    </Stack>
  );
}

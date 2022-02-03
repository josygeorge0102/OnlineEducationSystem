import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Controls from "../controls/Controls";
import Container from "@material-ui/core/Container";
import { useForm, Form } from "../useform";
import Box from "@material-ui/core/Box";
import { Paper } from "@material-ui/core";
import Image1 from "../../Assests/alisha-teaching.jpg";

// const styles = {
//   paperContainer: {
//     backgroundImage: `url(${Image})`,
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//     backgroundSize: "cover",
//   },
// };
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];

const initialFValues = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  phoneNo: "",
  gender: "male",
  dob: new Date(),
  password: "",
  username: "",
};
export default function AddTeacher() {
  const classes = useStyles();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("firstName" in fieldValues)
      temp.firstName = fieldValues.firstName ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email =
        /$^|.+@.+..+/.test(fieldValues.email) && fieldValues.email
          ? ""
          : "Email is not valid.";
    if ("phoneNo" in fieldValues)
      temp.phoneNo =
        fieldValues.phoneNo.length > 9 ? "" : "Minimum 10 numbers required.";
    if ("password" in fieldValues)
      temp.password =
        fieldValues.password.length > 8
          ? ""
          : "Password should have atleast 8 characters";

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };
  const { values, setValues, errors, setErrors, handleInputChange } = useForm(
    initialFValues,
    true,
    validate
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("teacherAdded");
    }
  };

  /* const handleSubmit = (e) => {
    e.preventDefault();
    var data = {
      id: 0,
      lNamfule:fullname,
      email: email,
      mobile: mobile,
      gender: gender,
      dob: dob,
      password: password,
    };
    fetch('http://localhost:7649/api/Student/AddStudent', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(
      (result) => {
        alert(result['message'])
        if (result['status'] === 'ok') {
          window.location.href = '/';
        }
      }
    )
  };
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
   const[password, setPassword] = useState('');
   */
  return (
    <Paper backgroundImage="Image1">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Teacher
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Controls.Input
              name="firstName"
              label="First Name"
              value={values.firstName}
              /* onChange={(e) => setFullname(e.target.value) }*/
              onChange={handleInputChange}
              error={errors.firstName}
            />
            <br></br>
            <br></br>
            <Controls.Input
              name="lastName"
              label="Last Name"
              value={values.lastName}
              /* onChange={(e) => setFullname(e.target.value) }*/
              onChange={handleInputChange}
              error={errors.firstName}
            />
            <br></br>
            <br></br>

            <Controls.Input
              label="Email"
              name="email"
              value={values.email}
              /* onChange={(e) => setEmail(e.target.value)}*/
              onChange={handleInputChange}
              error={errors.email}
            />
            <br></br>
            <br></br>

            <Controls.RadioGroup
              name="gender"
              label="Gender"
              value={values.gender}
              onChange={handleInputChange}
              /*      onChange={(e) => setGender(e.target.value) } */
              items={genderItems}
            />
            <br></br>
            <br></br>
            <Controls.Input
              label="Phone Number"
              name="phoneNo"
              value={values.phoneNo}
              onChange={handleInputChange}
              /* onChange={(e) => setMobile(e.target.value) } */
              error={errors.phoneNo}
            />
            <br></br>
            <br></br>
            <Controls.DatePicker
              name="dob"
              label="DOB"
              value={values.dob}
              onChange={handleInputChange}
              /* onChange={(e) => setDob(e.target.value) } */
            />
            <br></br>
            <br></br>
            <Controls.Input
              name="userName"
              label="UserName"
              value={values.userName}
              /* onChange={(e) => setFullname(e.target.value) }*/
              onChange={handleInputChange}
              error={errors.firstName}
            />
            <br></br>
            <br></br>
            <Controls.Input
              label="Password"
              name="password"
              value={values.password}
              type="password"
              onChange={handleInputChange}
              /*  onChange={(e) => setPassword(e.target.value)} */
              error={errors.password}
            />
            <br></br>
            <br></br>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Add
            </Button>
          </form>
        </div>
        <Box mt={8}></Box>
      </Container>
    </Paper>
  );
}

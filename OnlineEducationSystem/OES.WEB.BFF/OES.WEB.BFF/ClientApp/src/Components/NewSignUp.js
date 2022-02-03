import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Controls from "./controls/Controls";
import Container from "@material-ui/core/Container";
import { useForm, Form } from "./useform";
import Box from "@material-ui/core/Box";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
};
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

const rand = Math.floor(Math.random() * 100 + 1);
const rollno = rand.toString();

export default function SignUpValidate() {
  const [role, setRole] = React.useState("");

  const initialFValues = {
    FirstName: "",
    LastName: "",
    Email: "",
    RollNo: { rollno },
    PhoneNumber: "",
    Gender: "male",
    DateOfBirth: new Date(),
    Role: "",
    Password: "",
    UserName: "",
  };
  const classes = useStyles();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("FirstName" in fieldValues)
      temp.FirstName = fieldValues.FirstName ? "" : "This field is required.";
    if ("UserName" in fieldValues)
      temp.UserName = fieldValues.UserName ? "" : "This field is required.";
    if ("Email" in fieldValues)
      temp.Email =
        /$^|.+@.+..+/.test(fieldValues.Email) && fieldValues.Email
          ? ""
          : "Email is not valid.";
    if ("PhoneNumber" in fieldValues)
      temp.PhoneNumber =
        fieldValues.PhoneNumber.length > 9
          ? ""
          : "Minimum 10 numbers required.";
    if ("Password" in fieldValues)
      temp.Password =
        fieldValues.Password.length > 8
          ? ""
          : "Password should have atleast 8 characters";

    setErrors({
      ...temp,
    });

    // if (fieldValues === values)
    //   return Object.values(temp).every((x) => x === "");
  };
  const { values, setValues, errors, setErrors, handleInputChange } = useForm(
    initialFValues,
    true,
    validate
  );

  const handleChange = (event) => {
    console.log("In handlechange", event.target.value);
    setRole(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);

    if (validate()) {
      console.log(values);

      axios({
        method: "post",
        url: `/api/userservice/users/Register`,
        data: {
          FirstName: values.FirstName,
          LastName: values.LastName,
          Email: values.Email,
          RollNo: { rollno },
          PhoneNumber: values.PhoneNumber,
          Gender: values.Gender,
          DateOfBirth: values.DateOfBirth,
          Role: values.Role,
          Password: values.Password,
          UserName: values.UserName,
        },
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        {/* {<Controls.Select
                        name="Role"
                        label="Role"
                        value={values.Role}
                        onChange={handleInputChange}
                         options={getDepartmentCollection()}
                        //  {error={errors.departmentId}}
                    />} */}

        <form className={classes.form} onSubmit={handleSubmit}>
          <InputLabel id="demo-simple-select-label">User Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            name="Role"
            id="demo-simple-select"
            value={values.Role}
            label="Role"
            onChange={handleInputChange}
          >
            <MenuItem value={"Teacher"}>Teacher</MenuItem>
            <MenuItem value={"Student"}>Student</MenuItem>
          </Select>
          <Controls.Input
            name="FirstName"
            label="FirstName"
            value={values.FirstName}
            //onChange={(e) => setFullname(e.target.value) }
            onChange={handleInputChange}
            error={errors.FirstName}
          />
          <br></br>
          <br></br>

          <Controls.Input
            label="LastName"
            name="LastName"
            value={values.LastName}
            /* onChange={(e) => setEmail(e.target.value)}*/
            onChange={handleInputChange}
            error={errors.LastName}
          />
          <br></br>
          <br></br>
          <Controls.Input
            label="Email"
            name="Email"
            value={values.Email}
            /* onChange={(e) => setEmail(e.target.value)}*/
            onChange={handleInputChange}
            error={errors.Email}
          />
          <br></br>
          <br></br>
          <Controls.Input
            label="UserName"
            name="UserName"
            value={values.UserName}
            /* onChange={(e) => setEmail(e.target.value)}*/
            onChange={handleInputChange}
            error={errors.UserName}
          />
          <br></br>
          <br></br>

          <Controls.RadioGroup
            name="Gender"
            label="Gender"
            /*  value={values.gender} */
            onChange={handleInputChange}
            /*      onChange={(e) => setGender(e.target.value) } */
            items={genderItems}
          />
          <br></br>
          <br></br>
          <Controls.Input
            label="PhoneNumber"
            name="PhoneNumber"
            value={values.PhoneNumber}
            onChange={handleInputChange}
            /* onChange={(e) => setMobile(e.target.value) } */
            error={errors.PhoneNumber}
          />
          <br></br>
          <br></br>
          <Controls.DatePicker
            name="DateOfBirth"
            label="DateOfBirth"
            value={values.DateOfBirth}
            onChange={handleInputChange}
            /* onChange={(e) => setDob(e.target.value) } */
          />
          <br></br>
          <br></br>
          <Controls.Input
            label="Password"
            name="Password"
            value={values.password}
            type="password"
            onChange={handleInputChange}
            /*  onChange={(e) => setPassword(e.target.value)} */
            error={errors.Password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
}

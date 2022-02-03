import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import AddTeacher from "./Addteacher"
import Image from "../../Assests/alisha-teaching.jpg";
import axios from "axios";
import { Container } from "@material-ui/core";

// import Image from "../Assests/alisha-teaching.jpg";
// import Image1 from "../Assests/alisha-student.jpg";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function Teacher(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  /* const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0; */

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const config = {
    headers: {
      "X-CSRF": "1",
    },
  };

  useEffect(() => {
    const GetData = async () => {
      const result = await axios("/api/userservice/students", config);
      setData(result.data);
    };
    GetData();
  });
  const deleteemployee = (id) => {
    debugger;

    axios
      .delete("https://localhost:7095/api/students?id=" + id)
      .then((result) => {
        console.log("deleted sucessfully");
      });
  };

  return (
    <Paper>
      <Container sx="sm">
        <div>
          {/* Header with inline css */}
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "15px",
              border: "13px solid #0000FF",
              color: "rgb(0,0,255)",
            }}
          >
            Teachers Details
          </h1>
          {/* Table component below header */}
        </div>
        <div align="left">
          <Button variant="contained" onClick={() => navigate("/Addteacher")}>
            Add Teacher
          </Button>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TableContainer sx={{ width: 900, height: 500 }} component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="right">Full Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Gender</TableCell>
                  <TableCell align="right">DOB</TableCell>
                  <TableCell align="right">Phone</TableCell>
                  <TableCell align="right">Passsword</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* (rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) &&  */}
                {data.map((user, idx) => (
                  <TableRow key={user.ID}>
                    <TableCell align="right">{user.studentId}</TableCell>
                    <TableCell component="th" scope="row">
                      {user.firstName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {user.lastName}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      {user.email}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      {user.gender}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      {user.dateOfBirth}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      {user.phoneNumber}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      {user.passwordHash}
                    </TableCell>
                    <TableCell align="center">
                      <ButtonGroup
                        color="primary"
                        aria-label="outlined primary button group"
                      >
                        <Button onClick={() => deleteemployee(user.rollno)}>
                          Del
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  {/*  <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={5}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              /> */}
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </div>
      </Container>
    </Paper>
  );
}
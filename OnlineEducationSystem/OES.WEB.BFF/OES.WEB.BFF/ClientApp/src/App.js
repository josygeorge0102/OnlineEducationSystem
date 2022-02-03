import Home from "./Components/Home";
import Login from "./Components/Login";
import NewSignUp from "./Components/NewSignUp";
import LoginAsUserType from "./Components/LoginAsUserType";
import Footer from "./Components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./Components/Admin";
import AddTeacher from "./Components/Teachers/Addteacher";
import Student from "./Components/AdminStudents/Student";
import AddStudent from "./Components/AdminStudents/AddStudent";
import StudentHomepage from "./Components/StudentHomepage";
import StudentClassroom from "./Components/StudentClassroom";
import Profile from "./Components/Profile";
import Test from "./Components/Test";
import { ContextProvider } from "./context/context";
import Quiz from "./Components/StudentPages/Quiz/quizes";
import TeacherHome from "./Components/TeacherPages/Main/TeacherHome";
import TeacherClassroom from "./Components/TeacherPages/Classroom";

//Shuchi Components
import TeacherStudent from "./Components/TeacherStudents/students";
import Createclass from "./Components/CreateClass/CreateClass";
import Classroom from "./Components/StudentPages/Classroom";
import TeacherProfile from "./Components/Teacher-Profile";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import UseClassroomSuyog from "./Components/UseClassroomSuyog";
import axios from "axios";
import { useQuery } from "react-query";

import StudentHome from "./Components/StudentPages/StudentHome";
import Teacher from "./Components/Teachers/Teacher";
import Question from "./Components/StudentPages/Quiz/Question";
// import AddTeacher from "./Components/Teachers/AddTeacher";
const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");

function App() {
  const config = {
    headers: {
      "X-CSRF": "1",
    },
  };

  const fetchClaims = async () => {
    // axios
    //   .get("/api/classroomservice/classrooms/teachers/14/classrooms", config)
    //   .then((res) => {
    //     console.log("see this ", res.data);
    //     return res.data;
    //   });
    // axios.get("/api/userservice/teachers/14/profile", config).then((res) => {
    //   console.log("see this from user service", res.data);
    //   return res.data;
    // });
  };
  fetchClaims();
  return (
    <div className="App">
      <QueryClientProvider client={new QueryClient()}>
        <ContextProvider>
          <Router basename={baseUrl}>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/Login" element={<Login />} /> */}
              <Route path="/studentHome" element={<StudentHome />} />
              <Route path="/Register" element={<NewSignUp />} />
              {/* <Route path="/LoginAsUserType" element={<LoginAsUserType />} /> */}
              <Route path="/About" element={<Footer />} />
              <Route
                exact
                path="/teacherHome"
                element={<TeacherHome />}
              ></Route>
              <Route exact path="/admin" element={<Admin />} />
              <Route exact path="/student" element={<Student />} />
              <Route exact path="/student/*" element={<AddStudent />} />
              <Route exact path="/teacher" element={<Teacher />} />
              <Route exact path="/teacher/*" element={<AddTeacher />} />
              {/* <Route
                exact
                path="/studenthomepage/Profile"
                element={<Profile />}
              ></Route>
              <Route
                exact
                path="/studenthomepage/classroom"
                element={<StudentClassroom />}
              ></Route>
              <Route
                exact
                path="/studenthomepage/classroom/Test"
                element={<Test />}
              /> */}
              {/* <Route exact path="/studenthomepage/join" element={<Alert/>}></Route> */}
              <Route path="/TeacherHome" element={<TeacherHome />} />
              <Route path="/students" element={<TeacherStudent />} />
              <Route path="/CreateClass" element={<Createclass />} />
              <Route path="/teacherClassroom" element={<TeacherClassroom />} />
              <Route path="/Classroom/:id" element={<Classroom />} />
              <Route path="/Classroom/:id/quizes/:id" element={<Quiz />} />
              <Route path="/Profile" element={<TeacherProfile />} />
            </Routes>
          </Router>
        </ContextProvider>
        {/*  <ReactQueryDevtools initialIsOpen={false} />*/}
      </QueryClientProvider>
    </div>
  );
}

export default App;

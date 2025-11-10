import "./App.css";
import ViewStudent from "./pages/students/ViewStudent";
import ViewTeacher from "./pages/teacher/ViewTeacher";
import ViewCourse from "./pages/courses/ViewCourse";
import PageNotFound from "./pages/PageNotFound";
import ViewEnrolledCourse from "./pages/enrolledCourse/ViewEnrolledCourse";
import SignIn from "./components/layouts/SignUp";
import Login from "./components/layouts/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signUp" element={<SignIn/>} />
          <Route path="/" element={<Login/>}/>
          <Route path="/student" element={<ViewStudent />} />
          <Route path="/teacher" element={<ViewTeacher />} />
          <Route path="/course" element={<ViewCourse />} />
          <Route path="/enrolledCourse" element={<ViewEnrolledCourse />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

import { useState } from "react";
import GetCourse from "./GetEnrolledCourse";
import AddCourse from "./AddEnrolledCourse";
import Ui from "../../components/layouts/Ui";

export default function ViewEnrolledCourse() {
  const [view, setView] = useState("getEnrolledCourse");
  const [viewButton, setViewButton] = useState("");
  const [enrolledCourse, setEnrolledCourse] = useState({
    studentId: "",
    courseId: "",
  });
  const [student, setStudent] = useState([]);
    const [course, setCourse] = useState([]);
  const handleView = (data, data2) => {
    console.log(data);
    setView(data);
    setViewButton(data2);
  };

  const handleAddEnrolledCourse = (e) => {
    const { name, value } = e.target;
    setEnrolledCourse((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleUpdateEnrolledCourse = (enrolledData) => {
    console.log("enrolled data", enrolledData)
    setEnrolledCourse(enrolledData);
  };

  async function getStudent() {
    try {
      const res = await fetch("http://localhost:3000/api/v1/student")
      const studentData = await res.json()
      console.log("TeacherID data", studentData.data)
      setStudent(studentData.data)
    } catch (error) {
      console.log("Error in Student Data in Courses", error);
    }
  }

  async function getCourse() {
    try {
      const res = await fetch("http://localhost:3000/api/v1/course")
      const courseData = await res.json()
      console.log("TeacherID data", courseData.data)
      setCourse(courseData.data)
    } catch (error) {
      console.log("Error in Course Data in Courses", error);
    }
  }

  return (
    <Ui>
      {view === "getEnrolledCourse" && (
        <GetCourse
          onHandleView={handleView}
          onHandleUpdateEnrolledCourse={handleUpdateEnrolledCourse}
          setEnrolledCourse={setEnrolledCourse}
          getStudent={getStudent}
          getCourse={getCourse}
        />
      )}
      {view === "addEnrolledCourse" && (
        <AddCourse
          enrolledCourse={enrolledCourse}
          handleAddEnrolledCourse={handleAddEnrolledCourse}
          onHandleView={handleView}
          viewButton={viewButton}
          student={student}
          course={course}
        />
      )}
    </Ui>
  );
}

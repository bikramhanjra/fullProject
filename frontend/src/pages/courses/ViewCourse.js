import { useState } from "react";
import GetCourse from "./GetCourse";
import AddCourse from "./AddCourse";
import Ui from "../../components/layouts/Ui";

export default function ViewCourse() {
  const [view, setView] = useState("getCourse");
  const [course, setCourse] = useState({
    courseName: "",
    capacity: "",
    courseFees: "",
    courseDuration: "",
    courseStartDate: "",
    teacherId: "",
  });
  const [teachers, setTeachers] = useState([]);

  const handleView = (data) => {
    console.log(data);
    setView(data);
  };

  const handleAddCourse = (e) => {
    const { name, value } = e.target;
    setCourse((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleUpdateCourse = (courseData) => {
    setCourse(courseData);
  };

  async function getTeacher() {
    try {
      const res = await fetch("http://localhost:3000/api/v1/teacher")
      const teacherData = await res.json()
      console.log("TeacherID data", teacherData.data)
      setTeachers(teacherData.data)
    } catch (error) {
      console.log("Error in Techer Data in Courses", error);
    }
  }

  return (
    <Ui>
      {view === "getCourse" && (
        <GetCourse
          onHandleView={handleView}
          onHandleUpdateCourse={handleUpdateCourse}
          onGetTeacher={getTeacher}
        />
      )}
      {view === "addCourse" && (
        <AddCourse
          course={course}
          onHandleAddCourse={handleAddCourse}
          onHandleView={handleView}
          teachers={teachers}
        />
      )}
    </Ui>
  );
}

import { useState } from "react";
import GetCourse from "./GetCourse";
import AddCourse from "./AddCourse";
import Ui from "../../components/layouts/Ui";

export default function ViewCourse() {
  const [view, setView] = useState("getCourse");
  const [viewButton, setViewButton] = useState("");
  const [course, setCourse] = useState({
    courseName: "",
    capacity: "",
    courseFees: "",
    courseDuration: "",
    courseStartDate: "",
    teacherId: "",
  });
  const [teachers, setTeachers] = useState([]);

  const handleView = (data, data2) => {
    console.log(data);
    setView(data);
    setViewButton(data2)
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
          setCourse={setCourse}
        />
      )}
      {view === "addCourse" && (
        <AddCourse
          course={course}
          onHandleAddCourse={handleAddCourse}
          onHandleView={handleView}
          teachers={teachers}
          viewButton={viewButton}
        />
      )}
    </Ui>
  );
}

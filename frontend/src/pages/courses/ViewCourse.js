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
  });

  const handleView =  (data) =>{
    console.log(data)
    setView(data)
  }

  const handleAddCourse = (e) =>{
    const { name, value } = e.target;
    setCourse((prevState) => ({ ...prevState, [name]: value }));
  }

  const handleUpdateCourse = (courseData) =>{
    setCourse(courseData)
  }

  return (
    <Ui>
      {view === "getCourse" && <GetCourse onHandleView={handleView} onHandleUpdateCourse={handleUpdateCourse}/>}
      {view === "addCourse" && <AddCourse course={course} onHandleAddCourse={handleAddCourse} onHandleView={handleView} />}
    </Ui>
  );
}

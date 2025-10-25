import { useState } from "react";
import GetTeacher from "./GetTeacher";
import AddTeacher from "./AddTeacher";
import Ui from "../../components/layouts/Ui";

export default function ViewTeacher() {
  const [view, setView] = useState("getTeacher");
    const [teacher, setTeacher] = useState({
    name: "",
    email: "",
    dob: "",
    salary: "",
  });

  const handleView =  (data) =>{
    console.log(data)
    setView(data)
  }

  const handleAddTeacher = (e) =>{
    const { name, value } = e.target;
    setTeacher((prevState) => ({ ...prevState, [name]: value }));
  }

  const handleUpdateTeacher = (teacherData) =>{
    setTeacher(teacherData)
  }

  return (
    <Ui>
      {view === "getTeacher" && <GetTeacher onHandleView={handleView} onHandleUpdateTeacher={handleUpdateTeacher}/>}
      {view === "addTeacher" && <AddTeacher teacher={teacher} onHandleAddTeacher={handleAddTeacher} onHandleView={handleView} />}
    </Ui>
  );
}

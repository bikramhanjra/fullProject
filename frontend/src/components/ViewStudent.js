import React, { useState } from "react";
import GetStudent from "./GetStudent";
import AddStudent from "./AddStudent";

export default function ViewStudent() {
  const [view, setView] = useState("getStudent");
    const [student, setStudent] = useState({
    name: "",
    email: "",
    dob: "",
    password: "",
    feesPaid: "",
    status: "",
  });

  const handleView =  (data) =>{
    console.log(data)
    setView(data)
  }

  const handleAddStudent = (e) =>{
    const { name, value } = e.target;
    setStudent((prevState) => ({ ...prevState, [name]: value }));
  }

  const handleUpdateStudent = (studentData) =>{
    setStudent(studentData)
  }

  return (
    <>
      {view === "getStudent" && <GetStudent onHandleView={handleView} onHandleUpdateStudent={handleUpdateStudent}/>}
      {view === "addStudent" && <AddStudent student={student} onHandleAddStudent={handleAddStudent} onHandleView={handleView} />}
    </>
  );
}

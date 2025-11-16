import { useState } from "react";
import GetStudent from "./GetStudent";
import AddStudent from "./AddStudent";
import Ui from "../../components/layouts/Ui";

export default function ViewStudent() {
  const [view, setView] = useState("getStudent");
  const [viewButton, setViewButton] = useState("");
  const [student, setStudent] = useState({
    name: "",
    email: "",
    dob: "",
    password: "",
    feesPaid: "",
    status: "",
  });

  const handleView = (data, data2) => {
    setView(data);
    setViewButton(data2);
  };

  const handleAddStudent = (e) => {
    const { name, value } = e.target;
    setStudent((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleUpdateStudent = (studentData) => {
    setStudent(studentData);
  };

  return (
    <Ui> 
      {view === "getStudent" && (
        <GetStudent
          onHandleView={handleView}
          setStudent={setStudent}
          onHandleUpdateStudent={handleUpdateStudent}
        />
      )}
      {view === "addStudent" && (
        <AddStudent
          student={student}
          viewButton={viewButton}
          onHandleAddStudent={handleAddStudent}
          onHandleView={handleView}
        />
      )}
    </Ui>
  );
}

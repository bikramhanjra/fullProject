import { useState } from "react";
import GetTeacher from "./GetTeacher";
import AddTeacher from "./AddTeacher";
import Ui from "../../components/layouts/Ui";
import DetailView from "./DetailView";

export default function ViewTeacher() {
  const [view, setView] = useState("getTeacher");
  const [viewButton, setViewButton] = useState("");
  const [teacher, setTeacher] = useState({
    name: "",
    email: "",
    dob: "",
    salary: "",
  });

  const handleView = (data, data2) => {
    setView(data);
    setViewButton(data2);
  };

  const handleAddTeacher = (e) => {
    const { name, value } = e.target;
    setTeacher((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleUpdateTeacher = (teacherData) => {
    setTeacher(teacherData);
  };

  const handleDetailViewer = (teacherData) => {
    console.log("this is data", teacherData)
    setTeacher(teacherData)
  }

  return (
    <Ui>
      {view === "getTeacher" && (
        <GetTeacher
          onHandleView={handleView}
          onHandleUpdateTeacher={handleUpdateTeacher}
          onHandleDetailViewer={handleDetailViewer}
          setTeacher={setTeacher}
        />
      )}
      {view === "addTeacher" && (
        <AddTeacher
          teacher={teacher}
          onHandleAddTeacher={handleAddTeacher}
          onHandleView={handleView}
          viewButton={viewButton}
        />
      )}
      {view === "detailView" && (
        <DetailView teacher={teacher} />
      )}
    </Ui>
  );
}

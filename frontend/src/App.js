import "./App.css";
import GetStudent from "./components/GetStudent";
import AddStudent from "./components/AddStudent";
import UpdateStudent from "./components/UpdateStudent";
import ViewStudent from "./components/ViewStudent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ViewStudent/>}/>
          <Route path="/GetStudent" element={<GetStudent/>}/>
          <Route path="/addStudent" element={<AddStudent/>}/>
          <Route path="update" element={<UpdateStudent/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

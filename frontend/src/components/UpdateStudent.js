import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";

export default function UpdateStudent() {
  const location = useLocation();
  const navigate = useNavigate();

  const studentId = location.state._id;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    console.log(data);

    try {
      
      const res = await fetch(
        `http://localhost:3000/api/v1/student/${studentId}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const studentData = await res.json();
      console.log("it is student data", studentData);
      navigate("/")
    } catch (error) {
      console.log("PATCH Error is", error);
    }
  }

  return (
    <div style={{ height:"100vh", width:"100vw", backgroundColor:"coral", color:"white"}} className="bg-sky-900">
      <h1 style={{height:"25vh", fontSize:"5rem", paddingTop:"3rem", textAlign:"center"}}>Update Student</h1>
      <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        
        <input {...register("name")} style={{height:"5rem", width:"30rem", margin:"2rem"}} />
        Name
        <input {...register("email")} style={{height:"5rem", width:"30rem", margin:"2rem"}} />
        Email
        <br />
        <input {...register("password")} style={{height:"5rem", width:"30rem", margin:"2rem"}} />
        Password
        <input {...register("dob")} style={{height:"5rem", width:"30rem", margin:"2rem"}} />
        Dob
        <br />
        <input {...register("feesPaid")} style={{height:"5rem", width:"30rem", margin:"2rem"}}/>
        FeesPaid
        <select id="status" {...register("status")} style={{height:"5rem", width:"30rem", margin:"2rem"}}>
          <option value="">status</option>
          <option value="active">Active</option>
          <option value="inActive">InActive</option>
        </select>
        <br />
      
        <button className="bg-light" type="submit" style={{height:"4rem", width:"30rem", marginLeft:"20rem" ,margin:"1rem"}}>
          Submit
        </button>
      </form>
      </div>
    </div>
  );
}

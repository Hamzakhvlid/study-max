import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import SideNav from "./Admin/components/SideNav.jsx";

// Pages
import Dashboard from "./Admin/Pages/Dashboard.jsx";
import AccessKeys from "./Admin/Pages/Products/userManagement.jsx";




import Login from "./Admin/Pages/Login.jsx";



import AddExamPaper from "./Admin/Pages/Products/AddExam.jsx";
import AddSubject from "./Admin/Pages/Products/AddSubject.jsx";
import ExamPaperDetails from "./Admin/Pages/Products/ExamPaperDetails.jsx";

const VERIFY_API = `${
  import.meta.env.VITE_BACKEND_DOMAIN_NAME
}/api/authentication/verify-token`;

export default function App() {
  const user = useSelector((state) => state.Singleuser);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
   

      {/* Protected Routes (Based on role) */}
      {user.data?.role === "admin" ? (
        <>
          <Route path="/" element={<SideNav />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="usermanagment" element={<AccessKeys />} />
            <Route path="exameaperdetails" element={<ExamPaperDetails/>} />
            <Route path="addsubject" element={<AddSubject/>}/>
         
            <Route path="addexampaper" element={<AddExamPaper />} />
      
          </Route>

          {/* Catch-all for authenticated users (if needed) */}
         
        </>
      ) : (
        // Public Route (Login)
        <Route path="*" element={<NotFound />} />
      )}
    </Routes>
  );
}

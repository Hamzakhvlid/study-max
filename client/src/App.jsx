import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import SideNav from "./Admin/components/SideNav.jsx";

// Pages
import Dashboard from "./Admin/Pages/Dashboard.jsx";
import AccessKeys from "./Admin/Pages/Products/userManagement.jsx";

import CategoryPage from "./Admin/Pages/Category/CategoryPage.jsx";

import AddCategoryForm from "./Admin/Pages/Category/AddCategoryForm.jsx";
import Login from "./Admin/Pages/Login.jsx";

import Editcategory from "./Admin/Pages/Category/Editcategory.jsx";

import Layout from "./customer/components/Layout.jsx";
import Home from "./customer/pages/home.jsx";
import About from "./customer/pages/About.jsx";
import Contact from "./customer/pages/Contact.jsx";







import TermsAndConditions from "./customer/pages/TermsConditions.jsx";


import ManageCurrentTypes from "./Admin/Pages/currentType.jsx";

const VERIFY_API = `${
  import.meta.env.VITE_BACKEND_DOMAIN_NAME
}/api/authentication/verify-token`;

export default function App() {
  const user = useSelector((state) => state.Singleuser);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="term" element={<TermsAndConditions />} />
    
      </Route>

      {/* Protected Routes (Based on role) */}
      {user.data?.role === "admin" ? (
        <>
          <Route path="/admin" element={<SideNav />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="usermanagment" element={<AccessKeys />} />
            <Route path="categories" element={<CategoryPage />} />
            <Route path="editcategory/:id" element={<Editcategory />} />
            <Route path="currenttype" element={<ManageCurrentTypes/>}/>
         
            <Route path="addcategory" element={<AddCategoryForm />} />
      
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

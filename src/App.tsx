import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DefaultLayout from "./layouts/DefaultLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import NotificationBar from "./components/notification/NotificationBar";
import CustomerList from "./pages/CustomerList";


function App() {
  return (
    <>
      <NotificationBar />
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Login />} />
        </Route>
        <Route element={<ProtectedLayout />}>
        <Route path="/register" element={<Register />} />
        <Route path="/customer-list" element={<CustomerList />} />

        </Route>
      </Routes>
    </>
  );
}

export default App;
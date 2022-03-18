import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./assets/scss/index.scss";

import IndexPage from "./pages";
import LoginPage from "./pages/login";

import Collection from "./pages/sub/Collection";
import Course from "./pages/sub/Course";
import Crawler from "./pages/sub/Crawler";
import RecomCourse from "./pages/sub/RecomCourse";
import Slider from "./pages/sub/Slider";
import Student from "./pages/sub/Student";
import Teacher from "./pages/sub/Teacher";

import ErrorPage from "./pages/sub/Error";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<IndexPage />}>
          <Route element={<Course />} path="/course"></Route>
          <Route element={<RecomCourse />} path="/recom_course"></Route>
          <Route element={<Slider />} path="/slider"></Route>
          <Route element={<Collection />} path="/collection"></Route>
          <Route element={<Teacher />} path="/teacher"></Route>
          <Route element={<Student />} path="/student"></Route>
          <Route element={<Crawler />} path="/crawler"></Route>
          <Route element={<ErrorPage />} path="/error"></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

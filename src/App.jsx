import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Course from './pages/Course';
import Chapter from './pages/Chapter';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Course/>}></Route>
        <Route path="/course/:id" element={<Chapter/>}></Route>
      </Routes>
    </Router>
  )
}

export default App

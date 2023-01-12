import React from "react";
import { Routes, Route } from "react-router";
import Tasks from "./pages/Tasks"


import './App.css';
import 'dayjs/locale/en-gb';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Tasks />}/>
      </Routes>
    </>
  );
}

export default App;

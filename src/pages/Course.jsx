import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Course = () => {
  const [data, setData] = useState([]);

  const callApi = async () => {
    const res = await axios.get("https://api.codingthailand.com/api/course");
    const data_format = await res.data.data;
    setData(data_format);
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold text-center my-6">Course</h1>
      <hr className="mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {data.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </>
  );
};

const CourseCard = (props) => {
  return (
    <NavLink
      to={"/course/" + props.id}
      className="block border rounded-lg shadow-md hover:shadow-xl hover:scale-105 transform transition-all duration-300 bg-white overflow-hidden"
    >
      <div className="relative">
        <img
          src={props.picture}
          alt={props.title}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{props.title}</h2>
        <p className="text-sm text-gray-600 mt-2">{props.detail}</p>
        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <span>📅 {props.date}</span>
          <span>👁 {props.view}</span>
        </div>
      </div>
    </NavLink>
  );
};

export default Course;

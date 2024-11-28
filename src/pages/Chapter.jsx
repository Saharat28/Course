import React from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Chapter = () => {
  const params = useParams();
  const id = params.id;
  const [data, setData] = useState([]);
  const [text, setText] = useState("");

  const callApi = async () => {
    const res = await axios.get(
      "https://api.codingthailand.com/api/course/" + id
    );

    const data_format = await res.data.data;
    if (data_format.length === 0) {
      setText("404 - ไม่มีข้อมูลในหลักสูตรนี้");
    } else {
      setData(data_format);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-center mb-4">เนื้อหาในหลักสูตร</h1>
        <NavLink
          to="/"
          className="text-blue-500 hover:underline text-sm flex justify-center"
        >
          กลับหน้าหลัก
        </NavLink>
      </div>

      {text ? (
        <p className="text-center text-red-500 text-lg">{text}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((d) => (
            <ChapterCard
              key={d.ch_id}
              title={d.ch_title}
              url={d.ch_url}
              view={d.ch_view}
              timetotal={d.ch_timetotal}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ChapterCard = (props) => {
  return (
    <div className="border rounded-lg shadow-md hover:shadow-xl bg-white overflow-hidden">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{props.title}</h2>
      </div>
      <div className="relative">
        <iframe
          src={`https://www.youtube.com/embed/${props.url}`}
          className="w-full h-48"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={props.title}
        ></iframe>
      </div>
      <div className="p-4">
        <div className="text-sm text-gray-600">
          👁 {props.view} views | 🕒 {props.timetotal} minutes
        </div>
      </div>
    </div>
  );
};

export default Chapter;

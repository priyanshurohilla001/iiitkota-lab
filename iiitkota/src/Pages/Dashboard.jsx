import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Dashboard = () => {
  const navigate = useNavigate();

  const [data, setdata] = useState([]);

  useEffect(() => {
    verifyUser();
    async function verifyUser() {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }

      const email = localStorage.getItem("email");
      if (!email) {
        navigate("/login");
      }

      const day = new Date().getDay();

      const datareq = await axios.post(
        "http://localhost:3000/api/v1/user/timetable",
        {
          email,
          day,
        },
      );

      if (!datareq) {
        console.log("No data found");
        return;
      }

      setdata(datareq.data);
    }
  }, []);
  return (
    <div>
      <div className="px-8 py-12 max-w-screen-xl mx-auto justify-center ">
        <h1 className="text-4xl font-bold">Today's Schedule</h1>
        <div>
          {data.map((item) => {
            return (
              <div
                key={item.startTime}
                className="flex flex-col p-8  rounded-lg shadow-xl mt-8 bg-white  border-2 border-gray-200"
              >
                <div className="text-2xl font-bold text-primary mb-2">
                  <h2>
                    {item.startTime} - {item.endTime}
                  </h2>
                </div>
                <h1 className="text-xl mb-1">{item.subject}</h1>
                <div className="flex justify-between text-base font-light text-gray-500">
                  <h2>{item.teacher}</h2>
                  <h2>{item.venue}</h2>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

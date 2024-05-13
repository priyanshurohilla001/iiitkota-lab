import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

export const Testpage = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputrefs = useRef([]);

  console.log(import.meta.env.VITE_SERVER + "/api/v1/user/timetable");

  const handleOtpChange = (value, index) => {
    const values = [...otp];
    values[index] = value;
    setOtp(values);

    if (value && index < otp.length - 1) {
      inputrefs.current[index + 1].focus();
    }
  };

  const backspace = (index) => {
    if (!otp[index] && index > 0) {
      inputrefs.current[index - 1].focus();
    }
  };

  const otpServer = 1234;

  useEffect(() => {
    const otpString = parseInt(otp.join(""));

    if (otpString > 999) {
      if (otpString == otpServer) {
        inputrefs.current.map((ref) => {
          ref.classList.add("border-green-500", "animate-pulse");
        });
      } else {
        inputrefs.current.map((ref) => {
          ref.classList.add("border-red-500", "animate-pulse");

          setTimeout(() => {
            ref.classList.remove("border-red-500", "animate-pulse");
            setOtp(["", "", "", ""]);
            inputrefs.current[0].focus();
          }, 2000);
        });
      }
    }
  }, [otp]);

  return (
    <div className=" h-[80vh] flex items-center justify-center bg-gray-50">
      <div className="bg-white mx-3 rounded px-10 py-8  shadow  flex flex-col text-left w-full md:w-1/3">
        <div className="">
          <h2 className="text-4xl font-semibold mb-2">OTP Verification</h2>
          <p className="text-gray-500 mb-8">
            You have received a 4 digit code on your email
          </p>
        </div>
        <div
          id="otp-container"
          className="flex gap-2 w-4/5 justify-between  items-center mx-auto"
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              className="w-1/4 border-2 border-gray-200 h-14 rounded-md bg-gray-50 text-2xl text-center"
              autoFocus={index === 0}
              ref={(x) => (inputrefs.current[index] = x)}
              onKeyDown={(e) =>
                e.key === "Backspace" ? backspace(index) : null
              }
              onChange={(e) => handleOtpChange(e.target.value, index)}
            />
          ))}
        </div>
        <div className="flex mt-8">
          <h4 className="mr-2 text-gray-500">Didn't receive the code?</h4>
          <h4 className="text-primary font-semibold">Send code again</h4>
        </div>
      </div>
    </div>
  );
};

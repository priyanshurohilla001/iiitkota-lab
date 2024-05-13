import { useEffect, useState } from "react";
import { useRef } from "react";
import "../styles/basic.css";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { signupDataAtom } from "../atoms/SignupDataatom.js";
import { useNavigate } from "react-router-dom";

export default function SignupVerificationPage() {
  const navigate = useNavigate();
  const data = useRecoilValue(signupDataAtom);

  const [input1, setinput1] = useState();
  const [input2, setinput2] = useState();
  const [input3, setinput3] = useState();
  const [input4, setinput4] = useState();

  const input1Ref = useRef();
  const input2Ref = useRef();
  const input3Ref = useRef();
  const input4Ref = useRef();

  const defaultclasses =
    "border-2 h-16 text-center align-middle text-3xl border-gray-200 w-1/4 no-spinners";
  const [inputClass, setInputClass] = useState(defaultclasses);

  useEffect(() => {
    input1Ref.current && input1Ref.current.focus();
  }, []);

  useEffect(() => {
    if (input1 && input1.length == 1) {
      input2Ref.current && input2Ref.current.focus();
    }
    if (input2 && input2.length == 1) {
      input3Ref.current && input3Ref.current.focus();
    }
    if (input3 && input3.length == 1) {
      input4Ref.current && input4Ref.current.focus();
    }

    if (input4 && input4.length == 1) {
      input4Ref.current && input4Ref.current.blur();
    }
  }, [input1, input2, input3, input4]);

  const handleKeyDown = (e, ref) => {
    if (e.key === "Backspace" && !e.target.value) {
      ref.current && ref.current.focus();
    }
  };

  const otpsubmit = parseInt(`${input1}${input2}${input3}${input4}`);

  useEffect(() => {
    if (otpsubmit > 999) {
      verifyOTP();
    }
  }, [input1, input2, input3, input4]);

  function verifyOTP() {
    axios
      .post(import.meta.env.VITE_SERVER + "/api/v1/emailverification/verify", {
        email: data.email,
        otp: otpsubmit,
      })
      .then((res) => {
        if (res.status == 200) {
          handleCorrectOTP();
        }
      })
      .catch((err) => {
        handleIncorrectOTP();
        console.log(err);
      });
  }

  function handleIncorrectOTP() {
    setInputClass(
      "border-4 h-16 text-center align-middle text-3xl animate-pulse  border-red-500 w-1/4 no-spinners transition ease-in-out duration-300",
    );

    setTimeout(() => {
      setinput1(null);
      setinput2(null);
      setinput3(null);
      setinput4(null);
      setInputClass(defaultclasses);
      input1Ref.current && input1Ref.current.focus();
    }, 1000);
  }

  async function handleCorrectOTP() {
    setInputClass(
      "border-4 h-16 text-center align-middle text-3xl animate-pulse border-green-500 w-1/4 no-spinners transition ease-in-out duration-300",
    );

    const res = await axios
      .post(import.meta.env.VITE_SERVER + "/api/v1/user/signup", {
        name: data.name,
        email: data.email,
        password: data.password,
        section: data.section,
      })
      .catch((error) => {
        console.log("Error signing up:", error);
      });

    const token = res.data.token;

    localStorage.getItem("token") && localStorage.removeItem("token");
    localStorage.getItem("email") && localStorage.removeItem("email");

    localStorage.setItem("token", token);
    localStorage.setItem("email", data.email);

    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  }

  return (
    <div className=" h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col gap-4 w-full mx-4 md:w-1/3 px-10 py-6 shadow-xs rounded-lg border-2 border-gray-100 bg-white">
        <h1 className="text-center text-4xl font-semibold">Verify OTP</h1>
        <p>
          Hi {data.name ? data.name : "User"}, Enter the OTP sent to your
          college email
        </p>
        <form className="flex gap-4">
          <input
            ref={input1Ref}
            type="number"
            className={inputClass}
            value={input1 || ""}
            onChange={(x) => setinput1(x.target.value)}
          ></input>
          <input
            ref={input2Ref}
            type="number"
            className={inputClass}
            value={input2 || ""}
            onChange={(x) => setinput2(x.target.value)}
            onKeyDown={(e) => handleKeyDown(e, input1Ref)} // we passed the reference we want it to shift to
          ></input>
          <input
            ref={input3Ref}
            type="number"
            className={inputClass}
            value={input3 || ""}
            onChange={(x) => setinput3(x.target.value)}
            onKeyDown={(e) => handleKeyDown(e, input2Ref)}
          ></input>
          <input
            ref={input4Ref}
            type="number"
            className={inputClass}
            value={input4 || ""}
            onChange={(x) => setinput4(x.target.value)}
            onKeyDown={(e) => handleKeyDown(e, input3Ref)}
          ></input>
        </form>
        <Resend />
        <div className="flex justify-between align-middle items-center">
          <p className="text-sm">Not {data.email} ? </p>
          <button
            onClick={() => {
              navigate("/signup");
            }}
          >
            {" "}
            Change email{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

function Resend() {
  const [time, setTime] = useState(30);
  const [resendAllowed, setResendAllowed] = useState(true);
  const intervalId = useRef();

  const data = useRecoilValue(signupDataAtom);

  const resendEmail = () => {
    axios.post(
      import.meta.env.VITE_SERVER + "/api/v1/emailverification/generate",
      {
        email: data.email,
      },
    );

    setResendAllowed(false);

    intervalId.current = setInterval(() => {
      setTime((prevValue) => {
        if (prevValue > 1) {
          return prevValue - 1;
        } else {
          clearInterval(intervalId.current);
          setResendAllowed(true);
          return 30;
        }
      });
    }, 1000);
  };

  return (
    <div>
      {resendAllowed ? (
        <button onClick={resendEmail}>Resend otp</button>
      ) : (
        <button disabled>Resend otp in {time}</button>
      )}
    </div>
  );
}

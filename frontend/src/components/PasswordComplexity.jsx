import React from "react";
import zxcvbn from "zxcvbn";


export const PasswordComplexity = ({valueOfNewPassword})=>{

    const testResult = zxcvbn(valueOfNewPassword);

    const score = (testResult.score * 100)/4


   return (
  <div>
    <div>
      
      <div className="flex gap-2 ">
        <div
          className={`rounded-lg transition duration-300 ease-in-out w-1/4 h-2 ${
            score < 25 ? "bg-red-500" : score < 50 ? "bg-yellow-500" : "bg-green-500"
          }`}
        ></div>
        <div
          className={`rounded-lg transition duration-300 ease-in-out w-1/4 h-2 ${
            score < 50 ? "bg-red-500" : score < 75 ? "bg-yellow-500" : "bg-green-500"
          }`}
        ></div>
        <div
          className={`rounded-lg transition duration-300 ease-in-out w-1/4 h-2 ${
            score < 75 ? "bg-red-500" : score < 100 ? "bg-yellow-500" : "bg-green-500"
          }`}
        ></div>
        <div
          className={`rounded-lg transition duration-300 ease-in-out w-1/4 h-2 ${
            score < 100 ? "bg-red-500" : "bg-green-500"
          }`}
        ></div>
        
      </div>
      <div className="mt-1 flex justify-end text-sm text-gray-700">
        {score == 0 ? <p>Very Weak</p> : score == 25 ? <p>Weak</p> : score == 50 ? <p>Fair</p> : score == 75 ? <p>Strong</p> :  <p>Very Strong</p>   }
      </div>
    </div>
  </div>
);
}



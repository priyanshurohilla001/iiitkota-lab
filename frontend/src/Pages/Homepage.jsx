import React from "react";
import { Carousel } from "../components/Carousel";

export const Homepage = () => {
  return (
    <div>
      <Carousel />
      <HeaderTextComponent />
      <CoursesComponent />
      <ClubsComponent />
      <PlacementStats />
      <DirectorsMessage />
    </div>
  );
};

const HeaderTextComponent = () => {
  return (
    <div className=" max-w-screen-xl mx-auto px-4 py-8 md:px-8 md:py-16">
      <h1 className=" text-3xl md:text-6xl font-bold mb-4 md:mb-10">
        <span className="  text-primary">Welcome</span> to Indian Institute of
        Information Technology Kota
      </h1>

      <p className="text-base md:text-xl text-gray-500 font-light mb-4 md:mb-8 leading-7 md:leading-8">
        Indian Institute of Information Technology, Kota (IIIT, Kota) is an
        institute of national importance. IIIT Kota is a joint venture of the
        Ministry of Education (MoE) Govt. of India and Govt. of Rajasthan with
        Industry Partners in Public-Private-Partnership (PPP) model. IIIT Kota
        was established in 2013. Currently, the institute is mentored by
        Malaviya National Institute of Technology Jaipur (MNIT Jaipur) and is
        situated at MNIT Jaipur. The permanent campus of IIIT, Kota is being
        constructed at Ranpur near Kota on 100.37 acres of land made available
        by the Govt. of Rajasthan. The construction of Phase-1 and Phase 2 of
        the campus is going on in full swing
      </p>
      <BigButton url="https://iiitkota.ac.in/about-institute" />
    </div>
  );
};

function BigButton({ url }) {
  return (
    <a
      href={url}
      className="inline-flex align-middle items-center px-6 py-3 md:px-8 md:py-4 shadow-xl rounded-lg bg-primary hover:scale-110 transition ease-in-out duration-300"
    >
      <h3 className="text-white text-base font-medium mr-2">Know More</h3>
      <svg
        className="w-6 h-auto text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 12H5m14 0-4 4m4-4-4-4"
        />
      </svg>
    </a>
  );
}

const CoursesComponent = () => {
  return (
    <div
      id="courses"
      className=" max-w-screen-xl mx-auto  px-4 py-8 md:px-8 md:py-16"
    >
      <div className="mb-8 md:mb-16 flex justify-between gap-4 ">
        <h1 className="  text-4xl md:text-6xl  font-semibold">Courses</h1>
        <div className=" mt-auto -translate-y-2 flex-grow h-1 md:h-1.5 bg-blue-950"></div>
      </div>
      <div className="grid md:grid-cols-2  gap-x-24 gap-8 items-center align-middle">
        <a
          href="https://iiitkota.ac.in/electronics-communication-eng"
          className="px-4 py-8 shadow-xl rounded-xl flex  flex-col gap-4 hover:scale-105 md:hover:scale-110 transition ease-in-out  hover:border-primary  border-2 hover:border-4 duration-300 delay-150"
        >
          <h3 className=" text-3xl font-bold ">
            Electronics and Communication Engineering
          </h3>
          <p className="text-base text-gray-500 font-light  leading-7 ">
            Department of Electronics and Communication Engineering started
            functioning since July 2015. Currently, the department has a total
            intake of 90 seats and offers a four-year B.Tech programme and a
            two-year M.Tech programme. Apart from the faculty members of the
            institute, the department is benefited from distinguished faculty of
            ECE department at MNIT Jaipur. The department is in the process to
            get state-of-the-art labs to support the undergraduate program
            better.
          </p>
        </a>
        <a
          href="https://iiitkota.ac.in/computer-science-eng"
          className="px-4 py-8 shadow-xl rounded-xl flex  flex-col gap-4 hover:scale-105 md:hover:scale-110 transition ease-in-out  hover:border-primary  border-2 hover:border-4 duration-300"
        >
          <h3 className=" text-3xl font-bold ">
            Computer Science and Engineering
          </h3>
          <p className="text-base text-gray-500 font-light  leading-7 ">
            Department of Computer Science and Engineering started functioning
            since July 2013. Currently, the department has a total intake of 180
            seats and offers a four-year B.Tech programme and a two-year M.Tech
            programme. Apart from the faculty members of the institute, the
            department is benefited from distinguished faculty of CSE department
            at MNIT Jaipur, our mentor institute. The department is in the
            process to get state-of-the-art labs to support the undergraduate
            program better.
          </p>
        </a>
      </div>
    </div>
  );
};

const ClubsComponent = () => {
  const clubsdata = [
    { title: "Algorithmus", imagelocation: "/algorithmus.png" },
    { title: "Arc Robotics", imagelocation: "/arcrobotics.png" },
    { title: "Artive", imagelocation: "/artive.png" },
    { title: "Codebase", imagelocation: "/codebase.png" },
    { title: "Cypher", imagelocation: "/cypher.jpg" },
    { title: "Fit India", imagelocation: "/fitindia.png" },
    { title: "GDSC", imagelocation: "/gdsc.png" },
    { title: "Incognito", imagelocation: "/incognito.png" },
    { title: "Neon", imagelocation: "/neon.png" },
    { title: "Odyssey", imagelocation: "/odyssey.png" },
    { title: "QNS", imagelocation: "/qns.png" },
    { title: "TGCC", imagelocation: "/tgcc.png" },
  ];

  return (
    <div
      id="clubs"
      className=" max-w-screen-xl mx-auto px-4 py-8 md:px-8 md:py-16  "
    >
      <div className="mb-8 md:mb-16 flex justify-between gap-4">
        <h1 className="  text-3xl md:text-6xl  font-semibold">Clubs</h1>
        <div className=" mt-auto -translate-y-2 flex-grow h-1 md:h-1.5 bg-blue-950"></div>
      </div>
      <div className="grid  grid-cols-2  md:grid-cols-4 lg:grid-cols-5 gap-6 align-middle items-center">
        {clubsdata.map((data) => (
          <div key={data.title}>
            <div className="shadow-xl p-4 rounded-xl inline-block transform transition-transform duration-500 ease-in-out hover:scale-110 hover:border-primary border-2 hover:border-4">
              <img className=" w-48" src={data.imagelocation}></img>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PlacementStats = () => {
  return (
    <div
      id="placement"
      className=" max-w-screen-xl mx-auto px-4 py-8 md:px-8 md:py-16  "
    >
      <div className="mb-8 md:mb-16 flex justify-between gap-4 ">
        <h1 className="  text-4xl md:text-6xl  font-semibold">Placement</h1>
        <div className=" mt-auto -translate-y-2 flex-grow h-1 md:h-1.5 bg-blue-950"></div>
      </div>
      <div className="grid items-center align-middle mx-auto md:grid-cols-2 gap-8 ">
        <div className=" ">
          <img className=" w-full h-auto" src="/placementstats.svg"></img>
        </div>
        <div>
          <p className="my-auto text-base md:text-xl text-gray-500 font-light mb-4 md:mb-8 leading-7 md:leading-8">
            Campus Placement drive, which was carried out during 2022-23 was one
            of its kind due to the pandemic, but due to sheer determination and
            diligence, it was successfully completed and it clearly demonstrated
            the demand for IIIT Kota graduates among the top recruiters in
            various segments of the economy and industry.
          </p>
          <BigButton url="https://tpcell.iiitkota.ac.in/" />
        </div>
      </div>
    </div>
  );
};

const DirectorsMessage = () => {
  return (
    <div
      id="director"
      className="max-w-screen-xl mx-auto px-4 py-8 md:px-8 md:py-16"
    >
      <div className="mb-8 md:mb-16 flex justify-between gap-4 ">
        <h1 className="  text-4xl md:text-6xl  font-semibold">
          Director's Message
        </h1>
        <div className=" mt-auto -translate-y-2 flex-grow h-1 md:h-1.5 bg-blue-950"></div>
      </div>
      <div className="grid md:grid-flow-col md:grid-cols-2 gap-8">
        <div
          className="min-h-96 md:col-start-2"
          style={{
            backgroundImage: `url(/director.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div>
          <p className="my-auto text-base md:text-xl text-gray-500 font-light  leading-7 md:leading-8 mb-4 md:mb-8">
            Welcome to Indian Institute of Information Technology, Kota. Since
            its inception in 2013, IIIT Kota has accomplished many milestones
            and covered an illustrious journey in the last 8 years. As one of
            the Premier Institutes, that is a joint venture of the Ministry of
            Education and Government of Rajasthan with 4 strong Industry
            Partners in Public-Private Partnership (PPP) mode, the institute has
            come a long way. IIIT Kota provides a highly conducive environment
            to its students for enhancing their technical and academic skills.
            Being a part of this institute will definitely provide a lot of
            opportunities for grooming overall personality.
          </p>
          <BigButton url="https://iiitkota.ac.in/directors-message" />
        </div>
      </div>
    </div>
  );
};

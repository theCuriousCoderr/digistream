"use client";

import RegistrationsDocUpload from "@/components/registrations-doc-upload";
import departmentalRegRequirements from "@/contents/departmentalRegRequirements";
import facultyRegRequirements from "@/contents/facultyRegRequirements";
import { Building, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [regType, setRegType] = useState("");
  const [haveAllDocuments, setHaveAllDocuments] = useState("");
  const router = useRouter()

  function incompleteDocuments() {
    setHaveAllDocuments("No");
    setRegType("");

    setTimeout(() => {
      setHaveAllDocuments("");
    }, 10000);
  }

  if ( haveAllDocuments === "Yes") {
    return <RegistrationsDocUpload setHaveAllDocuments={setHaveAllDocuments} regType={regType} />
  }
  

  return (
    <main className="p-5">
      
      <div className=" font-semibold text-3xl xs:max-md:text-3xl text-slate-800 ">
        <h1>Hi, Olalekan!</h1>
        <h2 className="xs:max-md:text-2xl">
          What type of <span className="text-digiblue">registration</span> do
          you want to do today?
        </h2>
        {regType === "" && <button onClick={() => router.push("/student-dashboard/registrations/history")} className="text-sm p-2 bg-digiblue hover:bg-opacity-70 rounded-md text-white">Check Registration History</button> }
      </div>

      <div className="mt-10 flex xs:max-md:flex-col gap-5">
        {/* Faculty Registrations Button */}
        <div
          className={`${
            regType === "Faculty Registration" && "bg-digiblue rounded-lg"
          }`}
        >
          <button
            onClick={() => setRegType("Faculty Registration")}
            className="size-full inline-block xs:max-md:flex xs:max-md:gap-2 p-5 xs:max-md:p-3 border border-digiblue border-opacity-20 rounded-lg hover:bg-slate-200"
          >
            <figure className="size-5 center">
              <Building color="black" size={20} />
            </figure>
            <p className="">Faculty Registration</p>
          </button>
        </div>
        {/* Departmental Registration Button */}
        <div
          // hidden={regType !== "Departmental Registration" && regType !== "" }
          className={`${
            regType === "Departmental Registration" && "bg-digiblue rounded-lg"
          }`}
        >
          <button
            onClick={() => setRegType("Departmental Registration")}
            className="size-full inline-block xs:max-md:flex xs:max-md:gap-2 p-5 xs:max-md:p-3 border border-digiblue border-opacity-20 rounded-lg hover:bg-slate-200"
          >
            <figure className="size-5 center">
              <Building2 color="black" size={20} />
            </figure>
            <p>Departmental Registration</p>
          </button>
        </div>
      </div>

      {/* If user doesn't have all the necessary documents to complete a registration  */}
      {haveAllDocuments === "No" && (
        <div className="mt-10 w-1/2 xs:max-md:w-full text-slate-400">
          <p className="text-3xl">
            {" "}
            Please try to gather the required documents and come back. Thank
            you. 😊
          </p>
        </div>
      )}

      {/* Button to cancel registration type selection */}
      {regType !== "" && (
        <div className="mt-5">
          <p>
            If you wish to no longer continue with the registration process:
          </p>

          <button
            onClick={() => setRegType("")}
            className="border bg-red-700 hover:bg-red-500 px-4 py-2 rounded-md text-white"
          >
            Cancel Registration Selection
          </button>
        </div>
      )}

      {/* Things needed for the selected registration type */}
      {regType !== "" && (
        <div className="mt-10">
          <h3>
            Things needed for{" "}
            <span className="text-digiblue underline">{regType}</span> :
          </h3>
          <ol className="list-decimal list-inside">
            {(regType === "Faculty Registration"
              ? facultyRegRequirements
              : departmentalRegRequirements
            ).map((requirements) => (
              <li key={requirements} className="text-slate-500">
                {requirements}
              </li>
            ))}
          </ol>

          <div className="mt-10">
            <h3 className="font-bold">
              Do you have <em>all</em> the necessary documents listed above:{" "}
            </h3>
            <div className="flex items-center gap-5">
              <div className="">
                <button
                  onClick={incompleteDocuments}
                  className="border border-red-500 hover:bg-red-500 hover:bg-opacity-30 px-4 py-2 rounded-md text-red-500"
                >
                  No, I don&apos;t have them all
                </button>
              </div>
              <div className="">
                <button
                  onClick={() => setHaveAllDocuments("Yes")}
                  className="border bg-green-500 hover:bg-green-800 px-4 py-2 rounded-md text-white"
                >
                  Yes, I have them all
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

"use client"

import { ChevronLeft, FileUp } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import Spinner from "./spinner";
import departmentalFileFields from "@/contents/departmentalFileFields";
import getAllRegFormValues from "@/helpers/getAllRegFormValues";
import facultyFileFields from "@/contents/facultyFileFields";
import decode from "@/helpers/decode";
import { useRouter } from "next/navigation";
import { scienceDepartments, techDepartments } from "@/contents/departments";
import BE_URL from "@/helpers/getEnvironment";

type FileIDUnion =
  | "courseFormFile"
  | "labFeesReceiptFile"
  | "transcriptFile"
  | "departmentalDuesReceiptFile"
  | "schoolFessReceiptFile";

type RegistrationsDocUploadPropsType = {
  setHaveAllDocuments: React.Dispatch<React.SetStateAction<string>>;
  regType: string;
};

export default function RegistrationsDocUpload({
  setHaveAllDocuments,
  regType,
}: RegistrationsDocUploadPropsType) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [departments, setDepartments] = useState<string[]>(scienceDepartments);

  const [filesName, setFilesName] = useState({
    schoolFessReceiptFile: "",
    departmentalDuesReceiptFile: "",
    facultyDuesReceiptFile: "",
    transcriptFile: "",
    labFeesReceiptFile: "",
    courseFormFile: "",
  });

  // handles programmatic opening of the file picker window
  function handleFileUpload(param: string) {
    const input = document.getElementById(param) as HTMLInputElement;
    if (input) {
      input.click();
    }
  }
  // File Upload By Button Click
  function handleFileChange(e: ChangeEvent<HTMLInputElement>, param: string) {
    const file = e.target?.files?.[0];
      if (file) {
        // alert(JSON.stringify(file))
        // alert(JSON.stringify(file))
        console.log(`Console Log File: ${file}`)
        // access the selected file
       
        // update state with the file name
        setFilesName({ ...filesName, [param]: file.name });
      } else {
        console.error("No file selected");
      }
    }
  // handles when a dragged file is over the drop zone
  function addDragOverClass(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const target = e.currentTarget as HTMLDivElement;
    target.classList.add("border-4");
    target.classList.add("border-dashed");
    target.classList.add("bg-digiblue");
    target.classList.add("bg-opacity-20");
  }
  // handles when a dragged file leaves the drop zone
  function removeDragOverClass(e: React.DragEvent<HTMLDivElement>) {
    const target = e.currentTarget as HTMLDivElement;
    target.classList.remove("border-4");
    target.classList.remove("border-dashed");
    target.classList.remove("bg-digiblue");
    target.classList.remove("bg-opacity-20");
  }
  // File Upload By Drag\Drop: handles the data transfer when a dragged file is dropped on a drop zone
  function handleFileDrop(e: React.DragEvent<HTMLDivElement>, param: string) {
    e.preventDefault();

    // selects the data file(s) from the dragged file
    const files = e.dataTransfer?.files;
    // selects the input to store the data file(s) being dragged
    const input = document.getElementById(param) as HTMLInputElement;

    // if the dragged file is not empty
    if (files && files.length > 0) {
      alert(JSON.stringify(files[0]))
      // access the data file from the dragged file
      const file = files[0];
      // store the accessed data file into the input file
      input.files = files;
      // update state with the file name
      setFilesName((prevFilesName) => ({
        ...prevFilesName,
        [param]: file.name,
      }));
    }
  }

  function handleDeptChange() {
    const faculty = document.getElementById("faculty") as HTMLInputElement;
    if (faculty) {
      switch (faculty.value) {
        case "Technology":
          setDepartments(techDepartments);
          break;
        case "Science":
          setDepartments(scienceDepartments);
          break;
        default:
          break;
      }
    }
  }
  // handles the file submit to the Bcakend
  async function handleFileSubmit(e: FormEvent) {
    setIsSubmitting(true);
    e.preventDefault();
    alert("Form Submit");
    const testFormData = new FormData();

    const formValues = getAllRegFormValues();
    console.log(`formValues: ${formValues}`)
    // alert(JSON.stringify(formValues))
    if (formValues) { 
      for (const value of formValues) {
        if (value.name === "Warning") {
          alert("Fill all file fields");
          return;
        }
        testFormData.append(value.name, value.value);
      }
    }
    // alert(JSON.stringify(testFormData))

    try {
      const result = await fetch(`${BE_URL}/registration`, {
        method: "POST",
        body: testFormData,
      });
      const data = await result.json();
      alert(JSON.stringify(data));
      router.push("/student-dashboard/registrations/history");
    } catch (err) {
      console.log(err);
      alert("Fetch Failed");
    }

    setIsSubmitting(false);
  }

  return (
    <section className="absolute rounded-lg bg-white top-0 left-0 size-full  ">
      <div className="bg-digiblue bg-opacity-20 backdrop-blur-md sticky top-0">
        <button
          onClick={() => setHaveAllDocuments("")}
          className="size-10 center"
        >
          <ChevronLeft size={50} />
        </button>
      </div>

      <div className="p-5">
        <h1 className="font-bold text-4xl text-digiblue my-5">
          Your Information
        </h1>

        <form id="userForm" onSubmit={handleFileSubmit} className="space-y-5">
          {/* First Name, Last Name, Middle Name */}
          <div className="flex gap-5">
            {/* First Name */}
            <div className="w-52">
              <label htmlFor="firstName">First Name</label>
              <input
                required
                id="firstName"
                className="bg-digiblue w-full bg-opacity-10 h-10 p-2 rounded-md"
              />
            </div>
            {/* Last Name */}
            <div className="w-52">
              <label htmlFor="lastName">Last Name</label>
              <input
                required
                id="lastName"
                className="bg-digiblue w-full bg-opacity-10 h-10 p-2 rounded-md"
              />
            </div>
            {/* Middle Name */}
            <div className="w-52">
              <label htmlFor="middleName">Middle Name</label>
              <input
                required
                id="middleName"
                className="bg-digiblue w-full bg-opacity-10 h-10 p-2 rounded-md"
              />
            </div>
          </div>

          {/* Department, Faculty */}
          <div className="flex gap-5">
            {/* Department */}
            <div className="w-52">
              <label htmlFor="department">Department</label>
              <select
                defaultValue={departments[0]}
                id="department"
                name="department"
                className="bg-digiblue w-full bg-opacity-10 h-10 p-2 rounded-md"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Faculty */}
            <div className="w-52">
              <label htmlFor="faculty">Faculty</label>
              <select
                onChange={handleDeptChange}
                defaultValue="Science"
                id="faculty"
                name="faculty"
                className="bg-digiblue w-full bg-opacity-10 h-10 p-2 rounded-md"
              >
                <option value="Technology">Technology</option>
                <option value="Science">Science</option>
              </select>
            </div>
          </div>

          {/* Level, Matric */}
          <div className="flex gap-5">
            {/* Level */}
            <div className="w-52">
              <label htmlFor="level">Level</label>
              <input
                required
                id="level"
                className="bg-digiblue w-full bg-opacity-10 h-10 p-2 rounded-md"
              />
            </div>

            {/* Matric */}
            <div className="w-52">
              <label htmlFor="matric">Matric No</label>
              <input
                value={
                  decode(localStorage.getItem("matric") as string) || "123456"
                }
                disabled
                required
                id="matric"
                className="bg-digiblue w-full bg-opacity-10 h-10 p-2 rounded-md disabled:bg-slate-200 disabled:text-slate-400"
              />
            </div>
          </div>

          {/* File Uploads */}
          <div>
            <h2 className="font-semibold text-4xl text-digiblue my-5">
              {regType} : Upload Necessary Documents
            </h2>
            <div className="flex flex-wrap justify-between gap-10">
              {(regType === "Faculty Registration"
                ? facultyFileFields
                : departmentalFileFields
              ).map((formFile) => {
                return (
                  <div key={formFile.id} className="w-[48%] xs:max-md:w-full">
                    {/* Drop Zone Label */}
                    <label htmlFor={formFile.id}>{formFile.label}</label>
                    {/* Drop Zone */}
                    <div
                      onDrop={(e) => handleFileDrop(e, formFile.id)}
                      onDragLeave={(e) => removeDragOverClass(e)}
                      onDragOver={(e) => addDragOverClass(e)}
                      className="w-full py-20 xs:max-md:py-2 border-2 border-digiblue border-opacity-30 rounded-lg center flex-col"
                    >
                      <div className="size-10 mx-auto center text-slate-400">
                        <FileUp color="#94a3b8" size={30} />
                      </div>
                      <p className="text-sm font-bold">
                        <span className="xs:max-md:hidden">Drag and Drop File Here or</span>
                        <input
                          required
                          onChange={(e) => handleFileChange(e, formFile.id)}
                          id={formFile.id}
                          type="file"
                          accept=".pdf"
                          multiple={false}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => handleFileUpload(formFile.id)}
                          className="text-digiblue"
                        >
                          Choose File
                        </button>
                      </p>
                      <div className="center text-sm font-bold text-slate-400">
                        {filesName[formFile.id as FileIDUnion] === "loading" && (
                          <Spinner size="size-10" />
                        )}
                        {filesName[formFile.id as FileIDUnion] !== "loading" &&
                          filesName[formFile.id as FileIDUnion] !== "" && (
                            <p>
                              Selected File:{" "}
                              <span className="text-slate-400 font-normal">
                                {filesName[formFile.id as FileIDUnion]}{" "}
                              </span>{" "}
                            </p>
                          )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Submit Button(s) */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className="border bg-green-700 disabled:bg-green-200 hover:bg-green-500 px-4 py-2 rounded-md text-white"
            >
              {isSubmitting ? <Spinner size="size-5" /> : "Submit Form"}
            </button>

            {isSubmitting && (
              <button
                type="button"
                onClick={() => setIsSubmitting(false)}
                className="border bg-red-700 disabled:bg-green-200 hover:bg-red-500 px-4 py-2 rounded-md text-white"
              >
                Cancel Submission
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

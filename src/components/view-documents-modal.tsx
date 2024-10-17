"use client";

import decode from "@/helpers/decode";
import postHook from "@/helpers/postHook";
import useViewDocumentsModalStore from "@/store/useViewDocumentModal.store";
import { X } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { useEffect, useState } from "react";
import Spinner from "./spinner";

type DocumentType = {
  _id: string;
  matric: string;
  level: string;
  schoolFeesReceipt: string;
  deptDuesReceipt: string;
  facultyDuesReceipt: string;
  transcript: string;
  labFeesReceipt: string;
  courseForm: string;
  status: "pending" | "accepted" | "rejected";
  date: string;
  comment: string;
};

type ViewDocumentsModalPropsType = {
  type: string;
  setApproveDocuments: React.Dispatch<React.SetStateAction<boolean>>;
  setViewDocuments: React.Dispatch<React.SetStateAction<boolean>>;
};

type FileType =
  | "schoolFeesReceipt"
  | "deptDuesReceipt"
  | "facultyDuesReceipt"
  | "transcript"
  | "labFeesReceipt"
  | "courseForm";

export default function ViewDocumentsModal({
  type,
  setApproveDocuments,
  setViewDocuments,
}: ViewDocumentsModalPropsType) {
  const studentDocument = useViewDocumentsModalStore(
    (state) => state.document
  ) as DocumentType;
  const [pdfUrl, setPdfUrl] = useState<string[]>([]);
  const [selectedUrl, setSelectedUrl] = useState("");
  const [isApproving, setIsApproving] = useState(false);
  const files = [
    "schoolFeesReceipt",
    "deptDuesReceipt",
    "facultyDuesReceipt",
    "transcript",
    "labFeesReceipt",
    "courseForm",
  ];

  async function pdfViewer() {
    const blobArr = [];
    for (const file of files) {
      try {
        if (studentDocument[file as FileType] === "") {
          continue;
        }
        // Fetch the PDF file
        const response = await fetch(studentDocument[file as FileType]);
        if (!response.ok) {
          console.log("error");
        }

        // Read the PDF data as an array buffer
        const pdfData = await response.arrayBuffer();

        // Load the PDFDocument from the array buffer
        const pdfDoc = await PDFDocument.load(pdfData);

        // Save the PDF document to bytes
        const pdfBytes = await pdfDoc.save();

        // Create a blob URL for the PDF
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const blobUrl = URL.createObjectURL(blob);
        blobArr.push(blobUrl);

        // Display the PDF in the iframe
        // return blobUrl;
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    }
    setSelectedUrl(blobArr[0]);
    setPdfUrl(blobArr);
  }

  async function handleApproval(param: string) {
    setIsApproving(true);
    const comment = document.getElementById("comment") as HTMLInputElement;
    if (comment) {
      try {
        const response = await postHook("/dept-registrations-approval", {
          id: studentDocument._id,
          handle: param,
          comment: comment.value,
          matric: studentDocument.matric,
          dept: decode(localStorage.getItem("matric") as string),
        });

        if (response.success) {
          alert(response.success);
        }
        if (response.warning) {
          alert(response.success);
        }
        if (response.error) {
          alert(response.error);
        }
      } catch (err) {
        alert("Couldn't Complete Action");
        console.log(err);
      }
    }
    setIsApproving(false);
    setApproveDocuments(false);
    window.location.reload();
  }

  useEffect(() => {
    pdfViewer();
  }, []);

  if (type === "approve") {
    return (
      <div className="zoom-in fixed top-0 left-0 h-screen w-full bg-black bg-opacity-90 center">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="p-10 rounded-lg bg-slate-100 space-y-5"
        >
          <div className="text-sm text-red-500">
            <button
              type="button"
              onClick={() => setApproveDocuments(false)}
              className="size-5 center hover:bg-slate-300"
            >
              <X color="red" size={40} />
            </button>{" "}
            Close Modal
          </div>
          <h1 className="text-semibold text-2xl">
            Approve/Reject Registration Request For Matric-{" "}
            {studentDocument.matric}
          </h1>
          <div className="w-full">
            <label htmlFor="comment">Leave A Comment</label>
            <textarea
              required
              id="comment"
              className="bg-digiblue w-full bg-opacity-10 h-40 p-2 rounded-md"
            />
          </div>
          <div className="flex justify-center gap-10">
            <div>
              <button
                disabled={isApproving}
                onClick={() => handleApproval("rejected")}
                className={` inline-block px-4 py-2 bg-red-500 disabled:bg-slate-300 hover:bg-red-700 border text-white border-digiblue border-opacity-20 rounded-lg`}
              >
                {isApproving ? (
                  <Spinner size="size=5" />
                ) : (
                  <p>Reject Registration</p>
                )}
              </button>
            </div>
            <div>
              <button
                disabled={isApproving}
                onClick={() => handleApproval("accepted")}
                className={` inline-block px-4 py-2 bg-green-500 disabled:bg-slate-300 hover:bg-green-700 text-white border border-digiblue border-opacity-20 rounded-lg`}
              >
                {isApproving ? (
                  <Spinner size="size=5" />
                ) : (
                  <p>Approve Registration</p>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  if (type === "view") {
    return (
      <div className="zoom-in fixed top-0 left-0 h-screen w-full bg-black bg-opacity-90">
        <div className=" bg-white px-20 xs:max-md:px-5 py-2 flex items-center gap-10 xs:max-md:gap-5 text-3xl xs:max-md:text-base font-bold">
          <div>
            <button
              onClick={() => setViewDocuments(false)}
              className="size-5 center hover:bg-slate-300"
            >
              <X color="red" size={40} />
            </button>
          </div>
          Registration Documents for Matric Number:{" "}
          <span className="text-digiblue">{studentDocument.matric}</span>
        </div>
        <div className="flex h-full xs:max-md:h-[70vh] justify-between xs:max-md:justify-center items-start">
          <div className="xs:max-md:hidden h-full w-[10%]"></div>
          {/* middle */}
          <div className="relative h-screen xs:max-md:h-full w-1/2 bg-slate-100">
            {selectedUrl === "" ? (
              <Spinner size="size-20" />
            ) : (
              <iframe
                className="block size-full"
                title="PdfFrame"
                src={selectedUrl}
                //   type="application/pdf"
              ></iframe>
            )}
          </div>
          {/* side */}
          <div className="xs:max-md:hidden h-full w-[20%] bg-slate-100 overflow-auto flex flex-col items-center gap-5 pt-5 pb-20">
            {pdfUrl.map((url, id) => {
              return (
                <div
                  key={url}
                  className="relative w-[80%] aspect-[1/1.5] bg-white shadow-md"
                >
                  <button
                    onClick={() => setSelectedUrl(url)}
                    className={`p-1 ${selectedUrl === url ? "bg-green-500" : "bg-digiblue"} bg-digiblue hover:bg-blue-700 text-white`}
                  >
                    {id + 1}.{" "}
                    {selectedUrl === url ? "PDF In View" : "Load PDF Up"}
                  </button>
                  <iframe
                    onClick={() => setSelectedUrl(url)}
                    className="block size-full hover:bg-red-800"
                    title="PdfFrame"
                    src={url}
                  ></iframe>
                </div>
              );
            })}
          </div>
        </div>

        <div className="hidden absolute bottom-0 xs:max-md:flex h-[30vh] w-full bg-slate-100 overflow-x-auto items-center gap-5 pt-5 pb-0  scrollbar">
          {pdfUrl.map((url, id) => {
            return (
              <div
                key={url}
                className="relative h-full aspect-[0.7/1] bg-white shadow-md"
              >
                <button
                  onClick={() => setSelectedUrl(url)}
                  className={`p-1 ${selectedUrl === url ? "bg-green-500" : "bg-digiblue"} bg-digiblue hover:bg-blue-700 text-white`}
                >
                  {id + 1}.{" "}
                  {selectedUrl === url ? "PDF In View" : "Load PDF Up"}
                </button>
                <iframe
                  onClick={() => setSelectedUrl(url)}
                  className="block size-full hover:bg-red-800"
                  title="PdfFrame"
                  src={url}
                ></iframe>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

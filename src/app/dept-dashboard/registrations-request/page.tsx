"use client";

import Spinner from "@/components/spinner";
import ViewDocumentsModal from "@/components/view-documents-modal";
import decode from "@/helpers/decode";
import postHook from "@/helpers/postHook";
import useViewDocumentsModalStore from "@/store/useViewDocumentModal.store";
import { useEffect, useState } from "react";

type RegTableType = {
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

export default function Page() {
  const [requestStatus, setRequestStatus] = useState("Pending");
  const [regTable, setRegTable] = useState<RegTableType[] | "">("");
  const [filteredTable, setFilteredTable] = useState<RegTableType[] | "">("");
  const [isFetching, setIsFetching] = useState(false);
  const [viewDocuments, setViewDocuments] = useState(false);
  const [approveDocuments, setApproveDocuments] = useState(false);
  const [  matric, setMatric] = useState("");

  const updateDocument = useViewDocumentsModalStore(
    (state) => state.updateDocument
  );

  async function getRegistrations(filter: string) {
    setIsFetching(true);
    const response = await postHook("/get-dept-registrations", {
      regType: matric,
      role: "department",
    });
    if (response.success) {
      setRegTable(response.success);
      setFilteredTable(
        (response.success as RegTableType[]).filter(
          (row) => row.status === filter
        )
      );
    }
    if (response.error) {
      setRegTable([]);
    }
    setIsFetching(false);
  }
  useEffect(() => {
    setMatric(decode(localStorage.getItem("matric") as string));
    getRegistrations("pending");
  }, []);

  function filter(value: "pending" | "accepted" | "rejected") {
    getRegistrations(value);
    const newTable = (regTable as RegTableType[]).filter(
      (row) => row.status === value
    );
    setFilteredTable(newTable);
  }

  function handleViewDocuments(row: RegTableType) {
    setViewDocuments(true);
    updateDocument(row);
  }

  function handleApproveDocuments(row: RegTableType) {
    setApproveDocuments(true);
    updateDocument(row);
  }

  return (
    <main className="p-5 space-y-5">
      {viewDocuments && (
        <ViewDocumentsModal
          type="view"
          setApproveDocuments={setApproveDocuments}
          setViewDocuments={setViewDocuments}
        />
      )}

      {approveDocuments && (
        <ViewDocumentsModal
          type="approve"
          setApproveDocuments={setApproveDocuments}
          setViewDocuments={setViewDocuments}
        />
      )}
      <h1 className="font-semibold text-3xl text-digiblue">
        Registrations Requests
      </h1>

      <section className="flex flex-wrap gap-5 items-center">
        <div>
          <button
            onClick={() => {
              filter("pending");
              setRequestStatus("Pending");
            }}
            className={`${
              requestStatus === "Pending" && "bg-blue-500 text-white"
            } inline-block px-4 py-2 border border-digiblue border-opacity-20 rounded-lg`}
          >
            <p>Pending</p>
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              filter("accepted");
              setRequestStatus("Accepted");
            }}
            className={`${
              requestStatus === "Accepted" && "bg-green-500 text-white"
            } inline-block px-4 py-2 border border-digiblue border-opacity-20 rounded-lg`}
          >
            <p>Accepted</p>
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              filter("rejected");
              setRequestStatus("Rejected");
            }}
            className={`${
              requestStatus === "Rejected" && "bg-red-500 text-white"
            } inline-block px-4 py-2 border border-digiblue border-opacity-20 rounded-lg`}
          >
            <p>Rejected</p>
          </button>
        </div>
      </section>

      {isFetching && <Spinner size="size-10" />}

      {!isFetching && filteredTable.length < 1 && (
        <p className="text-2xl">No {requestStatus} Registrations Requests</p>
      )}

<div className="xs:max-md:w-full xs:max-md:overflow-auto">
{!isFetching && filteredTable.length >= 1 && (
        <table className="w-full xs:max-md:w-[300%]">
          <tr className="text-left">
            <th>Matric</th>
            <th>Level</th>
            <th>Date</th>
            <th>Status</th>
            <th>Comment</th>
            <th>Actions</th>
          </tr>
          {(filteredTable as RegTableType[]).map((row) => {
            return (
              <tr key={row.matric} className="odd:bg-slate-200 text-sm">
                <td>{row.matric || "111111"}</td>
                <td>{row.level || "111"}</td>
                <td>{row.date || "N/A"}</td>
                <td>
                  {row.status === "pending" && (
                    <span className="bg-blue-500 bg-opacity-20 text-blue-600 px-3 py-1 rounded-md">
                      {row.status}
                    </span>
                  )}
                  {row.status === "accepted" && (
                    <span className="bg-green-500 bg-opacity-20 text-green-600 px-3 py-1 rounded-md">
                      {row.status}
                    </span>
                  )}
                  {row.status === "rejected" && (
                    <span className="bg-red-500 bg-opacity-20 text-red-600 px-3 py-1 rounded-md">
                      {row.status}
                    </span>
                  )}
                </td>
                <td className={`${row.status === "pending" && "text-blue-600"} ${row.status === "accepted" && "text-green-600"} ${row.status === "rejected" && "text-red-600"}`}>
                  {row.comment ||
                    "You can also make your custom PDF viewer using the pdfjs library as I mentioned above. But if you don't need such branding and customization, the browser's default PDF viewer is fine for this purpose."}
                </td>
                <td>
                  <button
                    onClick={() => handleViewDocuments(row)}
                    className="px-2 border hover:bg-blue-300"
                  >
                    View Documents
                  </button>
                  <button
                    hidden={row.status !== "pending"}
                    onClick={() => handleApproveDocuments(row)}
                    className="px-2 border hover:bg-green-400"
                  >
                    Approve/Reject
                  </button>
                </td>
                {/* <td hidden={row.status === "pending"}>
                  Action Taken Already
                </td> */}
              </tr>
            );
          })}
        </table>
      )}
      </div>

     
    </main>
  );
}

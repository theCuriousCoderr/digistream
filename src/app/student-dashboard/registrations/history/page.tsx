"use client";

import Spinner from "@/components/spinner";
import postHook from "@/helpers/postHook";
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
  }

export default function Page() {
  const [regType, setRegType] = useState("Faculty");
  const [regTable, setRegTable] = useState<RegTableType[] | "">("")
  const [isFetching, setIsFetching] = useState(false)

  async function getRegistrations() {
    setIsFetching(true);
    const response = await postHook("/get-registrations", {regType: regType });
    if (response.success) {
        setRegTable(response.success)
    } 
    if (response.error) {
        setRegTable([])
    }
    setIsFetching(false);
  }
  useEffect(() => {
    getRegistrations()
  }, [regType])




  return (
    <main className="p-5 space-y-5">
      <h1 className="font-semibold text-3xl text-digiblue">Registrations History</h1>

      <section className="flex gap-5 items-center">
        <div>
          <button onClick={() => setRegType("Faculty")} className={`${regType === "Faculty" && "bg-digiblue hover:bg-digiblue text-white"} inline-block px-4 py-2 border border-digiblue border-opacity-20 rounded-lg hover:bg-slate-200`}>
            <p>Faculty</p>
          </button>
        </div>
        <div>
        <button onClick={() => setRegType("Departmental")} className={`${regType === "Departmental" && "bg-digiblue hover:bg-opacity-100 text-white"} inline-block px-4 py-2 border border-digiblue border-opacity-20 rounded-lg hover:bg-slate-200`}>
            <p>Departmental</p>
          </button>
        </div>
      </section>

      {isFetching && <Spinner size="size-10" /> }
      
      {
        ((!isFetching && regTable.length < 1)  && <p className="text-2xl">No Registrations History</p>)
      }


      <div className="xs:max-md:w-full xs:max-md:overflow-auto">
      {(!isFetching && regTable.length >= 1) && <table className="w-full xs:max-md:w-[300%]">
        <tr className="text-left">
          <th className="">Matric</th>
          <th>Level</th>
          <th>Date</th>
          <th>Status</th>
          <th>Comment</th>
          <th>Actions</th>
        </tr>
        {(regTable as RegTableType[]).map((row) => {
          return (
            <tr key={row.matric} className=" text-sm">
              <td className="py-3">{row.matric || "123456"}</td>
              <td>{row.level || "400"}</td>
              <td>{row.date || "N/A"}</td>
              <td>
                  {(row.status === "pending") && <span className="bg-blue-500 bg-opacity-20 text-blue-600 px-3 py-1 rounded-md">
                    {row.status}
                  </span>}
                  {(row.status === "accepted") && <span className="bg-green-500 bg-opacity-20 text-green-600 px-3 py-1 rounded-md">
                    {row.status}
                  </span>}
                  {(row.status === "rejected") && <span className="bg-red-500 bg-opacity-20 text-red-600 px-3 py-1 rounded-md">
                    {row.status}
                  </span>}
                </td>
              <td className={`${row.status === "pending" && "text-blue-600"} ${row.status === "accepted" && "text-green-600"} ${row.status === "rejected" && "text-red-600"} `}>{row.comment || "---"}</td>
              <td><button disabled={row.status === "rejected" || row.status === "pending" } className="px-2 disabled:text-slate-300 border">Print</button></td>
            </tr>
          );
        })}
      </table> }
      </div>
      
    </main>
  );
}

"use client";

import {
  Bell,
  Book,
  Bus,
  EyeOff,
  FileStack,
  FileText,
  IdCard,
  Menu,
  Signature,
  Store,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import StudentDashboardLoading from "./loading";
import { usePathname } from "next/navigation";
import postHook from "@/helpers/postHook";
import Spinner from "@/components/spinner";
import decode from "@/helpers/decode";

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState("Registrations");
  const [baseState, setBaseState] = useState(true);
  const [sideNav, setSideNav] = useState(false);
  const pathName = usePathname();
  useEffect(() => {
    console.log(activeTab);
    async function AuthLayout() {
      const isAuth = await postHook("/student-dashboard", {});
      if (isAuth.warning) {
        window.location.href = "/login";
        console.log("ola");
      }
      if (isAuth.success) {
        setBaseState(false);
      }
    }

    AuthLayout();
  }, []);

  function handleLogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  }

  const [idleColor, activeColor] = ["#94a3b8", "black"];
  const tabs = [
    {
      idleIcon: <FileStack color={idleColor} size={20} />,
      activeIcon: <FileStack color={activeColor} size={20} />,
      text: "Registrations",
    },
    {
      idleIcon: <Signature color={idleColor} size={20} />,
      activeIcon: <Signature color={activeColor} size={20} />,
      text: "Sign Course Form",
    },
    {
      idleIcon: <FileText color={idleColor} size={20} />,
      activeIcon: <FileStack color={activeColor} size={20} />,
      text: "Transcript Request",
    },
    {
      idleIcon: <Book color={idleColor} size={20} />,
      activeIcon: <Book color={activeColor} size={20} />,
      text: "Your Documents",
    },
    {
      idleIcon: <Bell color={idleColor} size={20} />,
      activeIcon: <Bell color={activeColor} size={20} />,
      text: "Notifications",
    },
    {
      idleIcon: <IdCard color={idleColor} size={20} />,
      activeIcon: <IdCard color={activeColor} size={20} />,
      text: "ID Card Points",
    },
    {
      idleIcon: <Store color={idleColor} size={20} />,
      activeIcon: <Store color={activeColor} size={20} />,
      text: "Cafeteria Hub",
    },
    {
      idleIcon: <Bus color={idleColor} size={20} />,
      activeIcon: <Bus color={activeColor} size={20} />,
      text: "Transport Hub",
    },
    {
      idleIcon: <EyeOff color={idleColor} size={20} />,
      activeIcon: <EyeOff color={activeColor} size={20} />,
      text: "Anonymous Report",
    },
  ];

  if (baseState) {
    return (
      <div className="h-screen w-full center">
        <Spinner size="size-40" />
      </div>
    );
  }

  return (
    <section className="relative bg-digiblue bg-opacity-10 h-screen w-full flex justify-between gap-[2%] p-10 xs:max-md:p-2">
      {/* mobile view */}
      {sideNav && (
        <div className="fixed top-0 pt-5 left-0 z-10 w-full h-screen bg-black bg-opacity-80 flex gap-3">
          <aside className="w-[80%] h-full overflow-auto bg-white rounded-lg">
            {/* top */}
            <div className="py-5 px-3 space-y-8">
              {/* Logo */}
              <div className="center gap-1">
                <figure className="relative size-6 center">
                  <Image fill={true} src="/logo.png" alt="DigiStream Logo" />
                </figure>
                <p className="font-semibold">
                  Digi<span className="text-digiblue">Stream</span>
                </p>
              </div>

              {/* user info */}
              <div className="text-center">
                <figure className="relative w-1/2 aspect-square mx-auto rounded-full overflow-hidden border-2 border-digiblue">
                  <Image
                    fill={true}
                    src="/profile-picture.jpg"
                    alt="User Profile Picture"
                    className="object-cover"
                  />
                </figure>
                <p className="font-bold text-sm">Olalekan O.S</p>
                <p className="text-sm text-slate-600">
                  Matric No:{" "}
                  {decode(localStorage.getItem("matric") as string) || "123456"}
                </p>
              </div>

              {/* nav tabs */}
              <nav>
                <ul className="space-y-1 h- overflow-y-scrol scrollbar">
                  {tabs.map((tab) => {
                    return (
                      <li key={tab.text}>
                        <Link
                          href={`/student-dashboard/${tab.text
                            .toLowerCase()
                            .replaceAll(" ", "-")}`}
                          onClick={() => {
                            setActiveTab(tab.text);
                            setSideNav(false);
                          }}
                          className={`${
                            pathName.includes(
                              tab.text.toLowerCase().replaceAll(" ", "-")
                            )
                              ? "bg-blue-300"
                              : "bg-none hover:bg-slate-300 hover:bg-opacity-30"
                          } w-full flex items-center gap-1 px-2 py-1 xs:max-md:py-2 rounded-md`}
                        >
                          <div className="size-6 center">
                            {pathName.includes(
                              tab.text.toLowerCase().replaceAll(" ", "-")
                            )
                              ? tab.activeIcon
                              : tab.idleIcon}
                          </div>
                          <p
                            className={`${
                              pathName.includes(
                                tab.text.toLowerCase().replaceAll(" ", "-")
                              )
                                ? "text-black font-bold"
                                : "text-[#94a3b8]"
                            } text-[12px] xs:max-md:text-base`}
                          >
                            {tab.text}
                          </p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="w-full flex items-center gap-1 px-2 py-1 h-10 rounded-md text-sm bg-red-600 hover:bg-red-400 text-white">
                <button onClick={handleLogOut} className="size-full">
                  Log Out
                </button>
              </div>
            </div>
          </aside>
          <div className="size-10 rounded-lg bg-red-400">
            <button
              onClick={() => setSideNav(false)}
              className="size-full center bg-slate-300 rounded-lg "
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}


      {/* desktop mode */}
      <aside className="xs:max-md:hidden w-[15%] h-full bg-white rounded-lg">
        {/* top */}
        <div className="py-5 px-3 space-y-8">
          {/* Logo */}
          <div className="center gap-1">
            <figure className="relative size-6 center">
              <Image fill={true} src="/logo.png" alt="DigiStream Logo" />
            </figure>
            <p className="font-semibold">
              Digi<span className="text-digiblue">Stream</span>
            </p>
          </div>

          {/* user info */}
          <div className="text-center">
            <figure className="relative w-1/2 aspect-square mx-auto rounded-full overflow-hidden border-2 border-digiblue">
              <Image
                fill={true}
                src="/profile-picture.jpg"
                alt="User Profile Picture"
                className="object-cover"
              />
            </figure>
            <p className="font-bold text-sm">Olalekan O.S</p>
            <p className="text-sm text-slate-600">
              Matric No:{" "}
              {decode(localStorage.getItem("matric") as string) || "123456"}
            </p>
          </div>

          {/* nav tabs */}
          <nav>
            <ul className="space-y-1 h-60 overflow-y-scroll scrollbar">
              {tabs.map((tab) => {
                return (
                  <li key={tab.text}>
                    <Link
                      href={`/student-dashboard/${tab.text
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                      onClick={() => setActiveTab(tab.text)}
                      className={`${
                        pathName.includes(
                          tab.text.toLowerCase().replaceAll(" ", "-")
                        )
                          ? "bg-blue-300"
                          : "bg-none hover:bg-slate-300 hover:bg-opacity-30"
                      } w-full flex items-center gap-1 px-2 py-1 rounded-md`}
                    >
                      <div className="size-6 center">
                        {pathName.includes(
                          tab.text.toLowerCase().replaceAll(" ", "-")
                        )
                          ? tab.activeIcon
                          : tab.idleIcon}
                      </div>
                      <p
                        className={`${
                          pathName.includes(
                            tab.text.toLowerCase().replaceAll(" ", "-")
                          )
                            ? "text-black font-bold"
                            : "text-[#94a3b8]"
                        } text-[12px]`}
                      >
                        {tab.text}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="w-full flex items-center gap-1 px-2 py-1 rounded-md text-sm bg-red-600 hover:bg-red-400 text-white">
            <button onClick={handleLogOut} className="size-full">
              Log Out
            </button>
          </div>
        </div>
      </aside>

      {/* mobile view */}
      <div className="hidden xs:max-md:block w-[10%]">
        <div className="w-full aspect-square center center">
          <button
            onClick={() => setSideNav(true)}
            className="size-full center bg-slate-300 rounded-lg "
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      <main className="relative w-[85%] xs:max-md:w-[90%] h-full overflow-auto scrollbar rounded-lg bg-white">
        <Suspense fallback={<StudentDashboardLoading />}>{children}</Suspense>
      </main>
    </section>
  );
}

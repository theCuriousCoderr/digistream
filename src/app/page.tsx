import {
  FileStack,
  FileText,
  Signature,
  UserRound,
  Workflow,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const options = [
    {
      icon: <FileStack color="white" size={20} />,
      text: "Registrations",
      bgColor: "bg-green-400 border-green-600",
    },
    {
      icon: <Signature color="white" size={20} />,
      text: "Sign Course Forms",
      bgColor: "bg-orange-400 border-orange-600",
    },
    {
      icon: <FileText color="white" size={20} />,
      text: "Request Transcript",
      bgColor: "bg-purple-400 bg-purple-600",
    },
    {
      icon: <Workflow color="white" size={20} />,
      text: "Automate Requests",
      bgColor: "bg-blue-400 bg-blue-600",
    },
  ];
  return (
    <section className="h-screen xs:max-md:h-auto w-full xs:max-md:overflow-auto overflow-hidden">
      {/* Header */}
      <header className="p-5 relative flex xs:max-md:flex-col items-center justify-between">
        <div className="xs:max-md:hidden absolute w-full center">
          <div className="center gap-1 bg-slate-200 bg-opacity-50 px-2 py-1 font-medium rounded-md text-sm">
            <div className="size-2 bg-digiblue rounded-full animate-pulse"></div>
            <p className="">A Digital Platform</p>
          </div>
        </div>

        <div className="center gap-2">
          <figure className="relative size-10 bg-red-40">
            <Image
              fill={true}
              src="/logo.png"
              alt="DigiStream Logo"
              className="object-cover"
            />
          </figure>
          <p className="font-bold text-2xl">
            Digi<span className="text-digiblue italic">Stream</span>
          </p>
        </div>

        <div className="hidden xs:max-md:inline-block w-full center">
          <div className="center gap-1 bg-slate-200 bg-opacity-50 px-2 py-1 font-medium rounded-md text-sm">
            <div className="size-2 bg-digiblue rounded-full animate-pulse"></div>
            <p className="">A Digital Platform</p>
          </div>
        </div>

        <div className="center gap-2">
          <p className="font-bold">
            Made for students of the University of Ibadan
          </p>
          <figure className="relative w-8 h-10">
            <Image
              fill={true}
              src="/ui-logo.jpg"
              alt="University of Ibadan Logo Logo"
              className="object-contain"
            />
          </figure>
        </div>
      </header>

      <main className="h-full flex xs:max-md:flex-col xs:max-md:gap-10">
        {/* CTA Mobile view */}
        <div className="hidden xs:max-md:flex xs:max-md:gap-5 p-5 bg-slate-100">
          <div className="">
            <Link
              href="/signup"
              className="border border-digiblue hover:bg-digiblue hover:bg-opacity-20 p-3 text-lg rounded-md text-digiblue"
            >
              Create an account
            </Link>
          </div>
          <div className="">
            <Link
              href="/login"
              className="bg-digiblue hover:bg-opacity-20 p-3 text-lg rounded-md text-white hover:text-digiblue"
            >
              Log In
            </Link>
          </div>
        </div>

        {/* Left section:  Text */}
        <div className="relative w-[35%] xs:max-md:w-full pt-[15vh] xs:max-md:pt-0 px-20 xs:max-md:px-0 xs:max-md:pl-5">
          <div className="hidden xs:max-md:flex absolute -z-10 size-full -right-12 justify-end">
            <Image
              fill={true}
              src="/hand-mockup.png"
              alt="Hand Mockup"
              className="object-contain"
            />
          </div>
          <p className="text-sm">Welcome to DigiStream</p>
          <div className="font-medium tracking-wide text-[3.5rem] xs:max-md:text-4xl leading-[3rem] text-slate-800 space-y-3">
            <p>Digitally</p>
            <p>Streamline</p>
            <div className="flex items-center gap-3">
              <div className="flex">
                {[1, 2, 3].map((ring) => (
                  <div
                    key={ring}
                    className={`${
                      ring === 2 && "bg-slate-900 relative z-10"
                    } size-10 border border-slate-500 rounded-full -mx-2`}
                  >
                    {ring === 2 && (
                      <div className="center mt-1">
                        <UserRound color="white" />{" "}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <p>Your </p>
            </div>
            <p> Student&apos;s</p>
            <p> Experience</p>
          </div>
        </div>
        {/* Right section */}
        <div className="xs:max-md:hidden relative w-[65%] flex items-center">
          {/* Hand Mockup */}
          <figure className="relative z-20 mt-[20vh] h-[100%] w-[50%] bg-red-40">
            <Image
              fill={true}
              src="/hand-mockup.png"
              alt="Hand Mockup"
              className="object-contain object-left"
            />
          </figure>
          {/* Body */}
          <div className="p-5 absolute left-[20%] right-5 top-5 bottom-0 bg-gradient-to-br from-[#007FFF90] to-white from-[40%] to-[70%] rounded-3xl">
            {/* CTA buttons */}
            <div className="absolute right-5 bottom-32 flex gap-5">
              <div className="">
                <Link
                  href="/signup"
                  className="border border-digiblue hover:bg-digiblue hover:bg-opacity-20 px-4 py-2 rounded-md text-digiblue"
                >
                  Create an account
                </Link>
              </div>
              <div className="">
                <Link
                  href="/login"
                  className="bg-digiblue hover:bg-opacity-20 px-4 py-2 rounded-md text-white hover:text-digiblue"
                >
                  Log In
                </Link>
              </div>
            </div>

            <div className="absolute z-10 left-[20%] right-0 h-5">
              <p className="font-medi text-xl">
                Some of the things you can do on Digi
                <span className="text-digiblue italic">Stream</span>:
              </p>
              {/* Things to do */}
              <div className="mt-3 flex items-center flex-wrap gap-2">
                {options.map((options) => {
                  return (
                    <div
                      key={options.text}
                      className={`${options.bgColor} bg-opacity-30 border p-3 rounded-lg w-[45%]`}
                    >
                      <div
                        className={`${options.bgColor} size-8 center rounded-full`}
                      >
                        {options.icon}
                      </div>
                      <p className="text-slate-800 font-medium">
                        {options.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* mobile things to do */}
        <div className="hidden xs:max-md:block p-5">
          <p className=" text-xl">
            Some of the things you can do on Digi
            <span className="text-digiblue italic">Stream</span>:
          </p>
          {/* Things to do */}
          <div className="mt-3 flex items-center justify-between flex-wrap">
            {options.map((options) => {
              return (
                <div
                  key={options.text}
                  className={`${options.bgColor} bg-opacity-30 border p-3 rounded-lg w-[45%]`}
                >
                  <div
                    className={`${options.bgColor} size-8 center rounded-full`}
                  >
                    {options.icon}
                  </div>
                  <p className="text-slate-800 font-medium">{options.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </section>
  );
}

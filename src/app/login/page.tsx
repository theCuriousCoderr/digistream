"use client";

import Spinner from "@/components/spinner";
import postHook from "@/helpers/postHook";
import { Eye, EyeClosed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Page() {
  const [showPassword, setShowPassword] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [signupAlert, setSignupAlert] = useState("");
  const router = useRouter();

  async function handleLogIn(e: FormEvent) {
    e.preventDefault();
    setIsSending(true);
    const rememberMe = document.getElementById(
      "rememberMe"
    ) as HTMLInputElement;
    if (rememberMe) {
      localStorage.setItem(
        "digiStreamRememberMe",
        JSON.stringify(rememberMe.checked)
      );
    }
    const id = document.getElementById("matric") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    let role = "";
    const radios = document.querySelectorAll(".role");
    if (radios) {
      radios.forEach((radio) => {
        if ((radio as HTMLInputElement).checked) {
          role = radio.id;
        }
      });
    }
    if (id.value && password.value) {
      const details = {
        matric: id.value,
        password: password.value,
        role: role,
      };
      try {
        const response = await postHook("/login", details);
        if (response?.success) {
          setSignupAlert(response.success);
          setTimeout(() => {
            if (role === "student") {
              router.push("/student-dashboard/registrations");
            }
            if (role === "faculty") {
              router.push("/faculty-dashboard/registrations-request");
            }
            if (role === "department") {
              router.push("/dept-dashboard/registrations-request");
            }
          }, 200);
        }
        if (response.warning) {
          setSignupAlert(response.warning);
        }
        if (response?.error) {
          setSignupAlert(response.error);
        }
      } catch (err) {
        console.log(err);
        setSignupAlert("Account Creation Failed");
      }
    }
    setIsSending(false);
    setTimeout(() => {
      setSignupAlert("");
    }, 2000);
  }
  return (
    <main className="w-full h-screen p-5 flex justify-between bg-slate-200 text-white">
      <div className="w-[40%] xs:max-md:w-full bg-black rounded-2xl slideUp pt-10 space-y-10">
        {signupAlert !== "" && (
          <div className="top-5 h-20 absolute z-10 w-full center">
            <p
              className={`relative z-10 px-5 py-2 text-white font-medium rounded-md bg-digiblue`}
            >
              {signupAlert}
            </p>
          </div>
        )}

        <figure className="relative size-10 mx-auto">
          <Link href="/">
            <Image
              fill={true}
              src="/logo.png"
              alt="logo"
              className="object-cover"
            />
          </Link>
        </figure>

        <div>
          <h1 className="text-center text-digiblue font-bold text-3xl ">
            Log In
          </h1>
          <p className="text-sm text-slate-300 text-center">
            Log in to your account
          </p>
        </div>

        <form onSubmit={handleLogIn} className="space-y-3 text-slate-400">
          <div className="text-center">
            Login as:
            <div className="flex gap-3 items-center justify-center text-sm text-slate-600">
              <div className="flex items-center gap-1">
                <input
                defaultChecked
                  id="student"
                  name="role"
                  type="radio"
                  className="size-4 role accent-orange-400"
                />
                <span className="">Student</span>
              </div>
              <div className="flex items-center gap-1">
                <input
                  id="faculty"
                  name="role"
                  type="radio"
                  className="size-4 role accent-orange-400"
                />
                <span>Faculty Rep</span>
              </div>
              <div className="flex items-center gap-1">
                <input
                  id="department"
                  name="role"
                  type="radio"
                  className="size-4 role accent-orange-400"
                />
                <span>Departmental Rep</span>
              </div>
            </div>
          </div>
          <div className="w-52 mx-auto">
            <label htmlFor="firstName">ID</label>
            <input
              required
              id="matric"
              className="bg-digiblue w-full bg-opacity-10 h-10 p-2 rounded-md"
            />
          </div>
          <div className="relative w-52 mx-auto">
            <div className="absolute bottom-7 right-2 inline-block">
              <button
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
              </button>
            </div>
            <label htmlFor="password">Password</label>
            <input
              required
              id="password"
              type={showPassword ? "text" : "password"}
              className="bg-digiblue w-full bg-opacity-10 h-10 p-2 rounded-md"
            />
            <div className="mt-1 flex items-center text-sm gap-1">
              <input id="rememberMe" type="checkbox" className="size-3" />
              <p>Remember Me</p>
            </div>
          </div>
          <div className="w-52 mx-auto">
            <button
              disabled={isSending}
              type="submit"
              className={`w-full h-20 bg-digiblue rounded-md hover:bg-opacity-50 text-white center disabled:bg-slate-800`}
            >
              {isSending ? <Spinner size="size-6" /> : "Log In"}
            </button>
          </div>
          <div className="text-sm flex justify-center">
            <p>Don&apos;t have an account? </p>{" "}
            <Link href="/signup" className="text-digiblue underline ml-1">
              Create an account
            </Link>
          </div>
        </form>
      </div>

      <div className="xs:max-md:hidden relative w-[59%] rounded-2xl slideDown overflow-hidden">
        <figure className="relative size-full">
          <Image
            fill={true}
            src="/signup.jpg"
            alt="signup banner image"
            className="object-cover"
          />
        </figure>
        <div className="absolute z-10 -top-10 -left-10 right-0 bottom-0 flex justify-between flex-wrap">
          {[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20,
          ].map((square) => (
            <div
              key={square}
              className="w-[25%] aspect-square bg-green-500 border-4 border-black bg-transparent"
            >
              {[4, 5, 10, 11, 12].includes(square) && (
                <div className="size-full bg-green-500"></div>
              )}
            </div>
          ))}
          fffff
        </div>
      </div>
    </main>
  );
}

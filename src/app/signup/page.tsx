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
  const router = useRouter()
  

  async function handleSignUp(e: FormEvent) {
    e.preventDefault();
    setIsSending(true);
    const matric = document.getElementById("matric") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    if (matric.value && password.value) {
      const studentDetails = { matric: matric.value, password: password.value };
      try {
        const response = await postHook("/signup", studentDetails);
        if (response?.success) {
          setSignupAlert(response.success);
          setTimeout(() => {
            router.push("/login");
          }, 1500)
          
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
    <main className="w-full h-screen p-5 flex justify-between bg-slate-200">
      <section className="relative w-[40%] xs:max-md:w-full bg-black rounded-2xl slideUp pt-20 space-y-10">
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
            Sign Up
          </h1>
          <p className="text-sm text-slate-300 text-center">
            Create an account
          </p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-5 text-slate-400">
          <div className="w-52 mx-auto">
            <label htmlFor="matric">Matric No</label>
            <input
              maxLength={6}
              required
              id="matric"
              className="bg-digiblue w-full bg-opacity-10 h-10 p-2 rounded-md"
            />
          </div>
          <div className="relative w-52 mx-auto">
            <div className="absolute bottom-1 right-2 inline-block">
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
          </div>
          <div className="w-52 mx-auto">
            <button
              disabled={isSending}
              type="submit"
              className={`w-full h-20 bg-digiblue rounded-md hover:bg-opacity-50 text-white center disabled:bg-slate-800`}
            >
              {isSending ? <Spinner size="size-6" /> : "Sign Up"}
            </button>
          </div>
          <div className="text-sm flex justify-center">
            <p>Already have an account? </p>{" "}
            <Link href="/login" className="text-digiblue underline ml-1">
              Login to your account
            </Link>
          </div>
        </form>
      </section>
      
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
        </div>
      </div>
    </main>
  );
}

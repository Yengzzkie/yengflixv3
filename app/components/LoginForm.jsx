"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react"
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../utils/utils";
import { IconBrandFacebook, IconBrandGoogle } from "@tabler/icons-react";
import Loader from "./Loader";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const response = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
    })

    if (response.error === "CredentialsSignin") {
      setError("Invalid credentials")
      setLoading(false)
      return
    }

    setLoading(false);
    router.push('/');
    router.refresh();
  };

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "email" ? value.toLowerCase() : value,
    }));
  }

  return (
    <div className="max-w-xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input lg:bg-black">
      <h2 className="text-center font-bold text-xl text-neutral-800">
        <span className="text-[var(--secondary-dark)] text-3xl tracking-tighter">YENGFLIX</span>
        <span className="text-yellow-500 text-xs font-thin">V3</span>
      </h2>
      <p className="text-sm max-w-sm mt-2 text-neutral-300">
        Login to your account to access full features
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label className="text-gray-400" htmlFor="email">Email Address</Label>
          <Input className="bg-[var(--primary-light)] text-[var(--primary)]" onChange={handleInputChange} value={formData.email} id="email" placeholder="user@domain.com" type="email" name="email" required />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label className="text-gray-400" htmlFor="password">Password</Label>
          <Input className="bg-[var(--primary-light)] text-[var(--primary)]" onChange={handleInputChange} value={formData.password} id="password" placeholder="••••••••" type="password" name="password" required />
        </LabelInputContainer>

        <button
          className="flex justify-center items-center bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          {loading ? <Loader /> : "Login"}
          <BottomGradient />
        </button>
        <p className="mt-4">Don't have an account? <Link href="/signup" className="font-semibold text-[var(--secondary-dark)] hover:text-[var(--secondary-light)]">Sign up!</Link></p>
        <p className="text-red-500 italic mt-2">{error}</p>

        <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandFacebook className="h-4 w-4 text-neutral-200" />
            <span className="text-neutral-200 text-sm">
              Facebook
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-200" />
            <span className="text-neutral-200 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-red-300 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

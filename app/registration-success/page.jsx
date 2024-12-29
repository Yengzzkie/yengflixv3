"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const RegistrationSuccess = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 5000); // 3 seconds
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ type: "tween", duration: 0.5 }}
      style={{ padding: "20px", textAlign: "center" }}
    >
      <div className="flex items-center justify-center h-screen bg-[var(--background)]">
        <div className="h-full text-center bg-[var(--background)] rounded-lg px-2 lg:px-44 py-10 shadow-lg">
          <CheckCircleIcon className="text-green-500 w-32 mx-auto my-8" />
          <h1 className="text-2xl font-bold text-white">
            🎉 Registration Successful!
          </h1>
          <p className="text-gray-200 mt-4">
            Thank you for signing up! A verification link has been sent to your
            email. Please verify your account to unlock the full features of
            Yengflix.
          </p>
          <p className="text-gray-200 mt-4 text-sm italic">
            You will be redirected to the login page shortly.
          </p>
          <button
            className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-blue-700"
            onClick={() => router.push("/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default RegistrationSuccess;

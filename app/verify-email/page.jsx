"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import axios from "axios";

const VerificationSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("loading"); // "loading", "success", "error"

  async function verifyEmail() {
    try {
      if (!token) {
        setStatus("error");
        return;
      }

      const response = await axios.post(`/api/users/verify-email?token=${token}`);
      if (response.status === 200) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setStatus("error");
    }
  }

  useEffect(() => {
    verifyEmail();
  }, []);

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        router.push("/login");
      }, 3500); // Redirect after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [status, router]);

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
          {status === "loading" && (
            <div>
              <p className="text-gray-200">Verifying your email...</p>
            </div>
          )}
          {status === "success" && (
            <>
              <CheckCircleIcon className="text-green-500 w-32 mx-auto my-8" />
              <h1 className="text-2xl font-bold text-white">
                Verification Successful!
              </h1>
              <p className="text-gray-200 mt-4">
                You can now start browsing, streaming, and adding movies to your list.
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
            </>
          )}
          {status === "error" && (
            <>
              <ExclamationCircleIcon className="text-red-500 w-32 mx-auto my-8" />
              <h1 className="text-2xl font-bold text-red-500">
                Verification Failed
              </h1>
              <p className="text-gray-200 mt-4">
                The verification link is invalid or expired. Please try again.
              </p>
              <button
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={() => router.push("/")}
              >
                Go to Homepage
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default VerificationSuccessPage;

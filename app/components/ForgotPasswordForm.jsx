'use client'

import { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../utils/utils";
import Loader from "./Loader";
import axios from "axios";

const ForgotPassword = ({ setIsForgotPassword }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await axios.post("/api/users/forgot-pass", { email });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setSuccess("Reset password link sent! Please check your email.");
      }
    } catch (err) {
      console.error("Error sending reset password email:", err);
      setError(err.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input lg:bg-black">
      <h2 className="text-center font-bold text-xl text-neutral-800">
        <span className="text-[var(--secondary-dark)] text-3xl tracking-tighter">YENGFLIX</span>
        <span className="text-yellow-500 text-xs font-thin">V3</span>
      </h2>
      <p className="text-sm max-w-sm mt-2 text-neutral-300">
        Type your email address to receive a reset password link
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label className="text-gray-400" htmlFor="email">
            Email Address
          </Label>
          <Input
            className="bg-[var(--primary-light)] text-[var(--primary)]"
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="user@domain.com"
            type="email"
            name="email"
            required
            value={email}
          />
        </LabelInputContainer>

        <button
          type="submit"
          className="flex justify-center items-center bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mb-2"
          disabled={loading}
        >
          {loading ? <Loader /> : "Send Reset Link"}
          <BottomGradient />
        </button>

        <button
          type="button"
          className="flex justify-center items-center bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          onClick={() => setIsForgotPassword(false)}
        >
          Back to Login
          <BottomGradient />
        </button>

        {error && <p className="text-red-500 italic mt-2">{error}</p>}
        {success && <p className="text-green-500 italic mt-2">{success}</p>}

        <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
    </div>
  );
};

const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-red-300 to-transparent" />
  </>
);

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>
);

export default ForgotPassword;

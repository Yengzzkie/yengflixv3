"use client";
import React, { useState, useMemo } from "react";
import { cn } from "../utils/utils";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { IconBrandFacebook, IconBrandGoogle } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Check, Eye, EyeOff, X } from "lucide-react";
import { registerInputSchema } from "../utils/registerInputSchema";
import Loader from "../components/Loader";
import axios from "axios";

const PASSWORD_REQUIREMENTS = [
  { regex: /.{8,}/, text: "At least 8 characters" },
  { regex: /[0-9]/, text: "At least 1 number" },
  { regex: /[a-z]/, text: "At least 1 lowercase letter" },
  { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
  { regex: /[!-\/:-@[-`{-~]/, text: "At least 1 special characters" },
];

const STRENGTH_CONFIG = {
  colors: {
    0: "bg-border",
    1: "bg-red-500",
    2: "bg-orange-500",
    3: "bg-amber-500",
    4: "bg-amber-700",
    5: "bg-emerald-500",
  },
  text_color: {
    0: "bg-border",
    1: "text-red-500",
    2: "text-orange-500",
    3: "text-amber-500",
    4: "text-amber-700",
    5: "text-emerald-500",
  },
  texts: {
    0: "",
    1: "Weak password",
    2: "Medium password!",
    3: "Strong password!!",
    4: "Very Strong password!!!",
  },
};

const Form = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({password: "", confirmPassword: ""});
  const router = useRouter();

  const calculateStrength = useMemo(() => {
    const requirements = PASSWORD_REQUIREMENTS.map((req) => ({
      met: req.regex.test(password),
      text: req.text,
    }));
    return {
      score: requirements.filter((req) => req.met).length,
      requirements,
    };
  }, [password]);

  // SUBMISSION HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    //make sure name and email are not empty
    if (formData.name === "" || formData.email === "") {
      setError(["Display name or email cannot be empty"]);
      setLoading(false);
      return; // prevent form submission
    }

    //make sure password is not empty
    if (/\s/.test(formData.password)) {
      setError(["Password cannot have spaces"]);
      setLoading(false);
      return; // prevent form submission
    }

    //make sure password meets all requirements
    if (calculateStrength.score !== 5) {
      setError(["Password must meet all criteria below"]);
      setLoading(false);
      return; // prevent form submission
    }

    //make sure passwords match
    if (formData.password !== formData.confirmPassword) {
      setError(["Passwords do not match"]);
      setLoading(false);
      return; // prevent form submission
    }

    try {
      // remove confirmPassword from data to send and for input validation
      const { confirmPassword, ...newPassword } = formData;

      // send new password to server
      const response = await axios.patch("/api/users/forgot-pass", newPassword);

    } catch (error) {
      console.error({ error });
    } finally {
      setLoading(false);
    }
  };

  // INPUT HANDLER
  async function handleInputChange(e) {
    const { name, value } = e.target;
    try {
      setFormData((prevFormData) => {
        const updatedFormData = {
          ...prevFormData,
          [name]: value.trim(),
        };

        if (updatedFormData.password !== updatedFormData.confirmPassword) {
          setError("Passwords do not match");
        } else {
          setError(null);
        }

        if (name === "password") {
          setPassword(value);
        }

        return updatedFormData;
      });
    } catch (error) {
      console.error({ error });
    }
  }

  return (
    <div className="min-h-fit max-w-xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-[#000000dd] lg:bg-black">
      <h2 className="text-center font-bold text-xl text-neutral-200">
        <span className="text-[var(--secondary-dark)] text-3xl tracking-tighter">
          YENGFLIX
        </span>
        <span className="text-yellow-500 text-xs font-thin">V3</span>
      </h2>
      <br />
      <p className="text-white">Enter your new password:</p>
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="w-full mx-auto mb-4">
          <label
            htmlFor="password"
            className="text-neutral-300 block text-sm font-medium"
          >
            New password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={isVisible ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              aria-invalid={calculateStrength.score < 4}
              aria-describedby="password-strength"
              className="w-full p-2 hover:border-2 text-gray-300 rounded-md bg-[#27272a] outline-none focus-within:border-[#525252] transition"
            />
            <button
              type="button"
              onClick={() => setIsVisible((prev) => !prev)}
              aria-label={isVisible ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 flex items-center justify-center w-9 text-muted-foreground/80 "
            >
              {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <label
            htmlFor="confirmPassword"
            className="text-neutral-300 block text-sm font-medium mt-4 mb-1"
          >
            Confirm new password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={isVisible ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              aria-invalid={calculateStrength.score < 4}
              aria-describedby="password-strength"
              className="w-full p-2 hover:border-2 text-gray-300 rounded-md bg-[#27272a] outline-none focus-within:border-[#525252] transition"
            />
          </div>

          {/* PASSWORD MATCH ERROR */}
          {Array.isArray(error) && error.length !== 0 && error.map((err, index) => (
            <p key={index} className="text-red-500 italic text-sm">{err.message || err}</p>
          ))}

          <div
            className="mt-3 mb-2 h-1 rounded-full bg-border overflow-hidden"
            role="progressbar"
            aria-valuenow={calculateStrength.score}
            aria-valuemin={0}
            aria-valuemax={4}
          >
            <div
              className={`h-full ${
                STRENGTH_CONFIG.colors[calculateStrength.score]
              } transition-all duration-500`}
              style={{ width: `${(calculateStrength.score / 5) * 100}%` }}
            />
          </div>

          <p
            id="password-strength"
            className="mb-2 text-sm font-medium flex justify-between"
          >
            <span>Password must contain:</span>
            <span
              className={`${
                STRENGTH_CONFIG.text_color[calculateStrength.score]
              } transition-all duration-500`}
            >
              {STRENGTH_CONFIG.texts[Math.min(calculateStrength.score, 4)]}
            </span>
          </p>

          <ul className="space-y-1.5" aria-label="Password requirements">
            {calculateStrength.requirements.map((req, index) => (
              <li key={index} className="flex items-center space-x-2">
                {req.met ? (
                  <Check size={16} className="text-emerald-500" />
                ) : (
                  <X size={16} className="text-muted-foreground/80" />
                )}
                <span
                  className={`text-xs ${
                    req.met ? "text-emerald-600" : "text-muted-foreground"
                  }`}
                >
                  {req.text}
                  <span className="sr-only">
                    {req.met ? " - Requirement met" : " - Requirement not met"}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <button
          className="flex justify-center items-center bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          {loading ? <Loader /> : "Confirm New Password"}
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandFacebook className="h-4 w-4 text-neutral-300" />
            <span className="text-neutral-300 text-sm">Facebook</span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-300" />
            <span className="text-neutral-300 text-sm">Google</span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
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

export default Form;

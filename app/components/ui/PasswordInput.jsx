"use client";
import React, { useState, useMemo } from "react";
import { Check, Eye, EyeOff, X } from "lucide-react";

const PASSWORD_REQUIREMENTS = [
  { regex: /.{8,}/, text: "At least 8 characters" },
  { regex: /[0-9]/, text: "At least 1 number" },
  { regex: /[a-z]/, text: "At least 1 lowercase letter" },
  { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
  { regex: /[!-\/:-@[-`{-~]/, text: "At least 1 special character" },
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
  texts: {
    0: "Enter new password",
    1: "Weak password",
    2: "Medium password!",
    3: "Strong password!!",
    4: "Very Strong password!!!",
  },
};

const PasswordInput = ({ setPassword }) => {
    const [password, localSetPassword] = useState("");
    const [isVisible, setIsVisible] = useState(false);
  
    // Sync the password value to the parent
    const handlePasswordChange = (e) => {
      const value = e.target.value;
      localSetPassword(value);
      setPassword(value); // Pass the value to the parent component
    };
  
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
  
    return (
      <>
        <label htmlFor="password" className="block text-sm font-medium">
          New Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={isVisible ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            placeholder="New Password"
            aria-invalid={calculateStrength.score < 4}
            aria-describedby="password-strength"
            className="w-full p-2 border-2 rounded-md bg-gray-700 outline-none focus-within:border-blue-700 transition"
            required
          />
          <button
            type="button"
            onClick={() => setIsVisible((prev) => !prev)}
            aria-label={isVisible ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex items-center justify-center w-9 text-muted-foreground/80"
          >
            {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <div
          className="mt-3 mb-4 h-1 rounded-full bg-border overflow-hidden"
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
          <span>Must contain:</span>
          <span>
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
      </>
    );
  };
  

export default PasswordInput;

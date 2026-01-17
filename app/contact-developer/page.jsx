"use client";
import { useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { cn } from "../utils/utils";
import { useSession } from "next-auth/react";
import Loader from "../components/Loader";
import axios from "axios";

export default function ContactDeveloper() {
  const { data: session } = useSession();
  const [messageSent, setMessageSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: session?.user?.email || "",
    subject: "",
    message: "",
  });

  // Update form state when user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("/api/users/contact-developer", {
        ...formData,
        email: session?.user?.email,
      });
    } catch (error) {
      console.error("Error sending bug report email:", error);
    } finally {
      setIsLoading(false);
      setMessageSent(true);
      setTimeout(() => setMessageSent(false), 5000);
      setFormData({
        email: session?.user?.email || "",
        subject: "",
        message: "",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] text-white p-6">
      <div className="w-full max-w-2xl bg-black p-8 rounded-2xl shadow-lg">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center mb-2">
          Contact the Developer
        </h1>
        <p className="text-gray-400 text-center mb-6">
          Anong problema mo? Isumbong mo kay Yengzzkie!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <LabelInputContainer className="mb-4">
              <Label className="text-gray-400" htmlFor="email">
                Email Address
              </Label>
              <Input
                className="bg-[var(--primary-light)] text-[var(--primary)]"
                onChange={handleChange}
                value={formData.session?.user?.email}
                id="email"
                placeholder={session?.user?.email}
                type="email"
                name="email"
                disabled
              />
            </LabelInputContainer>
          </div>

          {/* Subject Field */}
          <div>
            <LabelInputContainer className="mb-4">
              <Label className="text-gray-400" htmlFor="subject">
                Subject
              </Label>
              <select
                className="bg-[var(--primary-light)] text-[var(--primary)] p-3 rounded-md"
                onChange={handleChange}
                value={formData.subject}
                id="subject"
                name="subject"
              >
                <option value="" disabled>
                  Select a subject
                </option>
                <option value="bug">Bug Report</option>
                <option value="feature">Feature Request</option>
                <option value="lovelife">Love Life</option>
                <option value="other">Other</option>
              </select>
            </LabelInputContainer>
          </div>

          {/* Message Field */}
          <div>
            <LabelInputContainer className="mb-4">
              <Label className="text-gray-400" htmlFor="subject">
                Subject
              </Label>
              <textarea
                className="bg-[var(--primary-light)] text-[var(--primary)] p-3 rounded-md"
                onChange={handleChange}
                value={formData.message}
                id="message"
                name="message"
                placeholder="Type your message here..."
                rows={5}
                required
              />
            </LabelInputContainer>
          </div>

          {/* Message Sent Notification */}
          <p className="text-green-500 text-center mt-4">
            {messageSent && "Message sent successfully!"}
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            className="flex justify-center items-center w-full bg-[var(--secondary-dark)] hover:bg-[var(--secondary-light)] transition p-3 rounded-lg font-semibold"
          >
            {isLoading ? <Loader /> : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

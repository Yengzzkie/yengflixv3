import { Alert } from "@material-tailwind/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6 mr-4"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6 mr-4 text-red-600"
    >
      <path
        fillRule="evenodd"
        d="M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5zM3.75 12a8.25 8.25 0 1116.5 0 8.25 8.25 0 01-16.5 0zm8.25-4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100 1.5.75.75 0 000-1.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ExclamationIcon() {
  return (
    <ExclamationCircleIcon className="h-6 w-6 mr-4 text-yellow-500" />
  );
}

const successClasses = `rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 text-[#2ec946] font-medium text-sm`;
const errorClasses = `rounded-none border-l-4 border-[#FF0000] bg-[#FF0000]/20 text-[#FF0000] font-medium text-sm`;
const infoClasses = `rounded-none border-l-4 border-[#FFA500] bg-[#FFA500]/20 text-[#FFA500] font-medium text-sm`;

// status: "success" | "error" | "info"
export default function NotificationAlert({ text, status }) {
  return (
    <Alert
      icon={status === "success" ? <CheckIcon /> : status === "error" ? <XIcon /> : <ExclamationIcon />}
      className={status === "success" ? successClasses : status === "error" ? errorClasses : infoClasses}
    >
      {text}
    </Alert>
  );
}

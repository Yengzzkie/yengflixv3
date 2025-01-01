import { VerifiedIcon, XCircleIcon } from "lucide-react";
import { Tooltip } from "@material-tailwind/react";

export const VerifiedBadge = () => {
  return (
    <Tooltip
      className="bg-green-600"
      content="Your email is verified"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: 25 },
      }}
    >
      <VerifiedIcon className="h-6 w-6 ml-2" fill="green" />
    </Tooltip>
  );
};

export const NotVerifiedBadge = () => {
  return (
    <Tooltip
      className="bg-red-500"
      content="Your email is unverified, verify now to access the full features of Yengflix"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: 25 },
      }}
    >
      <XCircleIcon className="h-5 w-5 ml-2" fill="red" />
    </Tooltip>
  );
};

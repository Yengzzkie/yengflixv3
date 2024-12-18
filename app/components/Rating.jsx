import { Rating, Typography } from "@material-tailwind/react";
 
export default function RatingStar({ rating, votes }) { 
  return (
    <div className="inline-flex items-center gap-2 font-bold text-blue-gray-500 mr-2">
      <span className="font-normal">{Math.round((rating * 10) / 2) / 10} </span>
      <Rating value={Math.round(Math.round((rating * 10) / 2) / 10)} className="text-yellow-500" readonly />
      <Typography className="font-small text-xs text-gray-300">
        Based on {votes} Reviews
      </Typography>
    </div>
  );
}
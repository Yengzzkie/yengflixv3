import { Card, Typography } from "@material-tailwind/react";
import { ArrowRightEndOnRectangleIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
 
const TABLE_HEAD = ["Name", "Contact", "Pickup Date/Time", "Total Bill", "Downpayment", "Balance", "Status", "", ""];
 
export default function OrderTable({data, deleteOrder}) {
  return (
    <Card className="h-full w-full overflow-scroll rounded-none">
      <table className="w-full min-w-max table-auto text-center">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-gray-300 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="leading-none opacity-70 text-black font-semibold"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((data) => (
            <tr key={data.id} className="even:bg-gray-100 hover:bg-[var(--primary-dark)] hover:text-black">
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {data.customerName}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {data.mobile}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {data.pickupDate} ({data.pickupTime})
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    ${data.totalBill}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    ${data.downpayment}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    ${data.balance}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    <span className="border p-2 text-[var(--secondary-content)] bg-[var(--secondary-light)] border-green-500">{data.status}</span>
                  </Typography>
                </td>
                <td className="p-2">
                  <button onClick={() => deleteOrder(data.id)} className="w-5">
                    <TrashIcon className="text-red-500 cursor-pointer" />
                  </button>
                </td>
                <td className="p-2">
                  <Link href={`orders/${data.id}`}><ArrowRightEndOnRectangleIcon /></Link>
                </td>
              </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
'use client'; // required in Next.js app directory
import moment from "moment";
import { format, parseISO } from 'date-fns';
import { EyeIcon } from '@heroicons/react/24/outline'; // Optional: Tailwind Heroicons

export default function EventCard({ title, eventDate }) {

  return (
    <div className="bg-white min-h-[200px] w-[300px] shadow-lg rounded-lg p-4  max-w-md mx-auto space-y-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <span className="text-sm text-primary-dark"> {moment(eventDate).fromNow()} </span>
      </div>

      <div className="flex gap-4 mt-2">
        <button
          className="bg-white cursor-pointer border-solid border-[1px] border-primary-light text-red-500 px-4 py-1 transition text-sm"
        >
          Read
        </button>

        <button
          className="cursor-pointer flex items-center gap-2 bg-white border-solid border-[1px] border-primary-light text-red-500 px-4 py-1 transition text-sm"
        >
          <EyeIcon className="w-5 h-5" />
          View Poster
        </button>
      </div>
    </div>
  );
}

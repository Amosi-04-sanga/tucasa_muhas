'use client';
import React, { useState, useEffect } from "react";
import moment from "moment";
import Link from "next/link";
import { EyeIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function EventCard({ title, eventDate, posterUrl, href }) {

  const hasPoster = Boolean(posterUrl);
  const safePosterUrl = hasPoster
    ? (posterUrl.startsWith('http') ? posterUrl : `https:${posterUrl}`)
    : null;
  const [isModalOpen, setIsModalOpen] = useState(false);



  return (
    <div className="bg-white w-[320px] h-[320px] rounded-xl drop-shadow-primary-light hover:shadow-xl transition-all duration-300 overflow-hidden flex-shrink-0 border border-gray-400 hover:border-gray-300">
      {/* Featured Poster Image */}
      {hasPoster && (
        <div className="relative h-32 w-full overflow-hidden">
          <img
            src={safePosterUrl}
            alt={`poster_${title}`}
            className="w-full h-full object-cover"
          />
         
        </div>
      )}

      {/* Content Section */}
      <div className="p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight mb-3">{title}</h3>
          
          {/* Relative time badge */}
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-teal-50 text-teal-700 text-xs font-medium border border-teal-200">
            <span>{moment(eventDate).fromNow()}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <Link
            href={href}
            className="inline-flex items-center px-4 py-2 text-sm font-medium bg-teal-600 text-white hover:bg-teal-700 transition-all duration-200 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex-1 justify-center"
          >
            Read More
          </Link>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white text-teal-700 hover:bg-teal-50 transition-all duration-200 rounded-lg shadow-md hover:shadow-lg border border-teal-200 hover:border-teal-300 transform hover:-translate-y-0.5 flex-1 justify-center"
          >
            <EyeIcon className="w-4 h-4 text-teal-600" />
            View Poster
          </button>
        </div>
      </div>
    </div>
  );
}

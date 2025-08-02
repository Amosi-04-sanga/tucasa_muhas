// components/Countdown.js

'use client'; // Only needed if you're in the Next.js app directory

import { parseISO, isToday, isPast, differenceInCalendarDays, format } from 'date-fns';
import { useState, useEffect } from 'react';

export default function Countdown({ eventDate }) {
  const [statusMessage, setStatusMessage] = useState('');
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const targetDate = typeof eventDate === 'string' ? parseISO(eventDate) : eventDate;
    const today = new Date();

    setFormattedDate(format(targetDate, 'MMMM d, yyyy'));

    if (isToday(targetDate)) {
      setStatusMessage('🎉 The event is today!');
    }  else {
      const daysLeft = differenceInCalendarDays(targetDate, today);
      setStatusMessage(`${daysLeft} day${daysLeft !== 1 ? 's' : ''} To Go`);
    }
  }, [eventDate]);

  return (
    <>
      <div className="text-xl">{statusMessage}  </div>
    </>
  );
}

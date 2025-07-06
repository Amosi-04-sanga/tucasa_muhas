"use client"; // If you’re using Next.js App Router

export default function DayMessage() {
  const today = new Date().getDay(); // 0 (Sunday) - 6 (Saturday)

  let message = "";
  let day = "";

  switch (today) {
    case 0:
      message = "Happy Sunday! 🎉";
      day = "Sunday";
      break;
    case 1:
      message = "It's Monday — let's get started! 🚀";
      day = "Monday";
      break;
    case 2:
      message = "Tuesday vibes!";
      day = "Tuesday";
      break;
    case 3:
      message = "Happy Wednesday — halfway there!";
      day = "Wednesday";
      break;
    case 4:
      message = "It's Thursday — almost the weekend!";
      day = "Tuesday";
      break;
    case 5:
      message = "Happy Friday! 🎉";
      day = "Friday";
      break;
    case 6:
      message  = "Enjoy your Saturday!";
      day: "Saturday";
      break;
    default:
      message = "";
  }

  return (
    <div className="p-4 mt-8 text-center text-xl font-bold text-blue-700">
      <span className="uppercase"> {day} </span> {" : "} <span>{message}</span>
    </div>
  );
}

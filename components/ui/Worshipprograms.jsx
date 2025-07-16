"use client"; // If you’re using Next.js App Router

export default function DayMessage() {
  const today = new Date().getDay(); // 0 (Sunday) - 6 (Saturday)

  let message = "";
  let day = "";

  switch (today) {
    case 0:
      message = "Q&A Session";
      day = "Sunday";
      break;
    case 1:
      message = "Relationships";
      day = "Monday";
      break;
    case 2:
      message = "Prophecy";
      day = "Tuesday";
      break;
    case 3:
      message = "Prayers";
      day = "Wednesday";
      break;
    case 4:
      message = "Lesson Study";
      day = "Tuesday";
      break;
    case 5:
      message = "Joint Worship";
      day = "Friday";
      break;
    case 6:
      message = "Testimony";
      day: "Saturday";
      break;
    default:
      message = "";
  }

  return (
    <div className="m-4 mt-4 shadow-md bg-white rounded-md max-w-[600px]">
      <div className="flex flex-col p-1">
        <p className="uppercase text-primary-dark text-center"> {day} </p>
        <div className="flex max-sm:flex-col sm:gap-8 items-center p-4 md:p-8 mt-2 border border-primary-light">
          <div className="flex gap-4 items-center text-primary-dark p-2">
            <p className="">THEME:</p>
            <p className="uppercase">{message}</p>
          </div>
          <div className="flex gap-4">
            <p>
              Chole hostel <br /> 2000-2030Hrs <br /> Behind block F
            </p>
            <p>
              Main campus <br /> 1930-2000Hrs <br /> Block M
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

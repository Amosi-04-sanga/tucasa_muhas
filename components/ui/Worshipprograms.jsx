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
      day = "Thursday";
      break;
    case 5:
      message = "Joint Worship";
      day = "Friday";
      break;
    case 6:
      message = "Testimony";
      day = "Saturday";
      break;
    default:
      message = "";
  }




  return (
    <div className="mx-4 mt-2 shadow-md bg-white rounded-md max-w-[509x]">
      <div className="flex flex-col ">
        <p className="uppercase text-primary-dark text-center p-2"> TODAY: {day} </p>
        <div className="flex max-sm:flex-col sm:gap-8 items-center p-4 md:p-8 border border-primary-light">
          <div className="flex gap-4 items-center text-primary-dark p-2">
            <p className="font-bold">THEME:</p>
            <p className="uppercase">{message}</p>
          </div>
          <div className="flex gap-4">
            <p>
              <span className="italic">Chole hostel</span> <br /> 20:00-20:30Hrs <br /> Behind block F
            </p>
            <p>
              <span className="italic">Main campus</span> <br /> 19:30-20:00Hrs <br /> Block M
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

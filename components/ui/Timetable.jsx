import React from "react";

const Timetable = () => {
  return (
    <>
      <div className="px-2 bg-white">
        <table className="min-w-[300px] mt-2 mx-auto border border-primary-light">
          <thead>
            <tr className="uppercase">
              <th className="px-1 py-2 md:px-8 md:py-4  border border-primary-light bg-primary-light">
                program
              </th>
              <th className="px-4 py-2 md:px-8 md:py-4 border border-primary-light bg-primary-light">
                location
              </th>
              <th className="px-4 py-2 md:px-8 md:py-4 border border-primary-light bg-primary-light">
                time
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 md:px-8 md:py-4 border border-primary-light">
                Evening Devotion
              </td>
              <td className="py-2 border border-primary-light">
                <div>
                  <p className="py-2 px-2">Main campus Block M</p>
                  <p className="border-t border-primary-light px-2 pt-4">
                    Chole hostel Behind block F
                  </p>
                </div>
              </td>
              <td className="py-2 text-[15px] border border-primary-light">
                <div>
                  <p className="px-2 py-2 ">Satur-Thurs 19:30-20:00</p>
                  <p className="border-t border-primary-light px-2 pt-4">
                    Satur-Thurs 20:00-20:30
                  </p>
                </div>
              </td>
            </tr>

            <tr>
              <td className="px-4 py-2 md:px-8 md:py-4 border border-primary-light">
                Choir Practice
              </td>
              <td className="px-4 py-2 md:px-8 md:py-4 border border-primary-light">
                Campus Behind block M
              </td>
              <td className="px-2 text-[15px] py-2 md:px-8 md:py-4 border border-primary-light">
                Tues & Thurs 17:30-19:00
              </td>
            </tr>

            <tr>
              <td className="px-4 py-2 md:px-8 md:py-4 border border-primary-light">
                Friday Vespers
              </td>
              <td className="px-4 py-2 md:px-8 md:py-4 border border-primary-light">
                Campus or Chole
              </td>
              <td className="px-2 text-[15px] py-2 md:px-8 md:py-4 border border-primary-light">
                Friday <br /> 19:00-21:30
              </td>
            </tr>

            <tr>
              <td className="px-4 py-2 md:px-8 md:py-4 border border-primary-light">
                Sabbath Worship
              </td>
              <td className="px-4 py-2 md:px-8 md:py-4 border border-primary-light">
                Mzizima SDA
              </td>
              <td className="px-2 text-[15px] py-2 md:px-8 md:py-4 border border-primary-light">
                Sturday 08:00-18:00
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Timetable;

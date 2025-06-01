import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="md:px-32">
      <h1 className="text-3xl px-8 font-bold text-primary-dark mt-4 ">
        MUHASSO LAUNDRY PROJECT
      </h1>
      <div className="bg-[#E9FFFF] mt-4 p-8 flex flex-col gap-8">
        <p className="mt-2">
          Built on a strong spiritual foundation, this project established to
          provide affordable, high-quality laundry services to students, staff,
          companies, organizationsin, residents around MUHAS and the greater Dar
          es Salaam area.
        </p>
        <h2 className="text-2xl mt-8 text-primary-dark font-bold">
          What Makes Us Unique:
        </h2>

        <div className="flex flex-col gap-2">
          <p>Affordable pricing </p>
          <p>Timely Delivery</p>
          <p>Operated with excellence and care to all clients</p>
          <p>Rooted in Christian service </p>
        </div>

        <h2 className="text-2xl mt-8 text-primary-dark font-bold">
        Our Services:
        </h2>

        <div className="flex flex-col gap-2">
          <p>Washing clothes – Tsh. 1000 per Kg</p>
          <p>Drying clothes – Tsh. 1000 per Kg</p>
          <p>Ironing – Tsh. 500 per cloth</p>
          <p>Lab coats – Tsh. 2000 each (Includes free ironing) </p>
          <p>Suits, Joho & Duvets – Tsh. 5000 each </p>
        </div>

        <h2 className="text-2xl mt-8 text-primary-dark font-bold">
        📍 Location:
        </h2>

        <p className="">MUHAS – Behind Kagera Hostel</p>

        <h2 className="text-2xl mt-8 text-primary-dark font-bold">
        🕒 Operating Hours:
        </h2>

        <p className="">Sunday to Friday — 07:30 AM to 06:00 PM</p>


        <h2 className="text-2xl mt-8 text-primary-dark font-bold">
        📞 Contact Us:
        </h2>

        <div className="flex flex-col gap-2">
          <p>+255 744 380 854</p>
          <p>+255 687 225 944</p>
          <div className="flex gap-2"><span>Instagram:</span> <Link href='/'>@muhassso_laundry</Link> </div>
          
        </div>
      
        
        
      </div>

      
    </div>
  );
};

export default page;

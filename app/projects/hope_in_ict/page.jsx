import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="px-8 pb-4">
      <div>
        <p className="mt-4">
          We Are the Creative Agency Offering professional digital services
          rooted in innovation, talent, and purpose. We provide top-notch
          creative solutions that empower individuals, businesses, and
          organizations
        </p>
        <h2 className="text-2xl capitalize mt-8 text-primary-dark font-bold">
          Graphic Design Services:
        </h2>
        <div className="flex flex-col gap-1">
          <p>Posters Designs</p>
          <p>Flyers Designs</p>
          <p>Logo Designs</p>
          <p>Banners Designs</p>
          <p>Business Cards</p>
          <p>Motion Graphics</p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl capitalize mt-8 text-primary-dark font-bold">
          Photography Services:
        </h2>
        <div className="flex flex-col gap-1">
          <p>Birthdays</p>
          <p>Weddings</p>
          <p>Graduations</p>
          <p>Conferences</p>
          <p>Corporate Events</p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl capitalize mt-8 text-primary-dark font-bold">
          Event Branding:
        </h2>
        <div className="flex flex-col gap-1">
          <p>Promotional Items</p>
          <p>Pre-Event</p>
          <p>During Event</p>
          <p>Motion Graphics</p>
        </div>
      </div>

      <p className="mt-8">
        {" "}
        Let Us Handle Your Next Project! Whether you're planning a conference,
        launching a brand, or celebrating a special event, our team is ready to
        deliver creativity that speaks. With excellence, integrity, and timely
        delivery, we bring your vision to life.
      </p>

      <div className="mt-8">
        <h1> Contact Us Today</h1>
        <p className="mt-2"> 📞 +255 748 730 115</p>
        <p className="mt-2"> 📞 +255 616 979 847</p>
        <p className="mt-2"> 📞 +255 688 043 125</p>
      </div>

      <div className="mt-8">
        <h1>Social Media:</h1>
        <div className="mt-2 flex gap-2">
          🔶 <p>Insta & Fb:</p> <Link className="text-red-800" href="#">@hopein_ict</Link>{" "}
        </div>
      </div>
      <p className="mt-8">We ensure Customers satisfaction</p>
    </div>
  );
};

export default page;

/*

*/

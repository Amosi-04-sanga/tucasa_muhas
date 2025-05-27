import React from "react";

const page = () => {
  return (
    <div className="md:px-32">
      <h1 className="text-3xl px-8 font-bold text-primary-dark mt-4 ">
        ABOUT US
      </h1>
      <div className="bg-[#E9FFFF] mt-4 p-8">
        <h2 className="text-2xl text-primary-dark font-bold">Who we are</h2>
        <p className="mt-4">
          Praise the Lord! TUCASA MUHAS stands for the Tanzania Universities and
          Colleges Adventist Students Association at Muhimbili University of
          Health and Allied Sciences (MUHAS)...
        </p>
      </div>

      <div className=" p-8">
        <h2 className="text-2xl text-primary-dark font-bold">Our Vision</h2>
        <p className="mt-4">
          TUCASA members will grow in their relationship with Jesus Christ in
          harmony with the great prophecies of the Scriptures.
        </p>
      </div>

      <div className="bg-[#E9FFFF] p-8">
        <h2 className="text-2xl text-primary-dark font-bold">Our Mission</h2>
        <p className="">
          To facilitate the proclamation of the everlasting gospel of the Lord
          and Saviour Jesus Christ as embodied in the Three Angels Message of
          Revelation 14:6-12, as reflected in the mission statement of the
          Seventh-day Adventist Church, to all Colleges and Universities
          students.
        </p>
      </div>

      <div className=" p-8">
        <h2 className="text-2xl text-primary-dark font-bold">Our Believes </h2>
        <p className="mt-4">
          Seventh-day Adventist beliefs offer a life-transforming foundation
          rooted in the Bible. These teachings reveal a God who desires a
          relationship with each of us, .. More
        </p>
      </div>

      <div className="bg-[#E9FFFF] p-8">
        <h2 className="text-2xl text-primary-dark font-bold">Core Values</h2>
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex flex-col gap-2 capitalize min-w-[200px]">
            <p>Faith</p>
            <p>Service</p>
            <p>unity</p>
          </div>
          <div className="flex flex-col gap-2 capitalize">
            <p>Christian leadership</p>
            <p>exellence</p>
            <p>intergrity</p>
          </div>
        </div>
      </div>

      <div className=" p-8">
        <h2 className="text-2xl text-primary-dark font-bold">Our Motto </h2>
        <p className="mt-4">
          Tucasa Muhas Family - We are one in the Family of God
        </p>
      </div>
    </div>
  );
};

export default page;

import Link from "next/link";
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
          The Tanzania Universities and Colleges Adventist Students Association
          (TUCASA) is an extension of the Seventh Day Adventist Church Youth,
          Chaplaincy and Public Campus Ministries that focuses on preaching and
          spreading the Gospel of Jesus Christ to Higher Learning Institutions
          of all levels in Tanzania.
        </p>
        <p className="mt-4">
          Historically, the association was established in the early 1970s and
          was initially called, the Tanzania Higher Learning Institutions
          Seventh Day Adventist Students and Associates Organization (THISDASAO)
          with the primary aim of spreading the gospel to universities.
        </p>
        <p className="mt-4">
          However, in the 1990s, the organization changed its name to Tanzania
          Higher Learning Institutions Seventh Day Adventist Students
          Organization (THISDASO), in a move to make graduates associate members
          and no longer default members. Proceeding with the new direction and
          continuous work of God, in 2013, the Organization again changed its
          name to the current name.
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
        <div className="mt-4">
          <p className="inline">
            Seventh-day Adventist beliefs offer a life-transforming foundation
            rooted in the Bible. These teachings reveal a God who desires a
            relationship with each of us, ...
          </p>

          <span>
          <Link
            href="https://www.adventist.org/beliefs/"
            className="text-red-700 inline"
          >
            Read More
          </Link>
          </span>
        </div>
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

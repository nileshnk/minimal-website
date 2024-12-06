import SocialLinks from "./SocialLink";
import ToggleButton from "./GetInTouchToggleBtn";

import Link from "next/link";

export default function Home() {
  return (
    <div
      className="w-2/6 h-screen flex items-center transition-colors"
      style={{ marginTop: "-10%", marginLeft: "25%" }}
    >
      <div className="flex flex-col">
        <p className="text-neutral-900 dark:text-[#f0f0f0] font-[480] text-[18px] leading-[24px] pb-[24px] transition-colors">
          Nilesh Kumar
        </p>
        <p className="font-[380] leading-[25px] pb-[16px] dark:text-[#adadad]">
          Software Engineer from Bangalore, India. I have a passion for building
          scalable backend systems and optimizing deployment strategies.
        </p>
        <p className="font-[380] leading-[25px] pb-[16px] dark:text-[#adadad]">
          Currently I work at{" "}
          <a
            href="https://geekyants.com"
            className="inline font-[380] leading-[25px] underline decoration-gray-300 underline-offset-4 dark:text-[#adadad] hover:text-[#aea2a2]"
          >
            GeekyAnts
          </a>
          , building backend solutions for enterprise clients.
        </p>
        <p className="font-[380] leading-[25px] pb-[16px] dark:text-[#adadad]">
          Take a look at some of my{" "}
          <Link
            href="/projects"
            className="underline decoration-gray-300 underline-offset-4 hover:text-[#aea2a2]"
          >
            work
          </Link>
          , read my blogs, or feel free to <ToggleButton />
        </p>
        <SocialLinks />
      </div>
    </div>
  );
}

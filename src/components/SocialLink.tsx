import Image from "next/image";

export default function SocialLinks() {
  return (
    <div
      id="social-links"
      className="mt-5 flex items-center justify-between w-[120px] transition-all duration-300 opacity-0 invisible"
      style={{ display: "flex", flexDirection: "row" }}
    >
      <a
        href="https://github.com/nileshnk"
        className="mb-3 opacity-100 hover:opacity-50 dark:filter dark:invert"
      >
        <Image alt="GitHub" src="/assets/github.svg" width="20" height="20" />
      </a>
      <a
        href="https://www.linkedin.com/in/inilesh/"
        className="mb-3 opacity-100 hover:opacity-50 dark:filter dark:invert"
      >
        <Image
          alt="Instagram"
          src="/assets/linkedin_white_bg.svg"
          width="20"
          height="20"
        />
      </a>
      <a
        href="https://x.com/whynilesh/"
        className="mb-3 opacity-100 hover:opacity-50 dark:filter dark:invert"
      >
        <Image alt="Twitter" src="/assets/x.svg" width="18" height="18" />
      </a>

      <a
        href="mailto:mail@inilesh.com"
        className="mb-3 opacity-100 hover:opacity-50 dark:filter dark:invert"
      >
        <Image alt="Mail" src="/assets/mail.svg" width="20" height="20" />
      </a>
    </div>
  );
}

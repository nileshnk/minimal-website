"use client";
export default function ToggleButton() {
  return (
    <button
      className="underline dark:text-[#adadad] text-[#282828] decoration-gray-300 underline-offset-4 hover:text-[#aea2a2] transition-colors"
      onClick={() => {
        const socialLinks = document.getElementById("social-links");
        if (socialLinks) {
          const isHidden = socialLinks.classList.contains("opacity-0");
          if (isHidden) {
            socialLinks.classList.remove("opacity-0", "invisible");
            socialLinks.classList.add("opacity-100");
          } else {
            socialLinks.classList.remove("opacity-100");
            socialLinks.classList.add("opacity-0", "invisible");
          }
        }
      }}
    >
      get in touch.
    </button>
  );
}

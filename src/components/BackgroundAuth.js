import BackgroundSVG from "@/assets/background.svg";

export default function BackgroundAuth({ name, link }) {
  return (
    <div className="hidden sm:block w-1/2 h-screen flex items-center justify-center p-4 bg-white">
      <div className="w-full h-full relative">
        <a
          className="absolute bg-black text-white px-4 py-2 rounded-[18px] top-4 right-4 z-10"
          href={`/${link}`}
        >
          {name}
        </a>
        <BackgroundSVG className="w-full h-full object-cover rounded-2xl" />
      </div>
    </div>
  );
}

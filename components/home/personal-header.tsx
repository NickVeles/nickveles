import Image from "next/image";
import TypedStrings from "../utils/typed-strings";
import AnimatedBackground from "../utils/animated-background";

const titles = [
  "Full Stack Developer",
  "UI/UX Designer",
  "Creative Problem Solver",
  "Tech Enthusiast",
  "Digital Innovator",
];

export default function PersonalHeader() {
  return (
    <div className="flex w-full items-center justify-center">
      {/* Main content */}
      <div className="relative flex flex-col w-full text-center py-32 gap-4">
        {/* Animated Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <AnimatedBackground
            nodeIntensity={150}
            mouseForce={0.1}
            mouseRadius={100}
            className="opacity-20"
          />
        </div>
        <div className="relative flex flex-col w-full z-10 pointer-events-none">
          {/* Profile Image */}
          <div className="flex justify-center items-center">
            <div className="w-48 h-48 rounded-full overflow-hidden bg-background p-2 border-8 border-primary">
              <Image
                src="/og-image.jpg"
                alt="Profile"
                width={180}
                height={180}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {/* Name */}
            <h1 className="text-8xl sm:text-9xl font-bold font-stylized text-foreground px-4 drop-shadow-sm">
              Nick Veles
            </h1>

            {/* Animated Titles */}
            <div className="h-12 flex items-center justify-center">
              <TypedStrings
                list={titles}
                className="text-xl md:text-2xl text-accent-foreground font-light"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

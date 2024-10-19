import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('/images/hero-image.jpg')`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="overlay bg-black bg-opacity-50 h-full w-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-4xl font-bold">
            Welcome to Ms Jay Store
          </h1>
          <a href="#products">
            <Button className="mt-6 px-6 py-3 text-lg font-bold bg-green-500 text-white rounded-lg hover:bg-green-700">
              Shop Now
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

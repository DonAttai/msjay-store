import { Link } from "react-router-dom";

export function Home() {
  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dte2inrui/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1735625754/hero-image_h1wldd.jpg')`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-black bg-opacity-50 h-full w-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-[#F5F5F5] text-3xl font-bold ">
            Welcome to Ms Jay Store!
          </h1>
          <p className="mb-4 text-muted">Your Best Online Store Destination!</p>
          <Link
            to="/store"
            className="mt-8 px-6 py-3 text-lg font-bold text-white rounded-lg bg-gradient-to-r from-[#32CD32] to-[#FFD700]"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}

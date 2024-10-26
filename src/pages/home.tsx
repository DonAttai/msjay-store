import { Link } from "react-router-dom";

export function Home() {
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
          <h1 className="text-white text-3xl font-bold">
            Welcome to Ms Jay Store
          </h1>
          <p className="mb-4">Your Best Online Store Destination!</p>
          <Link
            to="/store"
            className="mt-8 px-6 py-3 text-lg font-bold bg-green-500 text-white rounded-lg hover:bg-green-700"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}

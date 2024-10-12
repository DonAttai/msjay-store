export const Hero = () => {
  return (
    <div className="h-1/3 bg-cover flex flex-col justify-center items-center px-4 py-8">
      <div className="relative z-2 bg-white bg-opacity-75 border rounded-lg px-8 py-12 shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to Ms Jay Store the best online shopping destination!
        </h1>
        <p className="text-lg text-center text-gray-600 mb-8">
          Discover a wide range of products and brands at affordable prices.
        </p>
        {/* <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow transition-colors">
          Shop Now
        </button> */}
      </div>
    </div>
  );
};

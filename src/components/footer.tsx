export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4">About Us</h3>
          <p>
            Ms Jay Store is a sleek e-commerce platform offering high-quality
            products with a fast and secure shopping experience.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-blue-500">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Shop
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-500">
              Facebook
            </a>
            <a href="#" className="hover:text-blue-500">
              Twitter
            </a>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Contact Us</h3>
          <p>Phone: (123) 456-7890</p>
          <p>Email: info@msjaystore.com</p>
        </div>
      </div>
      <p className="text-center my-2">
        Ms Jay Store &copy;{new Date().getFullYear()}
      </p>
    </footer>
  );
};

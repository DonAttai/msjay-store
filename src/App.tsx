import { Outlet } from "react-router-dom";
import { Header } from "./components";
import { Toaster } from "react-hot-toast";
import { useCart } from "./stores/cart-store";

function App() {
  useCart();
  return (
    <>
      <Header />
      <main className="pt-16 md:pt-24">
        <Outlet />
      </main>
      <Toaster />
    </>
  );
}

export default App;

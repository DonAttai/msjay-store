import { Outlet } from "react-router-dom";
import { Header } from "./components";
import { Toaster } from "react-hot-toast";

import { Footer } from "./components";
import ScrollRestoration from "./components/scroll-restoration";

function App() {
  return (
    <>
      <Header />
      <main className="pt-[64px]">
        <ScrollRestoration />
        <Outlet />
      </main>
      <Toaster />
      <Footer />
    </>
  );
}

export default App;

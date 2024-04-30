import { Outlet } from "react-router-dom";
import { Header } from "./components";
import { Toaster } from "react-hot-toast";

import { Footer } from "./components";

function App() {
  return (
    <>
      <Header />
      <main className="pt-[64px]">
        <Outlet />
      </main>
      <Toaster />
      <Footer />
    </>
  );
}

export default App;

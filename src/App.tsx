import { Outlet } from "react-router-dom";
import { Header } from "./components";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Toaster />
    </>
  );
}

export default App;

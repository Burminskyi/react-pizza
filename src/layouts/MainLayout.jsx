import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

const MainLayout = () => {
  return (
    <div className="App">
      <div class="wrapper">
        <Header />
        <div class="content">
          <div class="container">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

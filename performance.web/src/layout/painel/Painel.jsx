import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import PainelNavbar from "./PainelNavbar";
import Sidebar from "./PainelSidebar";
import util from "../../services/util";
import "react-toastify/dist/ReactToastify.css";

const PainelLayout = () => {
  // Detecta se a tela é grande o suficiente para inicializar a sidebar aberta
  const isLargeScreen = () => window.innerWidth >= 1024; // Considerando 'lg' como 1024px
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isLargeScreen());

  useEffect(() => {
    const handleResize = () => {
      if (isLargeScreen()) {
        setIsSidebarOpen(true); // Fecha a sidebar em telas grandes
      } else {
        setIsSidebarOpen(false); // Abre a sidebar em telas menores
      }
    };

    window.addEventListener("resize", handleResize);

    // Inicializa corretamente ao carregar a página
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleToggleSidebar = () => {
    util.toggleSidebar(isSidebarOpen, setIsSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <PainelNavbar
        toggleSidebar={handleToggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      <div className="flex flex-1 pt-16">
        <Sidebar toggleSidebar={handleToggleSidebar} isOpen={isSidebarOpen} />
        <div
          className={`flex-1 p-4 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PainelLayout;

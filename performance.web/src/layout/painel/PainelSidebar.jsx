/* EU REMOVI O "CLASSNAMES" DO CÓDIGO, TRATAR COMPORTAMENTO DEPOIS

import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { FcViewDetails } from "react-icons/fc";
import { HiOutlineLogout } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DASHBOARD_PAINEL_SIDEBAR_LINKS,
  DASHBOARD_USER_SIDEBAR_LINKS,
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
} from "../../lib/consts/navigation";

import util from "../../services/util";
import api from "../../services/api";

const linkClass =
  "flex text-decoration-none font-semibold text-items-center gap-2 font-light px-3 py-2 hover:bg-sky-700 hover:no-underline active:bg-sky-800 rounded-md text-base";

export default function Sidebar() {
  const navigate = useNavigate();
  const [acessoSimulado, setAcessoSimulado] = useState(0);

  function logout() {
    util.removeAuthToken();
    // apagar token do storage
    navigate(util.getEnv() + "/");
  }
  useEffect(() => {
    // Simula a chamada da API para buscar o nível de acesso
    const id = util.storage.getItem('uid');
    const fetchNivelAcesso = async () => {
      try {
        const response = await api.get(`/acessosimulado/${id}`);
        if (response.data && response.data.success && response.data.data.length > 0) {
          setAcessoSimulado(response.data.data[0].tipo);
        } else {
          console.error("Falha ao buscar acessos - simulado.");
        }
      } catch (erro) {
        console.error("Erro ao buscar acessos - simulado!", erro);
      }
    };

    fetchNivelAcesso();
  }, []);

  const renderLinks = (links) => {
    return links
      .filter(link => link.niveisPermitidos.includes(acessoSimulado))
      .map((item) => <SiderbarLink key={item.key} item={item} />);
  };

  return (
    <div
      className="bg-sky-400 w-64 p-3 flex flex-col text-gray-700"
      style={{ position: "fixed", top: 0, left: 0, height: "100%" }}
    >
      <div className="flex items-center gap-2 px-1 py-3 border-solid border-b">
        <FcViewDetails fontSize={24} />
        <span className="text-gray-700 text-lg font-semibold">
          Performance Cursos
        </span>
      </div>
      <div className="flex-1 py-8 flex flex-col gap-0.5">
        {util.storage.getItem("t") === "p"
          ? DASHBOARD_PAINEL_SIDEBAR_LINKS.map((item) => (
            <SiderbarLink key={item.key} item={item} />
          ))
          : renderLinks(DASHBOARD_USER_SIDEBAR_LINKS)}
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-solid border-t border-sky-800">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SiderbarLink key={item.key} item={item} />
        ))}
        <button onClick={logout}>
          <div className={classNames(linkClass, "cursor-pointer text-red-500")}>
            <span className="text-xl">
              <HiOutlineLogout />
            </span>
            Logout
          </div>
        </button>
      </div>
    </div>
  );
}

function SiderbarLink({ item }) {
  const { pathname } = useLocation();

  return (
    <Link
      to={item.path}
      className={classNames(
        pathname === item.path ? "bg-sky-700 text-white" : "text-gray-100",
        linkClass
      )}
    >
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </Link>
  );
}
*/

import React, { useEffect, useState } from "react";
import { FcMenu, FcViewDetails } from "react-icons/fc";
import { HiOutlineLogout } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DASHBOARD_PAINEL_SIDEBAR_LINKS,
  DASHBOARD_USER_SIDEBAR_LINKS,
} from "../../lib/consts/navigation";

import util from "../../services/util";
import api from "../../services/api";
import { PFileFetcher } from "../../components";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const navigate = useNavigate();
  const [acessoSimulado, setAcessoSimulado] = useState(0);

  function logout() {
    util.removeAuthToken();
    navigate(util.getEnv() + "/");
  }

  useEffect(() => {
    const id = util.storage.getItem('uid');
    const fetchNivelAcesso = async () => {
      try {
        const response = await api.get(`/acessosimulado/${id}`);
        if (response.data && response.data.success && response.data.data.length > 0) {
          setAcessoSimulado(response.data.data[0].tipo);
        } else {
          console.error("Falha ao buscar acessos - simulado.");
        }
      } catch (erro) {
        console.error("Erro ao buscar acessos - simulado!", erro);
      }
    };

    fetchNivelAcesso();
  }, []);

  const renderLinks = (links) => {
    return links
      .filter(link => link.niveisPermitidos.includes(acessoSimulado))
      .map((item) => <SidebarLink key={item.key} item={item} />);
  };

  return (
    <div className="z-20">
      <div
        className={`select-none bg-sky-700 w-64 flex flex-col text-gray-700 fixed top-0 left-0 h-full transform transition-all duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <button className="lg:flex items-center justify-center w-full gap-2 p-4 border-solid border-b hidden">
          <PFileFetcher fileName="performance-brand-maximized" />
        </button>
        <button onClick={toggleSidebar} className="flex items-center justify-center w-full gap-2 px-1 py-3 border-solid border-b lg:hidden">
          <PFileFetcher fileName="performance-brand-minimized" />
        </button>
        <div className="flex-1 flex flex-col gap-0.5 m-3">
          {util.storage.getItem("t") === "p"
            ? DASHBOARD_PAINEL_SIDEBAR_LINKS.map((item) => (
              <SidebarLink key={item.key} item={item} />
            ))
            : renderLinks(DASHBOARD_USER_SIDEBAR_LINKS)}
        </div>
        <div className="flex flex-col gap-0.5 pt-2 border-solid border-t border-sky-800 m-3">
          <button onClick={logout}>
            <div className={`flex items-center rounded-lg p-2 bg-red-700 text-white hover:bg-red-600`}>
              <span className="text-xl mr-4">
                <HiOutlineLogout />
              </span>
              Sair
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ item }) {
  const location = useLocation();
  const isActive = location.pathname === item.path;

  return (
    <Link
      to={item.path}
      draggable={false}
      className={`select-none flex items-center rounded-lg p-2 ${isActive ? 'bg-sky-900' : ''} text-white hover:bg-sky-800`}
    >
      <span className="text-xl mr-4">{item.icon}</span>
      {item.label}
    </Link>
  );
}
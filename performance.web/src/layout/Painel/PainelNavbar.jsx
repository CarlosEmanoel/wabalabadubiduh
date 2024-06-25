/* EU REMOVI O "CLASSNAMES" DO CÓDIGO, TRATAR COMPORTAMENTO DEPOIS

import { Menu, Popover, Transition } from '@headlessui/react'
import classNames from "classnames"
import React, { Fragment } from "react"
import { BiSolidUser } from "react-icons/bi"
import { HiOutlineBell, HiOutlineChatAlt, HiOutlineSearch } from "react-icons/hi"
import { useNavigate } from "react-router-dom"
import util from '../../services/util'

export default function PainelNavbar() {
  const navigate = useNavigate()

  return (
    
      <div className="bg-sky-100 h-16 px-4 flex justify-between items-center border-b border-gray-200 fixed ml-64 top-0 w-full z-20">
        <div className="relative">
          <HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3" />
          <input
            type="text"
            placeholder="Search..."
            className="text-sm focus:outline-none active: outline-none h-10 w-[24rem] border border-gray-300 rounded-lg pl-11 pr-4" />
        </div>

        <div className="flex items-center gap-2 mr-64">
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button
                  className={classNames(
                    open && 'bg-gray-300',
                    "p-1.5 rounded-sm inline-flex items-center text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-300"
                  )}
                >
                  <HiOutlineChatAlt fontSize={24} />
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute right-0 z-10 mt-2.5 w-80">
                    <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                      <strong className="text-gray-700 font-medium">Mensagens</strong>
                      <div className="mt-2 py-1 text-sm">Painel de mensagens</div>
                    </div>
                  </Popover.Panel>
                </Transition >
              </>
            )}
          </Popover >
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button
                  className={classNames(
                    open && 'bg-gray-300',
                    "p-1.5 rounded-sm inline-flex items-center text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-300"
                  )}
                >
                  <HiOutlineBell fontSize={24} />
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute right-0 z-10 mt-2.5 w-80">
                    <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                      <strong className="text-gray-700 font-medium">Notificações</strong>
                      <div className="mt-2 py-1 text-sm">Painel de notificações</div>
                    </div>
                  </Popover.Panel>
                </Transition >
              </>
            )}
          </Popover >
          <Menu as="div" className="relative">
            <div className="inline-flex">
              <Menu.Button>
                <BiSolidUser fontSize={24} />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-back ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => ( 
                      <div 
                        className={classNames(
                          active && 'bg-gray-100',
                          'text-gray-700 focus:bg-gray-200 curso-pointer round-sm px-2 py-2'
                        )}
                        onClick={() => navigate('/profile')}
                      >
                          Meu perfil
                      </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => ( 
                      <div 
                        className={classNames(
                          active && 'bg-gray-100',
                          'text-gray-700 focus:bg-gray-200 curso-pointer round-sm px-2 py-2'
                        )}
                        onClick={() => navigate('/configuracao')}
                      >
                          Configurações
                      </div>
                  )}
                </Menu.Item>
                <div className="dropdown-divider"></div>
                <Menu.Item>
                  {({ active }) => ( 
                      
                      <div 
                        className={classNames(
                          active && 'bg-gray-100',
                          'border text-center text-gray-700 focus:bg-gray-200 curso-pointer round-sm px-2 py-2'
                        )}
                        onClick={() => {
                          util.removeAuthToken();
                          navigate(util.getEnv() + '/')
                        }}
                      >
                          Sair
                      </div>
                  )}
                </Menu.Item> 
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    
  )
}


*/

import React from "react";
import { FcMenu } from "react-icons/fc";

export default function PainelNavbar({ toggleSidebar, isSidebarOpen }) {
  return (
    <div className={`select-none bg-sky-300 h-16 px-4 flex justify-between items-center border-b border-gray-200 fixed top-0 w-full z-20 transition-all duration-300 ease-in-out ${isSidebarOpen ? "pl-64" : "pl-0"}`}>
      <button onClick={toggleSidebar} className="pl-5">
        <FcMenu fontSize={24} />
      </button>
    </div>
  );
}


{/* <div className="flex items-center gap-2 mr-64">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button className="p-1.5 rounded-sm inline-flex items-center text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-300">
                <HiOutlineChatAlt fontSize={24} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 mt-2.5 w-80">
                  <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                    <strong className="text-gray-700 font-medium">Mensagens</strong>
                    <div className="mt-2 py-1 text-sm">Painel de mensagens</div>
                  </div>
                </Popover.Panel>
              </Transition >
            </>
          )}
        </Popover >
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button className={"p-1.5 rounded-sm inline-flex items-center text-gray-700 hover:text-opacity-100 focus:outline-none hover:bg-slate-700 active:bg-purple-700"}>
                <HiOutlineBell fontSize={24} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 mt-2.5 w-80">
                  <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                    <strong className="text-gray-700 font-medium">Notificações</strong>
                    <div className="mt-2 py-1 text-sm">Painel de notificações</div>
                  </div>
                </Popover.Panel>
              </Transition >
            </>
          )}
        </Popover >
        <Menu as="div" className="relative">
          <div className="inline-flex">
            <Menu.Button>
              <BiSolidUser fontSize={24} />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-back ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={'text-gray-700 focus:bg-gray-200 curso-pointer round-sm px-2 py-2'}
                    onClick={() => navigate('/profile')}
                  >
                    Meu perfil
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={'text-gray-700 focus:bg-gray-200 curso-pointer round-sm px-2 py-2'}
                    onClick={() => navigate('/configuracao')}
                  >
                    Configurações
                  </div>
                )}
              </Menu.Item>
              <div className="dropdown-divider"></div>
              <Menu.Item>
                {({ active }) => (

                  <div
                    className={'border text-center text-gray-700 focus:bg-gray-200 curso-pointer round-sm px-2 py-2'}
                    onClick={() => {
                      util.removeAuthToken();
                      navigate(util.getEnv() + '/')
                    }}
                  >
                    Sair
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div> */}
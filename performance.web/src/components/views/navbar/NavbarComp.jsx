import { NavLink } from 'react-router-dom';
import { PFileFetcher } from '../..';
import { useState } from 'react';
import MobileSidebar from './MobileSideNavbarComp';
import { useScroll } from '../../../hooks';

const NavBar = () => {
  const isShrunk = useScroll(50)
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavOpen(!isMobileNavOpen);
  };
  return (
    <>
      <div className={`navbar overflow-hidden items-stretch justify-between fixed shadow-lg xl:flex 2xl:flex lg:flex ${isShrunk ? 'shrink' : ''} hidden lg:block select-none max-index`}>
        <a className='ml-4 py-2 items-center hidden lg:flex' href="/">
          <PFileFetcher className={`${isShrunk ? '' : 'w-56'}`} fileName={`performance-brand-${isShrunk ? 'minimized' : 'maximized'}`} alt="Logo da Performance" />
        </a>
        <div className='m-0 gap-4 hidden lg:flex'>
          <NavLink className='navbar-navlink' exact='true' to="/" activeclassname='active'>Início</NavLink>
          <NavLink className='navbar-navlink' to="/cursos" activeclassname='active'>Cursos</NavLink>
          <NavLink className='navbar-navlink' to="/contato" activeclassname='active'>Contato</NavLink>
          {/* <NavLink className='navbar-navlink' to="/eventos" activeclassname='active'>Eventos</NavLink> */}
        </div>
        <a href="/acesso" className='sign-in-container hidden lg:flex lg:flex-row xl:flex-col'>
          <div className='sign-in'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <defs>
                <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "var(--secondary-blue)" }} />
                  <stop offset="30%" style={{ stopColor: "var(--secondary-blue)" }} />
                  <stop offset="100%" style={{ stopColor: "var(--tertiary-blue)" }} />
                </linearGradient>
              </defs>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" fill="none" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              <circle cx="12" cy="7" r="4" fill="url(#iconGradient)"></circle>
            </svg>
          </div>
          <p className="lg:px-4 px-0 sign-in-text">
            Acessar
          </p>
        </a>
      </div>
      <div className={`navbar space-between items-center flex ${isShrunk ? 'shrink' : ''} lg:hidden`}>
        <a className='lg:hidden ml-2' href="/">
          <PFileFetcher fileName={`performance-brand-minimized`} alt="Logo da Performance" />
        </a>

        <div onClick={toggleMobileNav} className='mr-2 navbar-toggler'>
          <svg className="w-12 h-12" aria-hidden="true" fill="#ffffff" viewBox="0 0 24 24">
            <rect x="3" y="6" width="18" height="2"></rect>
            <rect x="3" y="11" width="18" height="2"></rect>
            <rect x="3" y="16" width="18" height="2"></rect>
          </svg>
        </div>
      </div>
      <MobileSidebar isOpen={isMobileNavOpen} toggleNavbar={toggleMobileNav} />
    </>
  );
};

export default NavBar;

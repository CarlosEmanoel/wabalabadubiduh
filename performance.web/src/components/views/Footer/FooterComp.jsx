import { Link, useLocation } from "react-router-dom";
import { PFileFetcher } from "../..";
import "./Footer.css";
import util from "../../../services/util";

const Footer = () => {
  const location = useLocation();

  const year = util.getCurrentYear()

  return (
    <footer className="bg-primary_blue select-none rounded-t-lg shadow mt-4 bottom-0">
      <div className="w-full p-4 md:py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse flex-col w-1/3">
            <Link to="#">
              <PFileFetcher className={'w-16 pb-4'} fileName={`performance-brand-minimized`} alt="Logo da Performance" />
            </Link>
            <Link className="text-white rounded-lg text-center hidden sm:flex" target="_blank" href="https://www.google.com/maps/dir//Performance,+Torre+01+-+Avenida+Olinda,+n%C2%B0+960,+Quadra+H4,+Lote+01%2F03+-+Edif%C3%ADcio+Lozandes+Corporate+Design,+Sala+608B+-+Park+Lozandes,+Goi%C3%A2nia+-+GO,+74884-120/@-16.6981092,-49.226399,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x935ef1b62f8100d3:0x4769baf8de8a6d19!2m2!1d-49.2238241!2d-16.6981144!3e0?entry=ttu">
              Avenida Olinda, n° 960, Park Lozandes
              Edifício Lozandes, Torre 01, Sala 608 B
              Goiânia/GO - Cep: 74884-120
            </Link>
          </div>
          <ul className="flex w-1/4 md:2/3 flex-col md:flex-row flex-wrap justify-center items-center mb-6 text-sm font-medium sm:mb-0 text-white hover:text-white_hover">
            <li>
              <a href={location.pathname === '/' ? '#' : '/'} className="hover:underline me-4 md:me-6">Início</a>
            </li>
            <li>
              <a href={location.pathname === '/cursos' ? '#' : '/cursos'} className="hover:underline me-4 md:me-6">Cursos</a>
            </li>
            <li>
              <a href={location.pathname === '/contato' ? '#' : '/contato'} className="hover:underline me-4 md:me-6">Contato</a>
            </li>
            <li>
              <a href={location.pathname === '/acesso' ? '#' : '/acesso'} className="hover:underline me-4 md:me-6">Acessar</a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="flex items-center justify-between flex-col">
          <span className="text-sm text-white text-center py-4">© {year}, <Link to="https://performance.goiania.br/" className="hover:underline">Performance Goiânia™</Link>.<br />Todos os Direitos Reservados.</span>
          <div className="flex justify-center space-x-3">
            <Link 
              href="https://www.facebook.com/performancegoiania"
              target="_blank"
              type="button"
              className="rounded-full hover:bg-[#3b5998] bg-[#3b5998aa] p-3 uppercase leading-normal text-white shadow-dark-3 shadow-black/30 transition duration-150 ease-in-out hover:shadow-dark-1 focus:shadow-dark-1 focus:outline-none focus:ring-0 active:shadow-1 dark:text-white"
              data-twe-ripple-init
              data-twe-ripple-color="light">
              <span className="[&>svg]:h-5 [&>svg]:w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 320 512">
                  <path
                    d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                </svg>
              </span>
            </Link>

            <Link 
              href="https://www.instagram.com/performancegoiania"
              target="_blank"
              type="button"
              className="rounded-full hover:bg-[#ac2bac] bg-[#ac2bacaa] p-3 uppercase leading-normal text-white shadow-dark-3 shadow-black/30 transition duration-150 ease-in-out hover:shadow-dark-1 focus:shadow-dark-1 focus:outline-none focus:ring-0 active:shadow-1 dark:text-white"
              data-twe-ripple-init
              data-twe-ripple-color="light">
              <span className="mx-auto [&>svg]:h-5 [&>svg]:w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 448 512">
                  <path
                    d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
              </span>
            </Link>

            <Link 
              href="https://api.whatsapp.com/send/?phone=5562999428364&text&type=phone_number&app_absent=0"
              target="_blank"
              type="button"
              className="rounded-full hover:bg-[#25D366] bg-[#25D366aa] p-3 uppercase leading-normal text-white shadow-dark-3 shadow-black/30 transition duration-150 ease-in-out hover:shadow-dark-1 focus:shadow-dark-1 focus:outline-none focus:ring-0 active:shadow-1 dark:text-white"
              data-twe-ripple-init
              data-twe-ripple-color="light">
              <span className="mx-auto [&>svg]:h-5 [&>svg]:w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 0C114.6 0 0 114.6 0 256c0 56.5 17.6 108.8 47.6 152.1L32 512l108.1-15.6C147.2 494.4 200.6 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0zm139.6 376.1l-19.8 19.5c-1.2 1.1-2.4 2.2-3.6 3.2-15.7 14.3-35.7 24.6-58.7 30.7-19.4 5.1-47.6 7.7-79.5-8.4-29.7-14.7-58.9-38.2-84.4-62.5-25.3-24.3-48.5-53.6-63.2-83.4-16-31.8-13.6-60.1-8.4-79.5 6.1-23.1 16.4-43.1 30.7-58.7 1-1.2 2.1-2.4 3.2-3.6l19.5-19.8c4.5-4.4 11.1-6.4 17.4-5.4l66.6 10c6.5 1 11.9 5.5 14.3 11.6l27.8 66.7c2.4 5.8 1.2 12.6-3.2 17.2l-31.6 32c14.7 19.7 34.8 39.8 54.5 54.5l32-31.6c4.5-4.4 11.3-5.6 17.2-3.2l66.7 27.8c6.2 2.4 10.6 7.8 11.6 14.3l10 66.6c1.2 6.3-.9 12.9-5.4 17.4z" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
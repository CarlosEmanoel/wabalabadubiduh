import { useLocation } from "react-router-dom";
import { PFileFetcher } from "../..";
import "./Footer.css";
import util from "../../../services/util";

const Footer = () => {
  const location = useLocation();

  const year = util.getCurrentYear()

  return (
    <footer className="bg-primary_blue rounded-lg shadow m-4">
      <div className="w-full p-4 md:py-8">
        <div className="flex items-center justify-between">
          <a className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse flex-col w-1/3">
            <a href="#">
              <PFileFetcher className={'w-16 pb-4'} fileName={`performance-brand-minimized`} alt="Logo da Performance" />
            </a>
            <a className="text-white rounded-lg text-center hidden sm:flex" target="_blank" href="https://www.google.com/maps/dir//Performance,+Torre+01+-+Avenida+Olinda,+n%C2%B0+960,+Quadra+H4,+Lote+01%2F03+-+Edif%C3%ADcio+Lozandes+Corporate+Design,+Sala+608B+-+Park+Lozandes,+Goi%C3%A2nia+-+GO,+74884-120/@-16.6981092,-49.226399,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x935ef1b62f8100d3:0x4769baf8de8a6d19!2m2!1d-49.2238241!2d-16.6981144!3e0?entry=ttu">
              Avenida Olinda, n° 960, Park Lozandes
              Edifício Lozandes, Torre 01, Sala 608 B
              Goiânia/GO - Cep: 74884-120
            </a>
          </a>
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
          <span className="text-sm text-white text-center py-4">© {year}, <a href="https://performance.goiania.br/" className="hover:underline">Performance Goiânia™</a>.<br />Todos os Direitos Reservados.</span>
          <div className="flex justify-center space-x-3">
            <a
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
            </a>

            <a
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
            </a>

            <a
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
                  viewBox="0 0 512 512">
                  <path
                    d="M256 0C114.6 0 0 114.6 0 256c0 56.5 17.6 108.8 47.6 152.1L32 512l108.1-15.6C147.2 494.4 200.6 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0zm139.6 376.1l-19.8 19.5c-1.2 1.1-2.4 2.2-3.6 3.2-15.7 14.3-35.7 24.6-58.7 30.7-19.4 5.1-47.6 7.7-79.5-8.4-29.7-14.7-58.9-38.2-84.4-62.5-25.3-24.3-48.5-53.6-63.2-83.4-16-31.8-13.6-60.1-8.4-79.5 6.1-23.1 16.4-43.1 30.7-58.7 1-1.2 2.1-2.4 3.2-3.6l19.5-19.8c4.5-4.4 11.1-6.4 17.4-5.4l66.6 10c6.5 1 11.9 5.5 14.3 11.6l27.8 66.7c2.4 5.8 1.2 12.6-3.2 17.2l-31.6 32c14.7 19.7 34.8 39.8 54.5 54.5l32-31.6c4.5-4.4 11.3-5.6 17.2-3.2l66.7 27.8c6.2 2.4 10.6 7.8 11.6 14.3l10 66.6c1.2 6.3-.9 12.9-5.4 17.4z" />
                </svg>
              </span>
            </a>

            {/* <a
              href="#!"
              type="button"
              className="rounded-full bg-[#0082ca] p-3 uppercase leading-normal text-white shadow-dark-3 shadow-black/30 transition duration-150 ease-in-out hover:shadow-dark-1 focus:shadow-dark-1 focus:outline-none focus:ring-0 active:shadow-1 dark:text-white"
              data-twe-ripple-init
              data-twe-ripple-color="light">
              <span className="mx-auto [&>svg]:h-5 [&>svg]:w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 448 512">
                  <path
                    d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                </svg>
              </span>
            </a> */}

            {/*  <a
              href="#!"
              type="button"
              className="rounded-full bg-[#55acee] p-3 uppercase leading-normal text-white shadow-dark-3 shadow-black/30 transition duration-150 ease-in-out hover:shadow-dark-1 focus:shadow-dark-1 focus:outline-none focus:ring-0 active:shadow-1 dark:text-white"
              data-twe-ripple-init
              data-twe-ripple-color="light">
              <span className="mx-auto [&>svg]:h-5 [&>svg]:w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 512 512">
                  <path
                    d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                </svg>
              </span>
            </a> */}

            {/* <a
              href="#!"
              type="button"
              className="rounded-full bg-[#dd4b39] p-3 uppercase leading-normal text-white shadow-dark-3 shadow-black/30 transition duration-150 ease-in-out hover:shadow-dark-1 focus:shadow-dark-1 focus:outline-none focus:ring-0 active:shadow-1 dark:text-white"
              data-twe-ripple-init
              data-twe-ripple-color="light">
              <span className="mx-auto [&>svg]:h-5 [&>svg]:w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 488 512">
                  <path
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                </svg>
              </span>
            </a> */}

            {/* <a
              href="#!"
              type="button"
              className="rounded-full bg-[#333333] p-3 uppercase leading-normal text-white shadow-dark-3 shadow-black/30 transition duration-150 ease-in-out hover:shadow-dark-1 focus:shadow-dark-1 focus:outline-none focus:ring-0 active:shadow-1 dark:text-white"
              data-twe-ripple-init
              data-twe-ripple-color="light">
              <span className="mx-auto [&>svg]:h-5 [&>svg]:w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 496 512">
                  <path
                    d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                </svg>
              </span>
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
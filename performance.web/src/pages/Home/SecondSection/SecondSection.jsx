import {
  PDefaultButton,
  PFileFetcher,
  PSectionContainer,
} from "../../../components";

export default function SecondSection() {
  return (
    <PSectionContainer
      className={
        "bg-primary_blue xl:bg-gradient-to-r xl:from-transparent xl:from-50% xl:via-primary_blue_hover xl:via-30% xl:to-primary_blue xl:to-80% xl:bg-transparent"
      }
    >
      <div className="relative px-4 xl:text-primary_blue text-white">
        <div className="flex xl:flex-row items-center justify-center py-16 lg:flex-col-reverse">
          <div className="relative text-center lg:text-left">
            <p className="flex text-2xl font-normal justify-center lg:justify-start">
              SEJA VOCÊ
            </p>
            <h2 className="mb-6 max-w-xl text-5xl font-light leading-snug tracking-tight sm:text-7xl sm:leading-snug">
              A peça que faltava para a sua
              <span className="my-1 inline-block border-b-8 border-secondary_blue text-secondary_blue px-4 font-bold">
                equipe
              </span>
            </h2>

            <p className="text-base text-white xl:text-primary_blue">
              Desenvolva suas habilidades com nosso time de ensino totalmente
              preparado
            </p>
            <p className="text-base text-white xl:text-primary_blue">
              para guiar seu caminho na área previdenciária e administrativa.
            </p>
            <div className="mt-10 flex flex-col items-center md:flex-row gap-2">
              <PDefaultButton
                children="Aprenda Conosco"
                bg="secondary"
                href="/cursos"
              />
            </div>
          </div>

          <div className="shadow-lg relative xl:w-1/2 mt-10 lg:mt-0 hidden lg:mb-8 lg:rounded-none lg:w-1/2 lg:block rounded-[6rem] rounded-br-none rounded-tl-none">
            <div className="mx-auto shadow-md shadow-black_transparent w-fit overflow-hidden rounded-[6rem] lg:rounded-xl rounded-br-none rounded-tl-none self-center">
              <PFileFetcher fileName="stock_people_and_blue_puzzle" />
            </div>
          </div>
        </div>
      </div>
    </PSectionContainer>
  );
}

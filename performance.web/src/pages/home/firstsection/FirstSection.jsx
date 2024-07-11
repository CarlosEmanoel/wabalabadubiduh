import {
  PCarousel,
  PIconCard,
  PSectionContainer,
  PSubmitButton,
} from "../../../components";
import { useResponsive } from "../../../hooks";
import "./FirstSection.css";

const FirstSection = () => {
  const slides = [
    "stock_male_executive_speaking",
    "stock_people_applauding",
    "stock_business_presentation_event",
  ];

  const cardsData = [
    {
      image: "ic_object_books_outlined",
      title: "Cursos Preparatórios",
      subtitle: "",
      description:
        "Disponibilizamos recursos educacionais de alta qualidade sobre legislação, gestão financeira e benefícios no âmbito dos RPPS",
      link: "/cursos",
      buttonTitle: "Ver Cursos",
    },
    {
      image: "ic_file_newspaper_filled",
      title: "Simulados",
      subtitle: "",
      description:
        "Cada curso inclui simulados e exercícios de fixação, que são ferramentas valiosas para consolidar o conhecimento adquirido.",
      link: "/cadastro",
      buttonTitle: "Cadastre-se",
    },
    {
      image: "ic_object_blackboard_outlined",
      title: "Aulas online",
      subtitle: "",
      description:
        "A nossa abordagem flexível permite que você estude através da modalidade online para lhe proporcinar a melhor formação possível.",
      link: "/acesso",
      buttonTitle: "Acessar Plataforma",
    },
  ];
  return (
    <>
      <div className="header-first-section items-center justify-start flex bg-cover bg-primary_blue text-white w-full">
        <div className="xl:w-2/3 2xl:w-2/4 text-left px-16 mb-6">
          <p className="text-xl lg:text-3xl font-bold pb-4">
            Bem-vindo à Performance
          </p>
          <p className="text-md lg:text-lg pb-4 sm:text-justify">
            Na Performance, transformamos desafios em oportunidades. Somos
            especialistas em oferecer soluções personalizadas que impulsionam o
            crescimento e a eficiência do seu Regime Próprio de Previdência e
            Administração Pública. Com uma equipe altamente qualificada e anos
            de experiência no mercado, estamos prontos para ajudar sua gestão a
            alcançar novos patamares de sucesso.
          </p>
          {/* <PSubmitButton buttonTitle="Saiba Mais" width="sm:w-32" /> */}
        </div>
      </div>
      <div className="bg-primary_blue">
        <PCarousel
          className={"-top-32"}
          images={slides}
          autoPlay
          autoPlayInterval={6000}
        />
        <div className="relative -top-20 text-white">
          <h1 className="text-4xl font-bold pb-4 text-center">
            Aprenda com Especialistas de Renome
          </h1>
          <p className="text-lg text-center mx-1.5">
            Explore cursos abrangentes e atualizados sobre Regimes Próprios de
            Previdência Social e áreas afins da Administração Pública.
          </p>
        </div>
      </div>
      <div className="p-2">
        <PSectionContainer
          title="Nossos Métodos de Ensino"
          subtitle="Venha conosco e se destaque!"
        >
          <PIconCard cards={cardsData} />
        </PSectionContainer>
      </div>
    </>
  );
};

export default FirstSection;

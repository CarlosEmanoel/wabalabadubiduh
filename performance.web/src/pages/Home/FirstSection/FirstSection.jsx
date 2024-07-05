import {
  PCarousel,
  PIconCard,
  PSectionContainer,
  PSubmitButton,
} from "../../../components";
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
			description: "Cada curso inclui simulados e exercícios de fixação, que são ferramentas valiosas para consolidar o conhecimento adquirido.",
			link: '/cadastro',
			buttonTitle: "Cadastre-se"
		},
		{
			image: "ic_object_blackboard_outlined",
			title: "Aulas online",
			subtitle: "",
			description: "A nossa abordagem flexível permite que você estude através da modalidade online para lhe proporcinar a melhor formação possível.",
			link: '/acesso',
			buttonTitle: "Acessar Plataforma"
		},
	];

	return (
		<>
			<div className="header-first-section items-center justify-center flex bg-cover bg-primary_blue text-white">
				<div className="w-full 2xl:px-48 xl:px-48 md:px-48 px-16 mx-auto">
					<p className="text-xl lg:text-3xl font-bold pb-4">Aprimore sua gestão previdenciária!!</p>
					<p className="text-md lg:text-lg pb-4">Especialize-se em gestão previdenciária com nossos cursos presenciais e online!</p>
					<PSubmitButton
						buttonTitle="Saiba Mais"
						width="sm:w-32"
					/>
				</div>
			</div>
			<div className='bg-primary_blue'>
				<PCarousel
					className={'-top-32'}
					images={slides}
					autoPlay
					autoPlayInterval={6000}
				/>
				<div className='relative -top-20 text-white'>
					<h1 className="text-4xl font-bold pb-4 text-center">Aprenda com Especialistas de Renome!</h1>
					<p className="text-lg text-center mx-1.5">Explore cursos abrangentes e sempre atualizados sobre Regimes Próprios de Previdência Social.</p>
				</div>
			</div>
			<div className='p-2'>
				<PSectionContainer
					title="Nossos Métodos de Ensino"
					subtitle="Venha conosco e se destaque!!"
				>
					<PIconCard cards={cardsData} />
				</PSectionContainer>
			</div>
		</>
	)
}

export default FirstSection;

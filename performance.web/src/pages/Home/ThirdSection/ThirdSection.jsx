import { PSectionContainer, PTestimonialCard } from "../../../components";

const testimonials = [
  {
    id: 1,
    name: 'SIMONE MARTINS RODRIGUES COSTA',
    role: "Conselho Deliberativo - ISSA",
    text: 'Eu sou professora e faço parte como conselheira e sempre me senti leiga, para análises elaboradas e documentos de difícil elucidação! Com o curso da Performace, em curto prazo me senti mais confiante e apta a fazer a prova. E a certificação me proporcionou uma melhora em relação a função desempenhada!.',
    image: 'test-2'
  },
  {
    id: 2,
    name: 'NILSON DA SILVA GONÇALVES',
    role: "Diretor do Instituto Municipal de Previdência de Serra Ramalho/BA",
    text: 'Graças à Deus e também ao excelente trabalho prestado pela empresa Performarce, em nos preparar para conseguirmos nossos tão sonhadas certificações proficionais... Hoje toda nossa equipe encontra-se certificada para atender a exigência do ministério da Previdência e também melhor cuidar do RPPS de nossa cidade.',
    image: 'test-1'
  },
  /* {
    id: 3,
    name: 'Sam Wilson',
    text: 'Absolutely fantastic! Exceeded my expectations.',
    image: 'https://via.placeholder.com/150'
  }, */
];


export default function ThirdSection() {
  return (
    <div className="flex-col">
      <PSectionContainer
        full
        title="O que nossos clientes pensam?"
        subtitle="Veja os depoimentos:"
      >
        <PTestimonialCard testimonials={testimonials} />
      </PSectionContainer>
    </div>
  );
}
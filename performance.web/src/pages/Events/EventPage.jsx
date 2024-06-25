import { PCard, PDefaultContainer, PSectionContainer } from "../../components";

export default function EventPage() {
    const social = [
        {
            image: "background-1",
            subtitle: "October 29, 2021",
            title: "Cities are crowded",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam modi, expedita quos doloremque autem ipsum itaque incidunt ipsam reprehenderit fuga! Dolores quisquam eius cum accusamus?",
        },
        {
            image: "background-2",
            subtitle: "October 29, 2021",
            title: "Mountains are alone",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam modi, expedita quos doloremque autem ipsum itaque incidunt ipsam reprehenderit fuga! Dolores quisquam eius cum accusamus?",
            link: "#",
            views: "1.2K",
            comments: "6"
        },
        {
            image: "background-3",
            subtitle: "October 29, 2021",
            title: "Lakes are silent",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam modi, expedita quos doloremque autem ipsum itaque incidunt ipsam reprehenderit fuga! Dolores quisquam eius cum accusamus?",
            link: "#",
            views: "1.2K",
            comments: "6"
        }
    ];

    const events = [
        {
            image: "background-1",
            title: "WORKSHOP COMPREV",
            subtitle: "Treinamento Realizado no COMPREV",
            description: "",
            link: '/galeria'
        },
        {
            image: "background-2",
            title: "WORKSHOP GESTÃO PREVIDENCIÁRIA",
            subtitle: "Treinamento de Gestão Previdenciária",
            description: "Participação social e atualizações sobre aposentadoria especial e pensão por morte",
            link: '/galeria'
        },
        {
            image: "background-3",
            title: "CURSO GOIASPREV",
            subtitle: "October 29, 2021",
            description: "Curso preparatório para certificação profissional RPPS",
            link: '/galeria'
        },
        {
            image: "background-1",
            title: "CURSO EM GOIÂNIA-GO",
            subtitle: "Treinamento Realizado no COMPREV",
            description: "Curso preparatório para certificação profissional RPPS",
            link: '/galeria2'
        },
        {
            image: "background-2",
            title: "CURSO EM VALPARAÍSO DE GOIÁS-GO",
            subtitle: "Treinamento de Gestão Previdenciária",
            description: "Curso preparatório para certificação profissional RPPS",
            link: '/galeria2'
        },
        {
            image: "background-3",
            title: "CURSO EM ANÁPOLIS-GO",
            subtitle: "",
            description: "Curso preparatório para certificação profissional RPPS",
            link: '/galeria2'
        }
    ];
    return (
        <PDefaultContainer>
            <PSectionContainer
                title="Fique de olho nas novidades"
                subtitle="Acesse nossas redes Sociais!!"
            >
                <PCard cards={social} cursor="pointer" />
            </PSectionContainer>
            <PSectionContainer
                title="Eventos em Destaque"
                subtitle="Fique por dentro das novidades!!"
            >
                <PCard cards={events} cursor="pointer" />
            </PSectionContainer>
        </PDefaultContainer>
    )
}
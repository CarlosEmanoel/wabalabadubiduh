import React from 'react'

const FirstGalery = () => {
    return (
        <div className="max-w-[1240px] mx-auto py-16 px-4 text-center">
            <h2 className="text-sky-500 font-bold">NOSSA GALERIA DE EVENTOS</h2>
            <h4 className="mt-16 text-zinc-600">WORKSHOP COMPREV - Emissão de Certidão de tempo de contribuição e atualizações do COMPREV</h4>
                <div className="grid grid-cols-3 py-4 gap-4 md:gap-4">
                    <img className="w-full h-full object-cover col-span-2" src="/performance/comprev_curso/foto1.jpg" alt="" />
                    <img className="w-full h-full object-cover" src="/performance/comprev_curso/foto2.jpeg" alt="" />
                    <img className="w-full h-full object-cover" src="/performance/comprev_curso/foto3.jpeg" alt="" />
                    <img className="w-full h-full object-cover " src="/performance/comprev_curso/foto4.jpeg" alt="" />
                    <img className="w-full h-full object-cover" src="/performance/comprev_curso/foto5.jpeg" alt="" />
                </div>

            <div className="mt-16">
                <h4 className="mt-16 text-zinc-600">WORKSHOP GESTÃO PREVIDENCIÁRIA</h4>
                <p className="text-2xl text-zinc-600"> Participação social e atualizações sobre aposentadoria especial e pensão por morte</p>
                    <a className="grid grid-cols-3 py-4 gap-4 md:gap-4">
                        <img className="w-full h-full object-cover col-span-2 " src="/performance/gesprev/foto5.jpeg" alt="" />
                        <img className="w-full h-full object-cover" src="/performance/gesprev/foto2.jpeg" alt="" />
                        <img className="w-full h-full object-cover" src="/performance/gesprev/foto3.jpeg" alt="" />
                        <img className="w-full h-full object-cover" src="/performance/gesprev/foto4.jpeg" alt="" />
                        <img className="w-full h-full object-cover" src="/performance/gesprev/foto1.jpeg" alt="" />
                    </a>
            </div>

            <div className="mt-16">
                <h4 className="text-zinc-600">CURSO GOIASPREV - Aula inaugural do curso preparatório para Certificação Profissional RPPS</h4>
                    <div className="grid grid-cols-4 py-4 gap-4 md:gap-4">
                        <img className="object-cover col-span-2 " src="/performance/goiasprev/foto1.jpeg" alt="" />
                        <img className="object-cover col-span-2" src="/performance/goiasprev/foto2.jpeg" alt="" />
                        <img className="w-full h-full object-cover col-span-2" src="/performance/goiasprev/foto3.jpeg" alt="" />
                        <img className="w-full h-full object-cover col-span-2" src="/performance/goiasprev/foto4.jpeg" alt="" /> 
                    </div>
            </div>

        </div>
    )
}

export default FirstGalery
import React from 'react'

const SecondGalery = () => {
    return (
        <div className="max-w-[1240px] mx-auto py-16 px-4 text-center">
            <h2 className="text-sky-500 font-bold">NOSSA GALERIA DE EVENTOS</h2>
            <h4 className="mt-16 text-zinc-600">CURSO GOIÂNIA/GO - Aula do curso preparatório para Certificação Profissional RPPS</h4>
                <div className="grid grid-cols-4 py-4 gap-4 md:gap-4">
                    <img className=" object-cover col-span-2" src="/performance/rppsgyn/foto1.jpeg" alt="" />
                    <img className="w-full h-full object-cover col-span-2" src="/performance/rppsgyn/foto2.jpeg" alt="" />
                    <img className="w-full h-full object-cover" src="/performance/rppsgyn/foto3.jpeg" alt="" />
                    <img className="w-full h-full object-cover " src="/performance/rppsgyn/foto4.jpeg" alt="" />
                    <img className="w-full h-full object-cover" src="/performance/rppsgyn/foto5.jpeg" alt="" />
                    <img className="w-full h-full object-cover" src="/performance/rppsgyn/foto6.jpeg" alt="" />
                </div>

            <div className="mt-16">
                <h4 className="mt-16 text-zinc-600">CURSO VALPARAISO DE GOIÁS/GO - Aula do curso preparatório para Certificação Profissional RPPS</h4>
                
                    <div className="grid grid-cols-3 py-4 gap-4 md:gap-4">
                        <img className="w-full h-full object-cover col-span-2 " src="/performance/valparaiso/foto1.jpeg" alt="" />
                        <img className="h-full object-cover " src="/performance/valparaiso/foto2.jpeg" alt="" />
                        <img className="h-full object-cover " src="/performance/valparaiso/foto3.jpeg" alt="" />
                        <img className="w-full h-full object-cover col-span-2" src="/performance/valparaiso/foto5.jpeg" alt="" />
                        <img className="h-full object-cover " src="/performance/valparaiso/foto4.jpeg" alt="" />
                        <img className="w-full h-full object-cover col-span-2" src="/performance/valparaiso/foto6.jpeg" alt="" />
                    </div>
            </div>

            <div className="mt-16">
                <h4 className="text-zinc-600">CURSO ANÁPOLIS/GO - Aula do curso preparatório para Certificação Profissional RPPS</h4>
                    <div className="grid grid-cols-3 py-4 gap-4 md:gap-4">
                        <img className="object-cover" src="/performance/anapolis/foto1.jpeg" alt="" />
                        <img className="object-cover col-span-2" src="/performance/anapolis/foto2.jpeg" alt="" />
                        <img className="w-full h-full object-cover" src="/performance/anapolis/foto3.jpeg" alt="" />
                        <img className="w-full h-full object-cover" src="/performance/anapolis/foto4.jpeg" alt="" /> 
                        <img className="w-full h-full object-cover" src="/performance/anapolis/foto5.jpeg" alt="" />
                        <img className="w-full h-full object-cover" src="/performance/anapolis/foto6.jpeg" alt="" /> 
                    </div>
            </div>

        </div>
    )
}

export default SecondGalery
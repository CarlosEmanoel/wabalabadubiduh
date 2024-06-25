import React from 'react';
import { PFileFetcher } from '../../../components';

export default function FirstSection() {

    return (
        <section className="min-h-[70vh] flex items-center bg-primary_blue justify-between text-white">
            <div className="container mx-auto flex flex-col items-center md:space-x-10 p-5 lg:flex-row">
                <div className='w-1/4'>
                    <PFileFetcher
                        fileName={'stock_seminar_speaking_girl'}
                        alt={`Slide ${'stock_seminar_speaking_girl'}`}
                        className="lg:max-w-md md:max-w-md transition-all duration-300 rounded-lg cursor-pointer filter grayscale"
                    />
                </div>
                <div className="xl:w-1/2 lg:w-2/5 transform md:translate-x-10 mt-10 md:mt-0 sm:text-justify">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 md:text-center">CONHEÇA NOSSOS CURSOS!!</h2>
                    <p className="text-gray-400 mb-4">Uma ampla gama de ensinamentos voltados à área previdenciária.</p>
                    <p className="mb-6">
                        A Performance é uma empresa dedicada à formação e capacitação de gestores e conselheiros no âmbito dos regimes próprios de previdência social. Com uma abordagem inovadora e focada na excelência, a Performance oferece uma ampla gama de cursos previdenciários, cuidadosamente elaborados para atender às necessidades específicas desses profissionais.
                    </p>
                    <p>Performance Goiânia<br />Transformando a sua previdência!<br />{/* {responsive} */}</p>
                </div>
            </div>
        </section>
    );
}
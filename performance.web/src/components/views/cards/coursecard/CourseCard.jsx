import { useState } from "react";
import { PAccordion, PDropdown, PFileFetcher, PPriceBadge, PTabBarComp } from "../../..";

export default function CourseCard({ data = {}, buttonTitle = "", onClick = () => { } }) {
    const [dropdownValue, setDropdownValue] = useState(0);
    const [activeNivel, setActiveNivel] = useState(data.courseLevels[0]?.id || "");
    const [activeProfessor, setActiveProfessor] = useState(data.courseTeachers[0]?.id || "");

    const dropdownClick = (value) => {
        setDropdownValue(value);
    };

    const handleNivelTabClick = (tab) => {
        setActiveNivel(tab.id);
    };

    const handleProfessorTabClick = (tab) => {
        setActiveProfessor(tab.id);
    };

    const getNivelItems = () => {
        const nivel = data.courseLevels.find((n) => n.id === activeNivel);
        return nivel ? [
            { accordionTitle: nivel.targetAudience.accordionTitle, content: nivel.targetAudience.targetAudience },
            { accordionTitle: nivel.description.accordionTitle, content: nivel.description.description },
            { accordionTitle: nivel.content.accordionTitle, content: nivel.content.content },
        ] : [];
    };

    const getProfessorItems = () => {
        const professor = data.courseTeachers.find((p) => p.id === activeProfessor);
        return professor ? [{ accordionTitle: professor.accordionTitle, content: professor.teacherCurriculum }] : [];
    };

    const getNivelOldValue = () => {
        const nivel = data.courseLevels.find((n) => n.id === activeNivel);
        return nivel && nivel.oldValue && nivel.oldValue !== "0" ? nivel.oldValue : null;
    };

    const getNivelValue = () => {
        const nivel = data.courseLevels.find((n) => n.id === activeNivel);
        return nivel && nivel.value && nivel.value !== "0" ? nivel.value : null;
    };

    return (
        <div
            data-dropdown-value={dropdownValue}
            className="select-none relative justify-between grid w-[90vw] md:w-[80vw] lg:w-[57vw] flex-col rounded-xl bg-slate-200 bg-clip-border text-gray-700 shadow-lg group"
        >
            <div
                onClick={() => dropdownClick(0)}
                className="relative min-w-full overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40 group-data-[dropdown-value='1']:blur-sm group-data-[dropdown-value='2']:blur-sm"
            >
                <PFileFetcher fileName={`curso-${data.id}`} className="max-h-[50vh]" />
                <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60" />
            </div>
            <div className="px-6 pt-6 relative flex flex-col justify-between w-[90vw] md:w-[80vw] lg:w-[57vw]">
                <p className="block font-sans text-xl antialiased font-bold leading-snug tracking-normal text-blue-gray-900">
                    {data.courseTitle}
                </p>
                <p className="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                    {data.couseSubtitle}
                </p>
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700">
                    {data.courseDescription}
                </p>
                <p className="block font-sans text-xl antialiased font-bold leading-snug tracking-normal text-blue-gray-900 pt-2">
                    {data.courseAddress}
                </p>
                <p className="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                    {data.courseCity}/{data.courseUf}
                </p>
            </div>
            {/* NÍVEIS */}
            <div
                className={`bg-slate-300 overflow-hidden text-black px-4 pt-4 h-[50vh] w-[98%] justify-self-center rounded-t-xl max-h-[50vh] absolute bottom-20 transition-all ease-linear duration-300 ${dropdownValue === 0 ? "scale-out" : ""} ${dropdownValue === 1 ? "scale-in" : "scale-out hidden"}`}
            >
                <div className="flex items-center">
                    {data.courseLevels.length > 1 ? (
                        <PTabBarComp tabs={data.courseLevels} className="my-auto" onTabClick={handleNivelTabClick} />
                    ) : data.courseLevels.length > 0 ? (
                        <div className="my-3 ml-4 text-xs sm:text-sm lg:text-lg xl:text-xl text-primary_blue font-semibold">Curso de Nível - {data.courseLevels[0].tabTitle}</div>
                    ) : (
                        <div className="my-3 ml-4 text-xs sm:text-sm lg:text-lg xl:text-xl text-primary_blue font-semibold">Não Existem Dados do Curso</div>
                    )}
                    <button
                        className="hidden hover:scale-105 transition-all duration-300 cursor-pointer right-4 h-8 w-8 rounded-full font-bold text-primary_blue bg-white hover:bg-opacity-80 z-[1] absolute group-data-[dropdown-value='1']:sm:flex group-data-[dropdown-value='2']:sm:flex justify-center items-center"
                        onClick={() => dropdownClick(0)}
                    >
                        <svg width="15" height="15" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 10 L90 90 M90 10 L10 90" stroke="#0E2547" strokeWidth="15" fill="none" />
                        </svg>
                    </button>
                </div>
                <div className="max-h-[43vh] overflow-auto">
                    <PAccordion items={getNivelItems()} defaultOpenIndex={0} allowMultiple={false} />
                    <div className="pt-12" />
                    {getNivelValue() && (
                        <div className="p-4 bottom-0 fixed right-0">
                            <PPriceBadge oldPrice={getNivelOldValue()} price={getNivelValue()} />
                        </div>
                    )}
                </div>
            </div>
            {/* PROFESSORES */}
            <div
                className={`bg-slate-300 overflow-hidden text-black px-4 pt-4 h-[50vh] w-[98%] justify-self-center rounded-t-xl max-h-[50vh] absolute bottom-20 transition-all ease-linear duration-300 ${dropdownValue === 0 ? "scale-out" : ""} ${dropdownValue === 2 ? "scale-in" : "scale-out hidden"}`}
            >
                <div className="flex items-center">
                    {data.courseTeachers.length > 1 ? (
                        <PTabBarComp tabs={data.courseTeachers} className="my-auto" onTabClick={handleProfessorTabClick} />
                    ) : data.courseTeachers.length > 0 ? (
                        <div className="my-3 ml-4 text-xs sm:text-sm lg:text-lg xl:text-xl text-primary_blue font-semibold">Dados do Professor - {data.courseTeachers[0].tabTitle}</div>
                    ) : (
                        <div className="my-3 ml-4 text-xs sm:text-sm lg:text-lg xl:text-xl text-primary_blue font-semibold">Não Existem Professores Cadastrados</div>
                    )}
                    <button
                        className="hidden hover:scale-105 transition-all duration-300 cursor-pointer right-4 h-8 w-8 rounded-full font-bold text-primary_blue bg-white hover:bg-opacity-80 z-[1] absolute group-data-[dropdown-value='2']:sm:flex group-data-[dropdown-value='1']:sm:flex justify-center items-center"
                        onClick={() => dropdownClick(0)}
                    >
                        <svg width="15" height="15" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 10 L90 90 M90 10 L10 90" stroke="#0E2547" strokeWidth="15" fill="none" />
                        </svg>
                    </button>
                </div>
                <div className="max-h-[43vh] overflow-auto">
                    <PAccordion items={getProfessorItems()} defaultOpenIndex={0} allowMultiple={false} />
                </div>
            </div>
            <div className="p-6 flex gap-2 mt-auto">
                <PDropdown
                    className="cursor-alias block w-full select-none rounded-lg bg-gray-900 px-4 py-3.5 md:px-7 text-center align-middle font-sans text-xs md:text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    position="top"
                    items={data.dropdownMenu}
                    onClick={dropdownClick}
                />
                <button
                    className="block w-full select-none rounded-lg z-[1] bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-xs md:text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={onClick}
                >
                    {buttonTitle}
                </button>
            </div>
        </div>
    );
}

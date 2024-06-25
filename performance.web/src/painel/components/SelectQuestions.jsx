import React, { useState } from 'react';


const QuestoesComponent = ({ lista, setQuestoes }) => {
    const [selectedOption, setSelectedOption] = useState('todos');
    
    const handleOptionChange = (option) => {
        setSelectedOption(option);
        let numberOfQuestions;

        switch (option) {
            case '5':
                numberOfQuestions = 5;
                break;
            case '10':
                numberOfQuestions = 10;
                break;
            default:
                numberOfQuestions = lista.length;
                break;
        }

        const shuffledQuestions = shuffleArray(lista).slice(0, numberOfQuestions);
        setQuestoes(shuffledQuestions);
    };

    const shuffleArray = (array) => {
        const shuffled = array.slice();
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    return (
        <div className="flex justify-center gap-x-5 mb-4 font-semibold">
            <label>
                <input
                    className="mr-2"
                    type="radio"
                    value="todos"
                    checked={selectedOption === 'todos'}
                    onChange={() => handleOptionChange('todos')}
                />
                Todos
            </label>
            <label>
                <input
                    className="mr-2"
                    type="radio"
                    value="5"
                    checked={selectedOption === '5'}
                    onChange={() => handleOptionChange('5')}
                />
                5 Questões
            </label>
            <label>
                <input
                    className="mr-2"
                    type="radio"
                    value="10"
                    checked={selectedOption === '10'}
                    onChange={() => handleOptionChange('10')}
                />
                10 Questões
            </label>           
        </div>
    );
};

export default QuestoesComponent;

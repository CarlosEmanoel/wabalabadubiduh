import { useState, useEffect } from 'react';

const useScrollHook = (shrinkAt = 50) => {
    const [isShrunk, setIsShrunk] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsShrunk(window.scrollY > shrinkAt);
        };

        /* Adiciona o event listener quando o componente é montado */
        window.addEventListener('scroll', handleScroll);

        /* Remove o event listener quando o componente é desmontado */
        return () => window.removeEventListener('scroll', handleScroll);
    }, [shrinkAt]);

    
    return isShrunk;
};

export default useScrollHook;

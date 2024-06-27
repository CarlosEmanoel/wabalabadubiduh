import { NavLink } from "react-router-dom";

const MobileSidebar = ({ isOpen, toggleNavbar }) => {
    return (
        <>
            <div className={`navbar-mobile ${isOpen ? 'visible' : ''}`}>
                <div className="navbar-tab-mobile">
                    <div className='navbar-group-mobile flex justify-around'>
                        <NavLink className='navbar-navlink-mobile' exact='true' to="/" activeclassname='active'>Início</NavLink>
                        <NavLink className='navbar-navlink-mobile' to="/cursos" activeclassname='active'>Cursos</NavLink>
                        <NavLink className='navbar-navlink-mobile' to="/contato" activeclassname='active'>Contato</NavLink>
                        <NavLink className='navbar-navlink-mobile' to="/acesso" activeclassname='active'>Sistema</NavLink>
                    </div>
                </div>
            </div>
            {isOpen && <div className="navbar-mobile-frame" onClick={toggleNavbar}></div>}
        </>
    );
};

export default MobileSidebar;
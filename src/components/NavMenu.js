import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faChartSimple, faCircleInfo, faGear, faUser, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const links = [
    { id: 'inicio', icone: faHouse, texto: 'Início' },
    { id: 'proxima-secao', icone: faChartSimple, texto: 'Recursos' },
    { id: 'sobre', icone: faCircleInfo, texto: 'Sobre' },
    { id: 'configuracoes', icone: faGear, texto: 'Configurações' },
];

export default function NavMenu({ nomeUsuario }) {
    const menuNav = useRef(null);
    const [menuAberto, setMenuAberto] = useState(false);

    useGSAP(
        () => {
            const tl = gsap.timeline();

            tl.from('.logo-header', {
                delay: 1,
                opacity: 0,
                y: -80,
                duration: 1,
            }).from('nav ul li', {
                opacity: 0,
                y: -40,
                duration: 1,
                stagger: 0.2
            }).from('.container-user', {
                opacity: 0,
                x: 50,
                duration: 0.5
            })
        }
    )

    return (
        <header className="header" ref={menuNav}>
            <nav className="nav">
                <a href="#inicio" className="logo-header">
                    <img src="logo_vertical.webp" alt="Logo Projeto" title="Logo Projeto" />
                </a>

                <ul id="menu-principal" className={menuAberto ? 'nav-links nav-links--aberto' : 'nav-links'}>
                    {links.map((link) => (
                        <li key={link.id}>
                            <a href={`#${link.id}`} onClick={() => setMenuAberto(false)}>
                                <FontAwesomeIcon icon={link.icone} />
                                <span>{link.texto}</span>
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="container-user">
                    <FontAwesomeIcon icon={faUser} />
                    <span>{nomeUsuario}</span>
                </div>

                <button
                    type="button"
                    className="menu-toggle"
                    onClick={() => setMenuAberto((aberto) => !aberto)}
                    aria-expanded={menuAberto}
                    aria-controls="menu-principal"
                    aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
                >
                    <FontAwesomeIcon icon={menuAberto ? faXmark : faBars} />
                </button>
            </nav>
        </header>
    );
}

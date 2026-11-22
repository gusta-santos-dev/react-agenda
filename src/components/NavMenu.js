import React, {useRef} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHouse, faChartSimple, faCircleInfo, faGear, faUser} from '@fortawesome/free-solid-svg-icons';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function NavMenu({nomeUsuario}){
    const menuNav = useRef(null);

    useGSAP(
        () => {
            const tl = gsap.timeline();

            tl.from('.logo-header', {
                delay: 1,
                opacity: 0,
                y: -80,
                duration: 1,
            }).from('nav ul li',{
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
                <a href="#" className="logo-header">
                    <img src="logo_vertical.webp" alt="Logo Projeto" title="Logo Projeto"/>
                </a>

                <ul>
                    <li><a href="#">
                        <FontAwesomeIcon icon={faHouse}/>
                        <span>Início</span>
                    </a></li>
                    <li><a href="#">
                        <FontAwesomeIcon icon={faChartSimple}/>
                        <span>Recursos</span>
                    </a></li>
                    <li><a href="#">
                        <FontAwesomeIcon icon={faCircleInfo} />
                        <span>Sobre</span>
                    </a></li>
                    <li><a href="#">
                        <FontAwesomeIcon icon={faGear} />
                        <span>Configurações</span>
                    </a></li>
                </ul>

                <div className="container-user">
                    <FontAwesomeIcon icon={faUser} />
                    <span>{nomeUsuario}</span>
                </div>
            </nav>
        </header>
    );
}
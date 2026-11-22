import React, { useRef, useState } from "react";
import './default.css';
import './index.css';
import NavMenu from "./components/NavMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AudioComponent from "./components/AudioComponent";
import NameModal from "./components/NameModal";

gsap.registerPlugin(useGSAP);

export default function App() {
    const containerMain = useRef(null);
    const [modalAberto, setModalAberto] = useState(false);
    const [nome, setNome] = useState("");

    function abrirModal(e) {
        e.preventDefault();
        setModalAberto(true);
    }


    function spanString(texto) {
        return texto.split('').map((letra, i) => (
            <span key={i} className="letra">
                {letra === ' ' ? '\u00A0' : letra}
            </span>
        ))
    }

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from('.logo-banner', {
            delay: 4.5,
            opacity: 0,
            duration: 1,
            y: -30
        }).from('.letra', {
            opacity: 0,
            duration: 0.1,
            stagger: 0.04,
            y: -30
        }).from('.btn-cta', {
            opacity: 0,
            y: 30
        })
    })


    return (
        <main className="main">
            <video src="bg-video.mp4" muted autoPlay loop className="video-bg"></video>
            <AudioComponent />
            <NavMenu
                nomeUsuario={nome === ''? 'Usuario' : nome}
            />
            <div className="container" ref={containerMain}>
                <img src="logo_1.webp" alt="Logo" className="logo-banner" />
                <p>{spanString('Organize suas tarefas de forma simples,')}<br />{spanString('intuitiva e produtiva')}</p>
                <a href="#" className="btn-cta" onClick={abrirModal}>
                    Começar agora
                    <FontAwesomeIcon icon={faArrowRightLong} />
                </a>
                <div className="scroll-indicator">
                    <span className="scroll-line" />
                    <a href="#proxima-secao" className="scroll-pill" aria-label="Rolar para baixo">
                        <FontAwesomeIcon icon={faArrowDown} />
                    </a>
                    <NameModal
                        aberto={modalAberto}
                        onFechar={() => setModalAberto(false)}
                        onSubmit={setNome}
                    />
                    <span className="scroll-line" />
                </div>
            </div>
        </main>
    );
}
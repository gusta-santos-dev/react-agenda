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

    function abrirModal() {
        setModalAberto(true);
    }

    // Agrupa as letras por palavra: a quebra de linha acontece
    // entre palavras e não no meio delas (importante no celular).
    function spanString(texto) {
        return texto.split(' ').map((palavra, i, palavras) => (
            <React.Fragment key={i}>
                <span className="palavra">
                    {palavra.split('').map((letra, j) => (
                        <span key={j} className="letra">{letra}</span>
                    ))}
                </span>
                {i < palavras.length - 1 && ' '}
            </React.Fragment>
        ));
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
        <main className="main" id="inicio">
            <video src="bg-video.mp4" muted autoPlay loop playsInline className="video-bg"></video>
            <AudioComponent />
            <NavMenu
                nomeUsuario={nome === '' ? 'Usuario' : nome}
            />
            <div className="container" ref={containerMain}>
                <img src="logo_1.webp" alt="Logo" className="logo-banner" />
                <p>{spanString('Organize suas tarefas de forma simples,')}<br />{spanString('intuitiva e produtiva')}</p>
                <button type="button" className="btn-cta" onClick={abrirModal}>
                    Começar agora
                    <FontAwesomeIcon icon={faArrowRightLong} />
                </button>
                <div className="scroll-indicator">
                    <span className="scroll-line" />
                    <a href="#proxima-secao" className="scroll-pill" aria-label="Rolar para baixo">
                        <FontAwesomeIcon icon={faArrowDown} />
                    </a>
                    <span className="scroll-line" />
                </div>
            </div>
            <NameModal
                aberto={modalAberto}
                onFechar={() => setModalAberto(false)}
                onSubmit={setNome}
            />
        </main>
    );
}

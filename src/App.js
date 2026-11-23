import React, { useRef, useState } from "react";
import './default.css';
import './index.css';
import NavMenu from "./components/NavMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import AudioComponent from "./components/AudioComponent";
import NameModal from "./components/NameModal";
import TaskDashboard from "./components/TaskDashboard";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

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

    // Rolagem suave (ScrollSmoother). O ScrollTrigger precisa estar registrado.
    useGSAP(() => {
        const smoother = ScrollSmoother.create({
            wrapper: '#smooth-wrapper',
            content: '#smooth-content',
            smooth: 1.2,       // quanto maior, mais "macia" a rolagem (em segundos)
            effects: true,     // habilita data-speed / data-lag nos elementos
        });

        // links internos (#proxima-secao, #inicio...) rolam suavemente até o destino
        function aoClicarNoLink(e) {
            const link = e.target.closest('a[href^="#"]');
            if (!link) return;

            const href = link.getAttribute('href');
            if (href.length < 2) return;

            const destino = document.querySelector(href);
            if (!destino) return;

            e.preventDefault();
            smoother.scrollTo(destino, true, 'top top');
        }

        document.addEventListener('click', aoClicarNoLink);
        return () => document.removeEventListener('click', aoClicarNoLink);
    }, []);

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
    });

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.fromTo('.stat', {
            opacity: 0,
            duration: 1,
            y: 80,

        }, {
            opacity: 1,
            duration: 1,
            y: 0,
            stagger: 0.1
        }).from('.panel', {
            opacity: 0,
            duration: 1,
            y: 80,
        }
        ).from('.task', {
            opacity: 0,
            y: 30,
            duration: 2,
            stagger: 0.2,
        })

        ScrollTrigger.create({
            animation: tl,
            trigger: '#proxima-secao',
            start: 'top 80%',
            end: 'bottom bottom',
            scrub: 1,
            
            
            once: true,
            toggleActions: 'play none none none'
        })
    });


    return (
        <>
            {/* tudo que rola fica dentro do wrapper/content do ScrollSmoother */}
            <AudioComponent />
            <NavMenu
                            nomeUsuario={nome === '' ? 'Usuario' : nome}
                        />
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <main className="main" id="inicio">
                        <video src="bg-video.mp4" muted autoPlay loop playsInline className="video-bg"></video>
                        
                        
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
                    </main>

                    <TaskDashboard />
                </div>
            </div>

            {/* modal FORA do smooth-content: o content recebe transform e
                isso quebraria o position: fixed do modal */}
            <NameModal
                aberto={modalAberto}
                onFechar={() => setModalAberto(false)}
                onSubmit={setNome}
            />
        </>
    );
}

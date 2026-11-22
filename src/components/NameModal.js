// NameModal.jsx
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./../index.css";

export default function NameModal({ aberto, onFechar, onSubmit }) {
    const [nome, setNome] = useState("");
    const inputRef = useRef(null);

    // foco no input ao abrir + fechar com Esc + travar scroll do fundo
    useEffect(() => {
        if (!aberto) return;

        inputRef.current?.focus();
        document.body.style.overflow = "hidden";

        const aoApertarTecla = (e) => {
            if (e.key === "Escape") onFechar();
        };
        window.addEventListener("keydown", aoApertarTecla);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", aoApertarTecla);
        };
    }, [aberto, onFechar]);

    if (!aberto) return null;

    function enviar(e) {
        e.preventDefault();

        const nomeLimpo = nome.trim();
        if (!nomeLimpo) return;

        onSubmit?.(nomeLimpo);
        setNome("");
        onFechar();
    }

    return (
        <div className="modal-overlay" onClick={onFechar}>
            <div
                className="modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-titulo"
                onClick={(e) => e.stopPropagation()} // clique dentro não fecha
            >
                <button
                    type="button"
                    className="modal__close"
                    onClick={onFechar}
                    aria-label="Fechar"
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>

                <form className="modal__form" onSubmit={enviar}>
                    <h2 id="modal-titulo" className="modal__title">
                        Como podemos te chamar?
                    </h2>

                    <input
                        ref={inputRef}
                        type="text"
                        className="modal__input"
                        placeholder="Digite seu nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        autoComplete="given-name"
                        maxLength={40}
                        required
                    />

                    <button type="submit" className="modal__button">
                        Continuar
                        <FontAwesomeIcon icon={faArrowRightLong} />
                    </button>
                </form>
            </div>
        </div>
    );
}
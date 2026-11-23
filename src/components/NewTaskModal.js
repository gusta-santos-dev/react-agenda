import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./Tarefas.css";

export default function NewTaskModal({ aberto, onFechar, onSubmit }) {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [erro, setErro] = useState(false);
    const tituloRef = useRef(null);

    // foco no título ao abrir + Esc fecha + trava o scroll do fundo
    // + devolve o foco ao botão que abriu o modal
    useEffect(() => {
        if (!aberto) return;

        const anterior = document.activeElement;
        tituloRef.current?.focus();
        document.body.style.overflow = "hidden";

        const aoApertarTecla = (e) => {
            if (e.key === "Escape") onFechar();
        };
        window.addEventListener("keydown", aoApertarTecla);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", aoApertarTecla);
            anterior?.focus();
        };
    }, [aberto, onFechar]);

    if (!aberto) return null;

    function enviar(e) {
        e.preventDefault();

        const tituloLimpo = titulo.trim();
        if (!tituloLimpo) {
            setErro(true);
            tituloRef.current?.focus();
            return;
        }

        onSubmit?.({ titulo: tituloLimpo, descricao: descricao.trim() });
        setTitulo("");
        setDescricao("");
        setErro(false);
        onFechar();
    }

    // portal: renderiza direto no <body>, fora do #smooth-content do ScrollSmoother
    return createPortal(
        <div className="tarefa-modal-overlay" onClick={onFechar}>
            <div
                className="tarefa-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="tarefa-modal-titulo"
                onClick={(e) => e.stopPropagation()} // clique dentro não fecha
            >
                <button
                    type="button"
                    className="tarefa-modal__close"
                    onClick={onFechar}
                    aria-label="Fechar"
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>

                <header className="tarefa-modal__header">
                    <h2 className="tarefa-modal__title" id="tarefa-modal-titulo">Nova tarefa</h2>
                    <p className="tarefa-modal__subtitle">Preencha os campos para adicionar à sua agenda.</p>
                </header>

                <form className="form" onSubmit={enviar} noValidate>
                    <div className={erro ? "field field--erro" : "field"}>
                        <label htmlFor="tarefa-titulo">Título</label>
                        <input
                            ref={tituloRef}
                            id="tarefa-titulo"
                            type="text"
                            className="input"
                            placeholder="Ex.: Estudar React"
                            maxLength={60}
                            autoComplete="off"
                            value={titulo}
                            onChange={(e) => {
                                setTitulo(e.target.value);
                                setErro(false);
                            }}
                            required
                        />
                        <span className="field__error">Digite um título para a tarefa.</span>
                    </div>

                    <div className="field">
                        <label htmlFor="tarefa-descricao">
                            Descrição
                            <span className="field__counter">{descricao.length}/200</span>
                        </label>
                        <textarea
                            id="tarefa-descricao"
                            className="input input--area"
                            rows={3}
                            maxLength={200}
                            placeholder="Detalhes opcionais"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                    </div>

                    <div className="form__actions">
                        <button type="button" className="btn btn--ghost" onClick={onFechar}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn--primary">
                            Adicionar tarefa
                            <FontAwesomeIcon icon={faArrowRightLong} />
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
}

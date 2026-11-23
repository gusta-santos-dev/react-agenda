import React, { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck, faClock, faCircleCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import StatCard from "./StatCard";
import TaskItem from "./TaskItem";
import NewTaskModal from "./NewTaskModal";
import "./Tarefas.css";

// dados de exemplo (troque pelos dados reais quando ligar a lógica)
const tarefasExemplo = [
    { id: 1, titulo: "Estudar React", descricao: "Revisar hooks e criar o componente da lista.", concluida: false },
    { id: 2, titulo: "Enviar relatório semanal", descricao: "Fechar os números da semana e enviar para o time.", concluida: false },
    { id: 3, titulo: "Treinar guitarra", descricao: "", concluida: false },
    { id: 4, titulo: "Revisar o layout mobile", descricao: "Testar menu e modal em telas pequenas.", concluida: false },
    { id: 5, titulo: "Corrigir erro de build na Vercel", descricao: 'Trocar os links com href="#" por links válidos.', concluida: true },
    { id: 6, titulo: "Criar o formulário de tarefas", descricao: "Título e descrição com contador de caracteres.", concluida: true },
];

const filtros = [
    { id: "todas", texto: "Todas" },
    { id: "pendentes", texto: "Pendentes" },
    { id: "concluidas", texto: "Concluídas" },
];

export default function TaskDashboard() {
    const [tarefas] = useState(tarefasExemplo);
    const [filtro, setFiltro] = useState("todas");
    const [modalAberto, setModalAberto] = useState(false);

    const fecharModal = useCallback(() => setModalAberto(false), []);

    function aoAdicionar(novaTarefa) {
        // TODO: aqui entra a lógica de adicionar a tarefa na lista
        console.log("Nova tarefa:", novaTarefa);
    }

    // números calculados a partir da lista (nada fixo no layout)
    const total = tarefas.length;
    const concluidas = tarefas.filter((t) => t.concluida).length;
    const pendentes = total - concluidas;
    const progresso = total === 0 ? 0 : Math.round((concluidas / total) * 100);

    const visiveis = tarefas.filter((t) => {
        if (filtro === "pendentes") return !t.concluida;
        if (filtro === "concluidas") return t.concluida;
        return true;
    });

    return (
        <section className="dash" id="proxima-secao">
            <div className="dash__wrap">

                <header className="dash__header">
                    <div>
                        <h2 className="dash__title">Painel de tarefas</h2>
                        <p className="dash__subtitle">Acompanhe o andamento da sua rotina.</p>
                    </div>

                    <div className="dash__actions">
                        <div className="filtros" role="group" aria-label="Filtrar tarefas">
                            {filtros.map((f) => (
                                <button
                                    key={f.id}
                                    type="button"
                                    className="filtro"
                                    aria-pressed={filtro === f.id}
                                    onClick={() => setFiltro(f.id)}
                                >
                                    {f.texto}
                                </button>
                            ))}
                        </div>

                        <button
                            type="button"
                            className="btn btn--primary btn--sm btn--add"
                            aria-haspopup="dialog"
                            onClick={() => setModalAberto(true)}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            Nova tarefa
                        </button>
                    </div>
                </header>

                {/* indicadores */}
                <div className="stats">
                    <StatCard icone={faListCheck} titulo="Total" valor={total} destaque />
                    <StatCard icone={faClock} titulo="Pendentes" valor={pendentes} />
                    <StatCard icone={faCircleCheck} titulo="Concluídas" valor={concluidas} />

                    <article className="stat stat--ring">
                        <div className="ring" style={{ "--p": progresso }}>
                            <span className="ring__value">{progresso}%</span>
                        </div>
                        <div>
                            <p className="stat__label">Progresso</p>
                            <p className="stat__hint">{concluidas} de {total} tarefas</p>
                        </div>
                    </article>
                </div>

                <div className="dash__grid">
                    {/* lista */}
                    <div className="panel">
                        <header className="panel__header">
                            <h3 className="panel__title">Tarefas</h3>
                            <span className="panel__count">
                                {visiveis.length} {visiveis.length === 1 ? "item" : "itens"}
                            </span>
                        </header>

                        {visiveis.length > 0 ? (
                            <ul className="tasks">
                                {visiveis.map((tarefa) => (
                                    <TaskItem key={tarefa.id} tarefa={tarefa} />
                                ))}
                            </ul>
                        ) : (
                            <div className="empty">
                                <p className="empty__title">Nenhuma tarefa por aqui</p>
                                <p className="empty__text">Clique em "Nova tarefa" para adicionar a primeira.</p>
                            </div>
                        )}
                    </div>

                    {/* lateral */}
                    <aside className="dash__side">
                        <div className="panel">
                            <header className="panel__header">
                                <h3 className="panel__title">Progresso geral</h3>
                            </header>
                            <p className="meter__text"><strong>{progresso}%</strong> concluído</p>
                            <div
                                className="meter"
                                role="progressbar"
                                aria-valuenow={progresso}
                                aria-valuemin={0}
                                aria-valuemax={100}
                            >
                                <span className="meter__fill" style={{ width: `${progresso}%` }} />
                            </div>
                            <p className="meter__hint">
                                {pendentes === 0
                                    ? "Tudo concluído!"
                                    : `Faltam ${pendentes} ${pendentes === 1 ? "tarefa" : "tarefas"} para zerar a lista.`}
                            </p>
                        </div>
                    </aside>
                </div>
            </div>

            <NewTaskModal
                aberto={modalAberto}
                onFechar={fecharModal}
                onSubmit={aoAdicionar}
            />
        </section>
    );
}

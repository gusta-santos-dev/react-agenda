import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function TaskItem({ tarefa }) {
    return (
        <li className="task">
            <label className="task__check">
                <input type="checkbox" defaultChecked={tarefa.concluida} />
                <span className="task__box" aria-hidden="true" />
                <span className="sr-only">Marcar como concluída</span>
            </label>

            <div className="task__body">
                <h4 className="task__title">{tarefa.titulo}</h4>
                {tarefa.descricao && <p className="task__desc">{tarefa.descricao}</p>}
            </div>

            {tarefa.concluida
                ? <span className="badge badge--concluida">Concluída</span>
                : <span className="badge badge--pendente">Pendente</span>}

            <div className="task__actions">
                <button type="button" className="icon-btn" aria-label="Editar tarefa">
                    <FontAwesomeIcon icon={faPen} />
                </button>
                <button type="button" className="icon-btn icon-btn--danger" aria-label="Excluir tarefa">
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </li>
    );
}

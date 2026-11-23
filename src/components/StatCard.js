import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// destaque = true deixa o card escuro (mesmo gradiente do botão principal)
export default function StatCard({ icone, titulo, valor, destaque = false }) {
    return (
        <article className={destaque ? "stat stat--dark" : "stat"}>
            <span className="stat__icon">
                <FontAwesomeIcon icon={icone} />
            </span>
            <div>
                <p className="stat__label">{titulo}</p>
                <p className="stat__value">{valor}</p>
            </div>
        </article>
    );
}

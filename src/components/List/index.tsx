import React from "react";
import style from './List.module.scss'
import Item from "./Item";
import ITarefa from "../../types/ITarefa";

interface Props {
  tarefas: ITarefa[];
  selecionaTarefa: (tarefaSelecionada: ITarefa) => void
}

function List({tarefas, selecionaTarefa}: Props) {
    
    return(
      <div className={style.containerList}>
        <aside className={style.listaTarefas}>
            <h2>Estudos do dia</h2>
            <ul>
                {tarefas.map((item) => (
                    <Item 
                      selecionaTarefa={selecionaTarefa}
                      key={item.id}
                      {...item}
                    />
                ))}
            </ul>
        </aside>
      </div>
    )
}

export default List;
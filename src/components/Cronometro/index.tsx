import Button from "../Button";
import Relogio from "./Relogio";
import style from "./Cronometro.module.scss"
import { tempoParaSegundos } from "../../common/utils/time";
import ITarefa from "../../types/ITarefa";
import { useEffect, useRef, useState } from "react";

interface Props {
    selecionado: ITarefa | undefined
    finalizarTarefa: () => void
}

const Cronometro = ({ selecionado, finalizarTarefa }: Props) => {
    const [tempo, setTempo] = useState<number>();
    const [ativo, setAtivo] = useState(false);
    const intervaloRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (selecionado?.tempo) {
            setTempo(tempoParaSegundos(selecionado.tempo));
            setAtivo(false);
            if (intervaloRef.current) {
                clearInterval(intervaloRef.current);
                intervaloRef.current = null
            }
        }
    }, [selecionado])

    /*function regressiva(contador: number = 0) {
        setTimeout(() => {
            if(contador > 0) {
                setTempo(contador -1)
                return regressiva(contador -1)
            }
            finalizarTarefa()
        }, 1000)
    }*/

    const iniciar = () => {
        if (!intervaloRef.current && tempo && tempo > 0) {
            setAtivo(true);
            intervaloRef.current = setInterval(() => {
                setTempo((tempoAnterior) => {
                    if (tempoAnterior && tempoAnterior > 1) {
                        return tempoAnterior - 1;
                    } else {
                        clearInterval(intervaloRef.current!);
                        intervaloRef.current = null;
                        finalizarTarefa();
                        setAtivo(false);
                        return 0;
                    }
                });
            }, 1000);
        }
    };

    const pausar = () => {
        if (intervaloRef.current) {
            clearInterval(intervaloRef.current);
            intervaloRef.current = null;
            setAtivo(false);
        }
    };

    return (
        <div className={style.cronometro}>
            <p className={style.titulo}>Escolha um card e inicie o cronometro</p>
            <div className={style.relogioWrapper}>
                <Relogio tempo={tempo} />
            </div>
            {!ativo ? (
                <Button onClick={iniciar}>Começar</Button>
            ) : (
                <Button onClick={pausar}>Pausar</Button>
            )}
        </div>
    )
}

export default Cronometro;

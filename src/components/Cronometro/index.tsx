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
    const [tempoInicial, setTempoInicial] = useState<number>();
    const [ativo, setAtivo] = useState(false);
    const intervaloRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (selecionado?.tempo) {
            const segundos = tempoParaSegundos(selecionado.tempo);
            setTempo(segundos);
            setTempoInicial(segundos);
            setAtivo(false);
            if (intervaloRef.current) {
                clearInterval(intervaloRef.current);
                intervaloRef.current = null;
            }
        }
    }, [selecionado]);

    /*function regressiva(contador: number = 0) {
        setTimeout(() => {
            if(contador > 0) {
                setTempo(contador -1)
                return regressiva(contador -1)
            }
            finalizarTarefa()
        }, 1000)
    }*/

    /*const iniciar = () => {
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
    };*/

    const iniciar = () => {
        if (!tempo || intervaloRef.current) return;

        setAtivo(true);
        const tempoInicial = Date.now();
        const tempoAlvo = tempoInicial + tempo * 1000;

        intervaloRef.current = setInterval(() => {
            const agora = Date.now();
            const segundosRestantes = Math.round((tempoAlvo - agora) / 1000);

            if (segundosRestantes >= 0) {
                setTempo(segundosRestantes);
            } else {
                clearInterval(intervaloRef.current!);
                intervaloRef.current = null;
                setTempo(0);
                setAtivo(false);
                finalizarTarefa();
            }
        }, 250); // checa 4 vezes por segundo pra manter responsivo
    };

    const pausar = () => {
        if (intervaloRef.current) {
            clearInterval(intervaloRef.current);
            intervaloRef.current = null;
            setAtivo(false);
        }
    };

    const resetar = () => {
        if (tempo === 0 || !tempoInicial) return;
        if (intervaloRef.current) {
            clearInterval(intervaloRef.current);
            intervaloRef.current = null;
        }
        setTempo(tempoInicial); // volta para o tempo original
        setAtivo(false);
    };

    return (
        <div className={style.cronometro}>
            <p className={style.titulo}>Escolha um card e inicie o cronometro</p>
            <div className={style.relogioWrapper}>
                <Relogio tempo={tempo} />
            </div>
            <div className={style.botoes}>
                {!ativo ? (
                    <Button onClick={iniciar}>▶</Button>
                ) : (
                    <Button onClick={pausar}>⏸</Button>
                )}
                <Button onClick={resetar} disabled={tempo === 0}>↩</Button>
            </div>
        </div>
        
    )
}

export default Cronometro;
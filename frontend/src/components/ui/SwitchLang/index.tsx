import { Episodes } from '@/@types/series';
import styles from './styles.module.scss'
import { useEffect, useState } from 'react';

interface ChangeProps {
    handlePlay: (lang: string) => void;

}

export default function ChangeLanguage({ handlePlay }: ChangeProps) {

    const [dubbedEp, setDubbedEp] = useState<Episodes | null>()

    /*useEffect(() => {
        const episodeDubbed = getDubbedEpisode(episodeData.serieTmdbId, episodeData.seasonNumber, episodeData.data.ep, 'pt-BR')
        setDubbedEp(episodeDubbed)
    }, [])

    */


    return (
        <div className={styles.container}>
            <div className={styles.optionContainer} onClick={() => handlePlay("Dublado")}>Dublado</div>
            <div className={styles.optionContainer} onClick={() => handlePlay("original")}>Legendado</div>
        </div>
    )
}
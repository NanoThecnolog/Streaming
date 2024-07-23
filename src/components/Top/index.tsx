import { cards, CardsProps } from '@/js/cards'
import { FaCirclePlay } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import styles from './styles.module.scss'
import { useEffect, useState } from 'react';


export default function Top() {
    const [cardOn, setCardOn] = useState(0)
    const [fade, setFade] = useState('fadeIn')

    useEffect(() => {
        const interval = setInterval(() => {
            setFade('fadeOut')


            setTimeout(() => {
                setCardOn(prevCardOn => (prevCardOn + 1) % cards.length);
                setFade('fadeIn')
            }, 1800)
        }, 10000)
        return () => clearInterval(interval)
    }, [])



    function toggleWatchLater(title: string, subTitle?: string) {
        console.log(title, subTitle);
    }


    return (

        <div className={`${styles.top_container} ${styles[fade]}`} style={{ backgroundImage: `url(${cards[cardOn].background})` }}>

            <div className={styles.image_container} id="main">
                <div className={styles.left_side}>
                    <h1 id="titulo-principal">{cards[cardOn].title.toUpperCase()}</h1>
                    {cards[cardOn].subtitle && (
                        <h3 className={styles.subtitulo_principal}>{cards[cardOn].subtitle}</h3>
                    )}
                    <p id="desc-principal">{cards[cardOn].description}</p>

                    <div className={styles.button_section}>
                        <div className={styles.watch} id="btnPrinc">
                            <h3>Play</h3>
                            <FaCirclePlay size={35} color='#fff' />
                        </div>
                        <div className={styles.queue} onClick={() => toggleWatchLater(cards[cardOn].title, cards[cardOn].subtitle)}>
                            <h3>ASSISTIR MAIS TARDE</h3>
                            <IoIosAddCircleOutline size={35} />
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}
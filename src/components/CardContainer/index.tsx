import { Container } from "react-dom"
import Card from "../Card"
import styles from './styles.module.scss'

interface ContainerProps {
    section: string
    handleOpenModal: (title: string, subTitle?: string) => void;
}

export default function CardContainer({ section, handleOpenModal }: ContainerProps) {

    return (
        <div className="content-area" id={section}>
            <h2 className="content-title">{section.toUpperCase()}</h2>
            <div className="card-carousel" id={section}>
                <Card
                    modalWatchLater={handleOpenModal}
                    section={section}
                />
            </div>
        </div>

    )
}
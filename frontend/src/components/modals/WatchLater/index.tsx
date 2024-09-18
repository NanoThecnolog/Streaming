import { FaUndoAlt } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";

interface WatchLaterProps {
    visible: () => void;
    title: string | null;
    subTitle: string | null;
}

export default function WatchLater({ visible, title, subTitle }: WatchLaterProps) {
    return (
        <div className="watch-later-modal">
            <h3>Adicionado {title} {subTitle && subTitle !== "" && `- ${subTitle}`} à sua lista <a href="#" className="playlist">ASSISTIR MAIS TARDE!</a></h3>
            <div className="side-buttons">{/** */}
                <FaUndoAlt size={35} color="#fff" onClick={() => alert('Removido da sua lista de Assistir Mais Tarde.')} />
                <IoCloseCircle size={35} color="#fff" onClick={() => visible} />
            </div>
        </div>
    )
}
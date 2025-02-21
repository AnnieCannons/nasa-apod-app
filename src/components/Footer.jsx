 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default function Footer(props) {
    const { showModal, handleToggleModal, data } = props

    return (
        <footer>
            <div className="bgGradient"></div>
            <div>
                <h1>APOD PROJECT</h1>
                <h2>{data?.title}</h2>
            </div>
            <button onClick={handleToggleModal}>
            <FontAwesomeIcon icon={faArrowLeft} />
            </button>
        </footer>
    )
}
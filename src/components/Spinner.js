import { faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const tesla = (props) => {
    return <div className={`fadeIn ${props.spinning}`}>
        <FontAwesomeIcon icon={faSync} size={props.size}/>
    </div>
}
export default tesla;
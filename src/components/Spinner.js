import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

function Spinner(props){
    return(
        <div className={`fadeIn ${props.spinning}`}>
            <FontAwesomeIcon icon={faSync} size={props.size} />
        </div>
    );
}

export default Spinner;
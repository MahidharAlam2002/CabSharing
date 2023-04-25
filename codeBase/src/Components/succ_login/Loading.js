import './Loading.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
function Loading (){
    return(
        <div className="table-loading-icon">
      <FontAwesomeIcon icon={faSpinner} spin />
    </div>
    )
}
export default Loading;
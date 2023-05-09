
import helper from "../../../styles/Helper.module.scss"
import tracks from "../../../styles/Tracks.module.scss"

const TrackItemLogo = ({img, handleSelect}) => {

    return (
        <div 
            onClick={handleSelect}
            className={`${tracks.img} ${helper._ibg}`}
        >
            <img src={`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}${img}`} slt="pic"/>
        </div>
    )
}
export default TrackItemLogo;
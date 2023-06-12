import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';

import button from "../../styles/Button.module.scss";

const ShareButton = ({share, handleShare}) => {

    const shareIcon = share ? <CloseIcon
                            fontSize='large' 
                            sx={{color: "white"}}
                            /> : 
                            <ShareIcon 
                            fontSize='large' 
                            sx={{color: "white"}}
                        />

    return (
        <button 
            className={`${button.play} ${button.share__btn}`}
            onClick={handleShare}
            aria-label='share track'
        >
            {shareIcon}
        </button>
    )
}
export default ShareButton;
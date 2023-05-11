import { Box, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ButtonsController from "../Buttons/ButtonsController";
import CloseIcon from '@mui/icons-material/Close';
import { generateMusicLink } from "../../api/trackApi";
import { selectTrack, setChangePlay, setChangeSelectTrackPlay, setTrackLoaded, trackLoaded, removeSelectTrack, tracks, stopAllTrack } from '../../store/tracks';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import helper from "../../styles/Helper.module.scss";
import player from "../../styles/Player.module.scss";


const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "#7c7c7c",
  progressColor: "#F2D22B",
  cursorColor: "OrangeRed",
  barWidth: window.screen.width <= 375 ? 1 : 3,
  barRadius: 3,
  barRadius: 3,
  responsive: true,
  height: 90,
  normalize: true,
  partialRender: true,
  xhr: {
        responseType: "arraybuffer",
        mode: "no-cors",
        dest: "audio",
        redirect: "follow"
      },
  preload: true,
  hideScrollbar: true,
});

const Player = ({selectTrack, setChangePlay, setChangeSelectTrackPlay, setTrackLoaded, trackLoaded, removeSelectTrack, tracks, stopAllTrack, firstLoad, setFirstLoad}) => {
    const waveformRef = useRef(null)
    const wavesurfer = useRef(null);
    const [share, setShare] = useState(false)
    const [playerStyle, setPlayerStyle] = useState(`${player.body} ${player._active}`)   
    const router = useRouter() 
    const playRef = useRef(null)
    
    useEffect(() => {
        const create = async () => {
            const WaveSurfer = (await import("wavesurfer.js")).default;

            const options = formWaveSurferOptions(waveformRef.current);

            wavesurfer.current = WaveSurfer.create(options);
            const musicUrl = await generateMusicLink(selectTrack?.audio)
            wavesurfer.current.load(musicUrl);
            setTrackLoaded(true)

            wavesurfer.current.on("audioprocess", function () {
                const currentTime = wavesurfer.current.getCurrentTime();
            });

            wavesurfer.current.on("ready", function () {
                const duration = wavesurfer.current.getDuration();
                if(!firstLoad) {
                    playRef.current.click()
                }
                setFirstLoad()
            });

            if(waveformRef?.current?.children.length > 1) {
                const waveLength = waveformRef?.current?.children.length
                for(let i = 0; i < waveLength; i++) {
                    if(i !== waveLength - 1) {
                        waveformRef.current.children[i].style.display = "none"
                    }
                }
                // waveformRef?.current?.children[0]?.remove()
            }
        };
    
        create();
    
        return () => {
        if (wavesurfer.current) {
            console.log("destroy");
            wavesurfer.current.destroy();
        }
        };
    }, [selectTrack?.audio]);

    useEffect(() => {
        console.log("start");
        if(selectTrack?.play) {
            console.log("play");
            setTimeout(() => {
                wavesurfer?.current?.play()
            }, 1)
            
        } else {
            console.log("stop");
            setTimeout(() => {
                wavesurfer?.current?.pause()
            }, 1)
        }
    }, [selectTrack?.play]) //

    const handleShare = () => {
        setShare(prev => !prev)
    }

    const handlePlay = () => {
        setChangeSelectTrackPlay()
        const includeSelectTrackInTracks = tracks?.find(item => item.id === selectTrack.id)
        if(!!includeSelectTrackInTracks) {
            setChangePlay(selectTrack?.id)
        }
    }

    const handleClosePlayer = () => {
        const {sound, ...tailQuery} = router.query
        stopAllTrack()
        
        setTrackLoaded(false)
        removeSelectTrack()
        setTrackLoaded(true)

        router.push({
            pathname: "/",
            query: {...tailQuery}
        }, null, {scroll: false, shallow: true})
        
    }

    useEffect(() => {
        if(selectTrack) {
            setPlayerStyle(`${player.body} ${player._active}`)
        } else {
            setPlayerStyle(`${player.body}`)
        }
    }, [selectTrack])

    return (
        <Box className={playerStyle}>
            <Box className="_container">
                <Box className={player.wrapper}>
                    <div className={`${player.img} ${helper._ibg}`}>
                        <img src={`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}${selectTrack?.img}`} alt="logo"/>
                    </div>
                    <Box className={player.content}>
                        <Box className={player.header}>
                            <Typography
                                variant="h6"
                                component="h6"
                                className={player.title}
                            >
                                {selectTrack?.name}
                            </Typography>

                            <button 
                                className={player.close__player}
                                disabled={!trackLoaded}
                                onClick={handleClosePlayer}
                            >
                                <CloseIcon fontSize="large" sx={{color: "white"}}/>
                            </button>
                        </Box>

                        <ButtonsController 
                            handlePlay={handlePlay}
                            play={selectTrack?.play} 
                            handleShare={handleShare} 
                            share={share}
                            disabled={!trackLoaded}
                            track={selectTrack}
                            playRef={playRef}
                        />
                        <Box className={player.track__wrapper}>
                            <div 
                                id="waveform" 
                                ref={waveformRef} 
                                className={player.track}
                            >
                            </div> 

                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

const mapStateToProps = createStructuredSelector({
    selectTrack,
    trackLoaded,
    tracks
})

const mapDispatchToProps = dispatch => ({
    setChangePlay: bindActionCreators(setChangePlay, dispatch),
    setChangeSelectTrackPlay: bindActionCreators(setChangeSelectTrackPlay, dispatch),
    setTrackLoaded: bindActionCreators(setTrackLoaded, dispatch),
    removeSelectTrack: bindActionCreators(removeSelectTrack, dispatch),
    stopAllTrack: bindActionCreators(stopAllTrack, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Player);
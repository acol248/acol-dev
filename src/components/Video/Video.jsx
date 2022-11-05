import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

// components
import Icon from "./mediaPlayer.icons";

// helpers
import { keygen, calcSeek } from "./helpers";

// styles
import styles from "./Video.module.scss";

export default function Video({ className, title, sources, ...props }) {
  const [classlist, setClasslist] = useState('')

  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volumeHover, setVolumeHover] = useState(false);
  const [controlsActive, setControlsActive] = useState(false);
  const [overlayData, setOverlayData] = useState(null);

  const mediaPlayerRef = useRef(null);
  const videoRef = useRef(null);
  const controlsRef = useRef(null);
  const statusBarRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const infoOverlayRef = useRef(null);
  const seekRef = useRef(null);
  const seekProgressRef = useRef(null);
  const volumeRef = useRef(null);
  const volumeSliderRef = useRef(null);

  /**
   * Handles media play/pause
   */
  const handlePlayPause = useCallback(() => {
    const { current: video } = videoRef;

    setIsPlaying((playing) => !playing);
    isPlaying ? video.pause() : video.play();
  }, [isPlaying]);

  /**
   * Handles toggling player fullscreen
   */
  const handleToggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();

      setIsFullscreen(false);
    } else {
      if (mediaPlayerRef.current.webkitRequestFullscreen) {
        mediaPlayerRef.current.webkitRequestFullscreen();
      } else {
        mediaPlayerRef.current.requestFullscreen();
      }

      setIsFullscreen(true);
    }
  };

  /**
   * Handles seeking of media
   *
   * @param {object} e event object
   */
  const handleSeek = (e) => {
    const seekData = calcSeek(e, videoRef.current);

    seekProgressRef.current.style.right = `${100 - seekData.perc}%`;
    videoRef.current.currentTime = seekData.time;
  };

  /**
   * Handles volume seek
   *
   * @param {object} e event object
   */
  const handleVolumeSlider = (e) => {
    const seekData = calcSeek(e);

    volumeSliderRef.current.style.setProperty(
      "--volume-perc",
      seekData.perc + "%"
    );
    videoRef.current.volume = seekData.perc / 100;
  };

  // classlist
  useEffect(() => {
    const _classlist = [styles["video"]];

    if (className)
      for (const item of className.split(" ")) _classlist.push(item);

    setClasslist(_classlist.join(" "));
  }, [className]);

  // detect keypress events
  useEffect(() => {
    const handleKeydown = (e) => {
      const { keyCode } = e;

      const anims = infoOverlayRef.current.getAnimations();

      //console.log(keyCode);

      const handleVideoPlayPause = () => {
        setOverlayData(<Icon type={isPlaying ? "pause" : "play"} />);
        anims[0].play();

        handlePlayPause();
      };

      /**
       * Handles volume up 5%
       */
      const handleVolumeUp = () => {
        setOverlayData(<Icon type="volume-high" />);
        anims[0].play();

        if (videoRef.current.volume < 0.95)
          return (videoRef.current.volume += 0.05);

        videoRef.current.volume = 1;
      };

      /**
       * Handles volume down 5%
       */
      const handleVolumeDown = () => {
        setOverlayData(<Icon type="volume-low" />);
        anims[0].play();

        if (videoRef.current.volume > 0.05)
          return (videoRef.current.volume -= 0.05);

        videoRef.current.volume = 0;
      };

      switch (keyCode) {
        case 32:
          return handleVideoPlayPause();
        case 38:
          return handleVolumeUp();
        case 40:
          return handleVolumeDown();
        default:
          break;
      }
    };

    document && document.addEventListener("keydown", handleKeydown);

    return () => document.removeEventListener("keydown", handleKeydown);
  });

  // seek progress update
  useEffect(() => {
    const { current: video } = videoRef;
    const { current: volume } = volumeRef;

    /**
     * Timer
     *
     * @param {number} start time value
     */
    const timer = (start) => {
      const time = Date.now() - start;

      if (time > 2500) {
        cancelAnimationFrame(controlsTimeoutRef.current);
        setVolumeHover(false);
      }

      controlsTimeoutRef.current = requestAnimationFrame(() => timer(start));
    };

    /**
     * Updates video seek progress
     */
    const handleProgressUpdate = () => {
      const perc = (video.currentTime / video.duration) * 100;

      seekProgressRef.current.style.right = `${100 - perc}%`;
    };

    const handleVolumeHover = () => {
      setVolumeHover(true);
      cancelAnimationFrame(controlsTimeoutRef.current);
    };

    const handleVolumeHoverLeave = () => {
      cancelAnimationFrame(controlsTimeoutRef.current);
      requestAnimationFrame(() => timer(Date.now()));
    };

    video && video.addEventListener("timeupdate", handleProgressUpdate);
    volume && volume.addEventListener("mouseover", handleVolumeHover);
    volume && volume.addEventListener("mouseleave", handleVolumeHoverLeave);

    return () => {
      video && video.removeEventListener("timeupdate", handleProgressUpdate);
      volume && volume.removeEventListener("mouseover", handleVolumeHover);
      volume &&
        volume.removeEventListener("mouseleave", handleVolumeHoverLeave);
    };
  }, []);

  // controls overlay events
  useEffect(() => {
    const { current: video } = videoRef;
    const { current: controls } = controlsRef;

    /**
     * Timer
     *
     * @param {number} start time value
     */
    const timer = (start) => {
      const time = Date.now() - start;

      if (time > 5000) {
        cancelAnimationFrame(controlsTimeoutRef.current);
        setControlsActive(false);
      }

      controlsTimeoutRef.current = requestAnimationFrame(() => timer(start));
    };

    /**
     * Handles mouse movement in controls view
     */
    const handleMouseMove = () => {
      cancelAnimationFrame(controlsTimeoutRef.current);
      requestAnimationFrame(() => timer(Date.now()));
      if (!controlsActive) setControlsActive(true);
    };

    /**
     * Handle mouse leave controls event
     */
    const handleMouseLeave = () => {
      cancelAnimationFrame(controlsTimeoutRef.current);
      setControlsActive(false);
    };

    /**
     * Handles video click event
     *
     * Needs looking at, move event to controls somehow,
     * video click does nothing.
     */
    const handleVideoClick = () => {
      handlePlayPause();
    };

    video && video.addEventListener("mousemove", handleMouseMove);
    video && video.addEventListener("click", handleVideoClick);
    controls && controls.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      video && video.removeEventListener("mousemove", handleMouseMove);
      video && video.removeEventListener("click", handleVideoClick);
      controls && controls.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [controlsActive, handlePlayPause]);

  return (
    <div className={classlist} ref={mediaPlayerRef} {...props}>
      <div
        className={styles["video__info-overlay"]}
        ref={infoOverlayRef}
      >
        {overlayData}
      </div>

      <div
        className={`${styles["video__controls"]} ${
          controlsActive ? styles["video__controls--active"] : ""
        }`}
        ref={controlsRef}
      >
        <div className={styles["video__header"]}></div>
        <div className={styles["video__status-bar"]} ref={statusBarRef}>
          <button
            className={styles["video__play"]}
            onClick={handlePlayPause}
          >
            <Icon type={isPlaying ? "pause" : "play"} />
          </button>
          <div
            className={styles["video__seek"]}
            ref={seekRef}
            onClick={handleSeek}
          >
            <span
              className={styles["video__seek-progress"]}
              ref={seekProgressRef}
            />
          </div>
          <div
            className={`${styles["video__volume"]} ${
              volumeHover ? styles["video__volume--hover"] : ""
            }`}
            ref={volumeRef}
          >
            <button className={styles["video__volume-button"]}>
              <Icon type="volume-high" />
            </button>
            <span
              className={styles["video__volume-slider"]}
              ref={volumeSliderRef}
              onClick={handleVolumeSlider}
            />
          </div>
          <button
            className={styles["video__fullscreen"]}
            onClick={handleToggleFullscreen}
          >
            <Icon
              type={isFullscreen ? "fullscreen-exit" : "fullscreen-enter"}
            />
          </button>
        </div>
      </div>

      <video
        className={styles["video__video"]}
        {...props}
        controls={false}
        ref={videoRef}
      >
        {sources &&
          sources.map(({ src, type }) => (
            <source key={keygen(8)} src={src} type={type} />
          ))}
      </video>
    </div>
  );
}

Video.propTypes = {
  title: PropTypes.string,
  sources: PropTypes.arrayOf(PropTypes.object),
};

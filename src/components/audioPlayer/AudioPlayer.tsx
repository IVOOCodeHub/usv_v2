import play from "../../assets/playerSVG/play.svg";
import pause from "../../assets/playerSVG/pause.svg";
import skipStart from "../../assets/playerSVG/skipStart.svg";
import {
  useState,
  useRef,
  FC,
  ChangeEvent,
  MutableRefObject,
  ReactElement,
} from "react";

interface IAudioPlayerProps {
  audioSrc: string;
}

const getTrackTitle: (file: string) => string = (file: string): string => {
  const parts: string[] = file.split("/");
  const fileName: string = parts[parts.length - 1];
  return fileName.split(".")[0];
};

const formatTime: (time: number) => string = (time: number): string => {
  if (isNaN(time)) return "0:00";
  const minutes: number = Math.floor(time / 60);
  const seconds: string = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const AudioPlayer: FC<IAudioPlayerProps> = ({
  audioSrc,
}: IAudioPlayerProps): ReactElement => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);
  const [volumeClass, setVolumeClass] = useState<
    "mute" | "low" | "medium" | "high"
  >("medium");
  const [trackProgress, setTrackProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const audioRef: MutableRefObject<HTMLAudioElement | null> =
    useRef<HTMLAudioElement | null>(null);

  const trackTitle: string = getTrackTitle(audioSrc);

  const handlePlayPause: () => void = (): void => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().finally();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange: (e: ChangeEvent<HTMLInputElement>) => void = (
    e: ChangeEvent<HTMLInputElement>,
  ): void => {
    const newVolume: number = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setVolume(newVolume);
    if (newVolume === 0) {
      setVolumeClass("mute");
    } else if (newVolume > 0 && newVolume <= 0.33) {
      setVolumeClass("low");
    } else if (newVolume > 0.33 && newVolume <= 0.66) {
      setVolumeClass("medium");
    } else {
      setVolumeClass("high");
    }
  };

  const handleLoadedMetadata: () => void = (): void => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTimeUpdate: () => void = (): void => {
    if (audioRef.current) {
      setTrackProgress(audioRef.current.currentTime);
    }
  };

  const handleSeek: (e: ChangeEvent<HTMLInputElement>) => void = (
    e: ChangeEvent<HTMLInputElement>,
  ): void => {
    const newTime: number = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setTrackProgress(newTime);
  };

  const handleSkipStart: () => void = (): void => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
    setTrackProgress(0);
  };

  return (
    <div>
      <div className="AudioPlayer">
        <div className="AudioPlayer__header">
          <div className="title">
            <h1>{trackTitle}</h1>
          </div>
        </div>
        <div className="AudioPlayer__container">
          <div className="AudioPlayer__body">
            <span id="elapsed">{formatTime(trackProgress)}</span>
            <input
              type="range"
              min="0"
              max={duration}
              value={trackProgress}
              className="AudioPlayer__trackProgress"
              id="track"
              onChange={handleSeek}
              style={{ accentColor: "#36395a" }}
            />
            <span id="tracklength">{formatTime(duration)}</span>
          </div>
          <div className="AudioPlayer__title">
            <audio
              ref={audioRef}
              src={audioSrc}
              onEnded={() => setIsPlaying(false)}
              onLoadedMetadata={handleLoadedMetadata}
              onTimeUpdate={handleTimeUpdate}
            >
              {/* <source src={audioTrack} type='audio/mpeg' /> */}
              <track kind="captions" />
              Your browser does not support the audio element.
            </audio>
            <div className="AudioPlayer__controlsContainer">
              <button onClick={handleSkipStart}>
                <img src={skipStart} alt="Skip to start" />
              </button>
              <button onClick={handlePlayPause}>
                <img
                  src={isPlaying ? pause : play}
                  alt={isPlaying ? "Pause" : "Play"}
                />
              </button>
              {/* <button onClick={() => console.log('Skip to end')}>
								<img src={skipEnd} alt='Skip to end' />
							</button> */}
            </div>
            <div className="AudioPlayer__volumeContainer">
              <div className="AudioPlayer__volumeContainer">
                {/* Icône de volume variable */}
                <div className={`volume-icon-container ${volumeClass}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                    className="volume-icon"
                  >
                    {/* Haut-parleur principal */}
                    <path d="M10 24h12l14-14v44l-14-14H10z" fill="#36395a" />

                    {/* Arc de volume faible */}
                    <g className="volume-low">
                      <path
                        d="M38 38c4-4 4-8 0-12"
                        fill="none"
                        stroke="#36395a"
                        strokeWidth="4"
                      />
                    </g>

                    {/* Arc de volume moyen */}
                    <g className="volume-medium">
                      <path
                        d="M42 43c6-6 6-16 0-22"
                        fill="none"
                        stroke="#36395a"
                        strokeWidth="4"
                      />
                    </g>

                    {/* Arc de volume élevé */}
                    <g className="volume-high">
                      <path
                        d="M46 48c8-8 8-24 0-32"
                        fill="none"
                        stroke="#36395a"
                        strokeWidth="4"
                      />
                    </g>

                    {/* Cross for mute */}
                    <g className="mute-icon">
                      <line
                        x1="40"
                        y1="24"
                        x2="56"
                        y2="40"
                        stroke="#36395a"
                        strokeWidth="4"
                      />
                      <line
                        x1="40"
                        y1="40"
                        x2="56"
                        y2="24"
                        stroke="#36395a"
                        strokeWidth="4"
                      />
                    </g>
                  </svg>
                </div>

                {/* Input de volume */}
                <input
                  type="range"
                  min="0"
                  max="1"
                  value={volume}
                  step="0.01"
                  className="AudioPlayer__volumeInput"
                  id="volume"
                  onChange={handleVolumeChange}
                  style={{ accentColor: "#36395a" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;

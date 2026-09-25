import {useEffect, useRef, useState} from 'react';
import {eventCopy} from './eventCopy';
import {Designer} from './Designer';
import {asset, EventImage} from './EventImage';
import './events.css';

const photoIds = [366, 371, 372, 373, 368, 369, 376, 377];

export function EventPoster({lang}) {
  const t = eventCopy[lang];
  return <section className="event-poster shell" aria-labelledby="event-poster-title">
    <a className="event-poster-link" href="/eventi" aria-label={`${t.explore}: London Fashion Week — Proverbs of Love`}>
      <div className="event-poster-image"><EventImage id={366} alt={t.alts[366]} priority sizes="(min-width: 901px) min(100vw, calc((100svh - 74px) * 1.5)), 100vw"/></div>
      <div className="event-poster-copy"><p className="eyebrow">LONDON FASHION WEEK · SS27</p><h2 id="event-poster-title">Proverbs of Love</h2><span className="event-poster-cta">{t.explore}<span aria-hidden="true">↗</span></span></div>
    </a>
  </section>;
}

export function Events({lang}) {
  const t = eventCopy[lang];
  const [active, setActive] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const userPausedRef = useRef(false);
  const dialog = useRef(null);
  const opener = useRef(null);

  useEffect(() => {
    const audio = new Audio('/audio/LAMURA.mp3');
    audio.loop = true;
    audio.preload = 'auto';
    audioRef.current = audio;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    let removeListeners = null;

    const startAudio = () => {
      if (userPausedRef.current) return;
      audio.volume = 0;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          let vol = 0;
          const targetVol = 0.75;
          const timer = setInterval(() => {
            if (!audioRef.current || audio.paused) {
              clearInterval(timer);
              return;
            }
            vol = Math.min(targetVol, vol + 0.05);
            audio.volume = vol;
            if (vol >= targetVol) clearInterval(timer);
          }, 60);
        }).catch(() => {
          // Autoplay policy prevented playback. Start on first interaction anywhere.
          const unlock = () => {
            if (!userPausedRef.current && audioRef.current && audioRef.current.paused) {
              audioRef.current.play().then(() => {
                let vol = 0;
                const targetVol = 0.75;
                const timer = setInterval(() => {
                  if (!audioRef.current || audio.paused) {
                    clearInterval(timer);
                    return;
                  }
                  vol = Math.min(targetVol, vol + 0.05);
                  audio.volume = vol;
                  if (vol >= targetVol) clearInterval(timer);
                }, 60);
              }).catch(() => {});
            }
            cleanup();
          };

          const cleanup = () => {
            window.removeEventListener('pointerdown', unlock);
            window.removeEventListener('scroll', unlock);
            window.removeEventListener('keydown', unlock);
          };

          window.addEventListener('pointerdown', unlock, {once: true, passive: true});
          window.addEventListener('scroll', unlock, {once: true, passive: true});
          window.addEventListener('keydown', unlock, {once: true, passive: true});
          removeListeners = cleanup;
        });
      }
    };

    startAudio();

    return () => {
      if (removeListeners) removeListeners();
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  const toggleSoundtrack = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      userPausedRef.current = false;
      audio.volume = 0.75;
      audio.play().catch(() => {});
    } else {
      userPausedRef.current = true;
      audio.pause();
    }
  };

  useEffect(() => {if (active !== null && !dialog.current.open) dialog.current.showModal();}, [active]);
  const close = () => {dialog.current.close(); setActive(null); opener.current?.focus();};
  const move = direction => setActive(index => (index + direction + photoIds.length) % photoIds.length);
  function photo(id, className = '') {
    return <figure className={`event-photo ${className}`}>
      <button type="button" className="event-photo-button" aria-label={`${t.enlarge}: ${t.alts[id]}`} onClick={e => {opener.current = e.currentTarget; setActive(photoIds.indexOf(id));}}>
        <EventImage id={id} alt={t.alts[id]}/><span className="event-photo-action" aria-hidden="true">{t.enlarge} ↗</span>
      </button>
    </figure>;
  }
  return <article className="event-page">
    <button
      type="button"
      className={`event-audio-toggle ${isPlaying ? 'is-playing' : ''}`}
      onClick={toggleSoundtrack}
      aria-label={isPlaying ? t.pauseAudio : t.playAudio}
      title={isPlaying ? t.pauseAudio : t.playAudio}
    >
      <span className="event-audio-bars" aria-hidden="true">
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </span>
      <span className="event-audio-label">{t.soundtrackOn}</span>
    </button>
    <section className="event-opening shell" aria-labelledby="event-title">
      <div className="event-edition"><span>{t.events} / London Fashion Week</span><span>{t.season}</span></div>
      <h1 id="event-title">Proverbs of Love</h1>
      <p className="event-subtitle">Proverbios del Amor</p>
      <figure className="event-main-photo"><EventImage id={366} alt={t.alts[366]} priority sizes="90vw"/><figcaption>LAMURA · London Fashion Week · SS27</figcaption></figure>
    </section>
    <section className="event-story shell" aria-labelledby="event-story-title">
      <div className="event-story-copy" data-reveal><p className="eyebrow">{t.collection}</p><h2 id="event-story-title">{t.storyTitle}</h2><p>{t.story}</p><p>{t.design}</p><div className="event-credit"><span>{t.direction}</span><p>YANG <span aria-hidden="true">×</span> ZHENYAN CC</p></div></div>
      {photo(371, 'event-story-photo')}
    </section>
    <section className="event-silhouettes shell" aria-labelledby="event-silhouettes-title">
      <div className="event-section-intro" data-reveal><h2 id="event-silhouettes-title">{t.silhouettes}</h2><p>{t.silhouetteText}</p></div>
      <div className="event-pair">{photo(372)}{photo(373)}</div>
      <div className="event-details"><div data-reveal><h3>{t.details}</h3><p>{t.detailsText}</p></div>{photo(368)}{photo(369)}</div>
    </section>
    <section className="event-runway shell" aria-labelledby="event-runway-title">
      <div className="event-section-intro" data-reveal><h2 id="event-runway-title">{t.runway}</h2><p>{t.runwayText}</p></div>
      <div className="event-runway-grid">{[376,377].map(id => <div key={id}>{photo(id)}</div>)}</div>
    </section>
    <Designer lang={lang}/>
    <section className="event-closing shell"><p>{t.closing}</p><a className="text-link" href="/about#contact">{t.contact}</a></section>
    <dialog ref={dialog} className="event-dialog" aria-label={t.gallery} onCancel={e => {e.preventDefault();close();}} onClick={e => {if(e.target === e.currentTarget) close();}} onKeyDown={e => {if(e.key === 'ArrowRight'){e.preventDefault();move(1);} if(e.key === 'ArrowLeft'){e.preventDefault();move(-1);}}}>
      {active !== null && <div className="event-lightbox"><div className="event-lightbox-heading"><span>LAMURA · SS27</span><button className="daisy-btn" onClick={close} autoFocus>{t.close}</button></div><img src={asset(photoIds[active], photoIds[active] === 366 ? 2000 : 1280)} alt={t.alts[photoIds[active]]}/><div className="event-lightbox-controls"><button className="daisy-btn" onClick={() => move(-1)}>{t.previous}</button><span role="status" aria-live="polite">{active + 1} / {photoIds.length}</span><button className="daisy-btn" onClick={() => move(1)}>{t.next}</button></div></div>}
    </dialog>
  </article>;
}

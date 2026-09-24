import {useEffect, useRef, useState} from 'react';
import {eventCopy} from './eventCopy';
import './events.css';

const asset = (id, size = 1280) => `/images/events/london-ss27/${id}-${size}.webp`;
const photoIds = [366, 371, 372, 373, 368, 369, 376, 377];
const ratios = {366: [3, 2], 371: [2, 3], 372: [3512, 6240], 373: [2, 3], 368: [3512, 6240], 369: [2, 3], 375: [2, 3], 376: [2, 3], 377: [2, 3]};

export function EventImage({id, alt, priority = false, sizes = '(max-width: 650px) 88vw, 44vw'}) {
  const [width, height] = ratios[id];
  return <img src={asset(id)} srcSet={`${asset(id, 640)} 640w, ${asset(id)} 1280w${id === 366 ? `, ${asset(id, 2000)} 2000w` : ''}`} sizes={sizes} alt={alt} width={width} height={height} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async"/>;
}

export function EventPoster({lang}) {
  const t = eventCopy[lang];
  return <section className="event-poster shell" aria-labelledby="event-poster-title">
    <a className="event-poster-link" href="/eventi" aria-label={`${t.explore}: London Fashion Week — Proverbs of Love`}>
      <div className="event-poster-image"><EventImage id={366} alt={t.alts[366]} priority sizes="(min-width: 901px) 100vw, 88vw"/></div>
      <div className="event-poster-copy"><p className="eyebrow">LONDON FASHION WEEK · SS27</p><h2 id="event-poster-title">Proverbs of Love</h2><span className="event-poster-cta">{t.explore}<span aria-hidden="true">↗</span></span></div>
    </a>
  </section>;
}

export function Events({lang}) {
  const t = eventCopy[lang];
  const [active, setActive] = useState(null);
  const dialog = useRef(null);
  const opener = useRef(null);
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
    <section className="event-closing shell"><p>{t.closing}</p><a className="text-link" href="/about#contact">{t.contact}</a></section>
    <dialog ref={dialog} className="event-dialog" aria-label={t.gallery} onCancel={e => {e.preventDefault();close();}} onClick={e => {if(e.target === e.currentTarget) close();}} onKeyDown={e => {if(e.key === 'ArrowRight'){e.preventDefault();move(1);} if(e.key === 'ArrowLeft'){e.preventDefault();move(-1);}}}>
      {active !== null && <div className="event-lightbox"><div className="event-lightbox-heading"><span>LAMURA · SS27</span><button className="daisy-btn" onClick={close} autoFocus>{t.close}</button></div><img src={asset(photoIds[active], photoIds[active] === 366 ? 2000 : 1280)} alt={t.alts[photoIds[active]]}/><div className="event-lightbox-controls"><button className="daisy-btn" onClick={() => move(-1)}>{t.previous}</button><span role="status" aria-live="polite">{active + 1} / {photoIds.length}</span><button className="daisy-btn" onClick={() => move(1)}>{t.next}</button></div></div>}
    </dialog>
  </article>;
}

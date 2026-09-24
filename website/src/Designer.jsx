import {useRef} from 'react';
import {EventImage} from './Events';
import {eventCopy} from './eventCopy';

export function Designer({lang}) {
  const t = eventCopy[lang];
  const dialog = useRef(null);
  return <>
    <section id="designer" className="event-designer shell" aria-labelledby="event-designer-title">
      <div className="event-designer-portrait">
        <figure className="event-photo"><button className="event-photo-button" type="button" aria-label={`${t.enlarge}: ${t.alts[375]}`} onClick={() => dialog.current.showModal()}><EventImage id={375} alt={t.alts[375]}/><span className="event-photo-action" aria-hidden="true">{t.enlarge} ↗</span></button></figure>
        <p className="event-designer-caption">{t.designerRole}</p>
      </div>
      <div className="event-designer-copy" data-reveal>
        <p className="eyebrow">{t.designerLabel}</p>
        <h2 id="event-designer-title">YANG</h2>
        <p>{t.designerHeritage}</p>
        <p>{t.designerBio}</p>
        <h3>{t.linesTitle}</h3>
        <dl className="event-brand-lines">{t.lines.map(line => <div key={line.name}><dt>{line.name}</dt><dd>{line.description}</dd></div>)}</dl>
      </div>
    </section>
    <dialog ref={dialog} className="event-dialog" aria-label={t.designerRole} onClick={e => {if(e.target === e.currentTarget) dialog.current.close();}}>
      <div className="event-lightbox"><div className="event-lightbox-heading"><span>{t.designerRole}</span><button className="daisy-btn" onClick={() => dialog.current.close()} autoFocus>{t.close}</button></div><img src="/images/events/london-ss27/375-1280.webp" alt={t.alts[375]}/></div>
    </dialog>
  </>;
}

const asset = (id, size = 1280) => `/images/events/london-ss27/${id}-${size}.webp`;
const ratios = {366: [3, 2], 371: [2, 3], 372: [3512, 6240], 373: [2, 3], 368: [3512, 6240], 369: [2, 3], 375: [2, 3], 376: [2, 3], 377: [2, 3]};

export {asset};

export function EventImage({id, alt, priority = false, sizes = '(max-width: 650px) 88vw, 44vw'}) {
  const [width, height] = ratios[id];
  return <img src={asset(id)} srcSet={`${asset(id, 640)} 640w, ${asset(id)} 1280w${id === 366 ? `, ${asset(id, 2000)} 2000w` : ''}`} sizes={sizes} alt={alt} width={width} height={height} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async"/>;
}

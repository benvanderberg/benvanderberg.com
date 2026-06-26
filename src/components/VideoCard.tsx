import { useState } from 'react';

interface Props {
  youtubeId: string;
  title: string;
}

/**
 * Click-to-load YouTube embed. Shows the thumbnail until the user clicks play,
 * then swaps in an iframe. Avoids loading dozens of YouTube iframes on /videos.
 */
export default function VideoCard({ youtubeId, title }: Props) {
  const [playing, setPlaying] = useState(false);
  // hqdefault is 480x360, well-supported across all videos
  const thumb = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;

  if (playing) {
    return (
      <div className="video-embed">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerated-2d-canvas; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      className="video-embed video-embed--poster"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
    >
      <img src={thumb} alt="" loading="lazy" />
      <span className="play-icon" aria-hidden="true">▶</span>
    </button>
  );
}

import { useMemo, useState } from 'react';
import VideoCard from './VideoCard';

export interface VideoItem {
  id: string;
  title: string;
  description?: string;
  youtubeId: string;
  topics: string[];
  href: string;
}

interface Props {
  videos: VideoItem[];
}

const ALL = 'All';

export default function VideoFilter({ videos }: Props) {
  const [active, setActive] = useState<string>(ALL);

  const topics = useMemo(() => {
    const set = new Set<string>();
    for (const v of videos) for (const t of v.topics) set.add(t);
    return [ALL, ...[...set].sort((a, b) => a.localeCompare(b))];
  }, [videos]);

  const filtered = active === ALL ? videos : videos.filter((v) => v.topics.includes(active));

  return (
    <>
      {topics.length > 1 && (
        <div className="filter-tabs" role="tablist" aria-label="Filter videos by topic">
          {topics.map((t) => {
            const isActive = t === active;
            return (
              <button
                key={t}
                role="tab"
                type="button"
                aria-selected={isActive}
                className={`filter-tab${isActive ? ' filter-tab--active' : ''}`}
                onClick={() => setActive(t)}
              >
                {t}
              </button>
            );
          })}
        </div>
      )}

      {filtered.length === 0 ? (
        <p style={{ color: 'var(--muted)', marginTop: '2rem' }}>No videos in this topic.</p>
      ) : (
        <div className="video-grid">
          {filtered.map((v) => (
            <article key={v.id} className="video-item">
              <VideoCard youtubeId={v.youtubeId} title={v.title} />
              <h3 className="video-item__title">
                <a href={v.href}>{v.title}</a>
              </h3>
              {v.description && <p className="video-item__desc">{v.description}</p>}
              {v.topics.length > 0 && (
                <div className="video-item__topics">
                  {v.topics.map((t) => (
                    <span key={t} className="topic-tag">{t}</span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </>
  );
}

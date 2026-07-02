interface SoundCloudPlayerProps {
  url: string
  className?: string
}

export default function SoundCloudPlayer({ url, className = '' }: SoundCloudPlayerProps) {
  const isPlaylist = url.includes('/sets/')
  const height = isPlaylist ? 270 : 150
  const embedUrl =
    `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}` +
    `&color=%233B5090&auto_play=false&hide_related=true` +
    `&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`

  return (
    <div className={`sc-player w-full ${className}`}>
      <iframe
        width="100%"
        height={height}
        scrolling="no"
        frameBorder={0}
        allow="autoplay"
        src={embedUrl}
        title="SoundCloud player"
      />
    </div>
  )
}

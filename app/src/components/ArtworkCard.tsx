import { useState } from 'react';
import { Heart } from 'lucide-react';

interface ArtworkCardProps {
  id: string;
  title: string;
  artist: string;
  date?: string;
  image: string;
  medium?: string;
  isFavorite?: boolean;
  onFavoriteToggle?: (id: string) => void;
  className?: string;
}

export default function ArtworkCard({
  id,
  title,
  artist,
  date = '',
  image,
  medium = '',
  isFavorite = false,
  onFavoriteToggle,
  className = '',
}: ArtworkCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={['group relative', className].join(' ')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <img
          src={image}
          alt={`${title} par ${artist}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />

        {/* Hover Overlay */}
        <div
          className={[
            'absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.8)] via-[rgba(10,10,10,0.3)] to-transparent',
            'flex flex-col justify-end p-4 transition-opacity duration-300',
            isHovered ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
        >
          <div
            className={[
              'transform transition-all duration-300',
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
            ].join(' ')}
          >
            <p className="text-[#F7F5F0] font-heading font-medium text-base leading-snug mb-1">
              {title}
            </p>
            <p className="text-[#F7F5F0] text-opacity-70 text-sm font-body">
              {artist}
              {date && `, ${date}`}
            </p>
            {medium && (
              <p className="text-[#C9A96E] text-xs font-mono mt-1 uppercase tracking-wider">
                {medium}
              </p>
            )}
          </div>
        </div>

        {/* Favorite Button */}
        {onFavoriteToggle && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onFavoriteToggle(id);
            }}
            className={[
              'absolute top-3 right-3 w-9 h-9 rounded-full bg-[rgba(10,10,10,0.5)]',
              'flex items-center justify-center transition-all duration-300',
              'hover:bg-[rgba(10,10,10,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]',
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90',
            ].join(' ')}
            aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            aria-pressed={isFavorite}
          >
            <Heart
              size={18}
              className={isFavorite ? 'text-[#C9A96E] fill-[#C9A96E]' : 'text-[#F7F5F0]'}
            />
          </button>
        )}
      </div>

      {/* Title below image (visible when not hovering) */}
      <div className="mt-3">
        <h4 className="font-heading font-medium text-base text-[#0A0A0A] line-clamp-1">
          {title}
        </h4>
        <p className="text-sm text-[#6B6560] font-body line-clamp-1">{artist}</p>
      </div>
    </div>
  );
}

export type { ArtworkCardProps };

import React, { useState } from 'react';

const tagColorClasses = {
  teal: 'bg-teal/10 text-teal',
  marigold: 'bg-marigold/12 text-amber-800',
  terracotta: 'bg-terracotta/10 text-terracotta',
  purple: 'bg-purple-500/10 text-purple-700'
};

const ProfileCard = ({ creator, onCardClick, delay }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleCardClick = () => {
    setIsTapped(true);
    setTimeout(() => setIsTapped(false), 300);
    onCardClick();
  };

  return (
    <div
      className={`
        relative rounded-card overflow-hidden bg-white shadow-card cursor-pointer
        transition-all duration-500 will-change-transform
        hover:shadow-card-hover hover:-translate-y-2 hover:scale-[1.02]
        active:scale-[0.98] active:translate-y-0
        animate-card-in card-delay-${delay}
        ${isTapped ? 'animate-pulse' : ''}
      `}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative h-56 md:h-64 overflow-hidden">
        <img
          src={creator.image}
          alt={creator.name}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${isHovered ? 'scale-110 rotate-2' : 'scale-100'}`}
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent transition-all duration-500 ${isHovered ? 'to-black/75' : 'to-black/65'}`} />

        {/* Match Badge */}
        <div className={`absolute bottom-4 left-4 z-10 flex items-center gap-1.5 px-3.5 py-1.5 rounded-pill text-xs font-extrabold tracking-wide text-white backdrop-blur-glass bg-marigold/75 border border-white/30 animate-glow transition-all duration-500 ${isHovered ? 'scale-110 shadow-2xl' : ''}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-dot" />
          {creator.match}
        </div>

        {/* Bookmark Button */}
        <button
          onClick={handleBookmarkClick}
          className={`
            absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full
            flex items-center justify-center border border-white/30
            backdrop-blur-md transition-all duration-300
            hover:scale-125 hover:rotate-12
            active:scale-90
            ${isBookmarked 
              ? 'bg-marigold/90 shadow-lg shadow-marigold/50 animate-bounce' 
              : 'bg-white/25 hover:bg-white/40'
            }
          `}
        >
          <svg viewBox="0 0 24 24" className={`w-4 h-4 stroke-white stroke-2 transition-all duration-300 ${isBookmarked ? 'fill-white scale-110' : 'fill-none'}`}>
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Hover overlay effect */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-teal/20 via-transparent to-transparent animate-fade-in pointer-events-none" />
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 md:p-5">
        {/* Name Row */}
        <div className="flex items-center justify-between mb-1">
          <h3 className={`text-lg md:text-xl font-extrabold text-charcoal leading-tight transition-all duration-300 ${isHovered ? 'text-teal' : ''}`}>
            {creator.name}
          </h3>
          <div className={`w-5 h-5 rounded-full bg-teal flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isHovered ? 'scale-125 rotate-12 shadow-lg shadow-teal/50' : ''}`}>
            <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-white fill-none stroke-[2.5]">
              <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Location */}
        <div className={`flex items-center gap-1 text-xs md:text-sm text-mist font-medium mb-3 transition-all duration-300 ${isHovered ? 'translate-x-1' : ''}`}>
          <svg viewBox="0 0 24 24" className="w-3 h-3 md:w-4 md:h-4 stroke-mist fill-none stroke-2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {creator.location}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3.5">
          {creator.tags.map((tag, idx) => (
            <span
              key={idx}
              className={`px-2.5 py-1 rounded-pill text-[11px] md:text-xs font-bold tracking-wide transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 cursor-pointer ${tagColorClasses[tag.color]}`}
              style={{ 
                transitionDelay: isHovered ? `${idx * 50}ms` : '0ms',
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
              }}
            >
              {tag.text}
            </span>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="flex items-center border-t border-cream-dark pt-3">
          <div className={`flex-1 flex flex-col items-center gap-0.5 transition-all duration-300 ${isHovered ? 'scale-110' : ''}`} style={{ transitionDelay: '0ms' }}>
            <div className="text-sm md:text-lg font-extrabold text-charcoal">{creator.followers}</div>
            <div className="text-[10px] font-semibold text-mist uppercase tracking-wider">Followers</div>
          </div>
          
          <div className="w-px h-8 bg-cream-dark" />
          
          <div className={`flex-1 flex flex-col items-center gap-0.5 transition-all duration-300 ${isHovered ? 'scale-110' : ''}`} style={{ transitionDelay: '50ms' }}>
            <div className="text-sm md:text-lg font-extrabold text-charcoal">{creator.engagementRate}</div>
            <div className="text-[10px] font-semibold text-mist uppercase tracking-wider">Eng. Rate</div>
          </div>
          
          <div className="w-px h-8 bg-cream-dark" />
          
          <div className={`flex-1 flex flex-col items-center gap-0.5 transition-all duration-300 ${isHovered ? 'scale-110' : ''}`} style={{ transitionDelay: '100ms' }}>
            <div className="text-sm md:text-lg font-extrabold text-charcoal flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse-dot" />
              {creator.reach}
            </div>
            <div className="text-[10px] font-semibold text-mist uppercase tracking-wider">Reach</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

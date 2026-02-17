import React, { useState } from 'react';
import ProfileCard from './ProfileCard';
import BottomSheet from './BottomSheet';
import { creators } from './data';

function App() {
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'food', label: 'Food' },
    { id: 'travel', label: ' Travel' },
    { id: 'fitness', label: ' Fitness' },
    { id: 'art', label: 'Art' },
    { id: 'education', label: 'Education' }
  ];

  const filteredCreators = activeFilter === 'all'
    ? creators
    : creators.filter((creator) =>
        creator.tags.some((tag) =>
          tag.text.toLowerCase().includes(activeFilter)
        )
  );


  const handleCardClick = (creator) => {
    setSelectedCreator(creator);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setTimeout(() => setSelectedCreator(null), 450);
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Full Screen Responsive Container */}
      <div className="relative w-full min-h-screen bg-cream overflow-hidden">
        
        {/* Header */}
        <div className="sticky top-0 z-10 px-4 md:px-12 lg:px-24 pt-6 md:pt-8 pb-6 bg-cream/95 backdrop-blur-md border-b border-cream-dark shadow-sm">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="animate-fade-in">
                <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-tight transition-all duration-300 hover:scale-105">
                  Siddharth <span className="text-teal italic animate-pulse">Creators Hub</span>
                </h1>
                <p className="text-sm md:text-base text-smoke mt-2 opacity-0 animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                  Connect with local influencers who match your brand
                </p>
              </div>
              <button className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-marigold to-terracotta border-2 border-white shadow-btn flex items-center justify-center text-xl md:text-2xl transition-all duration-300 hover:scale-110 hover:rotate-12 active:scale-95 animate-bounce-in" style={{ animationDelay: '0.3s' }}>
                🔥
              </button>
            </div>

            {/* Filter Chips */}
            <div className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide pb-0.5">
              {filters.map((filter, idx) => (
                <button
                  key={filter.id}
                  onClick={() => {
                    setActiveFilter(filter.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}

                  className={`
                    flex-shrink-0 px-5 md:px-6 py-2 md:py-2.5 rounded-pill text-sm md:text-base font-semibold
                    transition-all duration-300 whitespace-nowrap select-none
                    transform hover:scale-105 hover:-translate-y-1
                    active:scale-95
                    opacity-0 animate-slide-up
                    ${activeFilter === filter.id
                      ? 'bg-teal text-white border-2 border-teal shadow-lg shadow-teal/30'
                      : 'bg-cream-dark text-smoke border-2 border-black/8 hover:border-teal/30 hover:shadow-md'
                    }
                  `}
                  style={{ animationDelay: `${0.4 + idx * 0.05}s`, animationFillMode: 'forwards' }}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Feed - Responsive Grid */}
        <div className="px-4 md:px-12 lg:px-24 pb-24 pt-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredCreators.map((creator, idx) => (
                <ProfileCard
                  key={creator.id}
                  creator={creator}
                  delay={idx + 1}
                  onCardClick={() => handleCardClick(creator)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Sheet */}
        <BottomSheet
          isOpen={isSheetOpen}
          onClose={handleCloseSheet}
          creator={selectedCreator}
        />
      </div>
    </div>
  );
}

export default App;

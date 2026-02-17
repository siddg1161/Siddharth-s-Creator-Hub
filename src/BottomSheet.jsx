import React, { useState, useEffect, useRef } from 'react';

const tagColorClasses = {
  teal: 'bg-teal/10 text-teal',
  marigold: 'bg-marigold/12 text-amber-800',
  terracotta: 'bg-terracotta/10 text-terracotta',
  purple: 'bg-purple-500/10 text-purple-700'
};

const BottomSheet = ({ isOpen, onClose, creator }) => {
  const [isSent, setIsSent] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragY, setDragY] = useState(0);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animatingRef = useRef(false);
  const startYRef = useRef(0);
  const sheetRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setIsSent(false);
      setIsPressed(false);
      setDragY(0);
    }
  }, [isOpen]);

  const handleConnect = () => {
    if (isSent) return;
    
    setIsPressed(true);
    setTimeout(() => {
      setIsPressed(false);
      setIsSent(true);
      launchParticles();
    }, 180);
  };

  const launchParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height - 100;

    const colors = [
      '#E8973A', '#F5B85A', '#1E6B6B', '#C05A3A',
      '#FFCE5C', '#FF8C5A', '#2A8A8A', '#FFD700',
      '#3DC08A', '#FF6B9D', '#B8E0FF', '#FFFFFF'
    ];

    particlesRef.current = [];
    for (let i = 0; i < 72; i++) {
      const angle = (Math.PI * 2 / 72) * i + (Math.random() - 0.5) * 0.4;
      const speed = 3 + Math.random() * 6;
      particlesRef.current.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        r: 3 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        decay: 0.012 + Math.random() * 0.018,
        shape: Math.random() > 0.5 ? 'circle' : 'star'
      });
    }

    if (!animatingRef.current) {
      animatingRef.current = true;
      animateParticles();
    }
  };

  const animateParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current = particlesRef.current.filter(p => p.life > 0);

    for (const p of particlesRef.current) {
      ctx.save();
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.translate(p.x, p.y);

      if (p.shape === 'star') {
        drawStar(ctx, 0, 0, p.r);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.18;
      p.vx *= 0.98;
      p.r *= 0.97;
      p.life -= p.decay;
    }

    if (particlesRef.current.length > 0) {
      requestAnimationFrame(animateParticles);
    } else {
      animatingRef.current = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const drawStar = (ctx, cx, cy, r) => {
    const spikes = 4;
    const inner = r * 0.45;
    ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
      const angle = (i * Math.PI) / spikes - Math.PI / 2;
      const rad = i % 2 === 0 ? r : inner;
      i === 0
        ? ctx.moveTo(cx + Math.cos(angle) * rad, cy + Math.sin(angle) * rad)
        : ctx.lineTo(cx + Math.cos(angle) * rad, cy + Math.sin(angle) * rad);
    }
    ctx.closePath();
    ctx.fill();
  };

  // Drag handlers
  const handleDragStart = (e) => {
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    startYRef.current = y;
    setIsDragging(true);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    const delta = Math.max(0, y - startYRef.current);
    setDragY(delta);
  };

  const handleDragEnd = (e) => {
    if (!isDragging) return;
    const y = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
    const delta = y - startYRef.current;
    setIsDragging(false);
    setDragY(0);
    
    if (delta > 100) {
      onClose();
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => handleDragMove(e);
    const handleMouseUp = (e) => handleDragEnd(e);
    
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Canvas resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  if (!creator) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 z-40 transition-all duration-500
          ${isOpen 
            ? 'bg-black/50 backdrop-blur-sheet pointer-events-auto opacity-100' 
            : 'bg-black/0 backdrop-blur-0 pointer-events-none opacity-0'
          }
        `}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className={`
          fixed bottom-0 left-0 right-0 z-50 bg-cream rounded-t-[32px]
          overflow-hidden flex flex-col shadow-2xl will-change-transform
          transition-all duration-[600ms] ease-out
          max-w-2xl mx-auto
          ${isOpen ? 'h-[85vh]' : 'h-0'}
        `}
        style={{
          transform: isOpen ? `translateY(${dragY}px)` : 'translateY(100%)',
          transition: isDragging ? 'none' : undefined
        }}
      >
        {/* Canvas for particles */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none z-[100]"
        />

        {/* Handle */}
        <div
          className="flex-shrink-0 flex justify-center pt-4 pb-3 cursor-grab active:cursor-grabbing group"
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          <div className="w-12 h-1.5 rounded-full bg-black/15 transition-all duration-300 group-hover:bg-black/30 group-hover:w-16" />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {/* Hero Image */}
          <div className="relative h-64 md:h-80 flex-shrink-0 overflow-hidden">
            <img 
              src={creator.image} 
              alt={creator.name} 
              className={`w-full h-full object-cover transition-transform duration-1000 ${isOpen ? 'scale-100' : 'scale-110'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/75" />
            <div className={`absolute bottom-6 left-6 right-6 z-10 transition-all duration-700 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight mb-2 drop-shadow-lg">
                {creator.name}
              </h2>
              <p className="text-base text-white/90 font-medium flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white fill-none stroke-2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {creator.location}
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8">
            {/* Glass Stats */}
            <div className={`bg-white/70 backdrop-blur-glass border border-white/80 rounded-[24px] p-5 md:p-6 flex justify-around mb-6 shadow-xl transition-all duration-700 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '0.1s' }}>
              <div className="text-center group cursor-pointer">
                <div className="text-2xl md:text-3xl font-extrabold text-charcoal transition-all duration-300 group-hover:scale-110 group-hover:text-teal">
                  {creator.followers}
                </div>
                <div className="text-[11px] font-semibold text-mist uppercase tracking-wider mt-1">Followers</div>
              </div>
              <div className="w-px bg-cream-dark" />
              <div className="text-center group cursor-pointer">
                <div className="text-2xl md:text-3xl font-extrabold text-charcoal transition-all duration-300 group-hover:scale-110 group-hover:text-marigold">
                  {creator.posts}
                </div>
                <div className="text-[11px] font-semibold text-mist uppercase tracking-wider mt-1">Posts</div>
              </div>
              <div className="w-px bg-cream-dark" />
              <div className="text-center group cursor-pointer">
                <div className="text-2xl md:text-3xl font-extrabold text-charcoal transition-all duration-300 group-hover:scale-110 group-hover:text-terracotta">
                  {creator.engagementRate}
                </div>
                <div className="text-[11px] font-semibold text-mist uppercase tracking-wider mt-1">Eng. Rate</div>
              </div>
            </div>

            {/* About */}
            <div className={`mb-6 transition-all duration-700 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '0.2s' }}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-mist mb-3">About</h3>
              <p className="text-base leading-relaxed text-smoke">{creator.bio}</p>
            </div>

            {/* Specialties */}
            <div className={`mb-6 transition-all duration-700 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '0.3s' }}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-mist mb-3">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {creator.specialties.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1.5 rounded-pill text-xs font-bold tracking-wide transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg cursor-pointer ${tagColorClasses[tag.color]}`}
                    style={{ transitionDelay: isOpen ? `${0.4 + idx * 0.05}s` : '0ms' }}
                  >
                    {tag.text}
                  </span>
                ))}
              </div>
            </div>

            {/* Recent Work */}
            <div className={`mb-6 transition-all duration-700 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '0.5s' }}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-mist mb-3">Recent Work</h3>
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                {creator.work.map((img, idx) => (
                  <div 
                    key={idx} 
                    className="aspect-square rounded-xl overflow-hidden bg-cream-dark group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    style={{ transitionDelay: isOpen ? `${0.6 + idx * 0.05}s` : '0ms' }}
                  >
                    <img 
                      src={img} 
                      alt="" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2" 
                      loading="lazy" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className={`flex-shrink-0 p-6 md:p-8 bg-gradient-to-t from-cream via-cream to-transparent sticky bottom-0 transition-all duration-700 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '0.6s' }}>
          <button
            onClick={handleConnect}
            disabled={isSent}
            className={`
              w-full py-4 rounded-[20px] border-none font-extrabold text-lg tracking-wide
              text-white flex items-center justify-center gap-3 relative overflow-hidden
              transition-all duration-300
              ${isSent 
                ? 'bg-gradient-to-br from-green-600 to-green-700 shadow-btn-sent cursor-default' 
                : 'bg-gradient-to-br from-marigold via-marigold-light to-terracotta shadow-btn cursor-pointer hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98] active:shadow-md'
              }
              ${isPressed ? 'scale-[0.96]' : ''}
            `}
          >
            <span className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-[20px]" />
            <span className={`text-2xl transition-transform duration-300 ${isPressed ? 'scale-75' : isSent ? 'animate-bounce' : ''}`}>
              {isSent ? '✓' : '✦'}
            </span>
            <span className="relative z-10">{isSent ? 'Proposal Sent!' : 'Send Proposal'}</span>
          </button>

          <p className="text-center text-xs text-mist mt-4 opacity-70">
          Built by Siddharth Gupta
           </p>

        </div>
      </div>
    </>
  );
};

export default BottomSheet;

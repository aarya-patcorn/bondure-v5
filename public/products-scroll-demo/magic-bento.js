(() => {
  const MOBILE_BREAKPOINT = 768;
  const DEFAULT_PARTICLE_COUNT = 12;
  const DEFAULT_SPOTLIGHT_RADIUS = 300;
  const DEFAULT_GLOW_COLOR = "89, 22, 24";

  function createParticleElement(x, y, color) {
    const el = document.createElement("div");
    el.className = "magic-bento__particle";
    el.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: rgba(${color}, 1);
      box-shadow: 0 0 6px rgba(${color}, 0.6);
      pointer-events: none;
      z-index: 100;
      left: ${x}px;
      top: ${y}px;
    `;
    return el;
  }

  function calculateSpotlightValues(radius) {
    return {
      proximity: radius * 0.5,
      fadeDistance: radius * 0.75,
    };
  }

  function updateCardGlowProperties(card, mouseX, mouseY, glow, radius) {
    const rect = card.getBoundingClientRect();
    const relativeX = ((mouseX - rect.left) / rect.width) * 100;
    const relativeY = ((mouseY - rect.top) / rect.height) * 100;

    card.style.setProperty("--glow-x", `${relativeX}%`);
    card.style.setProperty("--glow-y", `${relativeY}%`);
    card.style.setProperty("--glow-intensity", glow.toString());
    card.style.setProperty("--glow-radius", `${radius}px`);
  }

  function initParticleCard(card, config) {
    const {
      particleCount,
      glowColor,
      enableTilt,
      clickEffect,
      enableMagnetism,
    } = config;

    let isHovered = false;
    const particles = [];
    const timeouts = [];
    let memoizedParticles = [];
    let particlesInitialized = false;
    let magnetismAnimation = null;

    function initializeParticles() {
      if (particlesInitialized) return;
      const { width, height } = card.getBoundingClientRect();
      memoizedParticles = Array.from({ length: particleCount }, () =>
        createParticleElement(
          Math.random() * width,
          Math.random() * height,
          glowColor
        )
      );
      particlesInitialized = true;
    }

    function clearAllParticles() {
      timeouts.forEach(clearTimeout);
      timeouts.length = 0;
      magnetismAnimation?.kill();

      particles.forEach((particle) => {
        gsap.to(particle, {
          scale: 0,
          opacity: 0,
          duration: 0.3,
          ease: "back.in(1.7)",
          onComplete: () => {
            particle.parentNode?.removeChild(particle);
          },
        });
      });
      particles.length = 0;
    }

    function animateParticles() {
      if (!isHovered) return;

      if (!particlesInitialized) initializeParticles();

      memoizedParticles.forEach((particle, index) => {
        const timeoutId = setTimeout(() => {
          if (!isHovered) return;

          const clone = particle.cloneNode(true);
          card.appendChild(clone);
          particles.push(clone);

          gsap.fromTo(
            clone,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
          );

          gsap.to(clone, {
            x: (Math.random() - 0.5) * 100,
            y: (Math.random() - 0.5) * 100,
            rotation: Math.random() * 360,
            duration: 2 + Math.random() * 2,
            ease: "none",
            repeat: -1,
            yoyo: true,
          });

          gsap.to(clone, {
            opacity: 0.3,
            duration: 1.5,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
          });
        }, index * 100);

        timeouts.push(timeoutId);
      });
    }

    function handleMouseEnter() {
      isHovered = true;
      animateParticles();

      if (enableTilt) {
        gsap.to(card, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }
    }

    function handleMouseLeave() {
      isHovered = false;
      clearAllParticles();

      if (enableTilt) {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      if (enableMagnetism) {
        gsap.to(card, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    }

    function handleMouseMove(event) {
      if (!enableTilt && !enableMagnetism) return;

      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }

      if (enableMagnetism) {
        magnetismAnimation = gsap.to(card, {
          x: (x - centerX) * 0.05,
          y: (y - centerY) * 0.05,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    }

    function handleClick(event) {
      if (!clickEffect) return;

      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement("div");
      ripple.className = "magic-bento__ripple";
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      card.appendChild(ripple);

      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        }
      );
    }

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("click", handleClick);

    return () => {
      isHovered = false;
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("click", handleClick);
      clearAllParticles();
      gsap.set(card, { rotateX: 0, rotateY: 0, x: 0, y: 0, clearProps: "transform" });
    };
  }

  function initGlobalSpotlight(grid, config) {
    const { spotlightRadius, glowColor } = config;

    const spotlight = document.createElement("div");
    spotlight.className = "magic-bento__spotlight";
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.04) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);

    function handleMouseMove(event) {
      const section = grid.closest(".bento-section");
      const rect = section?.getBoundingClientRect();
      const mouseInside =
        rect &&
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      const cards = grid.querySelectorAll(".magic-bento-card");

      if (!mouseInside) {
        gsap.to(spotlight, { opacity: 0, duration: 0.3, ease: "power2.out" });
        cards.forEach((card) => {
          card.style.setProperty("--glow-intensity", "0");
        });
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(event.clientX - centerX, event.clientY - centerY) -
          Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity =
            (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(
          card,
          event.clientX,
          event.clientY,
          glowIntensity,
          spotlightRadius
        );
      });

      gsap.to(spotlight, {
        left: event.clientX,
        top: event.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      const targetOpacity =
        minDistance <= proximity
          ? 0.8
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
            : 0;

      gsap.to(spotlight, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: "power2.out",
      });
    }

    function handleMouseLeave() {
      grid.querySelectorAll(".magic-bento-card").forEach((card) => {
        card.style.setProperty("--glow-intensity", "0");
      });
      gsap.to(spotlight, { opacity: 0, duration: 0.3, ease: "power2.out" });
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      spotlight.parentNode?.removeChild(spotlight);
    };
  }

  function resolveGlowColor(section, fallback = DEFAULT_GLOW_COLOR) {
    const fromSection = section?.style.getPropertyValue("--product-spec-glow")?.trim();
    if (fromSection) return fromSection;

    if (section && typeof getComputedStyle !== "undefined") {
      const computed = getComputedStyle(section)
        .getPropertyValue("--product-spec-glow")
        ?.trim();
      if (computed) return computed;
    }

    return fallback;
  }

  function enhanceCards(grid, config) {
    const section = grid.closest("#adhesive-spec") || grid.closest(".bento-section");
    const glowColor = config.glowColor || resolveGlowColor(section);
    const cards = grid.querySelectorAll(".spec-card");
    const cleanups = [];

    cards.forEach((card) => {
      card.classList.add("magic-bento-card");
      card.style.setProperty("--glow-color", glowColor);

      if (config.textAutoHide) {
        card.classList.add("magic-bento-card--text-autohide");
      }
      if (config.enableBorderGlow) {
        card.classList.add("magic-bento-card--border-glow");
      }
      if (config.enableStars) {
        card.classList.add("magic-bento-card--particles");
      }

      cleanups.push(
        initParticleCard(card, {
          ...config,
          glowColor,
          particleCount: config.enableStars ? config.particleCount : 0,
        })
      );
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      cards.forEach((card) => {
        card.classList.remove(
          "magic-bento-card",
          "magic-bento-card--text-autohide",
          "magic-bento-card--border-glow",
          "magic-bento-card--particles"
        );
        card.style.removeProperty("--glow-color");
      });
    };
  }

  function initMagicBento(grid, options = {}) {
    if (!grid || grid.dataset.magicBentoReady === "true") return;
    if (typeof gsap === "undefined") return;

    const config = {
      textAutoHide: true,
      enableStars: true,
      enableSpotlight: true,
      enableBorderGlow: true,
      enableTilt: true,
      enableMagnetism: true,
      clickEffect: true,
      spotlightRadius: DEFAULT_SPOTLIGHT_RADIUS,
      particleCount: DEFAULT_PARTICLE_COUNT,
      glowColor: DEFAULT_GLOW_COLOR,
      ...options,
    };

    const section = grid.closest("#adhesive-spec") || grid.closest(".bento-section");
    section?.classList.add("bento-section");
    grid.classList.add("is-magic-bento");

    const mm = gsap.matchMedia();
    let cardCleanup = null;
    let spotlightCleanup = null;

    mm.add(
      {
        isDesktop: `(min-width: ${MOBILE_BREAKPOINT + 1}px)`,
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isDesktop, reduceMotion } = context.conditions;
        if (!isDesktop || reduceMotion) {
          grid.classList.remove("is-magic-bento");
          section?.classList.remove("bento-section");
          return undefined;
        }

        grid.classList.add("is-magic-bento");
        section?.classList.add("bento-section");

        cardCleanup = enhanceCards(grid, config);
        if (config.enableSpotlight) {
          spotlightCleanup = initGlobalSpotlight(grid, config);
        }

        return () => {
          cardCleanup?.();
          cardCleanup = null;
          spotlightCleanup?.();
          spotlightCleanup = null;
          grid.classList.remove("is-magic-bento");
          section?.classList.remove("bento-section");
        };
      }
    );

    grid.dataset.magicBentoReady = "true";

    return () => {
      mm.revert();
      grid.classList.remove("is-magic-bento");
      section?.classList.remove("bento-section");
      delete grid.dataset.magicBentoReady;
    };
  }

  window.initProductsMagicBento = function initProductsMagicBento(options = {}) {
    window.__productsMagicBentoCleanup?.();
    window.__productsMagicBentoCleanup = null;

    const grid = document.querySelector(".product-spec__bento");
    if (!grid) return;

    delete grid.dataset.magicBentoReady;
    window.__productsMagicBentoCleanup = initMagicBento(grid, options) || null;
  };
})();

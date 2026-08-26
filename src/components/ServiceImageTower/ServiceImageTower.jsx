"use client";

import "./ServiceImageTower.css";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "../LocaleProvider/LocaleProvider";

const images = [
  "/spotlight/vanServices.webp",
  "/spotlight/bondurevanFactoryBG.webp",
  "/spotlight/technicalteamservices.webp",
  "/spotlight/services2floor.webp",
  "/spotlight/services3AAC.webp",
  "/spotlight/tile-installation.webp",
  "/spotlight/spotlight-img-1.png",
  "/spotlight/spotlight-img-2.webp",
  "/spotlight/spotlight-img-10.webp",
  "/spotlight/02.webp",
];

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  void main() {
    vUv = uv;
    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uMap;
  uniform vec3 uCameraPosition;
  uniform float uImageAspect;
  uniform float uTileAspect;
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  void main() {
    vec2 imageUv = vUv;
    imageUv.x = (imageUv.x - 0.5) * (uTileAspect / uImageAspect) + 0.5;
    vec4 tex = texture2D(uMap, imageUv);
    vec3 viewDir = normalize(uCameraPosition - vWorldPosition);
    float facing = max(dot(-normalize(vWorldNormal), viewDir), 0.0);
    float falloff = smoothstep(-0.2, 0.5, facing) * 0.45 + 0.42;
    vec3 color = mix(vec3(1.0), tex.rgb * falloff, 0.975) * 1.18;
    gl_FragColor = vec4(color, tex.a);
  }
`;

const config = {
  tilesPerRevolution: 15,
  revolutions: 5,
  startRadius: 5,
  endRadius: 3.5,
  tileHeightRatio: 1.1,
  tileSegments: 24,
  spiralGap: 0.35,
  tileOverlap: 0.005,
  cameraZ: 12,
};

const serviceStatements = {
  en: [
    "Our technical team turns site conditions into clear action.",
    "Site audits reveal risks before application begins.",
    "Product recommendations are built around your project.",
    "After-sales support continues beyond product delivery.",
    "Practical training builds confidence across every crew.",
    "Our lab on wheels comes directly to your site.",
    "Live experiments make product performance fully transparent.",
    "Side-by-side testing makes every comparison visible.",
    "Experience centres bring expert guidance closer to every city.",
  ],
  de: [
    "Unser Technik-Team macht aus Baustellenbedingungen klare Maßnahmen.",
    "Baustellenprüfungen zeigen Risiken vor Beginn der Anwendung auf.",
    "Produktempfehlungen werden auf Ihr Projekt abgestimmt.",
    "Unser Kundendienst begleitet Sie über die Produktlieferung hinaus.",
    "Praxisnahe Schulungen stärken die Sicherheit jedes Teams.",
    "Unser mobiles Labor kommt direkt zu Ihrer Baustelle.",
    "Live-Experimente machen die Produktleistung vollständig transparent.",
    "Direkte Vergleichstests machen jeden Unterschied sichtbar.",
    "Erlebniszentren bringen fachkundige Beratung näher in jede Stadt.",
  ],
};

const ctaLabels = {
  en: "See our experience center",
  de: "Unser Erlebniszentrum ansehen",
};

export default function ServiceImageTower() {
  const { locale } = useLocale();
  const sectionRef = useRef(null);
  const canvasHostRef = useRef(null);
  const [statementIndex, setStatementIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStatementIndex((current) => (current + 1) % serviceStatements.en.length);
    }, 5000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const host = canvasHostRef.current;
    if (!section || !host) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const constrainedConnection = navigator.connection?.saveData || navigator.connection?.effectiveType === "2g";
    if (reducedMotion || constrainedConnection) return undefined;

    let cancelled = false;
    let dispose = () => {};

    async function initialize() {
      const THREE = await import("three");
      if (cancelled) return;

    const totalTiles = config.tilesPerRevolution * config.revolutions;
    const angleStep = (Math.PI * 2) / config.tilesPerRevolution;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, section.clientWidth / section.clientHeight, 0.1, 1000);
    camera.position.z = window.innerWidth < 1000 ? 15 : config.cameraZ;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(section.clientWidth, section.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const tileMaterials = [];
    const textures = images.map((image, imageIndex) => textureLoader.load(image, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      const imageAspect = texture.image.width / texture.image.height;
      tileMaterials.forEach(({ material, textureIndex }) => {
        if (textureIndex === imageIndex) material.uniforms.uImageAspect.value = imageAspect;
      });
    }));
    const cameraPositionUniform = { value: new THREE.Vector3(0, 0, config.cameraZ) };
    const tileEdgesY = [0];

    for (let index = 0; index < totalTiles; index += 1) {
      const progress = index / totalTiles;
      const radius = config.startRadius + (config.endRadius - config.startRadius) * progress;
      const arcWidth = (2 * Math.PI * radius) / config.tilesPerRevolution;
      const tileHeight = arcWidth * config.tileHeightRatio;
      tileEdgesY.push(tileEdgesY[index] - (tileHeight + config.spiralGap) / config.tilesPerRevolution);
    }

    const spiral = new THREE.Group();
    scene.add(spiral);

    for (let index = 0; index < totalTiles; index += 1) {
      const progress = index / totalTiles;
      const radius = config.startRadius + (config.endRadius - config.startRadius) * progress;
      const arcWidth = (2 * Math.PI * radius) / config.tilesPerRevolution;
      const tileHeight = arcWidth * config.tileHeightRatio;
      const tileAngle = arcWidth / radius + config.tileOverlap;
      const centerY = (tileEdgesY[index] + tileEdgesY[index + 1]) / 2;
      const slope = tileEdgesY[index + 1] - tileEdgesY[index];
      const positions = [];
      const uvCoords = [];
      const indices = [];

      for (let row = 0; row <= 1; row += 1) {
        for (let column = 0; column <= config.tileSegments; column += 1) {
          const angle = (column / config.tileSegments - 0.5) * tileAngle;
          positions.push(
            Math.sin(angle) * radius,
            (row - 0.5) * tileHeight + (column / config.tileSegments - 0.5) * slope,
            Math.cos(angle) * radius,
          );
          uvCoords.push(column / config.tileSegments, row);
        }
      }

      for (let column = 0; column < config.tileSegments; column += 1) {
        const below = column + config.tileSegments + 1;
        indices.push(column, below, column + 1, below, below + 1, column + 1);
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
      geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvCoords, 2));
      geometry.setIndex(indices);
      geometry.computeVertexNormals();

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uMap: { value: textures[index % images.length] },
          uCameraPosition: cameraPositionUniform,
          uImageAspect: { value: 1.5 },
          uTileAspect: { value: arcWidth / tileHeight },
        },
        side: THREE.DoubleSide,
      });
      tileMaterials.push({ material, textureIndex: index % images.length });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.y = centerY;
      const tile = new THREE.Group();
      tile.rotation.y = index * angleStep;
      tile.add(mesh);
      spiral.add(tile);
    }

    const spiralHeight = Math.abs(tileEdgesY[totalTiles]);
    let frameId;
    let isSceneVisible = true;
    let lastScrollY = window.scrollY;
    let spinVelocity = 0;
    let mouseX = 0;
    let mouseY = 0;
    let smoothX = 0;
    let smoothY = 0;

    const onScroll = () => {
      const delta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      spinVelocity = delta * 0.00035;
    };
    const onPointerMove = (event) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    const onResize = () => {
      if (!section.clientWidth || !section.clientHeight) return;
      camera.aspect = section.clientWidth / section.clientHeight;
      camera.position.z = window.innerWidth < 1000 ? 15 : config.cameraZ;
      camera.updateProjectionMatrix();
      renderer.setSize(section.clientWidth, section.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const animate = () => {
      frameId = undefined;
      if (!isSceneVisible || document.hidden) return;
      const rect = section.getBoundingClientRect();
      const scrollDistance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = THREE.MathUtils.clamp(-rect.top / scrollDistance, 0, 1);
      camera.position.y += (-(progress * spiralHeight * 0.2) - camera.position.y) * 0.075;

      if (window.innerWidth >= 1000) {
        smoothX += (mouseX - smoothX) * 0.02;
        smoothY += (mouseY - smoothY) * 0.02;
        spiral.rotation.x = smoothY * 0.1;
        spiral.rotation.z = -smoothX * 0.03;
      }

      cameraPositionUniform.value.copy(camera.position);
      spiral.rotation.y += 0.001 + spinVelocity;
      spinVelocity *= 0.9;
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    const sceneObserver = new IntersectionObserver(([entry]) => {
      isSceneVisible = entry.isIntersecting;
      if (isSceneVisible && !document.hidden && !frameId) animate();
      if (!isSceneVisible && frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = undefined;
      }
    });
    const onVisibilityChange = () => {
      if (document.hidden && frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = undefined;
      } else if (!document.hidden && isSceneVisible && !frameId) {
        animate();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibilityChange);
    sceneObserver.observe(section);
    animate();

    dispose = () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      sceneObserver.disconnect();
      spiral.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) object.material.dispose();
      });
      textures.forEach((texture) => texture.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
    }

    let started = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      observer.disconnect();
      initialize().catch(() => {});
    }, { rootMargin: "200px" });

    observer.observe(section);

    return () => {
      cancelled = true;
      observer.disconnect();
      dispose();
    };
  }, []);

  return (
    <section className="service-image-tower" ref={sectionRef}>
      <div className="service-image-tower-heading" aria-live="polite">
        <p key={statementIndex}>{serviceStatements[locale][statementIndex]}</p>
        <div className="service-image-tower-loader" aria-hidden="true">
          <span key={statementIndex} />
        </div>
        <a className="service-image-tower-cta" href="#experience-center">
          {ctaLabels[locale]}
        </a>
      </div>
      <div className="service-image-tower-canvas" ref={canvasHostRef} />
    </section>
  );
}

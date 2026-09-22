import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  RotateCcw,
  Sparkles,
  Palette,
  Package,
  Building,
  Send,
  Sliders,
  Layers,
  Eye
} from 'lucide-react';

export const Maquila3DStudio: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Studio customization states
  const [companyName, setCompanyName] = useState<string>('MI EMPRESA');
  const [subtitle, setSubtitle] = useState<string>('AGUA PURIFICADA 100%');
  const [bottleType, setBottleType] = useState<'glass' | 'pet' | 'jug'>('glass');
  const [capColorHex, setCapColorHex] = useState<string>('#0284c7');
  const [batchVolume, setBatchVolume] = useState<number>(2500);

  // References to 3D objects for real-time updates
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const bottleGroupRef = useRef<THREE.Group | null>(null);
  const labelMeshRef = useRef<THREE.Mesh | null>(null);
  const capMeshRef = useRef<THREE.Mesh | null>(null);
  const reqAnimationRef = useRef<number | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const prevMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Cap colors palette
  const capColors = [
    { hex: '#0284c7', name: 'Azul Real Jalsuri' },
    { hex: '#06b6d4', name: 'Cyan Turquesa' },
    { hex: '#0f172a', name: 'Negro Ejecutivo' },
    { hex: '#d97706', name: 'Cobre / Dorado' },
    { hex: '#16a34a', name: 'Verde Ecológico' },
    { hex: '#f8fafc', name: 'Blanco Puro' },
  ];

  // Helper to create dynamic 2D canvas label texture
  const createLabelTexture = (name: string, sub: string, type: 'glass' | 'pet' | 'jug') => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Background gradient or pure white
    const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    bgGradient.addColorStop(0, '#ffffff');
    bgGradient.addColorStop(1, '#f0f9ff');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative top & bottom brand ribbons
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(0, 0, canvas.width, 26);
    ctx.fillRect(0, canvas.height - 26, canvas.width, 26);

    ctx.fillStyle = '#06b6d4';
    ctx.fillRect(0, 26, canvas.width, 8);
    ctx.fillRect(0, canvas.height - 34, canvas.width, 8);

    // Water Drop Crest Icon in center
    ctx.save();
    ctx.translate(canvas.width / 2, 140);
    ctx.fillStyle = '#06b6d4';
    ctx.beginPath();
    ctx.arc(0, 0, 48, 0, Math.PI * 2);
    ctx.fill();

    // Crest Letter / Monogram
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('J', 0, 2);
    ctx.restore();

    // Company Name
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 56px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const cleanName = (name.trim() || 'MI EMPRESA').toUpperCase();
    ctx.fillText(cleanName, canvas.width / 2, 280);

    // Subtitle / Tagline
    ctx.fillStyle = '#0284c7';
    ctx.font = '600 28px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText((sub.trim() || 'AGUA OZONIZADA 100% PURA').toUpperCase(), canvas.width / 2, 350);

    // Footer Badges
    ctx.fillStyle = '#64748b';
    ctx.font = '500 20px Inter, sans-serif';
    const volumeText = type === 'jug' ? 'CONT. NETO 20 LITROS • R.S. DIGESA' : 'CONT. NETO 625 ML • R.S. DIGESA';
    ctx.fillText(volumeText, canvas.width / 2, 420);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.needsUpdate = true;
    return texture;
  };

  // Build the 3D bottle mesh procedurally
  const buildBottleMesh = (type: 'glass' | 'pet' | 'jug', capColor: string, name: string, sub: string) => {
    if (!bottleGroupRef.current) return;
    const group = bottleGroupRef.current;

    // Clear previous children and dispose old geometries/materials
    while (group.children.length > 0) {
      const child = group.children[0] as THREE.Mesh;
      if (child.geometry) child.geometry.dispose();
      if (Array.isArray(child.material)) {
        child.material.forEach((m) => m.dispose());
      } else if (child.material) {
        child.material.dispose();
      }
      group.remove(child);
    }

    const capColorNumber = parseInt(capColor.replace('#', '0x'), 16);

    if (type === 'glass') {
      // 1. Premium Glass Bottle (Sleek, rounded shoulder, elegant neck)
      const points: THREE.Vector2[] = [];
      points.push(new THREE.Vector2(0, -1.8));
      points.push(new THREE.Vector2(0.75, -1.8));
      points.push(new THREE.Vector2(0.8, -1.7));
      points.push(new THREE.Vector2(0.8, 0.4));
      points.push(new THREE.Vector2(0.75, 0.9));
      points.push(new THREE.Vector2(0.45, 1.4));
      points.push(new THREE.Vector2(0.32, 1.8));
      points.push(new THREE.Vector2(0.32, 2.3));
      points.push(new THREE.Vector2(0.36, 2.32));
      points.push(new THREE.Vector2(0.36, 2.45));
      points.push(new THREE.Vector2(0.28, 2.45));

      const bottleGeo = new THREE.LatheGeometry(points, 48);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xe0f2fe,
        transmission: 0.9,
        opacity: 1,
        transparent: true,
        roughness: 0.05,
        metalness: 0.05,
        ior: 1.52,
        thickness: 0.4,
      });
      const bottleMesh = new THREE.Mesh(bottleGeo, glassMat);
      group.add(bottleMesh);

      // Glass Bottle Cap
      const capGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.32, 32);
      const capMat = new THREE.MeshStandardMaterial({
        color: capColorNumber,
        roughness: 0.3,
        metalness: 0.3,
      });
      const capMesh = new THREE.Mesh(capGeo, capMat);
      capMesh.position.y = 2.45;
      group.add(capMesh);
      capMeshRef.current = capMesh;

      // Wrap-around Label
      const labelTexture = createLabelTexture(name, sub, type);
      const labelGeo = new THREE.CylinderGeometry(0.81, 0.81, 1.35, 48, 1, true);
      const labelMat = new THREE.MeshStandardMaterial({
        map: labelTexture,
        side: THREE.DoubleSide,
        roughness: 0.35,
      });
      const labelMesh = new THREE.Mesh(labelGeo, labelMat);
      labelMesh.position.y = -0.55;
      group.add(labelMesh);
      labelMeshRef.current = labelMesh;

    } else if (type === 'pet') {
      // 2. PET Eco Bottle (Ergonomic contoured profile with grip indentations)
      const points: THREE.Vector2[] = [];
      points.push(new THREE.Vector2(0, -1.9));
      points.push(new THREE.Vector2(0.82, -1.9));
      points.push(new THREE.Vector2(0.85, -1.8));
      points.push(new THREE.Vector2(0.85, -0.6));
      points.push(new THREE.Vector2(0.72, -0.2)); // Grip waist
      points.push(new THREE.Vector2(0.84, 0.3));
      points.push(new THREE.Vector2(0.82, 0.8));
      points.push(new THREE.Vector2(0.48, 1.4));
      points.push(new THREE.Vector2(0.35, 1.7));
      points.push(new THREE.Vector2(0.35, 2.1));
      points.push(new THREE.Vector2(0.4, 2.12));
      points.push(new THREE.Vector2(0.4, 2.25));

      const bottleGeo = new THREE.LatheGeometry(points, 48);
      const petMat = new THREE.MeshPhysicalMaterial({
        color: 0xf0f9ff,
        transmission: 0.85,
        opacity: 1,
        transparent: true,
        roughness: 0.12,
        ior: 1.35,
        thickness: 0.25,
      });
      const bottleMesh = new THREE.Mesh(bottleGeo, petMat);
      group.add(bottleMesh);

      // PET Cap
      const capGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.28, 32);
      const capMat = new THREE.MeshStandardMaterial({
        color: capColorNumber,
        roughness: 0.4,
        metalness: 0.1,
      });
      const capMesh = new THREE.Mesh(capGeo, capMat);
      capMesh.position.y = 2.25;
      group.add(capMesh);
      capMeshRef.current = capMesh;

      // Label Wrap
      const labelTexture = createLabelTexture(name, sub, type);
      const labelGeo = new THREE.CylinderGeometry(0.86, 0.86, 1.15, 48, 1, true);
      const labelMat = new THREE.MeshStandardMaterial({
        map: labelTexture,
        side: THREE.DoubleSide,
        roughness: 0.3,
      });
      const labelMesh = new THREE.Mesh(labelGeo, labelMat);
      labelMesh.position.y = -1.1;
      group.add(labelMesh);
      labelMeshRef.current = labelMesh;

    } else if (type === 'jug') {
      // 3. Bidón 20L Corporativo (Substantial jug silhouette with ribs and neck)
      const points: THREE.Vector2[] = [];
      points.push(new THREE.Vector2(0, -1.8));
      points.push(new THREE.Vector2(1.35, -1.8));
      points.push(new THREE.Vector2(1.4, -1.6));
      points.push(new THREE.Vector2(1.4, 0.9));
      points.push(new THREE.Vector2(1.3, 1.3));
      points.push(new THREE.Vector2(0.6, 1.7));
      points.push(new THREE.Vector2(0.48, 2.2));
      points.push(new THREE.Vector2(0.52, 2.22));
      points.push(new THREE.Vector2(0.52, 2.35));

      const bottleGeo = new THREE.LatheGeometry(points, 48);
      const jugMat = new THREE.MeshPhysicalMaterial({
        color: 0x0284c7, // classic cyan/blue jug tint
        transmission: 0.7,
        opacity: 1,
        transparent: true,
        roughness: 0.2,
        ior: 1.38,
        thickness: 0.6,
      });
      const bottleMesh = new THREE.Mesh(bottleGeo, jugMat);
      group.add(bottleMesh);

      // Jug Cap
      const capGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.32, 32);
      const capMat = new THREE.MeshStandardMaterial({
        color: capColorNumber,
        roughness: 0.35,
        metalness: 0.2,
      });
      const capMesh = new THREE.Mesh(capGeo, capMat);
      capMesh.position.y = 2.36;
      group.add(capMesh);
      capMeshRef.current = capMesh;

      // Label Wrap for 20L
      const labelTexture = createLabelTexture(name, sub, type);
      const labelGeo = new THREE.CylinderGeometry(1.41, 1.41, 1.45, 48, 1, true);
      const labelMat = new THREE.MeshStandardMaterial({
        map: labelTexture,
        side: THREE.DoubleSide,
        roughness: 0.35,
      });
      const labelMesh = new THREE.Mesh(labelGeo, labelMat);
      labelMesh.position.y = -0.25;
      group.add(labelMesh);
      labelMeshRef.current = labelMesh;
    }
  };

  // Initialize Three.js scene
  useEffect(() => {
    const container = mountRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 450;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 6.2);

    // 3. Renderer with high-end settings
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
    mainLight.position.set(5, 8, 6);
    scene.add(mainLight);

    const cyanRimLight = new THREE.DirectionalLight(0x22d3ee, 0.9);
    cyanRimLight.position.set(-5, -2, -4);
    scene.add(cyanRimLight);

    const topFillLight = new THREE.DirectionalLight(0xbae6fd, 0.6);
    topFillLight.position.set(0, 7, 2);
    scene.add(topFillLight);

    // 5. Bottle Group
    const bottleGroup = new THREE.Group();
    bottleGroup.position.set(0, -0.2, 0);
    scene.add(bottleGroup);
    bottleGroupRef.current = bottleGroup;

    // Initial build
    buildBottleMesh(bottleType, capColorHex, companyName, subtitle);

    // 6. Animation loop
    const animate = () => {
      reqAnimationRef.current = requestAnimationFrame(animate);

      // Auto-rotation when not dragging
      if (!isDraggingRef.current && bottleGroupRef.current) {
        bottleGroupRef.current.rotation.y += 0.0035;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 7. Window resize handler
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (reqAnimationRef.current) cancelAnimationFrame(reqAnimationRef.current);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Update mesh when bottleType changes
  useEffect(() => {
    buildBottleMesh(bottleType, capColorHex, companyName, subtitle);
  }, [bottleType]);

  // Update cap color
  useEffect(() => {
    if (capMeshRef.current) {
      const col = parseInt(capColorHex.replace('#', '0x'), 16);
      (capMeshRef.current.material as THREE.MeshStandardMaterial).color.setHex(col);
    }
  }, [capColorHex]);

  // Update dynamic label texture when name or subtitle changes
  useEffect(() => {
    if (labelMeshRef.current) {
      const newTexture = createLabelTexture(companyName, subtitle, bottleType);
      if (newTexture) {
        (labelMeshRef.current.material as THREE.MeshStandardMaterial).map = newTexture;
        (labelMeshRef.current.material as THREE.MeshStandardMaterial).needsUpdate = true;
      }
    }
  }, [companyName, subtitle]);

  // Mouse / Touch Drag Event Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    prevMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !bottleGroupRef.current) return;
    const deltaX = e.clientX - prevMouseRef.current.x;
    const deltaY = e.clientY - prevMouseRef.current.y;

    bottleGroupRef.current.rotation.y += deltaX * 0.012;
    bottleGroupRef.current.rotation.x = Math.max(-0.4, Math.min(0.4, bottleGroupRef.current.rotation.x + deltaY * 0.006));

    prevMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const resetCamera = () => {
    if (bottleGroupRef.current) {
      bottleGroupRef.current.rotation.set(0, 0, 0);
    }
  };

  const handleRequestQuote = () => {
    const typeLabel =
      bottleType === 'glass' ? 'Botella Cristal Premium' : bottleType === 'pet' ? 'Botella PET Eco 625ml' : 'Bidón 20L Corporativo';
    const colorObj = capColors.find((c) => c.hex === capColorHex);

    const message = `*SOLICITUD DE MAQUILA Y EMBOTELLADO 3D*
─────────────────────────
🏷️ *Empresa / Marca:* ${companyName.toUpperCase()}
💬 *Subtítulo:* ${subtitle}
🍾 *Tipo de Envase:* ${typeLabel}
🎨 *Color de Tapa:* ${colorObj ? colorObj.name : capColorHex}
📦 *Volumen de Lote Estimado:* ${batchVolume.toLocaleString()} unidades

_Deseo solicitar una muestra física y cotización formal de producción para mi marca._`;

    window.open(`https://wa.me/51960695747?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="maquila3d" className="py-24 relative overflow-hidden bg-corporate-950 border-t border-slate-800">
      {/* Background glow */}
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-cyanbrand-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 -left-48 w-96 h-96 bg-corporate-700/15 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyanbrand-500/15 border border-cyanbrand-500/30 text-cyanbrand-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Estudio 3D Three.js</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Diseña tu Envase de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyanbrand-400 to-ice-200">
              Maquila en Tiempo Real
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Personaliza el nombre de tu empresa, tipo de envase y acabado de tapa. Interactúa con el modelo 3D con rotación 360° y solicita una muestra física.
          </p>
        </div>

        {/* Studio Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* 3D Canvas Viewport (Col 7) */}
          <div
            ref={mountRef}
            className="lg:col-span-7 bg-gradient-to-b from-corporate-900/90 to-corporate-950/90 border border-cyanbrand-500/30 rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col justify-between relative min-h-[460px] sm:min-h-[520px] backdrop-blur-xl"
          >
            {/* Viewport Top Controls */}
            <div className="flex justify-between items-center z-10 mb-3">
              <div className="flex items-center gap-2 bg-corporate-950/80 px-3 py-1.5 rounded-xl border border-corporate-800 text-xs font-semibold text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Motor 3D Interactivo WebGL</span>
              </div>

              <button
                onClick={resetCamera}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-corporate-800/80 hover:bg-corporate-700 text-xs text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                title="Centrar rotación 3D"
              >
                <RotateCcw className="w-3.5 h-3.5 text-cyanbrand-400" />
                <span>Reiniciar Vista</span>
              </button>
            </div>

            {/* Interactive WebGL Canvas Container */}
            <div
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              className="relative flex-1 w-full min-h-[340px] sm:min-h-[380px] rounded-2xl bg-radial from-corporate-800/40 via-corporate-950/50 to-corporate-950/80 border border-corporate-800/80 overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
            >
              <canvas ref={canvasRef} className="w-full h-full block" />

              {/* Interaction Hint Overlay */}
              <div className="absolute bottom-3 left-3 bg-corporate-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-cyanbrand-500/20 text-[11px] text-slate-300 pointer-events-none flex items-center gap-1.5 shadow-md">
                <Eye className="w-3.5 h-3.5 text-cyanbrand-400" />
                <span>Arrastra con el ratón o dedo para rotar 360°</span>
              </div>

              {/* Model Tag Pill */}
              <div className="absolute top-3 right-3 bg-corporate-950/85 px-3 py-1 rounded-lg border border-corporate-800 text-[10px] font-bold uppercase tracking-wider text-cyanbrand-300">
                {bottleType === 'glass' ? 'Cristal Premium' : bottleType === 'pet' ? 'PET Ergonómico' : 'Bidón 20L'}
              </div>
            </div>

            {/* Process Steps Bar */}
            <div className="grid grid-cols-4 gap-2 pt-4 mt-3 border-t border-corporate-800 text-center text-[10px] sm:text-[11px] text-slate-400">
              <div>
                <strong className="text-cyanbrand-400 block font-bold">Paso 1</strong>
                <span>Etiqueta 3D</span>
              </div>
              <div>
                <strong className="text-ice-200 block font-bold">Paso 2</strong>
                <span>Filtración 7 Fases</span>
              </div>
              <div>
                <strong className="text-cyanbrand-400 block font-bold">Paso 3</strong>
                <span>Embotellado DIGESA</span>
              </div>
              <div>
                <strong className="text-emerald-400 block font-bold">Paso 4</strong>
                <span>Despacho B2B</span>
              </div>
            </div>

          </div>

          {/* 3D Customizer Controls Panel (Col 5) */}
          <div className="lg:col-span-5 bg-corporate-950/90 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between space-y-6 backdrop-blur-xl">
            
            <div className="space-y-5">
              
              <div className="border-b border-corporate-800 pb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyanbrand-400" />
                  <span>Personalización de Marca & Envase</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Los cambios se reflejan en el modelo 3D en tiempo real
                </p>
              </div>

              {/* 1. Company Name input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <Building className="w-3.5 h-3.5 text-cyanbrand-400" />
                  <span>1. Nombre de tu Empresa / Marca</span>
                </label>
                <input
                  type="text"
                  value={companyName}
                  maxLength={30}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Ej. ACME CORP"
                  className="w-full bg-corporate-900 border border-corporate-700 rounded-xl px-4 py-2.5 text-sm text-white font-semibold focus:outline-none focus:border-cyanbrand-400 transition-colors"
                />
              </div>

              {/* Subtitle / Slogan input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-cyanbrand-400" />
                  <span>Subtítulo / Slogan de Etiqueta</span>
                </label>
                <input
                  type="text"
                  value={subtitle}
                  maxLength={35}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Ej. AGUA PURIFICADA PREMIUM"
                  className="w-full bg-corporate-900 border border-corporate-700 rounded-xl px-4 py-2.5 text-sm text-white font-semibold focus:outline-none focus:border-cyanbrand-400 transition-colors"
                />
              </div>

              {/* 2. Container Format */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <Package className="w-3.5 h-3.5 text-cyanbrand-400" />
                  <span>2. Tipo de Envase</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'glass', label: 'Cristal', desc: 'Premium' },
                    { id: 'pet', label: 'PET Eco', desc: '625 ml' },
                    { id: 'jug', label: 'Bidón', desc: '20 Litros' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setBottleType(item.id as any)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        bottleType === item.id
                          ? 'bg-cyanbrand-500/20 border-cyanbrand-400 text-white shadow-md'
                          : 'bg-corporate-900/60 border-corporate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <p className="text-xs font-bold">{item.label}</p>
                      <span className="text-[10px] text-cyanbrand-400">{item.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Cap Color Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <Palette className="w-3.5 h-3.5 text-cyanbrand-400" />
                  <span>3. Color de Tapa Hermética</span>
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  {capColors.map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => setCapColorHex(color.hex)}
                      className={`w-9 h-9 rounded-full transition-transform cursor-pointer border-2 ${
                        capColorHex === color.hex
                          ? 'scale-125 border-white shadow-lg ring-2 ring-cyanbrand-400'
                          : 'border-corporate-800 hover:scale-110'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Batch Volume Selection */}
              <div className="bg-corporate-900/70 p-4 rounded-2xl border border-corporate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-medium">Volumen de Lote Requerido:</span>
                  <strong className="text-cyanbrand-400 font-extrabold text-sm">
                    {batchVolume.toLocaleString()} unidades
                  </strong>
                </div>
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="500"
                  value={batchVolume}
                  onChange={(e) => setBatchVolume(Number(e.target.value))}
                  className="w-full h-2 bg-corporate-800 rounded-lg appearance-none cursor-pointer accent-cyanbrand-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 pt-1">
                  <span>500 un. (Mínimo)</span>
                  <span>2,500 un.</span>
                  <span>10,000+ un.</span>
                </div>
              </div>

            </div>

            {/* Action CTA */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleRequestQuote}
                className="w-full water-gradient-btn text-white font-black py-4 rounded-2xl shadow-xl shadow-cyanbrand-500/25 text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer group"
              >
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                <span>Solicitar Muestra Física con este Diseño</span>
              </button>

              <p className="text-[11px] text-center text-slate-400">
                Diseño de etiqueta incluido sin costo • Certificación sanitaria DIGESA impresa
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

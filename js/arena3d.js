/* LUTA — arena Three.js baixo-poli (ESM). HUD HTML fica por cima. */
import * as THREE from 'three';

const CACHE_V = '202609241808';
const FOG = 0x12101c;

const TEMAS = {
  areia: { fog: 0x2a2218, accent: 0xe8c36a, body: 0xc99448, trim: 0x8a6030 },
  forja: { fog: 0x2a1410, accent: 0xff6a3d, body: 0xa84830, trim: 0xffb050 },
  sombra: { fog: 0x1a1028, accent: 0xb08cff, body: 0x58288c, trim: 0x3a1860 },
  nevoa: { fog: 0x182028, accent: 0xb4d2e6, body: 0x5a7896, trim: 0x90a8b8 },
  pedra: { fog: 0x221810, accent: 0xc4965a, body: 0x7a5840, trim: 0x503820 },
  geada: { fog: 0x101828, accent: 0xa0e6ff, body: 0x5a96dc, trim: 0xd0f0ff },
  fogo: { fog: 0x281008, accent: 0xff5032, body: 0xc04020, trim: 0xffb428 },
  fresta: { fog: 0x081818, accent: 0x28b496, body: 0x0a2828, trim: 0x40e0c0 },
  pacto: { fog: 0x201010, accent: 0xe8c36a, body: 0x501414, trim: 0xc08040 },
  eclipse: { fog: 0x100818, accent: 0xe8c36a, body: 0x1a0828, trim: 0xb08cff },
};

const NARA_COLORS = { skin: 0xd4a888, shirt: 0x3a8f8a, pants: 0x1a2830, accent: 0x7ee0d0, hair: 0x2a1810 };

function detectLowEnd() {
  const ua = (navigator.userAgent || '').toLowerCase();
  const mobileUA = /android|iphone|ipad|ipod|mobile|opera mini|iemobile/.test(ua);
  const narrow = window.innerWidth <= 500;
  const dpr = window.devicePixelRatio || 1;
  const touch = 'ontouchstart' in window;
  return mobileUA || narrow || (touch && dpr >= 2 && window.innerWidth <= 900);
}

function makeHumanoid(colors, scale = 1) {
  const root = new THREE.Group();
  const mat = (hex, rough = 0.85) =>
    new THREE.MeshStandardMaterial({ color: hex, roughness: rough, metalness: 0.08 });

  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.55 * scale, 0.7 * scale, 0.32 * scale), mat(colors.shirt));
  torso.position.y = 1.15 * scale;
  root.add(torso);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.38 * scale, 0.38 * scale, 0.38 * scale), mat(colors.skin, 0.7));
  head.position.y = 1.72 * scale;
  root.add(head);

  const hair = new THREE.Mesh(new THREE.BoxGeometry(0.4 * scale, 0.16 * scale, 0.4 * scale), mat(colors.hair || 0x1a1210));
  hair.position.y = 1.95 * scale;
  root.add(hair);

  const pants = new THREE.Mesh(new THREE.BoxGeometry(0.5 * scale, 0.55 * scale, 0.3 * scale), mat(colors.pants));
  pants.position.y = 0.55 * scale;
  root.add(pants);

  const legL = new THREE.Mesh(new THREE.BoxGeometry(0.18 * scale, 0.45 * scale, 0.22 * scale), mat(colors.pants));
  legL.position.set(-0.14 * scale, 0.22 * scale, 0);
  root.add(legL);
  const legR = legL.clone();
  legR.position.x = 0.14 * scale;
  root.add(legR);

  const armL = new THREE.Mesh(new THREE.BoxGeometry(0.16 * scale, 0.55 * scale, 0.16 * scale), mat(colors.skin, 0.75));
  armL.position.set(-0.4 * scale, 1.15 * scale, 0);
  root.add(armL);
  const armR = armL.clone();
  armR.position.x = 0.4 * scale;
  root.add(armR);

  const accent = new THREE.Mesh(
    new THREE.BoxGeometry(0.58 * scale, 0.12 * scale, 0.34 * scale),
    mat(colors.accent, 0.55)
  );
  accent.position.y = 1.35 * scale;
  root.add(accent);

  root.userData = { armL, armR, torso, head, baseY: 0, pose: 0 };
  return root;
}

const api = {
  ready: false,
  lowFx: false,
};

let canvas, renderer, scene, camera, clock;
let floor, ring, pillars = [];
let naraRoot, rivalRoot;
let fxGroup;
let isLowEnd = false;
let shadowsOn = false;
let reducedMotion = false;
let running = false;
let shake = 0;
let flashColor = null;
let flashT = 0;
let telegraphKind = null;
let telegraphT = 0;
let idleT = 0;
let camBase;
let hemi, sun;
let currentTema = 'areia';
let particles = [];
let shieldMesh = null;
let arenaEl = null;
let failEl = null;
let raf = 0;

function clearParticles() {
  for (const p of particles) {
    fxGroup.remove(p.mesh);
    p.mesh.geometry?.dispose?.();
    p.mesh.material?.dispose?.();
  }
  particles = [];
}

function spawnBurst(x, y, z, color, n, speed = 2.2) {
  if (api.lowFx) n = Math.min(n, 6);
  const geo = new THREE.SphereGeometry(0.06, 6, 6);
  for (let i = 0; i < n; i++) {
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.95 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    fxGroup.add(mesh);
    const dir = new THREE.Vector3(
      (Math.random() - 0.5) * 2,
      Math.random() * 1.4 + 0.2,
      (Math.random() - 0.5) * 2
    ).normalize().multiplyScalar(speed * (0.6 + Math.random() * 0.6));
    particles.push({ mesh, vel: dir, life: 0.45 + Math.random() * 0.25, age: 0 });
  }
}

function buildArena() {
  const floorGeo = new THREE.CylinderGeometry(4.2, 4.2, 0.18, isLowEnd ? 24 : 40);
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x2a2438,
    roughness: 0.92,
    metalness: 0.05,
  });
  floor = new THREE.Mesh(floorGeo, floorMat);
  floor.receiveShadow = shadowsOn;
  scene.add(floor);

  const ringGeo = new THREE.TorusGeometry(3.6, 0.08, 8, isLowEnd ? 32 : 48);
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0xe8c36a,
    roughness: 0.45,
    metalness: 0.35,
    emissive: 0x3a2a10,
    emissiveIntensity: 0.35,
  });
  ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.12;
  scene.add(ring);

  const pillarGeo = new THREE.BoxGeometry(0.35, 2.4, 0.35);
  const pillarMat = new THREE.MeshStandardMaterial({ color: 0x3a3450, roughness: 0.88, metalness: 0.1 });
  pillars = [];
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const p = new THREE.Mesh(pillarGeo, pillarMat);
    p.position.set(Math.cos(a) * 3.9, 1.2, Math.sin(a) * 3.9);
    p.castShadow = shadowsOn;
    p.receiveShadow = shadowsOn;
    scene.add(p);
    pillars.push(p);
  }

  // back wall banners (low-poly slabs)
  const wall = new THREE.Mesh(
    new THREE.BoxGeometry(7.5, 3.2, 0.2),
    new THREE.MeshStandardMaterial({ color: 0x181420, roughness: 0.95 })
  );
  wall.position.set(0, 1.6, -4.6);
  scene.add(wall);

  naraRoot = makeHumanoid(NARA_COLORS, 1);
  naraRoot.position.set(-1.55, 0, 0.4);
  naraRoot.rotation.y = Math.PI * 0.15;
  scene.add(naraRoot);

  rivalRoot = makeHumanoid(
    { skin: 0xc4a07a, shirt: 0x884020, pants: 0x221818, accent: 0xe8c36a, hair: 0x1a1010 },
    1.05
  );
  rivalRoot.position.set(1.55, 0, 0.4);
  rivalRoot.rotation.y = -Math.PI * 0.15 - Math.PI;
  scene.add(rivalRoot);

  fxGroup = new THREE.Group();
  scene.add(fxGroup);

  shieldMesh = new THREE.Mesh(
    new THREE.TorusGeometry(0.55, 0.06, 8, 24),
    new THREE.MeshBasicMaterial({ color: 0x7ee0d0, transparent: true, opacity: 0 })
  );
  shieldMesh.rotation.y = Math.PI / 2;
  shieldMesh.visible = false;
  scene.add(shieldMesh);
}

function applyTema(tema, chefe) {
  currentTema = tema || 'areia';
  const t = TEMAS[currentTema] || TEMAS.areia;
  scene.background = new THREE.Color(t.fog);
  scene.fog = new THREE.FogExp2(t.fog, isLowEnd ? 0.055 : 0.04);
  if (ring?.material) {
    ring.material.color.setHex(t.accent);
    ring.material.emissive.setHex(t.accent);
    ring.material.emissiveIntensity = chefe ? 0.55 : 0.35;
  }
  if (rivalRoot) {
    // rebuild rival colors by mutating materials
    const cols = {
      skin: 0xc4a07a,
      shirt: t.body,
      pants: 0x1a1418,
      accent: t.accent,
      hair: 0x141018,
    };
    scene.remove(rivalRoot);
    rivalRoot = makeHumanoid(cols, chefe ? 1.18 : 1.05);
    rivalRoot.position.set(1.55, 0, 0.4);
    rivalRoot.rotation.y = -Math.PI * 0.15 - Math.PI;
    scene.add(rivalRoot);
  }
  if (hemi) hemi.color.setHex(t.accent);
  if (sun) sun.color.setHex(0xfff0d8);
}

function setupThree() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(FOG);
  scene.fog = new THREE.FogExp2(FOG, isLowEnd ? 0.055 : 0.04);

  camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80);
  camBase = new THREE.Vector3(0, 2.35, 6.2);
  camera.position.copy(camBase);
  camera.lookAt(0, 1.1, 0);

  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    alpha: false,
    powerPreference: 'high-performance',
  });
  const dprCap = isLowEnd ? 1.25 : 1.5;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = shadowsOn;
  if (shadowsOn) renderer.shadowMap.type = THREE.BasicShadowMap;

  hemi = new THREE.HemisphereLight(0xc8b8ff, 0x1a1018, 0.55);
  scene.add(hemi);
  const amb = new THREE.AmbientLight(0x8890a8, 0.35);
  scene.add(amb);
  sun = new THREE.DirectionalLight(0xfff0d8, 1.05);
  sun.position.set(-3.5, 7, 4);
  sun.castShadow = shadowsOn;
  if (shadowsOn) {
    sun.shadow.mapSize.set(512, 512);
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 24;
    sun.shadow.camera.left = -6;
    sun.shadow.camera.right = 6;
    sun.shadow.camera.top = 6;
    sun.shadow.camera.bottom = -6;
    sun.shadow.bias = -0.002;
  }
  scene.add(sun);

  buildArena();
  clock = new THREE.Clock();
}

function resize() {
  if (!renderer || !canvas || !arenaEl) return;
  const w = Math.max(1, arenaEl.clientWidth);
  const h = Math.max(1, arenaEl.clientHeight);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h, false);
}

function poseFighter(root, kind, t) {
  if (!root) return;
  const { armL, armR, torso, head } = root.userData;
  const breath = Math.sin(idleT * 2.2 + (root === naraRoot ? 0 : 1.2)) * 0.02;
  root.position.y = breath;
  if (kind === 'ataque') {
    const k = Math.sin(Math.min(1, t) * Math.PI);
    const baseX = root === naraRoot ? -1.55 : 1.55;
    const dir = root === naraRoot ? 1 : -1;
    root.position.x = baseX + dir * 0.75 * k;
    root.position.z = 0.4;
    if (armR) armR.rotation.x = -1.2 * k;
    if (torso) torso.rotation.z = -dir * 0.25 * k;
  } else if (kind === 'magia') {
    const k = Math.sin(Math.min(1, t) * Math.PI);
    if (armL) armL.rotation.x = -1.4 * k;
    if (armR) armR.rotation.x = -1.4 * k;
    if (head) head.position.y = 1.72 + 0.08 * k;
  } else if (kind === 'guarda') {
    const k = Math.min(1, t);
    if (armL) armL.rotation.x = -0.8 * k;
    if (armR) armR.rotation.x = -0.8 * k;
  } else if (kind === 'hit') {
    const k = Math.sin(Math.min(1, t) * Math.PI);
    root.position.x = (root === naraRoot ? -1.55 : 1.55) + k * (root === naraRoot ? -0.35 : 0.35);
    if (torso) torso.rotation.z = (root === naraRoot ? 1 : -1) * 0.35 * k;
  } else {
    if (armL) armL.rotation.x = 0;
    if (armR) armR.rotation.x = 0;
    if (torso) torso.rotation.z = 0;
    root.position.x = root === naraRoot ? -1.55 : 1.55;
    root.position.z = 0.4;
  }
}

let naraPose = { kind: null, t: 0 };
let rivalPose = { kind: null, t: 0 };

function setPose(side, kind) {
  const p = side === 'jogador' || side === 'nara' ? naraPose : rivalPose;
  p.kind = kind;
  p.t = 0;
}

function updatePoses(dt) {
  for (const [root, pose] of [
    [naraRoot, naraPose],
    [rivalRoot, rivalPose],
  ]) {
    if (pose.kind) {
      pose.t += dt / 0.42;
      poseFighter(root, pose.kind, pose.t);
      if (pose.t >= 1) {
        pose.kind = null;
        pose.t = 0;
        poseFighter(root, null, 0);
      }
    } else {
      poseFighter(root, null, 0);
    }
  }
}

function frame() {
  raf = requestAnimationFrame(frame);
  if (!running || !renderer) return;
  const dt = Math.min(0.05, clock.getDelta());
  idleT += dt;
  updatePoses(dt);

  // particles
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.age += dt;
    p.mesh.position.addScaledVector(p.vel, dt);
    p.vel.y -= 4 * dt;
    p.mesh.material.opacity = Math.max(0, 1 - p.age / p.life);
    if (p.age >= p.life) {
      fxGroup.remove(p.mesh);
      particles.splice(i, 1);
    }
  }

  if (telegraphKind) {
    telegraphT += dt;
    const pulse = 0.5 + 0.5 * Math.sin(telegraphT * 10);
    if (rivalRoot) rivalRoot.scale.setScalar(1 + pulse * 0.04);
    if (ring?.material) ring.material.emissiveIntensity = 0.35 + pulse * 0.4;
  } else if (rivalRoot) {
    rivalRoot.scale.setScalar(1);
  }

  if (flashT > 0) {
    flashT -= dt;
    if (flashColor && scene.background) {
      const mix = Math.max(0, flashT / 0.28);
      const base = (TEMAS[currentTema] || TEMAS.areia).fog;
      const c = new THREE.Color(base).lerp(new THREE.Color(flashColor), mix * 0.45);
      scene.background.copy(c);
    }
  }

  if (shieldMesh && shieldMesh.visible) {
    shieldMesh.material.opacity = Math.max(0, shieldMesh.material.opacity - dt * 1.4);
    if (shieldMesh.material.opacity <= 0.02) shieldMesh.visible = false;
  }

  // subtle camera orbit idle
  const bob = reducedMotion ? 0 : Math.sin(idleT * 0.6) * 0.08;
  camera.position.x = camBase.x + bob;
  camera.position.y = camBase.y;
  camera.position.z = camBase.z;
  if (shake > 0) {
    shake -= dt;
    camera.position.x += (Math.random() - 0.5) * shake * 0.35;
    camera.position.y += (Math.random() - 0.5) * shake * 0.25;
  }
  camera.lookAt(0, 1.1, 0);

  renderer.render(scene, camera);
}

function showFail(msg) {
  if (!arenaEl) return;
  if (!failEl) {
    failEl = document.createElement('p');
    failEl.className = 'arena-webgl-fail';
    failEl.setAttribute('role', 'status');
    arenaEl.appendChild(failEl);
  }
  failEl.textContent = msg;
  failEl.hidden = false;
  arenaEl.classList.remove('arena--webgl');
  arenaEl.classList.add('arena--fallback');
}

function hideFail() {
  if (failEl) failEl.hidden = true;
  if (arenaEl) {
    arenaEl.classList.add('arena--webgl');
    arenaEl.classList.remove('arena--fallback');
  }
}

api.init = function init(el, canvasEl) {
  arenaEl = el;
  canvas = canvasEl;
  if (!arenaEl || !canvas) return false;

  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  isLowEnd = detectLowEnd();
  api.lowFx = isLowEnd || reducedMotion;
  // mobile: no shadows by default (Chefe: sem shadows pesadas)
  shadowsOn = !isLowEnd && !reducedMotion;
  if (isLowEnd) shadowsOn = false;

  try {
    if (!THREE || !THREE.WebGLRenderer) {
      showFail('Não foi possível carregar o gráfico 3D. O duelo continua com o visual clássico.');
      return false;
    }
    setupThree();
    // força um frame; se WebGL falhar, cai no catch
    renderer.render(scene, camera);
    resize();
    window.addEventListener('resize', resize);
    if (window.ResizeObserver) {
      new ResizeObserver(resize).observe(arenaEl);
    }
    hideFail();
    api.ready = true;
    running = true;
    raf = requestAnimationFrame(frame);
    return true;
  } catch (err) {
    console.error('LUTA3D', err);
    showFail('Falha ao iniciar o gráfico 3D. O duelo continua com o visual clássico.');
    api.ready = false;
    return false;
  }
};

api.startFight = function startFight(opts = {}) {
  if (!api.ready) return;
  applyTema(opts.tema, !!opts.chefe);
  clearParticles();
  telegraphKind = null;
  naraPose = { kind: null, t: 0 };
  rivalPose = { kind: null, t: 0 };
  shake = 0;
  if (naraRoot) naraRoot.visible = true;
  if (rivalRoot) rivalRoot.visible = true;
  running = true;
  resize();
};

api.setVisible = function setVisible(on) {
  if (!api.ready) return;
  running = !!on;
  if (canvas) canvas.style.visibility = on ? 'visible' : 'hidden';
};

api.act = function act(side, kind) {
  if (!api.ready) return;
  const map = { atacar: 'ataque', ataque: 'ataque', magia: 'magia', defender: 'guarda', guarda: 'guarda' };
  const k = map[kind] || kind;
  setPose(side, k);
  if (k === 'guarda') {
    const root = side === 'jogador' || side === 'nara' ? naraRoot : rivalRoot;
    if (root && shieldMesh) {
      shieldMesh.position.copy(root.position);
      shieldMesh.position.y = 1.2;
      shieldMesh.visible = true;
      shieldMesh.material.color.setHex(side === 'jogador' || side === 'nara' ? 0x7ee0d0 : 0xe8c36a);
      shieldMesh.material.opacity = 0.85;
    }
  }
  if (k === 'magia') {
    const root = side === 'jogador' || side === 'nara' ? naraRoot : rivalRoot;
    if (root) {
      const t = TEMAS[currentTema] || TEMAS.areia;
      spawnBurst(root.position.x, 1.6, root.position.z, t.accent, api.lowFx ? 8 : 14, 2.8);
    }
  }
};

api.hit = function hit(side, opts = {}) {
  if (!api.ready) return;
  setPose(side, 'hit');
  const root = side === 'jogador' || side === 'nara' ? naraRoot : rivalRoot;
  const color = opts.critico ? 0xffe08a : opts.tipo === 'magia' ? 0xb08cff : 0xff8060;
  if (root) spawnBurst(root.position.x, 1.3, root.position.z, color, opts.critico ? 16 : 10, 3.2);
  shake = opts.critico || opts.forte ? 0.45 : 0.22;
  flashColor = color;
  flashT = 0.28;
};

api.telegraph = function telegraph(acao) {
  if (!api.ready) return;
  telegraphKind = acao || 'atacar';
  telegraphT = 0;
};

api.clearTelegraph = function clearTelegraph() {
  telegraphKind = null;
  if (rivalRoot) rivalRoot.scale.setScalar(1);
};

api.shake = function shakeCam(forte, tipo) {
  if (!api.ready) return;
  shake = forte || tipo === 'critico' ? 0.5 : 0.28;
  flashColor = tipo === 'magia' ? 0xb08cff : tipo === 'critico' ? 0xffe08a : tipo === 'guarda' ? 0x7ee0d0 : 0xff8060;
  flashT = 0.28;
};

api.victory = function victory() {
  if (!api.ready) return;
  shake = 0.15;
  if (ring?.material) ring.material.emissiveIntensity = 0.9;
  spawnBurst(0, 1.5, 0.4, 0xe8c36a, api.lowFx ? 12 : 22, 3.5);
};

api.defeat = function defeat() {
  if (!api.ready) return;
  if (naraRoot) setPose('jogador', 'hit');
  flashColor = 0x401018;
  flashT = 0.5;
};

window.LUTA3D = api;
export default api;

// auto-boot when DOM ready
function boot() {
  const arena = document.getElementById('arena');
  const c = document.getElementById('arena-canvas');
  if (!arena || !c) return;
  api.init(arena, c);
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

gsap.from(".intro-content", {
  duration: 2,
  opacity: 0,
  y: -30,
  ease: "power2.out"
});

// ===== Three.js Scene =====
const container = document.getElementById("scene-container");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 300, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, 300);
container.appendChild(renderer.domElement);

// ===== Stars Geometry =====
const starsGeometry = new THREE.BufferGeometry();
const starCount = 1000;
const starVertices = [];

for (let i = 0; i < starCount; i++) {
  const x = (Math.random() - 0.5) * 100;
  const y = (Math.random() - 0.5) * 100;
  const z = (Math.random() - 0.5) * 100;
  starVertices.push(x, y, z);
}

starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.5
});

const stars = new THREE.Points(starsGeometry, starMaterial);
scene.add(stars);

// ===== Animate Scene =====
function animate() {
  requestAnimationFrame(animate);
  stars.rotation.y += 0.0008;
  stars.rotation.x += 0.0004;
  renderer.render(scene, camera);
}

animate();
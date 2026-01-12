/**
 * Halo AI Studios: Cyber Logic Engine
 * Error Refraction & Persona Management
 */

const app = {
    // Initial State
    state: {
        hue: 180,
        theme: 'dark'
    },

    // 3D Engine
    init3D: () => {
        const canvas = document.getElementById('canvas-3d');
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);

        const geo = new THREE.TorusKnotGeometry(10, 3, 100, 16);
        const mat = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true });
        const mesh = new THREE.Mesh(geo, mat);
        scene.add(mesh);
        camera.position.z = 30;

        const animate = () => {
            requestAnimationFrame(animate);
            mesh.rotation.x += 0.01;
            // Sync 3D color with CSS variable
            const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary');
            mat.color.set(primary.trim());
            renderer.render(scene, camera);
        };
        animate();
    },

    // Persona Switching
    toggleTheme: () => {
        app.state.theme = app.state.theme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', app.state.theme);
        console.log(`[HALO] Theme shifted to: ${app.state.theme}`);
    },

    setHue: (newHue) => {
        app.state.hue = newHue;
        document.documentElement.style.setProperty('--primary-hue', newHue);
    },

    switchTab: (tabId, btn) => {
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
        btn.classList.add('active');
    }
};

document.addEventListener('DOMContentLoaded', app.init3D);
          

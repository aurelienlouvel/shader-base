import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    PlaneGeometry,
    ShaderMaterial,
    Mesh,
} from "three";
import FragmentShader from "./shader/main.frag";
import VertexShader from "./shader/main.vert";

function init() {
    let WIDTH = window.innerWidth;
    let HEIGHT = window.innerHeight;

    const scene = new Scene();
    const camera = new PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1);
    camera.position.z = 1;

    const renderer = new WebGLRenderer({
        alpha: true,
        antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xffffff, 0);
    renderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild(renderer.domElement);

    function onWindowResize() {
        WIDTH = window.innerWidth;
        HEIGHT = window.innerHeight;
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
        renderer.setSize(WIDTH, HEIGHT);
    }
    window.addEventListener("resize", onWindowResize, false);

    const geometry = new PlaneGeometry(1, 1, 1, 1);
    const material = new ShaderMaterial({
        vertexShader: VertexShader,
        fragmentShader: FragmentShader,
    });

    const plane = new Mesh(geometry, material);
    scene.add(plane);

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    requestAnimationFrame(animate);
}

document.addEventListener("DOMContentLoaded", init);
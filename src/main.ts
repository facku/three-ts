import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Scene,
  WebGLRenderer,
  FogExp2,
  PCFSoftShadowMap,
  TextureLoader,
} from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class App {
  scene = new Scene();
  camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new WebGLRenderer({ antialias: true });
  controls = new OrbitControls(this.camera, this.renderer.domElement);
  cube: Mesh;

  constructor() {
    const bgColor = 0xfcfcfc;
    document.body.style.margin = "0";
    document.body.style.overflow = "hidden";

    this.camera.position.set(0, 0.75, 1.5);
    this.camera.lookAt(0, 0, 0);

    this.scene.fog = new FogExp2(bgColor, 0.2);

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.renderer.setClearColor(bgColor);

    document.body.appendChild(this.renderer.domElement);

    this.cube = this.createBox();
    this.scene.add(this.cube);

    window.addEventListener("resize", this.resize);
  }

  createBox = () => {
    const loader = new TextureLoader();
    const wall = loader.load("wall.jpg");
    const geometry = new BoxGeometry(1, 1, 1, 3, 3, 3);
    const material = new MeshStandardMaterial({
      map: wall,
      normalMap: wall,
      roughness: 0.9,
      roughnessMap: wall,
    });
    const cube = new Mesh(geometry, material);
    cube.castShadow = true;
    cube.receiveShadow = true;
    return cube;
  };

  addPlane = () => {
    const geometry = new PlaneGeometry(50, 50, 4, 4);
    const material = new MeshStandardMaterial({ color: 0xffffff });
    const plane = new Mesh(geometry, material);
    plane.receiveShadow = true;
    plane.castShadow = true;
    plane.rotation.x = Math.PI / -2;
    plane.position.y = -0.5;
    this.scene.add(plane);
  };

  addLight = () => {
    const light = new PointLight(0xffffff, 1, 100);
    light.position.set(0, 10, 5);
    light.castShadow = true;
    light.shadow.mapSize.width = 512; // default
    light.shadow.mapSize.height = 512; // default
    light.shadow.camera.near = 0.01; // default
    light.shadow.camera.far = 500; // default
    this.scene.add(light);
  };

  init = () => this.animate();

  animate = () => {
    this.cube.rotateY(Math.PI / 180);
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate);
  };

  resize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };
}

const app = new App();

app.addLight();

app.addPlane();

app.init();

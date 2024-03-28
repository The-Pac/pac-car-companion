import * as THREE from "three";
import {LoadingManager} from "three";
import {degrees_to_radians, get_point_on_circle} from "./Tools.js";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry";
import {FontLoader} from 'three/addons/loaders/FontLoader.js';
import {BLACK_COLOR, COLD_LIGHT_COLOR} from "$lib/Colors.js";
import {event_to_three} from "$lib/stores.js";

const WORLD_SIZE = 6;
const CAR_GLB_URL = "./assets/gltf/car/car_chassis.glb"
const CAR_HOOD_GLB_URL = "./assets/gltf/car/hood.glb"
const CAR_TRUNK_GLB_URL = "./assets/gltf/car/trunk.glb"

const CAR_RADIATOR_GLB_URL = "./assets/gltf/car/engine_bay/radiator.glb"
const CAR_BATTERY_GLB_URL = "./assets/gltf/car/engine_bay/battery.glb"

const CAR_WHEEL_LEFT_GLB_URL = "./assets/gltf/car/wheel_left.glb"
const CAR_WHEEL_RIGHT_GLB_URL = "./assets/gltf/car/wheel_right.glb"

const SCENE_GLB_URL = "./assets/gltf/car/scene.glb"


const CAR_WHEELS_POSITION = {
    front_left: new THREE.Vector3(.7, .5, 1.23),
    front_right: new THREE.Vector3(-.7, .5, 1.23),
    back_left: new THREE.Vector3(.7, .5, -1.33),
    back_right: new THREE.Vector3(-.7, .5, -1.33),
}

const STANDARD_FONT_URL = "node_modules/three/examples/fonts/helvetiker_regular.typeface.json"
const CAMERA = {
    near: 0.1,
    far: 1000,
    fov: 70,
    position: {x: 3, y: 2.5, z: 5},
    rotation: {x: degrees_to_radians(-30), y: degrees_to_radians(30), z: degrees_to_radians(15)}
}

export class CarScene {
    /** @type {THREE.Scene}*/
    scene = new THREE.Scene()
    /** @type {THREE.WebGLRenderer}*/
    renderer = new THREE.WebGLRenderer();
    /** @type {FontLoader.Font}*/
    standard_font
    /** @type {FontLoader}*/
    font_loader = new FontLoader();
    /** @type {HTMLCanvasElement}*/
    canvas
    /** @type {THREE.PerspectiveCamera}*/
    camera
    /** @type {THREE.Group}*/
    light_group = new THREE.Group()
    /** @type {THREE.Group}*/
    car = new THREE.Group()
    /** @type {THREE.AnimationMixer}*/
    mixer = new THREE.AnimationMixer()
    /** @type {THREE.Clock}*/
    clock = new THREE.Clock();
    /** @type {Array<THREE.AnimationAction>}*/
    animation_actions = []
    /** @type {GLTFLoader}*/
    glb_loader

    /**
     * @constructor
     */
    constructor() {
        this.scene = new THREE.Scene();

        this.canvas = document.getElementById('canvas')
        this.camera = new THREE.PerspectiveCamera(CAMERA.fov, window.innerWidth / window.innerHeight, CAMERA.near, CAMERA.far);
        this.renderer = new THREE.WebGLRenderer({canvas: this.canvas, antialias: true});
        this.renderer.shadowMap.enabled = true
        this.renderer.toneMapping = THREE.ReinhardToneMapping
        this.renderer.toneMappingExposure = 2.3
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.resize()
    }

    async animate() {
        requestAnimationFrame(this.animate.bind(this));

        event_to_three.subscribe((value) => {
            this.animation_actions.map(animation => {
                if (animation.isRunning()) {
                    animation.stop()
                }
            })
            switch (value) {
                case 'on_car_service':
                    this.animation_actions['hood_open'].play().setLoop(THREE.LoopOnce)
                    this.animation_actions['trunk_open'].play().setLoop(THREE.LoopOnce)
                    break;
                case 'off_car_service':
                    this.animation_actions['hood_close'].play().setLoop(THREE.LoopOnce)
                    this.animation_actions['trunk_close'].play().setLoop(THREE.LoopOnce)
                    break;
                default:
                    break;
            }
        })

        this.camera.position.x = Math.sin(this.clock.elapsedTime / 2) * 5;
        this.camera.position.z = Math.cos(this.clock.elapsedTime / 2) * 5;

        this.camera.lookAt(this.car.position);

        this.mixer.update(this.clock.getDelta());
        this.render();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    async generate_scene() {
        this.standard_font = await this.font_loader.loadAsync(STANDARD_FONT_URL)
        this.glb_loader = this.init_loader_glb();

        this.initialisation_camera()
        await this.add_event_listener()
        await this.create_world()
        await this.create_car()

        await this.animate();
    }

    init_loader_glb() {
        const loader_manager = new LoadingManager()

        const loader = new GLTFLoader(loader_manager);

        const draco_loader = new DRACOLoader()
        draco_loader.setDecoderPath('libs/draco')
        loader.setDRACOLoader(draco_loader)

        return loader
    }

    async create_car() {
        let gltf_car = await this.glb_loader.loadAsync(CAR_GLB_URL)
        let gltf_car_hood = await this.glb_loader.loadAsync(CAR_HOOD_GLB_URL)
        let gltf_car_trunk = await this.glb_loader.loadAsync(CAR_TRUNK_GLB_URL)

        gltf_car_hood.animations.forEach(animation => {
            if (animation.name) {
                const clipAction = this.mixer.clipAction(animation, gltf_car_hood.scene);
                clipAction.clampWhenFinished = true;
                this.animation_actions[animation.name] = clipAction
            }
        })
        gltf_car_trunk.animations.forEach(animation => {
            if (animation.name) {
                const clipAction = this.mixer.clipAction(animation, gltf_car_trunk.scene);
                clipAction.clampWhenFinished = true;
                this.animation_actions[animation.name] = clipAction
            }
        })


        gltf_car.scene.traverse(c => {
            if (c.isMesh) {
                c.castShadow = true
                c.receiveShadow = true
                if (c.material.map) {
                    c.material.map.anisotropy = 16
                }
            }
        })
        gltf_car_hood.scene.traverse(c => {
            if (c.isMesh) {
                c.castShadow = true
                c.receiveShadow = true
                if (c.material.map) {
                    c.material.map.anisotropy = 16
                }
            }
        })
        gltf_car_trunk.scene.traverse(c => {
            if (c.isMesh) {
                c.castShadow = true
                c.receiveShadow = true
                if (c.material.map) {
                    c.material.map.anisotropy = 16
                }
            }
        })

        let car_chassis = gltf_car.scene
        let car_hood = gltf_car_hood.scene
        let car_trunk = gltf_car_trunk.scene


        car_chassis.position.setY(0.26)
        car_hood.position.setY(0.26)
        car_trunk.position.setY(0.26)


        const tires_bay = await this.create_tires();
        const engine_bay = await this.create_engine_bay();


        this.car.add(car_chassis, car_hood, car_trunk, engine_bay, tires_bay)

        this.scene.add(this.car)
    }

    async create_tires() {
        let tires_groupe = new THREE.Group()
        let gltf_wheel_left = await this.glb_loader.loadAsync(CAR_WHEEL_LEFT_GLB_URL)
        let gltf_wheel_right = await this.glb_loader.loadAsync(CAR_WHEEL_RIGHT_GLB_URL)

        gltf_wheel_right.scene.traverse(c => {
            if (c.isMesh) {
                c.castShadow = true
                c.receiveShadow = true
                if (c.material.map) {
                    c.material.map.anisotropy = 16
                }
            }
        })
        gltf_wheel_left.scene.traverse(c => {
            if (c.isMesh) {
                c.castShadow = true
                c.receiveShadow = true
                if (c.material.map) {
                    c.material.map.anisotropy = 16
                }
            }
        })

        let tire_back_left = gltf_wheel_right.scene.clone()
        let tire_back_right = gltf_wheel_left.scene.clone()
        let tire_front_left = gltf_wheel_right.scene.clone()
        let tire_front_right = gltf_wheel_left.scene.clone()

        tire_back_left.position.set(CAR_WHEELS_POSITION.back_left.x, CAR_WHEELS_POSITION.back_left.y, CAR_WHEELS_POSITION.back_left.z)
        tire_back_right.position.set(CAR_WHEELS_POSITION.back_right.x, CAR_WHEELS_POSITION.back_right.y, CAR_WHEELS_POSITION.back_right.z)
        tire_front_left.position.set(CAR_WHEELS_POSITION.front_left.x, CAR_WHEELS_POSITION.front_left.y, CAR_WHEELS_POSITION.front_left.z)
        tire_front_right.position.set(CAR_WHEELS_POSITION.front_right.x, CAR_WHEELS_POSITION.front_right.y, CAR_WHEELS_POSITION.front_right.z)

        tires_groupe.add(tire_back_left, tire_back_right, tire_front_left, tire_front_right)

        return tires_groupe
    }

    async create_engine_bay() {
        let engine_bay_groupe = new THREE.Group()

        let radiator_glb = await this.glb_loader.loadAsync(CAR_RADIATOR_GLB_URL)
        let battery_glb = await this.glb_loader.loadAsync(CAR_BATTERY_GLB_URL)

        radiator_glb.scene.traverse(c => {
            if (c.isMesh) {
                c.castShadow = true
                c.receiveShadow = true
                if (c.material.map) {
                    c.material.map.anisotropy = 16
                }
            }
        })
        battery_glb.scene.traverse(c => {
            if (c.isMesh) {
                c.castShadow = true
                c.receiveShadow = true
                if (c.material.map) {
                    c.material.map.anisotropy = 16
                }
            }
        })

        let radiator = radiator_glb.scene
        let battery = battery_glb.scene

        radiator.position.setY(0.26)
        battery.position.setY(0.26)

        engine_bay_groupe.add(radiator, battery)

        return engine_bay_groupe
    }

    resize() {
        if (this.canvas !== null) {
            this.canvas.style.height = "100%"
            this.canvas.style.width = "100%"
            this.canvas.height = this.canvas.offsetHeight
            this.canvas.width = this.canvas.offsetWidth
            const newWidth = this.canvas.offsetWidth
            const newHeight = this.canvas.offsetHeight

            this.renderer.setSize(newWidth, newHeight)
            this.camera.aspect = newWidth / newHeight
            this.camera.updateProjectionMatrix()
        }
    }

    async add_event_listener() {
        window.onresize = this.resize
        this.resize()
    }

    create_text(color, text, size) {
        const geometry = new TextGeometry(text, {
            font: this.standard_font,
            size: size,
            height: 0.01,
            curveSegments: 12,
            bevelEnabled: false,
        });
        const meshStandardMaterial = new THREE.MeshBasicMaterial({
            color: color
        });

        geometry.center()

        return new THREE.Mesh(geometry, meshStandardMaterial)
    }

    create_light() {

        const top_spot_light = new THREE.SpotLight(COLD_LIGHT_COLOR, 10);
        top_spot_light.castShadow = true
        top_spot_light.shadow.mapSize.width = 1024 * 4;
        top_spot_light.shadow.mapSize.height = 1024 * 4;
        top_spot_light.shadow.camera.near = 0.1;
        top_spot_light.shadow.camera.far = 500;
        top_spot_light.shadow.bias = -0.0001;
        top_spot_light.position.set(0, 4, 0)


        const spot_light = new THREE.SpotLight(COLD_LIGHT_COLOR, 5, 20);
        for (let i = 0; i <= 360; i += 36) {
            let position_on_circle = get_point_on_circle(WORLD_SIZE, i)
            spot_light.position.set(position_on_circle.x, 3, position_on_circle.y);
            this.light_group.add(spot_light.clone())
        }
        this.scene.add(top_spot_light, this.light_group);
    }

    async create_world() {

        let gltf_scene = await this.glb_loader.loadAsync(SCENE_GLB_URL)

        gltf_scene.scene.traverse(c => {
            if (c.isMesh) {
                c.castShadow = true
                c.receiveShadow = true
                if (c.material.map) {
                    c.material.map.anisotropy = 16
                }
            }
        })

        this.scene.add(gltf_scene.scene)

        this.scene.background = new THREE.Color(BLACK_COLOR)


        this.create_light()
    }

    initialisation_camera() {
        this.camera.far = WORLD_SIZE * 5
        this.camera.near = 0.01
        this.camera.up.set(0, 1, 0)
        this.camera.position.set(CAMERA.position.x, CAMERA.position.y, CAMERA.position.z)
        this.camera.rotation.set(CAMERA.rotation.x, CAMERA.rotation.y, CAMERA.rotation.z)

    }
}

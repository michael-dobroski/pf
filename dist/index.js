import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js'
import { OrbitControls } from 'https://unpkg.com/three@0.120.1/examples/jsm/controls/OrbitControls.js'

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// init

const sizes = {
    width: window.innerWidth,
    height:window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 1000)
camera.position.set(100,0,100)
scene.add(scene)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

const controls = new OrbitControls( camera, renderer.domElement )

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
renderer.shadowMap.enabled = true

// Loading images into VR environment
let materialArray = [];
let texture_ft = new THREE.TextureLoader().load( 'front.JPG' );
let texture_bk = new THREE.TextureLoader().load( 'back.JPG' );
let texture_up = new THREE.TextureLoader().load( 'top.JPG' );
let texture_dn = new THREE.TextureLoader().load( 'bot.JPG' );
let texture_rt = new THREE.TextureLoader().load( 'left.JPG' );
let texture_lf = new THREE.TextureLoader().load( 'right.JPG' );

//Overlapping mesh objects with textures  
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));
   
for (let i = 0; i < 6; i++)
  materialArray[i].side = THREE.BackSide;
   
let skyboxGeo = new THREE.BoxGeometry( 1000, 1000, 1000);
let skybox = new THREE.Mesh( skyboxGeo, materialArray );
scene.add( skybox );

function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
}

animate()
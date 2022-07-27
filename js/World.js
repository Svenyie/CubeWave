const renderer = new THREE.WebGLRenderer();

var cubes = [];
var spacing = 0;
var items= 16;
var size = 1;


renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var width = window.innerWidth
var height = window.innerHeight
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
// const camera = new THREE.OrthographicCamera( width / - 10, width / 10, height / 10, height / - 10, -100, 1000 );
let camset = size*items + spacing * items;
camera.position.set(camset + 2 * size +5 , camset/2, camset + 2 * size +5);
camera.lookAt(camset/2, 0, camset/2);

const scene = new THREE.Scene();

function scale(number, inMin, inMax, outMin, outMax) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}



for (let y = 0; y < items; y++) {
  for (let x = 0; x < items; x++) {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshNormalMaterial();
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(x *size + spacing*x , 0 ,y *size + spacing*y )
    scene.add(cube);
    cubes.push(cube)
   }
}

window.onresize = function () {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

};


var clock = new THREE.Clock();
var speed = 2; //units a second
var delta = 100;
var angle = 0;

render();
function render() {
  requestAnimationFrame(render);
  delta = clock.getDelta();
  let offset = 0;
  cubes.forEach((cube) => {
    let x = cube.position.x ;
    let y =cube.position.y;
    let z =cube.position.z;
    let offset = cube.position.distanceTo(new THREE.Vector3(camset/2,camset/2,camset/2))
    offset = scale(offset, 0, camset/2, -4, 4)
    let a = angle + offset;
    console.log(a)
    let h = scale(Math.sin(a), -1, 1, 1, 10);
    // console.log(h);
    cube.scale.set(1, h, 1);
  });
  angle += 0.02;

  renderer.render(scene, camera);
}

//check if they have WEBGL
if(!Detector.webgl){
	Detector.AddGetWebGLMessage();
}else{
	//them variables
	var container,camera,controls,scene,renderer,
		lighting,ambient,kLight,fLight,bLight,
		width = window.innerWidth,
		height = window.innerHeight;

		hWidth = window/2,
		hHeight = height/2;

	//initialize three
	init();
	animate();

	function init() {
		//get container
		container = document.getElementById('canvas');

		// set up det camera
		camera = new THREE.PerspectiveCamera(75, width/height, 1, 5000);
        camera.position.z = 20;
        camera.position.y = 25;
        camera.position.x = 20;

		//set up scene
		scene = new THREE.Scene();

		//lights
		ambient = new THREE.AmbientLight(0xffffff,1.25);
		//add the shit
		scene.add(ambient);

		//key lights THREE.DirectionalLight(color,intensity)
		kLight = new THREE.DirectionalLight(new THREE.Color(0xbd6000),1.0);
		//put the light somewhere x y z
		kLight.position.set(-100,0,100);

		//fill naman
		fLight = new THREE.DirectionalLight(new THREE.Color(0x0000bf),0.75);
		fLight.position.set(100,0,100);

		bLight = new THREE.DirectionalLight(new THREE.Color(0xffffff),1.0)
		bLight.position.set(100,0,-100).normalize(); //the fuq is normalize

		//add shit
		scene.add(kLight);
		scene.add(fLight);
		scene.add(bLight);

		//THE MATERIAL
		var mtlLoader = new THREE.MTLLoader();
		mtlLoader.setTexturePath('assets/');
		mtlLoader.setBaseUrl('assets/');
        mtlLoader.setPath('assets/');
		mtlLoader.load('piano.mtl', function(materials){

			//load shit
			materials.preload();


			//OBJECT
			var objLoader = new THREE.OBJLoader();
			//set up material
			objLoader.setMaterials(materials);
            objLoader.setPath('assets/');
			objLoader.load('piano.obj',function(object){
				scene.add(object);
			});
		});

		//RENDER TIME
		//the canvas
		renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true
		});
		// make the pixelness the pixelness of the shit
		renderer.setPixelRatio(window.devicePixelRatio);
		//size of the viewbox
		renderer.setSize(width,height);
		//background-color
		renderer.setClearColor(new THREE.Color(0xeeeeee));
		container.appendChild(renderer.domElement);// laag da canvas

		//CONTROLS
		controls = new THREE.TrackballControls(camera);
		controls.rotateSpeed = 2.0;
		controls.zoomSpeed = 2.2;
		controls.panSpeed = 1.8;

		controls.noZoom = false;
		controls.noPan = false;

		controls.staticMoving = true;
		controls.dynamicDampingFactor = 0.3;
		//[rotate, zoom, pan]
		controls.keys = [ 65, 83, 68];

		controls.addEventListener( 'change', render );

		//EVENTS

        window.addEventListener('resize', onWindowResize, false);

	}

	function onWindowResize() {

		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize(window.innerWidth, window.innerHeight);

	}

	function animate(){
		requestAnimationFrame(animate);
		controls.update();
		render();
	}

	//make the shit appear
	function render(){
		//i render mo na itey
		renderer.render(scene,camera);

	}

}//end else
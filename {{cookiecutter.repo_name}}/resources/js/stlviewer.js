
function STLViewerEnable(classname) {
    var models = document.getElementsByClassName(classname);
    for (var i = 0; i < models.length; i++) {
        STLViewer(models[i], models[i].getAttribute("data-src"));
    }
}

function STLViewer(elem, model) {

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    var camera = new THREE.PerspectiveCamera(50, elem.clientWidth / elem.clientHeight, 1, 1000);
    
    renderer.setSize(elem.clientWidth, elem.clientHeight);
    elem.appendChild(renderer.domElement);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.rotateSpeed = 0.7;
    controls.dampingFactor = 0.1;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.75;

    var scene = new THREE.Scene();

    scene.add(new THREE.HemisphereLight(0xffffff, 0x080820, 1.5));

    (new THREE.STLLoader()).load(model, function (geometry) {
        
        // Determine the color
        var colorString = elem.getAttribute("data-color")
        if(colorString != null) { var color = new THREE.Color(colorString); }
        else { var color = 0xffff33 }
        
        // Set up the material
        var material = new THREE.MeshPhongMaterial({ color: color, specular: 100, shininess: 100 });
        var mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Compute the middle
        var middle = new THREE.Vector3();
        geometry.computeBoundingBox();
        geometry.boundingBox.getCenter(middle);

        // Center it
        mesh.geometry.applyMatrix(new THREE.Matrix4().makeTranslation( -middle.x, -middle.y, -middle.z ) );
        
        // Rotate, if desired
        if(elem.getAttribute("data-rotate") == "x") 
            mesh.rotation.x = -Math.PI/3

        // Pull the camera away as needed
        var largestDimension = Math.max(geometry.boundingBox.max.x - geometry.boundingBox.min.x,
            geometry.boundingBox.max.y - geometry.boundingBox.min.y,
            geometry.boundingBox.max.z - geometry.boundingBox.min.z)
        camera.position.z = largestDimension * elem.getAttribute("data-zdistance");


        var animate = function () {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }; animate();


        const observer = new MutationObserver(function(mutationList, observer) {
            mutationList.forEach(element => {
                if(element.removedNodes.length > 0) {
                    renderer.dispose();
                    geometry.dispose();
                    material.dispose();
                    observer.disconnect();
                }
            })
        });
        observer.observe(elem.parentElement, {childList: true});

    window.addEventListener('resize', function () {
        renderer.setSize(elem.clientWidth, elem.clientHeight);
        camera.aspect = elem.clientWidth / elem.clientHeight;
        camera.updateProjectionMatrix();
    }, false);
    });
}

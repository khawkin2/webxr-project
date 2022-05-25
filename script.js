async function activateXR() {
  // Add a canvas element 
  const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);

  // Initialize a WebGL context that is compatible with WebXR.
  const gl = canvas.getContext("webgl", { xrCompatible: true });

  /**
   *  INITIALIZE THREE.js AND CREATE A SCENE
   */
  
  // Create a Scene
  const scene = new THREE.Scene();

  
  //Create a Camera
  const deviceFOV = Math.sqrt(Math.pow(window.innerHeight, 2) + Math.pow(window.innerWidth, 2));
  const camera = new THREE.PerspectiveCamera(deviceFOV, window.width/window.height, 0.1, 1000);

  // The API directly updates the camera matrices.
  // Disable matrix auto updates so three.js doesn't attempt
  // to handle the matrices independently.
  camera.matrixAutoUpdate = false;

  /**
   *  SET UP RENDERING USING THREE.js
   */

  // Set up the WebGLRenderer, which handles rendering to the session's base layer.
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    preserveDrawingBuffer: true,
    canvas: canvas,
    context: gl,
    antialias: true,
  });
  renderer.autoClear = false;

  /**
   *  CREATE A SHAPE
   */

  // Select colour(s) to use
  const materials = [
    new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true })
  ];

  // Select desired shape (in this case Cube)
  const geometry = new THREE.BoxBufferGeometry(1, 1, 1);

  // Create the cube
  const cube = new THREE.Mesh (geometry, materials);
  cube.position.set(5, 5, 5);

  // Add it to the demo scene.
  scene.add(cube);
  
  /**
   *  CREATE AN XRSession
   */

  // Initialize a WebXR session using "immersive-ar".
  const session = await navigator.xr.requestSession("immersive-ar");
  session.updateRenderState({
    baseLayer: new XRWebGLLayer(session, gl),
  });

  // A 'local' reference space has a native origin that is located
  // near the viewer's position at the time the session was created.
  const referenceSpace = await session.requestReferenceSpace("local");

  /**
   *  RENDER THE SCENE
  */

  // Create a render loop that allows us to draw on the AR view.
  const onXRFrame = (time, frame) => {
    // Queue up the next draw request.
    session.requestAnimationFrame(onXRFrame);

    // Bind the graphics framebuffer to the baseLayer's framebuffer
    gl.bindFramebuffer(
      gl.FRAMEBUFFER,
      session.renderState.baseLayer.framebuffer
    );

    // Retrieve the pose of the device.
    // XRFrame.getViewerPose can return null while the session attempts to establish tracking.
    const pose = frame.getViewerPose(referenceSpace);

    if (pose) {
      // In mobile AR, we only have one view.
      const view = pose.views[0];

      const viewport = session.renderState.baseLayer.getViewport(view);
      renderer.setPixelRatio(viewport.devicePixelRatio);
      renderer.setSize(viewport.width, viewport.height);

      // Use the view's transform matrix and projection matrix to configure the THREE.camera.
      camera.matrix.fromArray(view.transform.matrix);
      camera.projectionMatrix.fromArray(view.projectionMatrix);
      camera.updateMatrixWorld(true);

      // Render the scene with THREE.WebGLRenderer.
      renderer.render(scene, camera);
    }
  };
  session.requestAnimationFrame(onXRFrame);
}

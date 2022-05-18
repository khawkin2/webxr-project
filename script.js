async function activateXR() {
  // Add a canvas element 
  const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);

  // Initialize a WebGL context that is compatible with WebXR.
  const gl = canvas.getContext("webgl", { xrCompatible: true });

  /*
      INITIALIZE THREE.js AND CREATE A SCENE
  */
  
  // Create a Scene
  const scene = new THREE.Scene();

  // Select colour(s) to use
  const materials = [
    new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    new THREE.MeshBasicMaterial({ color: 0x0000ff }),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    new THREE.MeshBasicMaterial({ color: 0xff00ff }),
    new THREE.MeshBasicMaterial({ color: 0x00ffff }),
    new THREE.MeshBasicMaterial({ color: 0xffff00 }),
  ];

  // Select desired shape (in this case Cube)
  const geometry = new THREE.BoxBufferGeometry(0.5, 0.5, 0.5);

  // Create the cube
  const cube = new THREE.Mesh (geometry, materials);
  cube.position.set(2.5, 2.5, 2.5);

  // Add it to the demo scene.
  scene.add(cube);

  /*
      SET UP RENDERING USING THREE.js
  */

  // Set up the WebGLRenderer, which handles rendering to the session's base layer.
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    preserveDrawingBuffer: true,
    canvas: canvas,
    context: gl,
    //added from https://redstapler.co/three-js-tutorial-hello-world/
    antialias: true,
  });
  renderer.autoClear = false;

  // The API directly updates the camera matrices.
  // Disable matrix auto updates so three.js doesn't attempt
  // to handle the matrices independently.
  const camera = new THREE.PerspectiveCamera();
  camera.matrixAutoUpdate = false;

  /*
      CREATE AN XRSession
  */

  // Initialize a WebXR session using "immersive-ar".
  const session = await navigator.xr.requestSession("immersive-ar");
  session.updateRenderState({
    baseLayer: new XRWebGLLayer(session, gl),
  });

  // A 'local' reference space has a native origin that is located
  // near the viewer's position at the time the session was created.
  const referenceSpace = await session.requestReferenceSpace("local");

  /*
      RENDER THE SCENE
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

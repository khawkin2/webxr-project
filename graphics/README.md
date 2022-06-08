# Picking a Graphics Library

Many of these are listed on the [WebXR](https://immersiveweb.dev/) website.

## Development Platforms
| Platform                                                                                     | Advantage(s)          | Disadvantage(s) |
|----------------------------------------------------------------------------------------------|-----------------------|-----------------|
| [Babylon.js](https://doc.babylonjs.com/divingDeeper/webXR/introToWebXR)                      | [Built-in visual debugging tool](https://doc.babylonjs.com/toolsAndResources/tools/inspector)| [Limitations with graphics](https://forum.babylonjs.com/t/is-babylon-js-for-me/24502)|
| [GoDot](https://docs.godotengine.org/en/stable/classes/class_webxrinterface.html)            | [Lightweight option](https://www.quora.com/What-kind-of-advantages-does-the-Godot-engine-have-over-other-game-engines)| [3D scaling is not smooth](https://www.quora.com/Is-Godot-better-than-Unity-for-developing-a-game-What-are-the-pros-and-cons)|
| [PlayCanvas](https://developer.playcanvas.com/en/user-manual/xr/using-webxr/)                | [Can visually edit projects](https://developer.playcanvas.com/en/user-manual/introduction/)| [Storage Limitations](https://forum.playcanvas.com/t/you-are-great-but-the-storage-is-too-small/10508)|
| [Unity](https://de-panther.github.io/unity-webxr-export/Documentation/Getting-Started.html)  | [Its XR Interaction Toolkit simplifies development, WebXR even has its own plugin](https://creatxr.com/start-your-game-engine-unity-vs-unreal-for-xr-development/)| [EditorXR is quite clunky - testing requires deploying program each time ](https://creatxr.com/start-your-game-engine-unity-vs-unreal-for-xr-development/)|
| [Wonderland](https://wonderlandengine.com/about/what-is-wle/)                                | [Visual editor allows for live-reloading](https://wonderlandengine.com/about/what-is-wle/#develop-more-rapidly-iterate-faster-flow) <br/> [It is a WebAssembly 3D Engine](https://wonderlandengine.com/about/optimizations/#webassembly) <br/> [See more here!](https://wonderlandengine.com/news/5-benefits-of-webxr/)| [It is still a fairly new engine creating some skeptics](https://www.reddit.com/r/WebVR/comments/jopip7/wonderland_engine_webxr_focused_game_engine/)|

## Web Frameworks
| Framework                                                                                    | Advantage(s) | Disadvantage(s) |
|----------------------------------------------------------------------------------------------|--------------|-----------------|
| [A-Frame](https://aframe.io/docs/1.3.0/components/webxr.html#sidebar)                        | [Has comprehensive HTML API and is flexible](https://medium.com/hexavara-tech/how-i-built-webxr-using-a-frame-preact-snowpack-6cee19c72d81)| [The requirment of a secure connection can make testing difficult (author provides workarounds)](https://medium.com/samsung-internet-dev/making-an-ar-game-with-aframe-529e03ae90cb)|
| [p5.xr](https://p5xr.org/#/?id=getting-started)                                              | [Can run p5.js sketches in XR](https://github.com/stalgiag/p5.xr)| [Performance issues and missing VR headset actions](https://medium.com/processing-foundation/improving-the-p5-xr-library-through-artistic-examples-13d35557ff)|
| [Three.js](https://threejs.org/docs/)                                                        | [Lightweight, cross-browser 3D library](https://github.com/mrdoob/three.js/blob/dev/README.md)| [Performance / resolution issues](https://discourse.threejs.org/t/webxr-quality-problems/24603)|

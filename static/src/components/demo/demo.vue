<template>
  <div id="canvas-box">
    <h3>个人项目</h3>
    <h3>团队项目</h3>
    <h3>团队项目</h3>
    <h3>团队项目</h3>
  </div>
</template>

<script>
  import THREE from './../../../node_modules/three/three.min.js'
  export default {
    name: 'demo',
    data () {
      return {}
    },
    ready () {
      let scene, camera, renderer, light, width, height
      function initThree () {
        let canvas = document.querySelector('#canvas-box')
        width = canvas.clientWidth / 2
        height = canvas.clientHeight
        renderer = new THREE.WebGLRenderer({
          antialias: true
        })

        renderer.setSize(width, height)
        canvas.appendChild(renderer.domElement)
        renderer.setClearColor(0xcccccc, 1.0)
      }

      function initCamera () {
        camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000)
        camera.position.x = 0
        camera.position.y = 1000
        camera.position.z = 0
        camera.up.x = 0
        camera.up.y = 0
        camera.up.z = 0
        camera.lookAt({x: 0, y: 0, z: 0})
      }

      function initScene () {
        scene = new THREE.Scene()
      }

      function initLight () {
        light = new THREE.DirectionalLight(0xFFFFFF, 1.0)
        light.position.set(0, 1, 0)
        scene.add(light)
      }

      function initCube () {
        let geometry = new THREE.Geometry()
        let material = new THREE.LineBasicMaterial({vertexColors: true})
        let color1 = new THREE.Color(0x000000)
        let color2 = new THREE.Color(0xFFFFFF)
        let point1 = new THREE.Vector3(-30, 0, 30)
        let point2 = new THREE.Vector3(30, 0, -30)
        geometry.vertices.push(point1)
        geometry.vertices.push(point2)
        geometry.colors.push(color1, color2)

        let line = new THREE.Line(geometry, material, THREE.LineSegments)
        scene.add(line)
      }

      function threeStart () {
        initThree()
        initCamera()
        initScene()
        initLight()
        initCube()
        renderer.clear()
        renderer.render(scene, camera)
      }
      threeStart()
      window.scene = scene
      window.THREE = THREE
    }
  }
</script>

<style lang="scss" scoped>
  @import './../../assets/style/mixin.scss';
</style>
<template>
    <div ref="reference"></div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export default {
    name: 'three',

    data() {
        return {
            
        };
    },

    mounted() {
        this.initThree()
    },

    methods: {
        // 初始化一个three.js
        initThree() {
            const w = window.innerWidth
            const h = window.innerHeight

            // 初始化一个容器（场景）
            const scene = new THREE.Scene()

            // 创建一个物体 几何体+材质  mesh 用于合成物体 
            const geometry = new THREE.BoxGeometry(100,60,60)
            const material = new THREE.MeshLambertMaterial({color:0x66ccff,transparent:true,opacity:0.5})
            const wuping = new THREE.Mesh(geometry, material)
            scene.add(wuping)

            // 光线
            const light = new THREE.AmbientLight(0xffffff,0.5)
            scene.add(light)

            // 相机
            const camera  = new THREE.PerspectiveCamera(75,w/h,0.1,1000)
            camera.position.set(200,200,200) // 设置相机位置
            camera.lookAt(0,0,0) // 设置相机观看位置

            // 渲染器
            const renderer = new THREE.WebGLRenderer({antialias:true})
            renderer.setSize(w,h)

            this.$refs.reference.appendChild(renderer.domElement);
            // renderer.render(scene,camera)

            // 创建轨道控制器
            const controls = new OrbitControls(camera,renderer.domElement)

            //添加坐标轴辅助器
            const axesHelper = new THREE.AxesHelper(200)
            scene.add(axesHelper)

            function render(time) {
                // wuping.rotation.x += 0.01;
                // wuping.rotation.y += 0.01;
                // let t = time / 1000 % 5
                // wuping.position.x = t * 1
                wuping.rotateY(0.01)
                renderer.render(scene,camera);
                requestAnimationFrame(render);
            }
            render()
        }
    },
};
</script>

<style scoped>
    
</style>
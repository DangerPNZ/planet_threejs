'use strict';
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var canvas = document.querySelector('#canvas');
        var width = window.innerWidth;
        var height = window.innerHeight;
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        var renderer = new THREE.WebGLRenderer({canvas: canvas});
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
        var light = new THREE.PointLight( 0x404040, 7, 5000, 2);
        light.position.set( -200, 50, 1250);
        var controlsCamera = new THREE.OrbitControls(camera);
        var controlsLight = new THREE.OrbitControls(light);
        var geometry = new THREE.SphereGeometry(250, 100, 100);
        var matherial = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('./img/earth.jpg'),
            displacementMap: new THREE.TextureLoader().load('./img/earth_r.jpg'),
            displacementScale: 20
        });
        var mesh = new THREE.Mesh(geometry, matherial);

        var ball = {
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            positionX: 0,
            positionY: 0,
            positionZ: 0
        };
        var gui = new dat.GUI();
        gui.add(ball, 'rotationY').min(-0.02).max(0.02).step(0.00001);
        gui.add(ball, 'rotationX').min(-0.02).max(0.02).step(0.00001);
        gui.add(ball, 'rotationZ').min(-0.02).max(0.02).step(0.00001);
        gui.add(ball, 'positionX').min(-5).max(5).step(0.01);
        gui.add(ball, 'positionY').min(-5).max(5).step(0.01);
        gui.add(ball, 'positionZ').min(-5).max(5).step(0.01);
        var loop = function () {
            mesh.rotation.x += ball.rotationX;
            mesh.rotation.y += ball.rotationY;
            mesh.rotation.z += ball.rotationZ;
            mesh.position.x += ball.positionX;
            mesh.position.y += ball.positionY;
            mesh.position.z += ball.positionZ;
            renderer.render(scene, camera);
            requestAnimationFrame(loop);
        };
        renderer.render(scene, camera);
        renderer.setClearColor(0x000000);
        camera.position.set(0, 0, 1000);
        controlsCamera.update();
        controlsLight.update();
        scene.add(light);
        scene.add(mesh);
        loop();
    });
})();
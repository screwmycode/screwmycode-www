import * as THREE from 'three'

export const ThreeMeshesCube = (scene, scale) => {

    const group = new THREE.Group ()

    scene.add (group)

    const cube = new THREE.BoxBufferGeometry (
        scale.default * scale.front,
        scale.default * scale.front,
        scale.default * scale.front,
    )

    const cubeMesh = new THREE.Mesh (
        cube,
        new THREE.MeshNormalMaterial (),
    )

    group.add (cubeMesh)

    return group

}


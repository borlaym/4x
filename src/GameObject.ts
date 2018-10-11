import { Mesh } from "three";

import * as THREE from "three";

export default abstract class GameObject {
	public abstract mesh: Mesh
	public hitBox: Mesh
	public isHighlighted: boolean = false
	public namePlate: THREE.Sprite
	protected canvas: HTMLCanvasElement
	protected ctx: CanvasRenderingContext2D
	constructor(
		hitBoxDimensions: number
	) {
		const hitBoxBox = new THREE.BoxGeometry(hitBoxDimensions, hitBoxDimensions, hitBoxDimensions, 1, 1, 1)
		const hitBoxMaterial = new THREE.MeshBasicMaterial({ visible: false })
		this.hitBox = new THREE.Mesh(hitBoxBox, hitBoxMaterial)

		const canvas = document.createElement('canvas')
		const ctx = canvas.getContext('2d')
		if (!ctx) {
			throw new Error('cant init canvas')
		}

		this.canvas = canvas
		this.ctx = ctx

		const namePlateTexture = new THREE.CanvasTexture(this.canvas)
		const namePlateMaterial = new THREE.SpriteMaterial({
			map: namePlateTexture,
			color: 0xffffff
		})
		this.namePlate = new THREE.Sprite(namePlateMaterial)
		this.namePlate.scale.x = 64
		this.namePlate.scale.y = 32
		this.namePlate.position.y = hitBoxDimensions / 2

	}

	public init() {
		this.mesh.add(this.namePlate)
		this.mesh.add(this.hitBox)
	}

	public update() {
		if (this.isHighlighted) {
			this.namePlate.material.visible = true
		} else {
			this.namePlate.material.visible = false
		}
	}

}


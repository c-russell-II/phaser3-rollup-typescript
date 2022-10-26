import Phaser from "phaser";
export default class Demo extends Phaser.Scene {
	constructor() {
		super("GameScene");
	}
	player: any;
	preload() {
		this.load.atlas(
			"knight",
			"assets/splitKnight.png",
			"assets/splitKnight.json"
		);
	}
	create() {
		this.matter.world.setBounds(0, 0, 800, 600);
		const floor = this.add.rectangle(400, 500, 800, 100, 0x666666);
		this.matter.add.gameObject(floor, { isStatic: true });
		const idleFrames = this.anims.generateFrameNames("knight", {
			start: 0,
			end: 9,
			zeroPad: 1,
			prefix: "_Idle/_Idle-",
			suffix: ".png",
		});
		this.anims.create({
			key: "idle",
			frames: idleFrames,
			frameRate: 10,
			repeat: -1,
		});
		const runFrames = this.anims.generateFrameNames("knight", {
			start: 0,
			end: 9,
			zeroPad: 1,
			prefix: "_Run/_Run-",
			suffix: ".png",
		});
		this.anims.create({
			key: "run",
			frames: runFrames,
			frameRate: 10,
			repeat: -1,
		});
		const rollFrames = this.anims.generateFrameNames("knight", {
			start: 0,
			end: 11,
			prefix: "_Roll/_Roll-",
			suffix: ".png",
		});
		this.anims.create({
			key: "roll",
			frames: rollFrames,
			frameRate: 20,
			repeat: 0,
		});
		this.player = this.matter.add.sprite(
			100,
			450,
			"knight",
			"_Idle/_Idle-0.png"
		);
		this.player.play("idle");
		this.player.setInteractive();
		this.player.cursors = this.input.keyboard.createCursorKeys();
		this.input.keyboard.on("keydown-SHIFT", () => {
			console.log("SHIFT pressed");
			if (this.player.anims.currentAnim.key == "roll") {
				return;
			}
			if (this.player.anims.currentAnim.key == "run") {
				this.player.play("roll", false);
			}
		});
	}
	update() {
		if (this.player.anims.currentAnim.key === "roll") {
			const direction = this.player.flipX ? -1 : 1;
			this.player.x += 3 * direction;
			this.player.on(
				"animationcomplete",
				(animation: Phaser.Animations.Animation) => {
					this.player.play("idle");
				}
			);
		} else {
			// Moves left and right with arrow keys
			if (this.player.cursors.left.isDown) {
				this.player.x -= 2;
				this.player.play("run", true).flipX = true;
			} else if (this.player.cursors.right.isDown) {
				this.player.x += 2;
				this.player.play("run", true).flipX = false;
			} else {
				this.player.play("idle", true);
			}
		}
	}
}

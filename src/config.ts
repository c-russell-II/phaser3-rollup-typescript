import Phaser from 'phaser';

export default {
	type: Phaser.AUTO,
	parent: "game",
	backgroundColor: "#33A5E7",
	physics: {
		default: "matter",
		matter: {},
	},
	scale: {
		width: 800,
		height: 600,
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
};

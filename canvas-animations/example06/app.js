/*global  window,document,setInterval */

(function(){

	var MAX_ACTORS = 25;
	var WIDTH = 800;
	var HEIGHT = 600;
	var FPS = 30;
	var actors = [];
	var context = null;
	var stage = {};

	// STAGE Object
	function Stage() {
		this.c = "#000000"; // color
		this.l = 0; // left
		this.r = WIDTH; // right
		this.t = 0; // top
		this.b = HEIGHT; // bottom
	}

	Stage.prototype = {

		render: function() {

		},

		clear: function() {
			context.fillStyle = this.c;
			context.fillRect(0, 0, WIDTH, HEIGHT);
		},

		circleHitTest: function(a,b) {

		}

	};

	// ACTOR Object
	function Actor() {
		this.c = "#FFFFFF"; // color
		this.x = WIDTH / 2 * Math.random();
		this.y = HEIGHT / 2 * Math.random();
		this.r = 50 * Math.random(); // radius
		this.vx = 5 * Math.random(); // velocity x
		this.vy = 5 * Math.random(); // velocity y
	}

	Actor.prototype = {

		calc: function() {
			// border bouncing
			this.x = this.x + this.vx;
			this.y = this.y + this.vy;
			if (this.x + this.r > stage.r) {
				this.x = stage.r - this.r;
				this.vx = this.vx * -1;
			} else if (this.x - this.r < stage.l) {
				this.x = stage.l + this.r;
				this.vx = this.vx * -1;
			}
			if (this.y + this.r > stage.b) {
				this.y = stage.b - this.r;
				this.vy = this.vy * -1;
			} else if (this.y - this.r < stage.t) {
				this.y = stage.t + this.r;
				this.vy = this.vy * -1;
			}
		},

		draw: function() {
			context.fillStyle = this.c;
			context.beginPath();
			context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
			context.fill();
		}
	};

	function init() {

		var canvas = document.getElementById('canvas');
		stage = new Stage();

		canvas.width = WIDTH;
		canvas.height = HEIGHT;
		context = canvas.getContext("2d");

		// create set of actors
		for (var i = 0; i < MAX_ACTORS; i++) {
			actors.push(new Actor());
		}

		// request animation frame
		var onFrame = window.requestAnimationFrame;

		function tick(timestamp) {
			stage.render();
			onFrame(tick);
		}

		onFrame(tick);
	}

	window.onload = init;

}());
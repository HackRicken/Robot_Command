const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let particles = [], W, H;

window.onresize = function () {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    let nums = W * H / 5000;
    createParticles(nums);
    // console.log(particles);
};

class Particle {
    constructor() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.r = Math.random() * 2 + 1;
        this.vx = Math.random() - 0.5;
        this.vy = Math.random() * 0.5 + 1;
        return this;
    }
    move() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > W) {
            this.x = Math.random() * W;
            this.y = 0;
        }

        if (this.y > H) {
            this.y = 0;
        }
        return this;
    }
    render(ctx) {
        ctx.save();
        ctx.fillStyle = '#fff';
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.arc(0, 0, this.r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
        return this;
    }
};

function createParticles(n) {
    if (n !== particles.length) {
        particles = [];
        for (let i = 0; i < n; i++) {
            particles.push(new Particle());
        }
    }
}

window.onresize();

(function fn() {
    window.requestAnimationFrame(fn);
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle="#ffffff00";
    ctx.fillRect(0, 0, W, H);

    particles.forEach(function (item, i) {
        item.move().render(ctx);
    });

})();
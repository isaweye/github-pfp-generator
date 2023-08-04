const { createCanvas } = require('canvas');

class Generator {
    constructor() {
        this.img = createCanvas(560, 560);
        this.ctx = this.img.getContext('2d');
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, 560, 560);
        this.ox = 280 - 2.5 * 80.5;
        this.oy = 280 - 2.5 * 80.5;
    }

    fillRect(x, y, width, height, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }

    gen(size) {
        size = size;
        let color = `rgb(${Math.floor(Math.random() * (235 - 20 + 1)) + 20}, ${Math.floor(Math.random() * (235 - 20 + 1)) + 20}, ${Math.floor(Math.random() * (235 - 20 + 1)) + 20})`;

        for (let y = 0; y < 5; y++) {
            let c = Math.floor(Math.random() * 2);
            if (c == 1) {
                this.fillRect(size + this.ox, y * size + this.oy, size, size, color);
                this.fillRect(3 * size + this.ox, y * size + this.oy, size, size, color);
            }
        }

        for (let y = 0; y < 5; y++) {
            let c = Math.floor(Math.random() * 2);
            if (c == 1) {
                this.fillRect(this.ox, y * size + this.oy, size, size, color);
                this.fillRect(4 * size + this.ox, y * size + this.oy, size, size, color);
            }
        }

        for (let y = 0; y < 5; y++) {
            let c = Math.floor(Math.random() * 2);
            if (c == 1) {
                this.fillRect(2 * size + this.ox, y * size + this.oy, size, size, color);
            }
        }
    }

    main() {
        const now = new Date();
        const dateStr = now.toISOString().replace(/[:.]/g, '-');
        const fileName = `avatar_${dateStr}.png`;

        this.gen(80.5);

        const fs = require('fs');
        const out = fs.createWriteStream(__dirname + '/' + fileName);
        const saved = __dirname + '/' + fileName;
        const stream = this.img.createPNGStream();
        stream.pipe(out);
        out.on('finish', () => {
            console.log(`Avatar image saved. (${saved})`);
        });
    }    

}

const generator = new Generator();
generator.main();
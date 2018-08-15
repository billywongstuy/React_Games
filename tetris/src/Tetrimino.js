class TetriminoFactory {
    //constructor() {}

    getTetrimino(startX, startY, type) {
        switch(type) {
            case 'I':
                return new I_Tetrimino(startX, startY);
            case 'J':
                return new J_Tetrimino(startX, startY);
            case 'L':
                return new L_Tetrimino(startX, startY);
            case 'O':
                return new O_Tetrimino(startX, startY);
            case 'S':
                return new S_Tetrimino(startX, startY);
            case 'Z':
                return new Z_Tetrimino(startX, startY);
            default:
                throw new TypeError("Invalid tetrimino type");
        }
    }

    getRandomTetrimino(startX, startY) {
        const choices = ['I', 'J', 'L', 'O', 'S', 'Z'];
        return this.getTetrimino(startX, startY, choices[Math.floor(Math.random()*choices.length)]);
    }
}

class Tetrimino {
    //statuses are standby, dropping, still
    constructor(startX, startY, status='standby') {
        if (new.target === Tetrimino) {
            throw new TypeError("Cannot construct abstract Tetrimino");
        }
        this.status = status;
    }

    move(xAmt, yAmt) {
        const squares = [];
        for (var i = 0; i < this.squares.length; i++) {
            const x = this.squares[i][0];
            const y = this.squares[i][1];
            squares.push([x + xAmt, y + yAmt]);
        }
        this.squares = squares;
        console.log(squares);
    }

    rotateRightNinety() {
        if (this.centerIndex) {
            const squares = [];
            const cx = this.squares[this.centerIndex][0];
            const cy = this.squares[this.centerIndex][1];
            for (var i = 0; i < this.squares.length; i++) {
                const x = this.squares[i][0];
                const y = this.squares[i][1];
                squares.push([(y - cy) + cx, -(x - cy) + cx]);
            }
            this.squares = squares;
        }
    }
}

class O_Tetrimino extends Tetrimino {
    constructor(startX, startY, status='standby') {
        super(startX, startY, status);
        this.type = 'oTetrimino';
        this.squares = [[startX, startY], [startX + 1, startY], [startX, startY + 1], [startX + 1, startY + 1]];
        this.centerIndex = null;
    }
}

class I_Tetrimino extends Tetrimino {
    constructor(startX, startY, status='standby') {
        super(startX, startY, status);
        this.type = 'iTetrimino';
        this.squares = [[startX, startY], [startX + 1, startY], [startX + 2, startY], [startX + 3, startY]];
        this.centerIndex = 1;
    }
}

class L_Tetrimino extends Tetrimino {
    constructor(startX, startY, status='standby') {
        super(startX, startY, status);
        this.type = 'lTetrimino';
        this.squares = [[startX, startY], [startX + 1, startY], [startX + 2, startY], [startX, startY + 1]];
        this.centerIndex = 1;
    }
}

class J_Tetrimino extends Tetrimino {
    constructor(startX, startY, status='standby') {
        super(startX, startY, status);
        this.type = 'jTetrimino';
        this.squares = [[startX, startY], [startX + 1, startY], [startX + 2, startY], [startX + 2, startY + 1]];
        this.centerIndex = 1;
    }
}

class Z_Tetrimino extends Tetrimino {
    constructor(startX, startY, status='standby') {
        super(startX, startY, status);
        this.type = 'zTetrimino';
        this.squares = [[startX, startY], [startX + 1, startY], [startX + 1, startY + 1], [startX + 2, startY + 1]];
        this.centerIndex = 2;
    }
}

class S_Tetrimino extends Tetrimino {
    constructor(startX, startY, status='standby') {
        super(startX, startY, status);
        this.type = 'sTetrimino';
        this.squares = [[startX + 1, startY], [startX + 2, startY], [startX, startY + 1], [startX + 1, startY + 1]];
        this.centerIndex = 3;
    }
}


export {TetriminoFactory};

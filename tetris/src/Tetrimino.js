class TetriminoFactory {
    constructor() {
    }

    getNewI() {
        return new I_Tetrimino(0,0);
    }
}

class Tetrimino {
    //statuses are standby, dropping, still
    constructor(startX, startY, status='standby') {
        //how do I account for different pieces?
        //array of points?
        //rortate index?
        if (new.target === Tetrimino) {
            throw new TypeError("Cannot construct abstract Tetrimino");
        }
        this,status = status;
    }


    rotateRightNinety() {
        //rotate (a,b) about (m,n)
        //return [(b-n)+m, (a-m) + m];
        //get every other one other than the centerIndex and apply
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
        this.squares = [[startX, startY], [startX + 1, startY], [startX, startY + 1], [startX + 1, startY + 1]];
        this.centerIndex = null;
    }

}

class I_Tetrimino extends Tetrimino {
    constructor(startX, startY, status='standby') {
        super(startX, startY, status);
        this.squares = [[startX, startY], [startX + 1, startY], [startX + 2, startY], [startX + 3, startY]];
        this.centerIndex = 1;
    }
}

class L_Tetrimino extends Tetrimino {
    constructor(startX, startY, status='standby') {
        super(startX, startY, status);
        this.squares = [[startX, startY], [startX + 1, startY], [startX + 2, startY], [startX, startY + 1]];
        this.centerIndex = 1;
    }
}

class J_Tetrimino extends Tetrimino {
    constructor(startX, startY, status='standby') {
        super(startX, startY, status);
        this.squares = [[startX, startY], [startX + 1, startY], [startX + 2, startY], [startX + 2, startY + 1]];
        this.centerIndex = 1;
    }
}

class Z_Tetrimino extends Tetrimino {
    constructor(startX, startY, status='standby') {
        super(startX, startY, status);
        this.squares = [[startX, startY], [startX + 1, startY], [startX + 1, startY + 1], [startX + 2, startY + 1]];
        this.centerIndex = 2;
    }
}

class S_Tetrimino extends Tetrimino {
    constructor(startX, startY, status='standby') {
        super(startX, startY, status);
        this.squares = [[startX + 1, startY], [startX + 2, startY], [startX, startY + 1], [startX + 1, startY + 1]];
        this.centerIndex = 3;
    }
}


export {TetriminoFactory};

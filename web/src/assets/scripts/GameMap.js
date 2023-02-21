import { AcGameObject } from './AcGameObject';
import { Wall } from './Wall';

export class GameMap extends AcGameObject {
    constructor(ctx, parent) {  //ctx画布，parent动态修改画布的长宽
        super();

        this.ctx = ctx;
        this.parent = parent;
        this.L = 0;     //绝对距离：每个单位的长度

        this.rows = 13;
        this.cols = 13;

        this.inner_walls_count = 20;
        this.walls = [];
        
    }
    //起点：(sx, sy), 终点：(tx, ty)
    check_connnectivity(g, sx, sy, tx, ty) {
        if (sx == tx && sy == ty) return true;
        g[sx][sy] = true;

        //四个方向：上右下左
        let dx = [-1, 0, 1, 0], dy = [0, 1, 0, -1];
        for (let i = 0; i < 4; i ++ ) {
            let x = sx + dx[i], y = sy + dy[i];     //下一个点的坐标
            if (!g[x][y] && this.check_connnectivity(g, x, y, tx, ty)) {
                return true;
            }
        }
        return false;
    }

    create_walls() {
        const g = [];
        for (let r = 0; r < this.rows; r ++ ) {
            g[r] = [];
            for (let c = 0; c < this.cols; c ++ ) {
                g[r][c] = false;
            }
        }

        //给四周加上障碍物
        //左右两边加上障碍物
        for (let r = 0; r < this.rows; r ++ ) {
            g[r][0] = g[r][this.cols - 1] = true;
        }

        //上下两边加上障碍物
        for (let c = 0; c < this.cols; c ++ ) {
            g[0][c] = g[this.rows - 1][c] = true;
        }

        //创建随机障碍物
        for (let i = 0; i < this.inner_walls_count / 2; i ++ ) {
            for (let j = 0; j < 1000; j ++ ) {
                let r = parseInt(Math.random() * this.rows);    //random范围(0, 1]之间的浮点数
                let c = parseInt(Math.random() * this.cols);
                
                if (g[r][c] || g[c][r]) continue;
                if (r == this.rows - 2 && c == 1 || r == 1 && c == this.cols - 2) continue;

                g[r][c] = g[c][r] = true; 
                break;
            }
        }

        const copy_g = JSON.parse(JSON.stringify(g));
        if (!this.check_connnectivity(copy_g, this.rows - 2, 1, 1, this.cols - 2) ) return false;

        for (let r = 0; r < this.rows; r ++ ) {
            for (let c = 0; c < this.cols; c ++ ) {
                if (g[r][c]) {
                    this.walls.push(new Wall(r, c, this));
                }
            }
        }
        return true;
    }

    start() {
        for (let i = 0; i < 1000; i ++ ) {
            if (this.create_walls()) 
                break;
        }
        this.create_walls();
    }

    update_size() {
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows));
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
    }

    update() {
        this.update_size();
        this.render();
    }

    render() {
        const color_even = "#AAD751", color_odd = "#A2D048"
        for (let r = 0; r < this.rows; r ++ ) {
            for (let c = 0; c < this.cols; c ++ ) {
                if ((r + c) % 2 == 0) {
                    this.ctx.fillStyle = color_even;
                } else { 
                    this.ctx.fillStyle = color_odd; 
                } 
                this.ctx.fillRect(c * this.L, r * this.L, this.L, this.L);   //横坐标 * 方块单位长度，纵坐标 * 方块单位长度
            }
        }

    }

}
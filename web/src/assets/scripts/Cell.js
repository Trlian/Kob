export class Cell {
    constructor(r, c) {     //r表示row行，c表示col列
        this.r = r; 
        this.c = c;

        this.x = c + 0.5;   //x表示方格中心点横坐标
        this.y = r + 0.5;   //y表示方格中心点纵坐标
    }
}
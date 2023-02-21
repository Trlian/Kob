const AC_GAME_OBJECTS = [];

export class AcGameObject {
    constructor() {
        AC_GAME_OBJECTS.push(this); 
        this.timedelta = 0;     //相邻两帧的时间间隔
        this.has_called_start = false;
    }

    start() {   //只执行一次

    }

    update() {  //每一帧执行一次，除了第一帧之外

    }

    on_destory() {  //删除之前执行

    }

    destroy() { //删除对象
        this.on_destory();

        for (let i in AC_GAME_OBJECTS) {    //in遍历的是下标
            const obj = AC_GAME_OBJECTS[i];
            if (obj === this) {
                AC_GAME_OBJECTS.splice(i);
                break;
            } 
        }
    }
}

let last_timestamp;      //上一次执行的时刻
const step = timestamp => {
    for (let obj of AC_GAME_OBJECTS) {   //of遍历的是值
        //第一次执行
        if (!obj.has_called_start) {    
            obj.has_called_start = true;
            obj.start();
        //第一次之后执行
        } else {
            obj.timedelta = timestamp - last_timestamp;     //时间间隔 = 当前时刻 - 上一次时刻
            obj.update();
        }
    }

    last_timestamp = timestamp;
    requestAnimationFrame(step);
}


requestAnimationFrame(step);
var ctx = null;

var x = 0;
var y = 0;

const KEY_LEFT = 37,
    KEY_UP = 38,
    KEY_RIGHT = 39,
    KEY_DOWN = 40,
    KEY_ENTER = 13
    KEY_SPACE = 32;

var lastPress = null;
var pause = false;
var status_s = true;


const block_1 = {
    image: new Image(),
    position: {
        x: 0,
        y: 0,
    },
    size: {
        widht: 100,
        height: 100
    }
};
const block_2 = {
    image: new Image(),
    position: {
        x: 0,
        y: 0,
    },
    size: {
        widht: 100,
        height: 100
    }
};

function paint(ctx) {

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Calculing square
    if( !pause ) {
        x += 10;
        if (x > canvas.width) x = 0;
    }
    
    // Drawing square
    if( !pause ){
        ctx.fillStyle = '#0f0';
        ctx.fillRect(x, y, 10, 10);
    }

    // Calculing square
    if( !pause ) {
        if( lastPress == KEY_RIGHT ){
            lastPress = null;
            block_1.position.x += block_1.size.widht;
        }

        if( lastPress == KEY_LEFT ){
            lastPress = null;
            block_1.position.x -= block_1.size.widht;
        }

        if( lastPress == KEY_UP ){
            lastPress = null;
            block_1.position.y -= block_1.size.height;
        }

        if( lastPress == KEY_DOWN ){
            lastPress = null;
            block_1.position.y += block_1.size.height;
        }


        if( lastPress == KEY_SPACE ){
            lastPress = null;
            status_s = !status_s;
        }

        block_2.position.y = block_1.position.y;
        block_2.position.x = block_1.position.x;
    }

    if( status_s ){
        ctx.drawImage(
            block_1.image, 
            block_1.position.x, 
            block_1.position.y,
            block_1.size.widht,
            block_1.size.height
        );
    }else{
        ctx.drawImage(
            block_2.image, 
            block_2.position.x, 
            block_2.position.y,
            block_2.size.widht,
            block_2.size.height
        );
    }

    // Pause screen
    if (pause) {
        ctx.font = "50px Arial";
        ctx.fillStyle = "#fff";
        ctx.fillText('PAUSE', 640, 360);
        ctx.textAlign = 'center';
    }

    // Last Press text
    ctx.font = "20px Arial";
    ctx.fillStyle = "green";
    ctx.fillText('Last Press: ' + lastPress, 100, 40);
    ctx.textAlign = 'center';
}

function act() {
    if (lastPress == KEY_UP) {
        dir = 0;
    }
    if (lastPress == KEY_RIGHT) {
        dir = 1;
    }
    if (lastPress == KEY_DOWN) {
        dir = 2;
    }
    if (lastPress == KEY_LEFT) {
        dir = 3;
    }

    // Pause/Unpause
    if (lastPress == KEY_ENTER) {
        pause = !pause;
        lastPress = null;
    }

    paint(ctx);
}

function run() {
    window.requestAnimationFrame(run);
    act();
    //paint(ctx);
}

function init() {
    ctx = canvas.getContext('2d');

    block_1.image.src = 'assets/bloque.png';
    block_2.image.src = 'assets/bloque_2.png';

    document.addEventListener('keydown', function (evt) {
        lastPress = evt.which;
    }, false);
    
    run();
}

window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 17);
        };
}());


window.addEventListener('load', init, false);
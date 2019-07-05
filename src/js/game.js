const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const ITEMS_NUM = 30; // starting items
const ITEMS_SIZE = 100; // in pixels
const SHOW_COLLISION_BOX = true; // show collision box on item

// border default offset
const heightOffset = canvas.height - 100;
const widthOffset = canvas.width - 100;


// item block
let itemBlocks = [];
createBlocks();

function createBlocks() {
    itemBlocks = [];
    let defSize = ITEMS_SIZE;
    let size = defSize;
    let x,y,r;
    let iX,iY,iR;
    let counter = 0;
    for (let i = 0;i < ITEMS_NUM; i++) {

        if (counter % 200 === 0) {
            size /= 2;
        }

        if (counter > 5000) {
            throw new Error();
        }

        x = iX = Math.floor(Math.random() * widthOffset);
        y = iY = Math.floor(Math.random() * heightOffset);
        r = iR = size;

        if (itemBlocks.length > 0) {
            let dis = Infinity;
            let radius = Infinity;
            let offsetDis = Infinity;
            let flag = false;
            itemBlocks.every(item => {
                dis = distBetweenPoints(item.iX, item.iY, iX, iY);
                radius = item.iR / 2 + iR;
                if (dis <= radius) {
                    counter++;
                    console.log(true);
                    flag = true;
                    return false;
                }
                return true;
            });
            if (flag) {
                i--;
                continue;
            }
        }

        itemBlocks.push(newItem(x, y, r, iX, iY, iR));

        // draw item in canvas
        ctx.rect(x, y, size, size);
        if (SHOW_COLLISION_BOX) {
            const centerX = size / 4;
            const centerY = size / 4;
            ctx.rect(x + centerX, y + centerY, size / 2, size / 2);
        }
        ctx.stroke();
        size = defSize;
        counter = 0;
    }
}

function newItem(x, y, r, iX, iY, iR) {
    let item = {
      x: x,
        y: y,
        r: r,
        iX: iX,
        iY: iY,
        iR: iR,
    };

    return item;
}

function distBetweenPoints(x1,y1,x2,y2) {
    return Math.sqrt(Math.pow(x2 - x1,2) + Math.pow(y2 - y1, 2));
}

function drawCallage() {
    // draw work space
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas.width, canvas.height);

    // draw items
    ctx.strokeStyle = 'slategray';
    ctx.lineWidth = ITEMS_SIZE / 50;

    // border offset
    ctx.rect(50, 50, widthOffset, heightOffset);
    ctx.stroke();

}

drawCallage();
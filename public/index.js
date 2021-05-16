window.onload = function () {
    let socket = io();
    let canvas = document.getElementById("canvas")
    let ctx = canvas.getContext('2d');
    let reset = document.getElementById("reset");
    let colorBtns = document.querySelectorAll(".color");
    let lineWidthInput = document.querySelector("input[id=lineWidth]");

    //Properties
    let isMouseDown = false;
    let config = {
        color: "#34495e",
        width: 2
    };

    //Attach events
    reset.addEventListener("click", clearCanvas);
    colorBtns.forEach(cbtn => {
        cbtn.addEventListener("click", (e) => {
            config.color = e.target.getAttribute("data-color");
        });
    });
    lineWidthInput.addEventListener("change", (e) => {
        config.width = e.target.value;
    });

    let plots = [];

    socket.on('drawing', (_newPlots) => {
        plots = _newPlots;
        render();
    });

    canvas.onmouseenter = function () {
        canvas.style.cursor = "crosshair";
    }

    canvas.onmouseleave = function () {
        canvas.style.cursor = "auto";
    }

    window.onmousedown = function (e) {
        isMouseDown = true;
        if (!isTargetCanvas(e)) return;
        plots.push({
            color: `${config.color}`,
            width: parseInt(config.width),
            start: {
                x: e.clientX - getCanvasOffset().x,
                y: e.clientY - getCanvasOffset().y
            }
        });
    }

    window.onmousemove = function (e) {
        if (isMouseDown) {
            if (!isTargetCanvas(e)) return;
            plots[plots.length - 1].end = {
                x: e.clientX - getCanvasOffset().x,
                y: e.clientY - getCanvasOffset().y
            };
            render();
            broadcastDrawing();
        }
    }

    window.onmouseup = function (e) {
        isMouseDown = false;
        if (!isTargetCanvas(e)) return;
        plots[plots.length - 1].end = {
            x: e.clientX - getCanvasOffset().x,
            y: e.clientY - getCanvasOffset().y
        };
        render();
        broadcastDrawing();
    }

    function isTargetCanvas(e) {
        if (e && e.target && e.target.id == "canvas") {
            return true;
        }
        return false;
    }

    function render() {
        ctx.clearRect(0, 0, 500, 500);
        plots.forEach(function (i) {
            ctx.beginPath();
            ctx.moveTo(i.start.x, i.start.y);
            ctx.lineTo(i.end.x, i.end.y);
            ctx.lineWidth = i.width;
            ctx.strokeStyle = i.color;
            ctx.stroke();
            ctx.closePath();
        });
    }

    function clearCanvas() {
        plots.splice(0, plots.length);
        render();
        broadcastDrawing();
    }

    function broadcastDrawing() {
        socket.emit('drawing', plots);
    }

    function getCanvasOffset() {
        return {
            x: canvas.getBoundingClientRect().x,
            y: canvas.getBoundingClientRect().y
        }
    }


}
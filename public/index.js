window.onload = function () {
    let socket = io();
    let canvas = document.getElementById("canvas")
    let ctx = canvas.getContext('2d');
    let reset = document.getElementById("reset");
    let isMouseDown = false;

    reset.addEventListener("click", clearCanvas);

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
        if (e.target.id == "reset") return;
        plots.push({
            start: {
                x: e.clientX - getCanvasOffset().x,
                y: e.clientY - getCanvasOffset().y
            }
        });
    }

    window.onmousemove = function (e) {
        if (isMouseDown) {
            if (e.target.id == "reset") return;
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
        if (e.target.id == "reset") return;
        plots[plots.length - 1].end = {
            x: e.clientX - getCanvasOffset().x,
            y: e.clientY - getCanvasOffset().y
        };
        render();
        broadcastDrawing();
    }

    function render() {
        ctx.beginPath();
        ctx.clearRect(0, 0, 500, 500);
        plots.forEach(i => {
            ctx.moveTo(i.start.x, i.start.y);
            ctx.lineTo(i.end.x, i.end.y);
            ctx.stroke();
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
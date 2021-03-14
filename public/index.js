window.onload = function () {
    let socket = io();

    let form = document.getElementById("form");
    let input = document.getElementById("input");
    let messages = document.getElementById("messages");
    let canvas = document.getElementById("canvas")
    let ctx = canvas.getContext('2d');
    let reset = document.getElementById("reset");

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
        if (e.target.id == "reset") return;
        plots.push({
            start: {
                x: e.clientX,
                y: e.clientY
            }
        });
    }

    window.onmouseup = function (e) {
        if (e.target.id == "reset") return;
        plots[plots.length - 1].end = {
            x: e.clientX,
            y: e.clientY
        };
        render();
        broadcastDrawing();
    }

    function render() {
        ctx.beginPath();
        if (plots.length == 0) {
            ctx.clearRect(0, 0, 500, 500);
            return;
        }
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
}
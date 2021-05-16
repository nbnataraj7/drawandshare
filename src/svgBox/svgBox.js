import { useEffect, useState } from "react";
import { SVG } from '@svgdotjs/svg.js'
import './svgBox.css';

export function SVGBox(props) {

    const [penDown, setPenDown] = useState(false);
    const [drawHandle, setDrawHandle] = useState(null);
    const [startPenPos, setStartPenPos] = useState({ x: 0, y: 0 });
    const [line, setLine] = useState(null);

    useEffect(() => {
        init();
    });

    function onMouseMove(e) {
        if (penDown) {
            console.log(e);
            line.plot(startPenPos.x, startPenPos.y, e.clientX, e.clientY);
        }
    }

    function onMouseDown(e) {
        drawHandle.addClass("in-edit");
        console.log("Pen down...");
        console.log(e);
        setPenDown(true);
        let _line = drawHandle.line(e.clientX, e.clientY, e.clientX, e.clientY).stroke({ width: 1 });
        _line.attr({ stroke: '#000' });
        setLine(_line);
        setStartPenPos({x: e.clientX, y: e.clientY});
    }

    function onMouseUp(e) {
        drawHandle.removeClass("in-edit");
        setPenDown(false);
        console.log("Released pen");
    }

    function init() {
        setDrawHandle(SVG("#svgBox"));
    }

    return <>
        <svg xmlns="http://www.w3.org/2000/svg"
            viewBox={props.viewBox.join(" ")}
            width={props.width}
            height={props.height}
            id="svgBox"
            onMouseMove={onMouseMove}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}>
        </svg>
    </>;
}


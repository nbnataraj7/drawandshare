import './box.css';
import { SVGBox } from '../svgBox/svgBox';

export function Box() {
    
    return <>
        <div className="box">
            <SVGBox viewBox={[50, 25, 1820, 919]} width={"100%"} height={"100%"}></SVGBox>
        </div>
    </>;
}
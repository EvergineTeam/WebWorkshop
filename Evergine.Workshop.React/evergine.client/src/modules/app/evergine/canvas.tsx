import { useMemo, memo, useEffect, useRef, CSSProperties } from 'react';
import { EVERGINE_CANVAS_ID } from '@evergine/evergine-definitions'
import { useEvergineStore } from '@stores/evergine-store';
import {
    initializeEvergineCanvas,
    getDevicePixelRatio,
    updateCanvasSize
} from '@evergine/evergine-program-service';
import Grid from '@material-ui/core/Grid';

const devicePixelRatio = getDevicePixelRatio();

const calculateSizeWithPixelRatio = (size: number) => size * devicePixelRatio;

type EvergineCanvasCanvasProps = {
    height: number;
    width: number;
};

const EvergineCanvas = memo(
    ({
        height,
        width
    }: EvergineCanvasCanvasProps) => {

        const splashContent: CSSProperties = {
            "position": "relative",
            "top": "50%",
            "transform": "translateY(-50%)"
        }

        const stylesDiv: CSSProperties  =  {
            "background": "white",
            "height": "100%",
            "left": "0",
            "position": "absolute",
            "textAlign": "center",
            "top": "0",
            "width": "80%"
        };

        const progressBarDiv: CSSProperties = {
            "borderRadius": "4px",
            "height": "8px",        
            "animation": "kitt 1s ease infinite",
            "backgroundImage": "linear-gradient(to right, #0f72e8 0%, white 50%, #0f72e8 100%)",
            "backgroundSize": "300% 100%",
            "width": "100%"
        }

        const isWebAssemblyLoaded = useEvergineStore(
            (s) => s.isWebAssemblyLoaded
        );
        const isEvergineLoaded = useEvergineStore((s) => s.isEvergineLoaded);
        const setEvergineLoaded = useEvergineStore((s) => s.setEvergineLoaded);

        const isEvergineLoadedRef = useRef(isEvergineLoaded);

        const size = useMemo(
            () => ({
                height: height,
                width: width,
                pixelRatioAwareHeight: calculateSizeWithPixelRatio(height),
                pixelRatioAwareWidth: calculateSizeWithPixelRatio(width)
            }),
            [height, width]
        );

        useEffect(() => {
            if (isWebAssemblyLoaded) {
                updateCanvasSize(EVERGINE_CANVAS_ID);
            }
        }, [size]);

        useEffect(() => {
            if (isWebAssemblyLoaded) {
                initializeEvergineCanvas(EVERGINE_CANVAS_ID);
                setEvergineLoaded(true);
            }
        }, [isWebAssemblyLoaded]);

        useEffect(() => {
            isEvergineLoadedRef.current = isEvergineLoaded;
        }, [isEvergineLoaded]);


        return (
                <Grid item xs={9}>
                    <canvas
                        id={EVERGINE_CANVAS_ID}
                        width={size.pixelRatioAwareWidth}
                        height={size.pixelRatioAwareHeight}
                        style={{
                            height: `${size.height}px`,
                            width: `${size.width}px`
                        }}
                        onContextMenu={(ev: React.SyntheticEvent) => {
                            ev.preventDefault();
                        }}
                        tabIndex={1}
                    />
                    { !isEvergineLoaded && 
                    <div id="splash" style={stylesDiv}>
                        <div id="splash-content" style={splashContent}>
                            <img src="evergine-splash-logo.png" />
                            <div id="loading-bar" className="progress" style={{ "margin": "0 auto","width": "160px"}}>
                                <div className="progress-bar" style={progressBarDiv}></div>
                                <style>
                                   {` @keyframes kitt {
                                        0% {
                                            background-position: 0% 50%
                                        }

                                        50% {
                                            background-position: 100% 50%
                                        }

                                        100% {
                                            background-position: 0% 50%
                                        }
                                    }`}
                                </style>
                            </div>
                        </div>
                    </div>
                    }
                </Grid>
        );
    }
);
export { EvergineCanvas }
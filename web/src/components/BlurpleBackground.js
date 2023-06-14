import React, { useCallback, useMemo } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import "./stylesheets/BlurpleBackground.css";

const PARTICLES_PARAMS = {
    background: {
        color: {
            value: "#2c2f33",
        },
    },
    fpsLimit: 60,
    particles: {
        color: {
            value: "#5865f2",
        },
        move: {
            direction: "bottom",
            enable: true,
            outModes: {
                default: "out"
            },
            size: true,
            speed: {
                min: 0.5,
                max: 2
            },
        },
        number: {
            value: 15,
            density: {
                enable: true,
                area: 500,
            },
        },
        shape: {
            type: "square",
        },
        size: {
            value: 5,
        },
        wobble: {
            distance: 30,
            enable: true,
            move: true,
            speed: {
                min: -0.5,
                max: 0.5,
            },
        },
    },
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "repulse",
            },
            resize: true,
        },
        modes: {
            repulse: {
                distance: 100,
                duration: 0.1,
            },
        },
    },
};

function BlurpleBackground({
    children
}) {
    const particlesInit = async (engine) => {
        await loadFull(engine);
    };

    const particlesElem = useMemo(() => (
        <Particles
            id="blurple-particles"
            init={particlesInit}
            options={PARTICLES_PARAMS}
            style={{
                zIndex: -1
            }}
        />
    ), []);

    return (
        <div className="blurple-background">
            {particlesElem}
            <div className="blurple-background-content">
                {children}
            </div>
        </div>
    )
};

export default BlurpleBackground;

import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles";

interface ParticleBackgroundProps {
  variant?: "landing" | "tech";
  density?: number;
}

const ParticleBackground = ({ variant = "tech", density = 30 }: ParticleBackgroundProps) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const getLandingOptions = () => {
    return {
      particles: {
        number: {
          value: density,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: ["#D1C7BD", "#AC9C8D", "#72383D"]
        },
        shape: {
          type: "polygon",
          stroke: {
            width: 0,
            color: "#000000"
          },
          polygon: {
            nb_sides: 6
          }
        },
        opacity: {
          value: 0.2,
          random: true,
          anim: {
            enable: true,
            speed: 0.2,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 40,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 30,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 200,
          color: "#AC9C8D",
          opacity: 0.15,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab"
          },
          onclick: {
            enable: true,
            mode: "push"
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 200,
            line_linked: {
              opacity: 0.4
            }
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    };
  };

  const getTechOptions = () => {
    return {
      particles: {
        number: {
          value: density,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: ["#D1C7BD", "#AC9C8D", "#72383D"]
        },
        shape: {
          type: ["circle", "triangle", "edge"],
          stroke: {
            width: 0,
            color: "#000000"
          }
        },
        opacity: {
          value: 0.2,
          random: true,
          anim: {
            enable: true,
            speed: 0.2,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 5,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#72383D",
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.5,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "repulse"
          },
          onclick: {
            enable: true,
            mode: "push"
          },
          resize: true
        },
        modes: {
          repulse: {
            distance: 100,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    };
  };

  const options = variant === "landing" ? getLandingOptions() : getTechOptions();

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={options}
      className="absolute inset-0 -z-10"
    />
  );
};

export default ParticleBackground;
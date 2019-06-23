import * as React from "react";
import { buttonName, JoystickData } from "../services/types";
import interact from "interactjs";

interface JoystickProps {
  callbackUpdated: (joystickData: JoystickData) => void;
}

/** Controles do game */
const Joystick = (props: JoystickProps) => {
  const [joystickData, setJoystickData] = React.useState({
    x: 0,
    y: 0,
    a: false,
    b: false,
    home: false
  });

  const handleButtonDown = (name: buttonName) => {
    setJoystickData(previousData => {
      previousData[name] = true;
      return previousData;
    });
    props.callbackUpdated(joystickData);
  };

  const handleButtonUp = (name: buttonName) => {
    setJoystickData(previousData => {
      previousData[name] = false;
      return previousData;
    });
    props.callbackUpdated(joystickData);
  };

  React.useEffect(() => {
    interact("#stick").draggable({
      // keep the element within the area of it's parent
      modifiers: [
        interact.modifiers.restrict({
          restriction: "parent",
          endOnly: false,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        })
      ],
      onend: event => {
        const { target } = event;
        target.style.webkitTransform = target.style.transform =
          "translate(37px, 37px)";
        target.setAttribute("data-x", 37);
        target.setAttribute("data-y", 37);
      },
      onmove: event => {
        const { target } = event;
        const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
        const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;
        target.style.webkitTransform = target.style.transform =
          "translate(" + x + "px, " + y + "px)";
        target.setAttribute("data-x", x);
        target.setAttribute("data-y", y);
      }
    });
  }, []);

  return (
    <div>
      {/** Sticker field da esquerda */}
      <div style={{ position: "absolute", left: 0, bottom: 0, padding: 30 }}>
        <div
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            backgroundColor: "#eee",
            touchAction: "none"
          }}
        >
          <div
            id="stick"
            style={{
              width: "75px",
              height: "75px",
              borderRadius: "50%",
              transform: "translate(37px, 37px)",
              backgroundColor: "#aaa"
            }}
            data-x={37}
            data-y={37}
          />
        </div>
      </div>
      {/** Botões do centro da tela */}
      <div
        style={{
          position: "absolute",
          left: "calc(50% - 50px)",
          width: "100px",
          top: 0,
          padding: 30
        }}
      >
        <button
          onMouseDown={() => handleButtonDown("home")}
          onMouseUp={() => handleButtonUp("home")}
        >
          Home
        </button>
      </div>
      {/** Botões da direita da tela */}
      <div
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          padding: 30
        }}
      >
        <button
          style={{ width: 100, height: 100, marginRight: 10 }}
          onMouseDown={() => handleButtonDown("a")}
          onMouseUp={() => handleButtonUp("a")}
        >
          A
        </button>
        <button
          style={{ width: 100, height: 100 }}
          onMouseDown={() => handleButtonDown("b")}
          onMouseUp={() => handleButtonUp("b")}
        >
          B
        </button>
      </div>
    </div>
  );
};

export default Joystick;

import * as React from "react";
import { buttonName } from "../services/types";
import interact from "interactjs";

/** Controles do game */
const Joystick = () => {
  const handleButtonClick = (name: buttonName) => {
    console.log(name);
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
        // translate the element
        target.style.webkitTransform = target.style.transform =
          "translate(37px, 37px)";

        // update the posiion attributes
        target.setAttribute("data-x", 37);
        target.setAttribute("data-y", 37);
      },
      // call this function on every dragmove event
      onmove: event => {
        const { target } = event;
        const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
        const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

        // translate the element
        target.style.webkitTransform = target.style.transform =
          "translate(" + x + "px, " + y + "px)";

        // update the posiion attributes
        target.setAttribute("data-x", x);
        target.setAttribute("data-y", y);
      }
    });
  }, []);

  return (
    <div>
      {/** Sticker field da esquerda */}
      <div>
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
      <div>
        <button onClick={() => handleButtonClick("HOME")}>Home</button>
      </div>
      {/** Botões da direita da tela */}
      <div>
        <button onClick={() => handleButtonClick("A")}>A</button>
        <button onClick={() => handleButtonClick("B")}>B</button>
      </div>
    </div>
  );
};

export default Joystick;

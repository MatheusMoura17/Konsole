console.log("Carregando game...");

const mainElement = KonsoleWrapper.rendererElem;

const createUserDebug = user => {
  const userMainElem = document.createElement("div");
  userMainElem.style.setProperty("width", "300px");
  userMainElem.style.setProperty("float", "left");

  userMainElem.style.setProperty("background", "#aaa");
  userMainElem.style.setProperty("padding", "20px");
  userMainElem.style.setProperty("margin", "5px");

  const title = document.createElement("h4");
  const subTitle = document.createElement("h5");
  const controller = document.createElement("pre");

  controller.style.setProperty("margin", "10px");
  controller.style.setProperty("padding", "5px");
  controller.style.setProperty("background", "#fff");

  user.onJoystickUpdate = joystickData => {
    console.log(joystickData);
    controller.innerHTML = JSON.stringify(joystickData, false, true);
  };

  title.innerHTML = user.name;
  subTitle.innerHTML = user.id;

  userMainElem.appendChild(title);
  userMainElem.appendChild(subTitle);
  userMainElem.appendChild(controller);

  mainElement.appendChild(userMainElem);
};

KonsoleWrapper.onSetup = () => {
  console.log("Jogo montado");
};

KonsoleWrapper.onUsersUpdate = users => {
  mainElement.innerHTML = "";
  users.forEach(user => {
    createUserDebug(user);
  });
};

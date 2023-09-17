export function message(mes) {
  const div = document.createElement("div");
  div.innerHTML = mes;
  div.className = "message1241";
  document.body.append(div);
  const timeout = setTimeout(() => {
    div.classList.add("deleteMessage")
    setTimeout(() => {
      div.remove()
    }, 1000)
  }, 3000);
  function clrstTimeout(timeou) {
    div.addEventListener("click", () => {
      clearTimeout(timeou);
      const timeout = setTimeout(() => {
        div.classList.add("deleteMessage")
        setTimeout(() => {
          div.remove()
        }, 1000)
      }, 3000);
      clrstTimeout(timeout);
    });
  }
  clrstTimeout(timeout);
}

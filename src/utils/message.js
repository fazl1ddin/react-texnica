export function message(mes) {
  const div = document.createElement("div");
  div.innerHTML = mes;
  div.className = "message1241";
  document.body.append(div);
  const timeout = setTimeout(() => div.remove(), 3000);
  function clrstTimeout(timeou) {
    div.addEventListener("click", () => {
      clearTimeout(timeou);
      const timeout = setTimeout(() => div.remove(), 3000);
      clrstTimeout(timeout);
    });
  }
  clrstTimeout(timeout);
}

export function message(text) {
    let div = document.createElement("div")
    div.textContent = text
    div.style.cssText = `
      position: fixed;
      top: 6rem;
      right: -300px;
      padding: 1rem 3rem;
      border: #000 solid 1px;
      border-radius: 5px;
      background: #fff;
      transition: .5s easy-in;
    `
    div.animate([
      {
        right: '-300px'
      },
      {
        right: '6rem'
      }
    ], {
      duration: 500
    })
    div.style.right = "6rem"
    document.body.append(div)
    setTimeout(() => div.remove(), 3000)
}
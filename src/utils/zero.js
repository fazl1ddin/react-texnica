
export function zero(number) {
    return (
      `
        ${number >= 10 ? number : "0" + number}
        :00 - ${number >= 10 ? number : "0" + number}
        :00 
      `
    );
  }
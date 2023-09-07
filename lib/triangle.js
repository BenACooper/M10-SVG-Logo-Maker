const Shape = require("./shapes.js");

class Triangle extends Shape {
  constructor(chosenText, chosenTextColor, chosenShapeColor) {
    super(chosenText, chosenTextColor, chosenShapeColor);
  }

  render() {
    const svgMarkup = `
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="300" height="200">
        <polygon points="150,18 244,182 56,182" fill="${this.chosenShapeColor}" />
        <text x="150" y="125" font-size="60" text-anchor="middle" fill="${this.chosenTextColor}" font-family="Times New Roman">
          ${this.chosenText}
        </text>
      </svg>`;
    return svgMarkup;
  }
}

module.exports = Triangle;
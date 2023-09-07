const Shape = require("./shapes.js"); // Import the Shape class from shape.js

class Circle extends Shape {
  constructor(chosenText, chosenTextColor, chosenShapeColor, radius) {
    super(chosenText, chosenTextColor, chosenShapeColor);
    this.radius = radius;
  }

  render() {
    const svgMarkup = `
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="300" height="200">
        <circle cx="150" cy="100" r="80" fill="${this.chosenShapeColor}" />
        <text x="150" y="125" font-size="60" text-anchor="middle" fill="${this.chosenTextColor}" font-family="Times New Roman">
          ${this.chosenText}
        </text>
      </svg>`;
    return svgMarkup;
  }
}

module.exports = Circle;


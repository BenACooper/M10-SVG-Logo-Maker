//Shape is the grandpa!!! ;D
class Shape {
    constructor(chosenText, chosenTextColor, chosenShapeColor) {
      this.chosenText = chosenText;
      this.chosenTextColor = chosenTextColor;
      this.chosenShapeColor = chosenShapeColor;
    }
  
    // Abstract method forces subclasses to adhere to render().
    render() {
      throw new Error("Shape class must implement render() method.");
    }
  }

  module.exports = Shape;

//Forgot the sublcass.js are adjacent to shape.js, copied the require line from index.js = the suffering was great and terrible.

//Copied the exact SVG elements inspecting provided asset circle.svg in the chrome dev tools. How does the font look like Time New Roman without setting the font family in the markup?

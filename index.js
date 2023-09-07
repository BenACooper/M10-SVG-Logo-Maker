//Require inquirer for those beautiful prompts.
const inquirer = require("inquirer");
//Require FS since we need to create the file.
const fs = require("fs");
//Require shape classes for writing to file.
const Shape = require("./lib/shapes.js"); 
const Triangle = require("./lib/triangle.js");
const Square = require("./lib/square.js");
const Circle = require("./lib/circle.js");

//I asked an AI to generate an array of CSS color keywords for me. Is there a better way to do this?
const colorKeywords = [
  "aliceblue",
  "antiquewhite",
  "aqua",
  "aquamarine",
  "azure",
  "beige",
  "bisque",
  "black",
  "blanchedalmond",
  "blue",
  "blueviolet",
  "brown",
  "burlywood",
  "cadetblue",
  "chartreuse",
  "chocolate",
  "coral",
  "cornflowerblue",
  "cornsilk",
  "crimson",
  "cyan",
  "darkblue",
  "darkcyan",
  "darkgoldenrod",
  "darkgray",
  "darkgreen",
  "darkkhaki",
  "darkmagenta",
  "darkolivegreen",
  "darkorange",
  "darkorchid",
  "darkred",
  "darksalmon",
  "darkseagreen",
  "darkslateblue",
  "darkslategray",
  "darkturquoise",
  "darkviolet",
  "deeppink",
  "deepskyblue",
  "dimgray",
  "dodgerblue",
  "firebrick",
  "floralwhite",
  "forestgreen",
  "fuchsia",
  "gainsboro",
  "ghostwhite",
  "gold",
  "goldenrod",
  "gray",
  "green",
  "greenyellow",
  "honeydew",
  "hotpink",
  "indianred",
  "indigo",
  "ivory",
  "khaki",
  "lavender",
  "lavenderblush",
  "lawngreen",
  "lemonchiffon",
  "lightblue",
  "lightcoral",
  "lightcyan",
  "lightgoldenrodyellow",
  "lightgray",
  "lightgreen",
  "lightpink",
  "lightsalmon",
  "lightseagreen",
  "lightskyblue",
  "lightslategray",
  "lightsteelblue",
  "lightyellow",
  "lime",
  "limegreen",
  "linen",
  "magenta",
  "maroon",
  "mediumaquamarine",
  "mediumblue",
  "mediumorchid",
  "mediumpurple",
  "mediumseagreen",
  "mediumslateblue",
  "mediumspringgreen",
  "mediumturquoise",
  "mediumvioletred",
  "midnightblue",
  "mintcream",
  "mistyrose",
  "moccasin",
  "navajowhite",
  "navy",
  "oldlace",
  "olive",
  "olivedrab",
  "orange",
  "orangered",
  "orchid",
  "palegoldenrod",
  "palegreen",
  "paleturquoise",
  "palevioletred",
  "papayawhip",
  "peachpuff",
  "peru",
  "pink",
  "plum",
  "powderblue",
  "purple",
  "rebeccapurple",
  "red",
  "rosybrown",
  "royalblue",
  "saddlebrown",
  "salmon",
  "sandybrown",
  "seagreen",
  "seashell",
  "sienna",
  "silver",
  "skyblue",
  "slateblue",
  "slategray",
  "snow",
  "springgreen",
  "steelblue",
  "tan",
  "teal",
  "thistle",
  "tomato",
  "turquoise",
  "violet",
  "wheat",
  "white",
  "whitesmoke",
  "yellow",
  "yellowgreen",
];

//Prompts to choose text and shape, and their colors. 
const questions = [
  {
    type: "input",
    message: "Please choose up to 3 letters for your logo.",
    name: "chosenText",
    // Input is valid if string length is three or less.
    validate: function (input) {
        if (input.length <= 3) {
          return true; 
        } else {
          return "Please enter up to three characters for your logo text.";
        }
      },
  },
  {
    type: "input",
    message: "Please choose a color for your text.",
    name: "chosenTextColor",
    //Input is valid if it matches one of the elements from the colorKeywords array OR if it is a valid hexidecimal number. Use regex to conveinently define valid format for hexidedcimal colors.
    validate: function (input) {
      if (
        colorKeywords.includes(input.toLowerCase()) ||
        /^#([0-9A-Fa-f]{3}){1,2}$/.test(input)
      ) {
        return true;
      } else {
        return "Please enter a valid color keyword or hexadecimal color code.";
      }
    },
  },
  //List type instead of input type since there are only three choices and the use can only pick one.
  {
    type: "list",
    message: "Please choose a shape for your logo.",
    name: "chosenShape",
    choices: ["circle", "triangle", "square"],
  },
  //Basically identical to chosenTextColor but name is different.
  {
    type: "input",
    message: "Please choose a color for your shape.",
    name: "chosenShapeColor",
    validate: function (input) {
      if (
        colorKeywords.includes(input.toLowerCase()) ||
        /^#([0-9A-Fa-f]{3}){1,2}$/.test(input)
      ) {
        return true;
      } else {
        return "Please enter a valid color keyword or hexadecimal color code.";
      }
    },
  },
];


function init() {
inquirer
  .prompt(questions)
  .then((answers) => {
    const { chosenText, chosenTextColor, chosenShape, chosenShapeColor } = answers;

    let shapeInstance;

    // Based on chosenShape, create an instance of the corresponding shape class
    if (chosenShape === "triangle") {
      shapeInstance = new Triangle(chosenText, chosenTextColor, chosenShapeColor);
    } else if (chosenShape === "square") {
      shapeInstance = new Square(chosenText, chosenTextColor, chosenShapeColor);
    } else if (chosenShape === "circle") {
      shapeInstance = new Circle(chosenText, chosenTextColor, chosenShapeColor);
    } else {
      console.error("Everything has gone awry.");
      return;
    }

    // Generate SVG markup based on the chosen shape
    const svgMarkup = shapeInstance.render();

    // Write the SVG markup to a file
    let fileName = `./examples/${chosenShape}_${chosenText}_${chosenTextColor}_${chosenShapeColor}_logo.svg`;


    fs.writeFileSync(fileName, svgMarkup);

    console.log("Generated logo.svg");
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });
}
 
init()
/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('game');
let display = canvas.getContext('2d');

canvas.width = 1100;
canvas.height = 720;

// let theme = "black";
theme = "white";

display.fillStyle = theme;
display.fillRect(0, 0, canvas.width, canvas.height);
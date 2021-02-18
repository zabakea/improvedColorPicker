"use script";
pickColors();

function pickColors() {
  const input = document.querySelector("input");
  input.addEventListener("input", masterConverter);
}

function masterConverter() {
  const pickedHEX = document.querySelector("input").value;
  // convert hex to rgb
  const rgb = showingRGB(pickedHEX);
  console.log(rgb);
  // convert rgb to CSS string
  const cssString = showingCSSstring(rgb);
  console.log(cssString);
  // RGBtoHEX
  const hex = showingHEX(rgb);
  console.log(hex);
  //RGBtoHSL
  const hsl = showingHSL(rgb);
  console.log(hsl);

  displayData(hex);
  displayValues(hex, cssString, hsl);
}

function displayData(hex) {
  document.querySelector("#output").style.backgroundColor = hex;
}
function displayValues(hex, cssString, hsl) {
  document.querySelector("#rgb").textContent = cssString;
  document.querySelector("#hex").textContent = hex;
  document.querySelector("#hsl").textContent = hsl;
}

function showingRGB(hexValue) {
  console.log(hexValue);
  const r = Number.parseInt(hexValue.slice(1, 3), 16);
  const g = Number.parseInt(hexValue.slice(3, 5), 16);
  const b = Number.parseInt(hexValue.slice(5), 16);
  return { r, g, b };
}

function showingCSSstring(rgb) {
  //   const r = rgb.r;
  //   const g = rgb.g;
  //   const b = rgb.b;
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

function showingHEX(rgb) {
  console.log(rgb);
  const rgbToHex = rgb;
  const red = rgbToHex.r.toString(16).padStart(2, "0");
  const green = rgbToHex.g.toString(16).padStart(2, "0");
  const blue = rgbToHex.b.toString(16).padStart(2, "0");
  return `#${red}${green}${blue}`;
}

function showingHSL(rgb) {
  let r = rgb.r;
  let g = rgb.g;
  let b = rgb.b;
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  // console.log("hsl(%f,%f%,%f%)", h, s, l);  just for testing
  return `${h} ${s} ${l}`;
}

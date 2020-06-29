// Stolen from https://dev.to/blacksonic/add-dark-mode-to-your-site-with-this-short-css-trick-1g7b

// If `prefers-color-scheme` is not supported, fall back to light mode.
// In this case, light.css will be downloaded with `highest` priority.
if (window.matchMedia("(prefers-color-scheme: dark)").media === "not all") {
  document.documentElement.style.display = "none";
  document.head.insertAdjacentHTML(
    "beforeend",
    '<link rel="stylesheet" href="{{ "/assets/css/light.css" | prepend: site.baseurl }}" onload="document.documentElement.style.display = \'\'">'
  );
}

let themeColor = null;

if (window.matchMedia("(prefers-color-scheme: dark)").matches == true) {
  themeColor = "#121212";
} else {
  themeColor = "#fafafa";
}

document.head.insertAdjacentHTML(
  "beforeend",
  `<meta name="theme-color" content="${themeColor}">`
);

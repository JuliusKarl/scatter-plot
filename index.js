window.onload = function () {
  // Flag Coordinates
  var coordinates = [
    { x: 85, y: 6 },
    { x: 83, y: 6.5 },
    { x: 90, y: 6.6 },
    { x: 81, y: 7.5 },
    { x: 95, y: 7.8 },
    { x: 75, y: 9.5 },
    { x: 73, y: 9.8 },
    { x: 60, y: 11.2 },
    { x: 70, y: 11.3 },
    { x: 65, y: 11.8 },
    { x: 47, y: 12.5 },
    { x: 49, y: 13.2 },
    { x: 51, y: 14 },
    { x: 53, y: 14.5 },
    { x: 38, y: 18 },
    { x: 40, y: 18.5 },
    { x: 42, y: 18.9 },
    { x: 30, y: 19 },
    { x: 44, y: 19.5 },
    { x: 90, y: 19.5 },
    { x: 75, y: 19.8 },
    { x: 85, y: 20 },
    { x: 77, y: 20 },
    { x: 92, y: 20 },
    { x: 34, y: 20 },
    { x: 72.5, y: 20.2 },
    { x: 81, y: 20.2 },
    { x: 79, y: 20.2 },
    { x: 36, y: 20.5 },
    { x: 26, y: 20.5 },
    { x: 20, y: 20.8 },
    { x: 38, y: 21.1 },
    { x: 95, y: 21.5 },
    { x: 40, y: 21.6 },
    { x: 52, y: 22 },
    { x: 57, y: 22 },
    { x: 60, y: 22.1 },
    { x: 42, y: 22.2 },
    { x: 62, y: 22.5 },
    { x: 44, y: 23 },
    { x: 65, y: 23.1 },
    { x: 66.5, y: 23.9 },
    { x: 22, y: 24.2 },
    { x: 68.8, y: 24.7 },
    { x: 13, y: 24.7 },
    { x: 25, y: 25 },
    { x: 10, y: 25 },
    { x: 71, y: 25.1 },
    { x: 75, y: 25.2 },
    { x: 73, y: 25.3 },
    { x: 77, y: 26 },
    { x: 3, y: 26 },
    { x: 7, y: 26 },
    { x: 50, y: 26.5 },
    { x: 80, y: 26.5 },
    { x: 16, y: 26.8 },
    { x: 53, y: 27 },
    { x: 18, y: 27.1 },
    { x: 82, y: 27.3 },
    { x: 20, y: 27.8 },
    { x: 55, y: 27.8 },
    { x: 22, y: 28 },
    { x: 57, y: 28.1 },
    { x: 84, y: 28.2 },
    { x: 60, y: 28.8 },
    { x: 86, y: 29 },
    { x: 62, y: 29.5 },
    { x: 88, y: 29.5 },
    { x: 30.5, y: 30 },
    { x: 92, y: 30 },
    { x: 90, y: 30.2 },
    { x: 42, y: 30.5 },
    { x: 69.2, y: 30.5 },
    { x: 95, y: 30.6 },
    { x: 33.2, y: 30.8 },
    { x: 53.2, y: 31 },
    { x: 61, y: 31 },
    { x: 29, y: 31.2 },
    { x: 45, y: 31.5 },
    { x: 5, y: 32.3 },
    { x: 21.2, y: 32.5 },
    { x: 3, y: 33 },
    { x: 55.5, y: 33 },
    { x: 43.1, y: 33.1 },
    { x: 52.5, y: 33.2 },
    { x: 27.5, y: 34 },
    { x: 41, y: 34.2 },
    { x: 58, y: 34.5 },
    { x: 42, y: 34.9 },
    { x: 60, y: 35.5 },
    { x: 39, y: 35.7 },
    { x: 26.2, y: 36 },
    { x: 48.5, y: 36.7 },
    { x: 63, y: 37 },
    { x: 65, y: 38.2 },
    { x: 38.5, y: 38.8 },
    { x: 67, y: 39.5 },
    { x: 69, y: 39.5 },
    { x: 91, y: 39.6 },
    { x: 95, y: 41 },
  ];

  var donorsNames = new Array();

  /**
   * Load donor CSV
   * loadDonors() finishes before populating 'donorsNames' array therefore
   * renderFlags() must be called after the 'complete:' callback
   */
  function loadDonors() {
    var config = {
      delimiter: ",",
      step: function (results) {
        donorsNames.push(results.data);
      },
      complete: function (results) {
        renderFlags();
      },
      download: true,
      header: true,
    };
    Papa.parse("./donor-list.csv", config);
  }

  /**
   * Add Flags
   */
  function renderFlags() {
    coordinates.forEach((x, i) => {
      //Create the Flag SVG
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("overflow", "visible");
      svg.setAttribute("width", "1.8");
      svg.setAttribute("height", "1.8");
      svg.setAttribute("x", x.x);
      svg.setAttribute("y", x.y);
      svg.setAttribute("viewBox", "0 0 23 26");
      svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
      svg.setAttribute("class", donorsNames[i].clientName);
      document.getElementById("hof").appendChild(svg);

      // Define the Flag SVG
      var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute(
        "d",
        "M.458 1.182A.802.802 0 0 0 0 1.901v14.134c0 .03.006.058.017.084v9.104c0 .429.358.777.801.777.442 0 .8-.348.8-.777v-9.469c1.753-.519 3.73-.703 3.73-.703 1.952-.02 3.831.539 5.876 1.146 2.317.69 4.866 1.448 7.887 1.448 1.015 0 2.081-.086 3.211-.288a.823.823 0 0 0 .629-.518.784.784 0 0 0-.145-.789l-5.282-6.108 5.29-6.303a.781.781 0 0 0 .07-.917.837.837 0 0 0-.862-.382c-4.098.733-7.258-.207-10.313-1.115C9.616.602 7.59 0 5.437 0 3.87 0 2.236.32.458 1.182z"
      );
      path.setAttribute("fill", "#E36F1E");
      svg.appendChild(path);

      // Create ToolTip SVG
      var tooltipSvg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      tooltipSvg.setAttribute("overflow", "visible");
      svg.appendChild(tooltipSvg);

      // Create tooltip path
      var tooltipPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      tooltipPath.setAttribute("visibility", "hidden");
      tooltipPath.setAttribute("d", "M10,0 v-60");
      tooltipPath.setAttribute("stroke", "#fff");
      tooltipPath.setAttribute("stroke-width", "2");
      tooltipSvg.appendChild(tooltipPath);

      // Create tooltip text
      var tooltipText = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      tooltipText.setAttribute("visibility", "hidden");
      tooltipText.setAttribute("y", "-55");
      tooltipText.textContent = `#${(i + 1)} ${donorsNames[i].clientName}`
      tooltipSvg.appendChild(tooltipText);

      // Get data of text used for dynamic resizing
      let textBox = tooltipText.getBBox();

      // Center text by setting x-value to text width/2
      tooltipText.setAttribute("x", -(textBox.width / 2.5));

      // Create ToolTip rect
      var tooltipRect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );
      tooltipRect.setAttribute("visibility", "hidden");
      tooltipRect.setAttribute("width", textBox.width + 20);
      tooltipRect.setAttribute("height", "40");
      tooltipRect.setAttribute("x", -(textBox.width / 2.5) - 10);
      tooltipRect.setAttribute("y", "-80");
      tooltipRect.setAttribute("rx", "5");
      tooltipRect.setAttribute("ry", "5");
      tooltipRect.setAttribute("fill", "#fff");
      tooltipRect.setAttribute("fill-opacity", "1");
      tooltipSvg.appendChild(tooltipRect);

      // Remove and re-append text because of SVG DOM Layering rules
      tooltipText.remove();
      tooltipSvg.appendChild(tooltipText);

      // Display donor name on hover
      svg.addEventListener("mouseenter", function () {
        tooltipRect.setAttribute("visibility", "visible");
        tooltipPath.setAttribute("visibility", "visible");
        tooltipText.setAttribute("visibility", "visible");
      });

      // Hide donor name on mouseout
      svg.addEventListener("mouseout", function () {
        tooltipRect.setAttribute("visibility", "hidden");
        tooltipPath.setAttribute("visibility", "hidden");
        tooltipText.setAttribute("visibility", "hidden");
      });
    });
  }
  loadDonors();

  /**
   * Reload flags according to selected filter
   */
  function filter() {
    $("#hof").empty();
  }
};

// Flag and Tooltip Template
//
// <svg
//   overflow="visible"
//   x="21.2"
//   y="32.5"
//   width="1.8"
//   height="1.8"
//   viewBox="0 0 23 26"
//   xmlns="http://www.w3.org/2000/svg"
//   xmlns:xlink="http://www.w3.org/1999/xlink"
// >
//   <defs>
//     <path
//       d="M.458 1.182A.802.802 0 0 0 0 1.901v14.134c0 .03.006.058.017.084v9.104c0 .429.358.777.801.777.442 0 .8-.348.8-.777v-9.469c1.753-.519 3.73-.703 3.73-.703 1.952-.02 3.831.539 5.876 1.146 2.317.69 4.866 1.448 7.887 1.448 1.015 0 2.081-.086 3.211-.288a.823.823 0 0 0 .629-.518.784.784 0 0 0-.145-.789l-5.282-6.108 5.29-6.303a.781.781 0 0 0 .07-.917.837.837 0 0 0-.862-.382c-4.098.733-7.258-.207-10.313-1.115C9.616.602 7.59 0 5.437 0 3.87 0 2.236.32.458 1.182z"
//       id="j2mcz825ra"
//     />
//   </defs>
//   <g fill="none" fill-rule="evenodd">
//     <mask id="npuw7wad9b" fill="#fff">
//       <use xlink:href="#j2mcz825ra" />
//     </mask>
//     <path fill="#E36F1E" mask="url(#npuw7wad9b)" d="M-1 27h25V-1H-1z" />
//   </g>
//   <svg overflow="visible" visibility="hidden">
//     <rect
//       width="150"
//       height="40"
//       x="-60"
//       y="-100"
//       rx="5"
//       ry="5"
//       style="fill: white; fill-opacity: 1"
//     />
//     <path d="M10,0 v-100" stroke="white" stroke-width="2" />
//     <text x="-10" y="-75">
//       Tooltip
//     </text>
//   </svg>
// </svg>;

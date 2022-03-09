window.onload = function () {
  // Flag Coordinates
  let coordinates = [];

  // Donors names
  var donorsNames = new Array();

  /**
   * Load donor CSV
   * loadDonors() finishes before populating 'donorsNames' array therefore
   * renderFlags() must be called after the 'complete:' callback
   */
  function loadDonors(type) {
    var config = {
      delimiter: ",",
      step: function (results) {
        donorsNames.push(results.data);
      },
      complete: function (results) {
        loadDonorsCallback(type);
      },
      download: true,
      header: true,
    };
    Papa.parse("data/donor-list.csv", config);
  }
  // Callback to load donors for 'mountain' view or 'list' view
  function loadDonorsCallback(type) {
    renderFlags();
    renderList();
    switch (type) {
      case "mountain":
        openMountainView();
        break;
      case "list":
        openListView();
        break;
    }
  }

  /**
   * Populate list for 'ListView'
   */
  function renderList() {
    donorsNames.sort(sortArray).forEach((x, i) => {
      document.getElementById(
        "list-view-ul"
      ).innerHTML += `<li>${x.clientName}</li>`;
    });
  }
  // Sort names alphabetically
  function sortArray(x, y) {
    if (x.clientName < y.clientName) {
      return -1;
    }
    if (x.clientName > y.clientName) {
      return 1;
    }
    return 0;
  }

  /**
   * Add Flags
   */
  function renderFlags() {
    // Render 'View All' button
    renderViewAll();
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
      tooltipText.textContent = `#${i + 1} ${donorsNames[i].clientName}`;
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

  /**
   * Add 'View All' button
   */
  function renderViewAll() {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("overflow", "visible");
    svg.setAttribute("x", 80);
    svg.setAttribute("y", 36);
    svg.setAttribute("fill", "#FFF");
    svg.setAttribute("width", "4");
    svg.setAttribute("height", "6.88");
    svg.setAttribute("viewBox", "0 0 45 78");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    document.getElementById("hof").appendChild(svg);

    // Define the 'View All' path1
    var path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("d", "M22.5 44.5v33");
    path1.setAttribute("stroke", "#FFF");
    path1.setAttribute("stroke-linecap", "square");
    svg.appendChild(path1);

    // Define the 'View All' path2
    var path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute(
      "d",
      "M22.5 0C10.097 0 0 10.088 0 22.5 0 34.903 10.097 45 22.5 45S45 34.903 45 22.5C45 10.087 34.903 0 22.5 0zm15.15 19.913-6.9 6.722 1.631 9.487a.932.932 0 0 1-.375.91.917.917 0 0 1-.553.186.87.87 0 0 1-.431-.112L22.5 32.625l-8.522 4.481a.917.917 0 0 1-.984-.075.932.932 0 0 1-.376-.91l1.632-9.486-6.9-6.722a.932.932 0 0 1-.235-.956.92.92 0 0 1 .76-.638l9.524-1.388 4.257-8.634c.318-.637 1.368-.637 1.687 0l4.256 8.634 9.525 1.388a.92.92 0 0 1 .76.638.93.93 0 0 1-.235.956h.001z"
    );
    path2.setAttribute("fill", "#FFF");
    path2.setAttribute("fill-rule", "nonzero");
    svg.appendChild(path2);

    // Create 'View All' text
    var viewAllText = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    viewAllText.setAttribute("x", -10);
    viewAllText.setAttribute("y", 95);
    viewAllText.textContent = `View All`;
    svg.appendChild(viewAllText);

    /**
     * Dynamic Functions
     */

    // Display donor name on hover
    svg.addEventListener("mouseenter", function () {
      viewAllText.setAttribute("text-decoration", "underline");
    });

    // Hide donor name on mouseout
    svg.addEventListener("mouseout", function () {
      viewAllText.setAttribute("text-decoration", "none");
    });

    // Open list view eventListener
    svg.addEventListener("click", function () {
      openListView();
    });
  }

  // Open MountainView
  function openMountainView() {
    document.getElementById("hof").style.display = "block";
    document.getElementById("container").style.position = "absolute";
    document.getElementById("list-view-container").style.display = "none";
  }

  // Open listView
  function openListView() {
    document.getElementById("hof").style.display = "none";
    document.getElementById("container").style.position = "relative";
     document.getElementById("index").style.display = "flex";
    document.getElementById("list-view-container").style.display = "block";
  }

  function init() {
    console.log('init')
    // Load coordinates from external JSON
    $.getJSON("data/coordinates.json", function (json) {
      coordinates = json;
    });
    window.innerWidth > 1000 ? loadDonors("mountain") : loadDonors("list");

    // Dynamically switch on screen resize TODO: add openMountainView() when appropriate
    window.onresize = function (event) {
      window.innerWidth > 1000 ? "" : openListView();
    };
  }

  init();
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

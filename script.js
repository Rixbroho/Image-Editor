let filters = {
  brightness: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  contrast: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  saturation: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  hueRotate: {
    value: 0,
    min: 0,
    max: 360,
    unit: "deg",
  },
  blur: {
    value: 0,
    min: 0,
    max: 20,
    unit: "px",
  },
  grayscale: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  sepia: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  opacity: {
    value: 100,
    min: 0,
    max: 100,
    unit: "%",
  },
  invert: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
};

const filterContainer = document.querySelector(".filters");

const imgInput = document.querySelector("#image-input");

const imageCanvas = document.querySelector("#image-canvas");
const canvasCtx = imageCanvas.getContext("2d");
let image = null;

const resetBtn = document.querySelector("#reset-btn");
const downloadBtn = document.querySelector("#download-btn");

const presetsContainer = document.querySelector(".presets");

const createFilterElement = (name, unit, value, min, max) => {
  const div = document.createElement("div");
  div.classList.add("filter");

  const p = document.createElement("p");
  p.innerText = name[0].toUpperCase() + name.slice(1);

  const input = document.createElement("input");
  input.value = value;
  input.type = "range";
  input.min = min;
  input.max = max;
  input.id = name;

  div.append(p);
  div.append(input);

  input.addEventListener("input", (e) => {
    filters[name].value = input.value;
    console.log(name, filters[name].value);
    apply(name);
  });

  return div;
};

const inputMaker = () => {
  Object.keys(filters).forEach((filter) => {
    const filterElement = createFilterElement(
      filter,
      filters[filter].unit,
      filters[filter].value,
      filters[filter].min,
      filters[filter].max,
    );
    filterContainer.append(filterElement);
  });
};

inputMaker();

imgInput.addEventListener("change", (e) => {
  const file = e.target.files[0];

  imageCanvas.style.display = "inline";
  const placeHolder = document.querySelector(".placeholder");
  placeHolder.style.display = "none";

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = () => {
    image = img;
    imageCanvas.width = img.width;
    imageCanvas.height = img.height;
    canvasCtx.drawImage(img, 0, 0);
  };
});

function apply() {
  canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

  canvasCtx.filter = `
  brightness(${filters.brightness.value}${filters.brightness.unit})
  contrast(${filters.contrast.value}${filters.contrast.unit})
  saturate(${filters.saturation.value}${filters.saturation.unit})
  hue-rotate(${filters.hueRotate.value}${filters.hueRotate.unit})
  blur(${filters.blur.value}${filters.blur.unit})
  grayscale(${filters.grayscale.value}${filters.grayscale.unit})
  sepia(${filters.sepia.value}${filters.sepia.unit})
  opacity(${filters.opacity.value}${filters.opacity.unit})
  invert(${filters.invert.value}${filters.invert.unit})
  `;
  canvasCtx.drawImage(image, 0, 0);
}

resetBtn.addEventListener("click", () => {
  filters = {
    brightness: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    contrast: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    saturation: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    hueRotate: {
      value: 0,
      min: 0,
      max: 360,
      unit: "deg",
    },
    blur: {
      value: 0,
      min: 0,
      max: 20,
      unit: "px",
    },
    grayscale: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
    sepia: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
    opacity: {
      value: 100,
      min: 0,
      max: 100,
      unit: "%",
    },
    invert: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
  };
  console.log("reset");

  changeInputFilter();
});

downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = imageCanvas.toDataURL("image/png");
  // document.body.appendChild(link);
  link.click();
  // document.body.removeChild(link);
});

const presets = {
  normal: {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hueRotate: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  vintage: {
    brightness: 110,
    contrast: 90,
    saturation: 80,
    hueRotate: 0,
    blur: 0,
    grayscale: 10,
    sepia: 40,
    opacity: 100,
    invert: 0,
  },

  dramatic: {
    brightness: 90,
    contrast: 150,
    saturation: 120,
    hueRotate: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  cool: {
    brightness: 100,
    contrast: 110,
    saturation: 120,
    hueRotate: 180,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  warm: {
    brightness: 110,
    contrast: 105,
    saturation: 120,
    hueRotate: 330,
    blur: 0,
    grayscale: 0,
    sepia: 20,
    opacity: 100,
    invert: 0,
  },

  blackwhite: {
    brightness: 100,
    contrast: 120,
    saturation: 0,
    hueRotate: 0,
    blur: 0,
    grayscale: 100,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  dreamy: {
    brightness: 120,
    contrast: 90,
    saturation: 110,
    hueRotate: 0,
    blur: 3,
    grayscale: 0,
    sepia: 10,
    opacity: 100,
    invert: 0,
  },
};

Object.keys(presets).forEach((presetName) => {
  const btn = document.createElement("button");
  btn.classList.add("btn");
  btn.innerHTML = `${presetName[0].toUpperCase() + presetName.slice(1)}`;
  presetsContainer.appendChild(btn);

  // btn.addEventListener('click',()=>{
  //     filter[preset].value=presets[preset];
  //     apply();
  // })

  btn.addEventListener("click", () => {
    const preset = presets[presetName];
    Object.keys(preset).forEach((filterName) => {
      filters[filterName].value = preset[filterName];
    });
    changeInputFilter();
  });
});


function changeInputFilter(){
  filterContainer.innerHTML = "";
  apply();
  inputMaker();
}
import { fifo, lru, opt } from "./js/algorythms";
import { drawOuputSeq, drawMem } from "./js/draw";
import { config } from "./js/config";

function getAlgor(alg) {
  switch (alg) {
    case "fifo":
      return fifo;
    case "lru":
      return lru;
    case "opt":
      return opt;
  }

  return undefined;
}

function resetVisualization() {
  config.pageFault = 0;
  config.pageData.innerText = config.pageFault;
  config.output.innerHTML = "";
  config.outputSeq.innerHTML = "";
  config.lastSeq = [];
  config.boutAlgorythmTitleIndicator.classList.remove("active");
  config.aboutAlgorythmBoxes.forEach((e) => e.classList.remove("active"));
}

function validateAndReturnData(dataToValidate) {
  const { algorythm, memorySize, sequence } = dataToValidate;

  const validatedAlgorythm = getAlgor(algorythm);
  const validatedMemorySize = +memorySize;
  let validatedSequence;

  if (!validatedAlgorythm) {
    return {
      message: `Invalid algorithm value: ${algorythm}`,
    };
  }

  if (isNaN(validatedMemorySize)) {
    return {
      message: `Invalid memory size value: ${memorySize}`,
    };
  }

  const problemIndex = sequence.findIndex((e) => isNaN(+e));
  if (problemIndex !== -1) {
    return {
      message: `Invalid sequence value: ${sequence}:${problemIndex} -> ${sequence.find(
        (_, index) => index === problemIndex
      )}`,
    };
  }

  validatedSequence = sequence.map((e) => +e);

  return {
    validatedAlgorythm,
    validatedMemorySize,
    validatedSequence,
  };
}

function visualize() {
  const algorythm = config.form.alg.value.toLowerCase().trim();
  const memorySize = config.form.mem.value.toLowerCase().trim();
  const sequence = config.form.input.value.trim().split(" ");

  const {
    validatedAlgorythm,
    validatedMemorySize,
    validatedSequence,
    message,
  } = validateAndReturnData({ algorythm, memorySize, sequence });

  if (message !== undefined) {
    toastr.error(message);
    return;
  }

  resetVisualization();

  const mem = Array(validatedMemorySize).fill(null);
  const queue = [];

  config.aboutAlgTitleSpan.innerText = algorythm.toUpperCase();
  config.aboutAlgorythmBoxes.forEach((e) => {
    if (e.dataset.alg === algorythm) {
      e.classList.add("active");
    } else {
      e.classList.remove("active");
    }
  });

  drawOuputSeq(validatedSequence);

  for (let i = 0; i < validatedSequence.length; i++) {
    validatedAlgorythm(+validatedSequence[i], mem, queue, validatedSequence, i);

    drawMem(mem);
    config.lastSeq = algorythm !== "opt" ? [...queue] : [...mem];
  }

  config.pageData.innerText = config.pageFault;
}

window.addEventListener("load", () => {
  config.form = document.querySelector(".form");
  config.output = document.querySelector(".output");
  config.pageData = document.querySelector(".stron-data");
  config.outputSeq = document.querySelector(".output-seq");
  config.aboutAlgTitle = document.querySelector(".about-algorythm-title");
  config.aboutAlgTitleSpan = document.querySelector(
    ".about-algorythm-title-span"
  );
  config.aboutAlgorythmBoxes = document.querySelectorAll(
    ".about-algorythm-box"
  );
  config.boutAlgorythmTitleIndicator = document.querySelector(
    ".about-algorythm-title-indicator"
  );

  visualize();

  config.form.addEventListener("submit", (e) => {
    e.preventDefault();
    visualize();
  });

  config.aboutAlgTitle.addEventListener("click", (e) => {
    config.boutAlgorythmTitleIndicator.classList.toggle("active");
    config.aboutAlgorythmBoxes.forEach((e) => {
      if (e.classList.contains("active")) {
        e.classList.toggle("visible");
      } else {
        e.classList.remove("visible");
      }
    });
  });
});

let form,
  output,
  outputSeq,
  lastSeq = [],
  brakStron,
  stronData;

function opt(proc, mem, queue, seq, index) {
  // if memory has such process, then do nothing
  if (mem.indexOf(proc) !== -1) {
    return;
  }

  // if memory has available space for this process, then we place this proces into the queue
  const freeSpaceIndex = mem.indexOf(null);

  if (freeSpaceIndex !== -1) {
    queue.push(proc);
    mem[freeSpaceIndex] = proc;
    return;
  }

  // if memory has no free space and doesn't have this process, then we replace process in memory with this process
  // OPT replacement
  const arr = [];
  let lastIndex = 0;

  for (let i = index; i < seq.length; i++) {
    if (
      seq[i] !== proc &&
      mem.findIndex((el) => el === seq[i]) !== -1 &&
      arr.findIndex((el) => el === seq[i]) === -1
    ) {
      arr.push(seq[i]);
    }

    if (arr.length === mem.length) {
      lastIndex = mem.findIndex((el) => el === arr[arr.length - 1]);
      break;
    }
  }

  if (arr.length === mem.length) {
    mem[lastIndex] = proc;
    console.log(mem, arr);
    return;
  }

  let i = mem.findIndex(
    (el) => mem.filter((el) => arr.findIndex((e) => el === e) === -1)[0] === el
  );
    
  mem[i] = proc;
}

function lru(proc, mem, queue) {
  // if memory has such process, then do nothing
  let procIndex = queue.findIndex((el) => proc === el);

  if (procIndex !== -1) {
    queue.splice(procIndex, 1);
    queue.push(proc);
    return;
  }

  // if memory has available space for this process, then we place this proces into the queue
  const freeSpaceIndex = mem.indexOf(null);

  if (freeSpaceIndex !== -1) {
    queue.push(proc);
    mem[freeSpaceIndex] = proc;
    return;
  }

  // if memory has no free space and doesn't have this process, then we replace process in memory with this process
  // LRU replacement
  const replaceElementIndex = mem.indexOf(queue[0]);
  mem[replaceElementIndex] = proc;
  queue.shift();
  queue.push(proc);
}

function fifo(proc, mem, queue) {
  // if memory has such process, then do nothing
  if (mem.indexOf(proc) !== -1) {
    return;
  }

  // if memory has available space for this process, then we place this proces into the queue
  const freeSpaceIndex = mem.indexOf(null);

  if (freeSpaceIndex !== -1) {
    queue.push(proc);
    mem[freeSpaceIndex] = proc;
    return;
  }

  // if memory has no free space and doesn't have this process, then we replace process in memory with this process
  // FIFO replacement
  const replaceElementIndex = mem.indexOf(queue[0]);
  mem[replaceElementIndex] = proc;
  queue.shift();
  queue.push(proc);
}

function drawMem(mem) {
  const div = document.createElement("tr");

  div.innerHTML = mem
    .map((element) => {
      let isOld = lastSeq.findIndex((e) => e === element) !== -1;

      if (element === null) {
        element = "";
        isOld = true;
      }

      if (!isOld) brakStron++;

      return `<td class="${isOld ? "" : "isOld"}">${element}</td>`;
    })
    .join("");
  output.append(div);
}

function allocateMemory(size) {
  const arr = [];

  for (let i = 0; i < size; i++) {
    arr[i] = null;
  }

  return arr;
}

function getAlgor(alg) {
  switch (alg) {
    case "fifo":
      return fifo;
    case "lru":
      return lru;
  }

  return undefined;
}

function drawOuputSeq(seq) {
  seq.forEach((element) => {
    const div = document.createElement("tr");
    div.innerHTML = `<td>${element}</td>`;
    outputSeq.append(div);
  });
}

function visualize() {
  brakStron = 0;
  stronData.innerText = brakStron;
  output.innerHTML = "";
  outputSeq.innerHTML = ""; // Clear previous sequence
  lastSeq = [];

  const alg = form.alg.value.toLowerCase().trim();
  const memSize = form.mem.value.toLowerCase().trim();
  const seq = form.input.value
    .trim()
    .split(" ")
    .map((e) => +e);

  const mem = allocateMemory(memSize);
  const queue = [];
  const funcAlg = getAlgor(alg);

  drawOuputSeq(seq);

  for (let i = 0; i < seq.length; i++) {
    const element = +seq[i];

    if (!funcAlg) {
      opt(element, mem, queue, seq, i);
    } else {
      funcAlg(element, mem, queue);
    }

    drawMem(mem);
    if (alg !== "opt") lastSeq = [...queue];
    else lastSeq = [...mem];
  }

  stronData.innerText = brakStron;
}

window.addEventListener("load", () => {
  form = document.querySelector(".form");
  output = document.querySelector(".output");
  stronData = document.querySelector(".stron-data");
  outputSeq = document.querySelector(".output-seq");

  visualize();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    visualize();
  });
});

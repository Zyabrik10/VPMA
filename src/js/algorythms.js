// if memory has available space for this process, then we place this proces into the queue
function useFreeMemory(mem, queue, proc) {
  const freeSpaceIndex = mem.indexOf(null);

  if (freeSpaceIndex !== -1) {
    queue.push(proc);
    mem[freeSpaceIndex] = proc;
    return true;
  }

  return false;
}

function checkIfMemoryHasProcess(mem, proc) {
  return mem.indexOf(proc) === -1;
}

export function opt(proc, mem, queue, seq, index) {
  if (!checkIfMemoryHasProcess(mem, proc) || useFreeMemory(mem, queue, proc))
    return;

  // replacement
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
    return;
  }

  let i = mem.findIndex(
    (el) => mem.filter((el) => arr.findIndex((e) => el === e) === -1)[0] === el
  );

  mem[i] = proc;
}

export function lru(proc, mem, queue) {
  // if memory has such process, then do nothing
  let procIndex = queue.findIndex((el) => proc === el);

  if (procIndex !== -1) {
    queue.splice(procIndex, 1);
    queue.push(proc);
    return;
  }

  if (useFreeMemory(mem, queue, proc)) return;

  // replacement
  const replaceElementIndex = mem.indexOf(queue[0]);
  mem[replaceElementIndex] = proc;
  queue.shift();
  queue.push(proc);
}

export function fifo(proc, mem, queue) {
  if (!checkIfMemoryHasProcess(mem, proc) || useFreeMemory(mem, queue, proc))
    return;

  // replacement
  const replaceElementIndex = mem.indexOf(queue[0]);
  mem[replaceElementIndex] = proc;
  queue.shift();
  queue.push(proc);
}

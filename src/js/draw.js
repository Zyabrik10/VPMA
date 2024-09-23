import { config } from "./config";

export function drawMem(mem) {
  const div = document.createElement("tr");

  div.innerHTML = mem
    .map((element) => {
      let isOld = config.lastSeq.findIndex((e) => e === element) !== -1;

      if (element === null) {
        element = "";
        isOld = true;
      }

      if (!isOld) config.pageFault++;

      return `<td class="${isOld ? "" : "isOld"}">${element}</td>`;
    })
    .join("");
  config.output.append(div);
}

export function drawOuputSeq(seq) {
  seq.forEach((element) => {
    const div = document.createElement("tr");
    div.innerHTML = `<td>${element}</td>`;
    config.outputSeq.append(div);
  });
}

const socket = io();
const editor = document.getElementById("editor");
let isRemoteChange = false;

socket.on("load-document", data => {
  editor.innerHTML = data;
});

editor.addEventListener("input", () => {
  if (isRemoteChange) return;
  const content = editor.innerHTML;
  socket.emit("doc-change", content);
});

socket.on("doc-change", (data) => {
  isRemoteChange = true;
  editor.innerHTML = data;
  setTimeout(() => {
    isRemoteChange = false;
  }, 0);
});
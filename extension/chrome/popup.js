function generator() {
  var from = document.getElementById("from").value;
  var to = document.getElementById("to").value;
  var nnin = generate(from, to, 1);

  document.getElementById("nnin").value = nnin;
  chrome.storage.sync.set({ nnin: nnin }, function() {});
  document.getElementById("fill").removeAttribute("disabled");
  document.getElementById("nnin").select();
}

document.getElementById("generate").onclick = () => {
  generator();
};

let filler = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.storage.sync.get(["nnin"], function(result) {
      chrome.tabs.sendMessage(tabs[0].id, { nnin: result.nnin }, function(
        response
      ) {
        this.close();
      });
    });
  });
};
document.getElementById("nnin").onkeyup = e => {
  if (e.keyCode === 13) {
    filler();
  }
};
document.getElementById("fill").onclick = () => {
  filler();
};

generator();

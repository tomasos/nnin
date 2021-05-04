function listenForClicks() {
  let generator = () => {
    var from = document.getElementById("from").value;
    var to = document.getElementById("to").value;
    var gender = document.getElementById("gender").checked ? 1 : 0;
    var nnin = generate(from, to, gender);
    document.getElementById("nnin").value = nnin;
    browser.storage.local.set({
      nnin: nnin
    });

    document.getElementById("fill").removeAttribute("disabled");
    document.getElementById("nnin").select();
  };

  document.getElementById("generate").onclick = () => {
    generator();
  };

  let filler = () => {
    browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
      browser.storage.local.get("nnin").then(res => {
        browser.tabs.sendMessage(tabs[0].id, {
          command: "fill",
          nnin: res.nnin
        });
        this.close();
      });
    });
  };

  document.getElementById("fill").onclick = () => {
    filler();
  };

  document.getElementById("nnin").onkeyup = e => {
    if (e.keyCode === 13) {
      filler();
    }
  };

  generator();
}

browser.tabs.executeScript({ file: "./content.js" }).then(listenForClicks);

(function() {
  browser.runtime.onMessage.addListener(message => {
    var inputs = document.getElementsByTagName("input");
    var els = [];

    var querys = [
      "birthnumber",
      "ssn",
      "socialsecuritynumber",
      "fodselsnummer",
      "personnumber"
    ];

    for (var i = 0; i < inputs.length; i++) {
      querys.forEach(q => {
        if (
          inputs
            .item(i)
            .id.toLowerCase()
            .indexOf(q) > -1 ||
          inputs
            .item(i)
            .name.toLowerCase()
            .indexOf(q) > -1
        ) {
          els.push(inputs.item(i));
        }
      });
    }

    if (els.length > 0 && message.command === "fill") {
      var el = els[0];
      el.select();
      el.value = message.nnin;
      el.dispatchEvent(new Event("change", { bubbles: true }));
    }
  });
})();

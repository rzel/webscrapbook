/********************************************************************
 *
 * Manage options
 *
 *******************************************************************/

var OPTION_PREFIX = "opt_";

function getOptionFromDocument(id) {
  var elem = document.getElementById(OPTION_PREFIX + id);
  switch (elem.getAttribute("type")) {
    case "checkbox":
      return elem.checked;
    default:
      return elem.value;
  }
}

function setOptionFromDocument(id, value) {
  var elem = document.getElementById(OPTION_PREFIX + id);
  switch (elem.getAttribute("type")) {
    case "checkbox":
      elem.checked = value;
      break;
    default:
      elem.value = value;
      break;
  }
}

window.addEventListener("DOMContentLoaded", function (event) {
  // load languages
  scrapbook.loadLanguages(document);

  // form
  var form = document.getElementById("options");

  form.addEventListener("submit", function (event) {
    for (var id in scrapbook.options) {
      scrapbook.options[id] = getOptionFromDocument(id);
    }
    scrapbook.saveOptions(function () {
      window.close();
    });
    event.preventDefault();
  });

  // default options
  for (var id in scrapbook.options) {
    var value = scrapbook.options[id];

    var p = document.createElement("p");
    form.appendChild(p);

    var label = document.createElement("label");
    label.setAttribute("for", id);
    label.textContent = id + ": ";
    p.appendChild(label);

    switch (typeof value) {
      case "boolean":
        var input = document.createElement("input");
        input.id = OPTION_PREFIX + id;
        input.type = "checkbox";
        input.setAttribute("checked", value ? "true" : "false");
        p.appendChild(input);
        break;
      case "number":
        var input = document.createElement("input");
        input.id = OPTION_PREFIX + id;
        input.type = "number";
        input.setAttribute("value", value);
        p.appendChild(input);
        break;
      default:
        var input = document.createElement("input");
        input.id = OPTION_PREFIX + id;
        input.type = "text";
        input.setAttribute("value", value);
        p.appendChild(input);
        break;
    }
  }

  // submit, reset
  var p = document.createElement("p");

  var submit = document.createElement("input");
  submit.type = "submit";
  p.appendChild(submit);

  var reset = document.createElement("input");
  reset.type = "reset";
  p.appendChild(reset);

  form.appendChild(p);

  // load from sync
  scrapbook.loadOptions(function (options) {
    for (var id in options) {
      var value = options[id];
      setOptionFromDocument(id, value);
    }
  });
});

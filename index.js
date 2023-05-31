let todoContainer = document.getElementById("todoItemsContainer");
let addbutton = document.getElementById("addButton");
let savebtn = document.getElementById("savebutton");
savebtn.classList.add("add-todo-button");
// let array = [
//   { text: "Learn HTML", uniqueNo: 1 },
//   { text: "Learn CSS", uniqueNo: 2 },
//   { text: "Learn Javascript", uniqueNo: 3 },
//   { text: "Learn React", uniqueNo: 4 },
// ];
function getlocalstoragearray() {
  let stringifiedarray = localStorage.getItem("array");
  if (stringifiedarray === null) {
    return [];
  } else {
    return JSON.parse(stringifiedarray);
  }
}
let array = getlocalstoragearray();

function removelist(listitemId) {
  let child = document.getElementById(listitemId);
  todoContainer.removeChild(child);
  let index = array.findIndex(function (item) {
    let id = "listitem" + item.uniqueNo;
    if (listitemId === id) {
      return true;
    } else {
      return false;
    }
  });
  array.splice(index, 1);
}
function oncheckboxstrike(checkboxId, labelId, listitemId) {
  let inputElement = document.getElementById(checkboxId);
  let labelElement = document.getElementById(labelId);
  labelElement.classList.toggle("striked");
  let arrayitemindex = array.findIndex(function (item) {
    let arraitemid = "listitem" + item.uniqueNo;
    if (arraitemid === listitemId) {
      return true;
    } else {
      return false;
    }
  });
  let arrayitem = array[arrayitemindex];
  if (arrayitem.ischecked === true) {
    arrayitem.ischecked = false;
  } else {
    arrayitem.ischecked = true;
  }
  // //   (or)
  //   if (inputElement.checked){
  //     labelElement.classList.add("striked")
  //   }
  //   else{
  //     labelElement.classList.remove("striked")
  //   }
}
function createtodoitems(item) {
  let labelId = "label" + item.uniqueNo;
  let checkboxId = "checkbox" + item.uniqueNo;
  let listitemId = "listitem" + item.uniqueNo;
  let listitems = document.createElement("li");
  listitems.classList.add("todo-item-container", "d-flex", "flex-row");
  listitems.setAttribute("id", listitemId);
  todoContainer.appendChild(listitems);

  let inputcheckbox = document.createElement("input");
  inputcheckbox.setAttribute("type", "checkbox");
  inputcheckbox.setAttribute("id", checkboxId);
  inputcheckbox.classList.add("checkbox-input");
  inputcheckbox.checked = item.ischecked;
  listitems.appendChild(inputcheckbox);

  inputcheckbox.onclick = function () {
    oncheckboxstrike(checkboxId, labelId, listitemId);
  };

  let labelElcontainer = document.createElement("div");
  labelElcontainer.classList.add("label-container", "d-flex", "flex-row");
  listitems.appendChild(labelElcontainer);

  let labelEl = document.createElement("label");
  labelEl.setAttribute("for", checkboxId);
  labelEl.setAttribute("id", labelId);
  labelEl.classList.add("checkbox-label");
  labelEl.textContent = item.text;
  if (item.ischecked === true) {
    labelEl.classList.add("striked");
  }
  labelElcontainer.appendChild(labelEl);
  let deleteiconcontainer = document.createElement("div");
  deleteiconcontainer.classList.add("delete-icon-container");
  labelElcontainer.appendChild(deleteiconcontainer);

  let deleteicon = document.createElement("i");
  deleteicon.classList.add("far", "fa-trash-alt", "delete-icon");
  deleteiconcontainer.appendChild(deleteicon);
  deleteicon.onclick = function () {
    removelist(listitemId);
  };
}

for (let item of array) {
  createtodoitems(item);
}
addbutton.onclick = function () {
  let addinput = document.getElementById("todoUserInput");
  let inputElvalue = addinput.value;
  if (inputElvalue === "") {
    alert("Please Enter a Valid input.");
    return;
  } else {
    let newuniqueno = array.length + 1;
    item = { text: inputElvalue, uniqueNo: newuniqueno, ischecked: false };
    createtodoitems(item);
    array.push(item);
    addinput.value = "";
  }
};
savebtn.onclick = function () {
  localStorage.setItem("array", JSON.stringify(array));
};

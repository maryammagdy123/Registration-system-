var siteNameInput = document.getElementById("siteName");
var siteURLInput = document.getElementById("siteURL");
var bookmarksList = [];
// check if localStorage is not empty
if (localStorage.getItem("bookmarks") !== null) {
  bookmarksList = JSON.parse(localStorage.getItem("bookmarks"))
  handleDisplay()
}

// add 
function handleAddBookMark() {
  var websiteNameRegex = /^[a-zA-Z0-9-]{3,}$/;
  var urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;

// testing inputs
  var isNameValid = websiteNameRegex.test(siteNameInput.value)
  var isURLValid = urlRegex.test(siteURLInput.value)

  if (!isNameValid || !isURLValid) {
    var alertModal = new bootstrap.Modal(document.getElementById('exampleModal'));
    alertModal.show();
    return;
  }else{

  var webBookmarks = {
    siteName: siteNameInput.value.trim(),
    Url: siteURLInput.value.trim()
  };

  bookmarksList.push(webBookmarks);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));
  handleDisplay();
  resetInputs();
  }

}


function handleClearForm(){
  // clear local storage //make it all empty
localStorage.clear()
var tbody = document.querySelector("#myTable tbody");
tbody.innerHTML = "";
resetInputs()
}


// display data
function handleDisplay() {
  var temp = "";

  for (var i = 0; i < bookmarksList.length; i++) {
    temp += `<tr>
      <td>`+ i + `</td>
      <td>`+ bookmarksList[i].siteName + `</td>              
      <td>
        <button class="btn btn-visit btn-warning" ">
          <i class="fa-solid fa-eye pe-2"></i>
          <a class="text-decoration-none text-black" href="`+ bookmarksList[i].Url + `" target="_blank">Visit</a>
        </button>
      </td>
      <td>
        <button onclick="handleDeleteBookmark(`+ i + `)" class="btn btn-delete btn-danger pe-2" >
          <i class="fa-solid fa-trash-can"></i>
          Delete
        </button>
      </td>
    </tr>`;
  }
  document.getElementById("tableContent").innerHTML = temp;
}

// delete
function handleDeleteBookmark(index) {
  bookmarksList.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));
  handleDisplay();
}


// after submitting the form the inputs will apear empty(user experience)
// reset inputs
function resetInputs() {
  siteNameInput.value = "";
  siteURLInput.value = "";

  siteNameInput.classList.remove("is-valid", "is-invalid");
  siteURLInput.classList.remove("is-valid", "is-invalid");
}


// validating inputs
siteNameInput.addEventListener("input", function () {
  var websiteNameRegex = /^[a-zA-Z0-9-]{3,}$/;
  var value = siteNameInput.value.trim();

  if (value === "") {
    siteNameInput.classList.remove("is-valid", "is-invalid");
  } else if (websiteNameRegex.test(value)) {
    siteNameInput.classList.add("is-valid");
    siteNameInput.classList.remove("is-invalid");
  } else {
    siteNameInput.classList.add("is-invalid");
    siteNameInput.classList.remove("is-valid");
  }
});


siteURLInput.addEventListener("input", function () {
  var websiteURLRegex =  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;
  var value = siteURLInput.value.trim();

  if (value === "") {
    siteURLInput.classList.remove("is-valid", "is-invalid");
  } else if (websiteURLRegex.test(value)) {
    siteURLInput.classList.add("is-valid");
    siteURLInput.classList.remove("is-invalid");
  } else {
    siteURLInput.classList.add("is-invalid");
    siteURLInput.classList.remove("is-valid");
  }
});

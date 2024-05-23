var siteName = document.getElementById("siteName");
var url = document.getElementById("url");
var tbody = document.getElementById("tbody");
var messageElement = document.getElementById('message');

var bookmarks = localStorage.getItem('bookmarks') ? JSON.parse(localStorage.getItem('bookmarks')) : [];
displayBookmarks();

function addBookmark() {
    if (!validateForm(siteName.value, url.value)) {
        messageElement.innerHTML = '<div class="alert alert-danger">Please enter a valid name and URL. The name must be more than 2 characters long and the URL must be valid.</div>';
        return;
    }

    var bookmark = {
        name: siteName.value,
        url: url.value
    };
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    displayBookmarks();
    clearForm();
    messageElement.innerHTML = '<div class="alert alert-success">Bookmark added successfully!</div>';
}

function displayBookmarks() {
    var cartoona = '';
    for (let i = 0; i < bookmarks.length; i++) {
        cartoona += `<tr> 
            <td>${bookmarks[i].name}</td>
            <td><button class="btn px-3 btn-danger" onclick="deleteBookmark(${i})">delete</button></td>
            <td><a class="btn px-3 btn-warning" target="_blank" href="${bookmarks[i].url}">Visit</a></td>
        </tr>`;
    }
    tbody.innerHTML = cartoona;
}

function deleteBookmark(id) {
    bookmarks.splice(id, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    displayBookmarks();
}

function clearForm() {
    siteName.value = '';
    url.value = '';
}

function validateForm(name, url) {
    const namePattern = /^.{3,}$/; // Name must be more than 2 characters
    const urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    
    return namePattern.test(name) && urlPattern.test(url);
}

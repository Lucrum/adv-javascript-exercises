const myLibrary = []

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info() {
    info_string = this.title + " by " +
      this.author + ", " +
      this.pages + " pages, "
    if (this.read) {
      info_string += "read"
    } else {
      info_string += "not read yet"
    }
    return info_string
  }

  toggleRead() {
    this.read = !this.read
  }
}

bookshelf = document.querySelector("#bookshelf")
newBookButton = document.querySelector("#add-book")
newBookModal = document.querySelector("dialog#create-book")
newBookForm = document.querySelector("dialog#create-book > form#book-form")
closeBookFormButton = document.querySelector("#close-form")
submitBookFormButton = document.querySelector("dialog#create-book input#submit")

newBookButton.addEventListener("click", showNewBookForm)
closeBookFormButton.addEventListener("click", closeNewBookForm)
newBookForm.addEventListener("submit", handleNewBook)

hobbit = new Book("The Hobbit", "J.R.R. Tolkien", 299, false)

addBookToLibrary(hobbit)

displayLibrary()

function showNewBookForm() {
  newBookModal.showModal()
}

function closeNewBookForm() {
  newBookModal.close()
}

function handleNewBook(e) {
  e.preventDefault()
  closeNewBookForm()

  const formData = new FormData(e.target)
  newBook = new Book(
    formData.get("title"),
    formData.get("author"),
    formData.get("pages"),
    formData.get("read")
  )

  addBookToLibrary(newBook)
  displayLibrary()
}

function removeBook(index) {
  myLibrary.splice(index, 1)
}

function addBookToLibrary(book) {
  myLibrary.push(book)
}

// iterates over the entire library and creates a new card for every book
// not too performant for larger libraries...
function displayLibrary() {
  new_entries = []
  let index = 0
  while (index < myLibrary.length) {
    new_entries.push(createCard(myLibrary[index], index))
    index++
  }
  bookshelf.replaceChildren(...new_entries)
}

function createCard(book, id) {
  wrapper = document.createElement("div")
  wrapper.classList.add('book-entry')

  title = document.createElement("h2")
  title.textContent = book.title

  author = document.createElement("p")
  author.textContent = "By " + book.author

  pages = document.createElement("p")
  pages.textContent = book.pages + " pages"

  read = document.createElement("p")
  if (book.read) {
    read.innerHTML = "Read"
  } else {
    read.innerHTML = "Not read yet"
  }

  toggleReadButton = document.createElement("button")
  toggleReadButton.textContent = "Toggle Read"
  toggleReadButton.addEventListener("click", () => {
    myLibrary[id].toggleRead()
    displayLibrary()
  })

  removeBookButton = document.createElement("button")
  removeBookButton.textContent = "Remove"
  removeBookButton.addEventListener("click", () => {
    removeBook(id)
    displayLibrary()
  })

  wrapper.appendChild(title)
  wrapper.appendChild(author)
  wrapper.appendChild(pages)
  wrapper.appendChild(read)
  wrapper.appendChild(toggleReadButton)
  wrapper.appendChild(removeBookButton)

  return wrapper
}
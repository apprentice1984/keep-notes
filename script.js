const addBtn = document.getElementById('btn')
let textareas = document.querySelectorAll('.note>textarea')
let editIcons = document.querySelectorAll('.fa-pen-to-square')
let deleteIcons = document.querySelectorAll('.fa-trash')

let notes = []

if (localStorage.getItem('notes')) {
  notes = JSON.parse(localStorage.getItem('notes'))

  notes.forEach((note) => {
    createNewNote(note)
  })

  init()
}

addBtn.addEventListener('click', (e) => {
  createNewNote()
  init()
})

function init() {
  console.log('init begin')

  textareas = document.querySelectorAll('.note>textarea')
  editIcons = document.querySelectorAll('.fa-pen-to-square')
  deleteIcons = document.querySelectorAll('.fa-trash')

  console.log(textareas)

  textareas.forEach((textarea, idx) => {
    if (notes[idx]) {
      textarea.value = notes[idx]
      textarea.setAttribute('readonly', true)
      textarea.classList.add('notEditable')
    }

    textarea.addEventListener('input', (e) => {
      notes[idx] = e.target.value
      localStorage.setItem('notes', JSON.stringify(notes))
    })

    textarea.addEventListener('blur', (e) => {
      e.target.setAttribute('readonly', true)
    })

    editIcons[idx].addEventListener('click', (e) => {
      textarea.removeAttribute('readonly')
      textarea.focus()
    })

    deleteIcons[idx].addEventListener('click', (e) => {
      textareas[idx].parentElement.remove()
      notes = notes.filter((item) => item !== textareas[idx].value)
      localStorage.setItem('notes', JSON.stringify(notes))
    })
  })
}

function createNewNote(note = '') {
  const noteEl = document.createElement('div')
  noteEl.classList.add('note')
  noteEl.innerHTML = ` <div class="noteHeader">
        <i class="fa-solid fa-pen-to-square"></i>
        <i class="fa-solid fa-trash"></i>
      </div>
      <textarea cols="25" rows="10">${note}</textarea>`
  document.body.append(noteEl)
}

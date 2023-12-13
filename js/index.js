//Students list
let users = [
  {
    id: 100,
    name: "Nurmuhammad",
    lastName: "Mahmudov",
    mark: 140.5,
    markedDate: new Date("2021-12-05").toISOString()
  },
  {
    id: 101,
    name: "Asadbek",
    lastName: "",
    mark: 146,
    markedDate: new Date("2021-12-06").toISOString()
  },
  {
    id: 102,
    name: "Ahmadjon",
    lastName: "Hasanjanov",
    mark: 75,
    markedDate: new Date("2021-12-01").toISOString()
  },
  {
    id: 103,
    name: "G'anivoy",
    lastName: "Teshayev",
    mark: 40,
    markedDate: new Date("2021-12-05").toISOString()
  },
  {
    id: 104,
    name: "Kamronbek",
    lastName: "Zoirov",
    mark: 150,
    markedDate: new Date("2022-03-29").toISOString()
  },
]

//modal
const elModalWrapper = document.querySelector(".modal__wrapper")
const elModal = document.querySelector(".modal")
const elBtn = document.querySelector(".js-btn")
const elModalBtnClose = document.querySelector(".modal__btn-close")

if(elBtn) {
  elBtn.addEventListener("click", () => {
    elModalWrapper.classList.add("js-modal")
  })
  elModalBtnClose.addEventListener("click", () => {
    elModalWrapper.classList.remove("js-modal")
  })
}

if(elModal) {
  elModal.addEventListener("click", (event) => {
      event.stopPropagation()
      elModal.classList.remove("js-modal")
  })
}

if(elModalWrapper) {
    elModalWrapper.addEventListener("click", () => {
        elModalWrapper.classList.remove("js-modal")
    })
}

// modal-close function
const modalClose = () => {
  elModalWrapper.classList.remove("js-modal")
}

//add modal
const elModalForm = document.querySelector(".modal__form")

if(elModalForm) {
  elModalForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const inputName = e.target.name.value
      const inputLastName = e.target.LastName.value
      const inputMark = e.target.Mark.value
      users.push({
        id: users[users.length - 1].id + 1,
        name: inputName,
        lastName: inputLastName,
        mark: inputMark,
        markedDate: new Date().toISOString()
      })

      modalClose()
      elModalForm.reset()
      render(users)
  })
}

//tr
const elSearch = document.querySelector("#search")
const elTbody = document.querySelector(".exam__tbody")
const elFormBtn = document.querySelector(".js-form-btn")
const elForm = document.querySelector(".exam__form")
const elTemplate = document.querySelector("#template-tr").content

function render(data) {
  elTbody.innerHTML = ""
  const fragment = document.createDocumentFragment()
  data.forEach(function(list) {
    const cloneTr = elTemplate.cloneNode(true)
    cloneTr.querySelector(".td-id").textContent = list.id
    cloneTr.querySelector(".td-name").textContent = `${list.name} ${list.lastName}`
    cloneTr.querySelector(".td-marked-date").textContent = list.markedDate
    cloneTr.querySelector(".td-mark").textContent = list.mark
    let status = cloneTr.querySelector(".td-status")
    if(list.mark >= 50){
      status.textContent = "Pass"
    } else {
      status.textContent = "Fail"
      status.style.color = "red"
    }
    cloneTr.querySelector(".js-edit-btn").id = list.id 
    cloneTr.querySelector(".js-delete-btn").id = list.id
    cloneTr.querySelector(".js-delete-btn").addEventListener( "click", () => deleteUser(list.id))
    fragment.appendChild(cloneTr)
  })
  elTbody.appendChild(fragment) 
}

//search
if(elForm) {
  elForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const search = e.target.search.value
      const from = e.target.from.value
      const to = e.target.to.value
      const filterUsers = users.filter((user) => {
          let filterName = user.name.toLocaleLowerCase().includes(search.toLowerCase()) || user.lastName.toLowerCase().includes(search.toLowerCase())
          let mark = ((from || 0) < user.mark) && ((to || 150) >= user.mark)
          return filterName && mark 
      })
      render(filterUsers)
  })
}

render(users)

//delete
function deleteUser(id) {
  users = users.filter(list => list.id !== +id)
  console.log(users);
  render(users)
}

//edit-modal
const elEditModalWrapper = document.querySelector(".edit-modal__wrapper")
const elEditModal = document.querySelector(".edit-modal")
const elEditModalBtnClose = document.querySelector(".edit-modal__btn-close")
const elEditBtn = document.querySelectorAll(".js-edit-btn")

if(elEditBtn) {
  elEditBtn.forEach((button) =>{
    button.addEventListener("click", () => {
    elEditModalWrapper.classList.add("js-edit-modal")
    editModalOpen(button.id)
    edit(button.id)
    })
  })
  elEditModalBtnClose.addEventListener("click", () => {
  elEditModalWrapper.classList.remove("js-edit-modal")
  })
}

if(elEditModal) {
  elEditModal.addEventListener("click", (event) => {
    event.stopPropagation()
    elEditModal.classList.remove("js-edit-modal")
  })
}

if(elEditModalWrapper) {
  elEditModalWrapper.addEventListener("click", () => {
    elEditModalWrapper.classList.remove("js-edit-modal")
  })
}

//edit-modal-close function
const editModalClose = () => {
  elEditModalWrapper.classList.remove("js-edit-modal")
}

//edit form
const elInputName = document.querySelector(".input-name")
const elInputLastName = document.querySelector(".input-lastname")
const elInputMark = document.querySelector(".input-mark")
const elEditForm = document.querySelector(".edit-modal__form")

function editModalOpen(id) {
  let user = users.find(function(el) {
    return el.id === +id
  })
  elInputName.value = user.name 
  elInputLastName.value = user.lastName 
  elInputMark.value = user.mark 
}

function edit(id) {
  elEditForm.addEventListener("submit", (e) =>{
    e.preventDefault()
    const inputName = e.target.editName.value
    const inputLastName = e.target.editLastname.value
    const inputMark = e.target.editMark.value
    const user = {
      id,
      name: inputName,
      lastName: inputLastName,
      mark: inputMark,
      markedDate: new Date().toISOString()
    }
    let newUsers = users.map(function(el){
      if(el.id === +id) {
        return user
      } else {
        return el
      }
    })

    render(newUsers)
    editModalClose()
    elEditForm.reset()
  })
}
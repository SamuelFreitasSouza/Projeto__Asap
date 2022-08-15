const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}


//CRUD - create read update delete
const getLocalStorage = () => JSON.parse(localStorage.getItem('dbApolic')) ?? []
const setLocalStorage = (dbApolic) => localStorage.setItem("dbApolic", JSON.stringify(dbApolic))

//CRUD - delete
const deleteApolic = (index) => {
    const dbApolic = readApolic()
    dbApolic.splice(index, 1)
    setLocalStorage(dbApolic)
} 


//CRUD - update
const updateApolic = (index, apolic) => {
    const dbApolic = readApolic()
    dbApolic[index] = apolic
    setLocalStorage(dbApolic)
}

//CRUD - Read
const readApolic = () => getLocalStorage()


//CRUD - Create
const createApolic = (apolic) => {
    const dbApolic = getLocalStorage() //vai ler as informações
    dbApolic.push (apolic)
    setLocalStorage(dbApolic)//Vai Enviar as informações
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//Interação com o layout

const clearFields = () => {
    const fields = document.querySelectorAll('input')
    fields.forEach(field => field.value = "")
}
//Interação com o Usuario
const salvarApolic = () => {
    debugger
    if (isValidFields()) {//verifica se os campos são validos
        const apolic = {
            numero: document.getElementById('numero').value,
            inicio: document.getElementById('inicio').value,
            fim: document.getElementById('fim').value,
            placa: document.getElementById('placa').value,
            valor: document.getElementById('valor').value
        }
        const index = document.getElementById('numero').dataset.index
        if (index == 'new') {
            createApolic(apolic)
            updateTable()
            closeModal()
        } else {
            updateApolic(index, apolic)
            updateTable()
            closeModal()
        }
    }
}

const createRow = (apolic,index) => {
    if (document.querySelector('#tableApolic>tbody')){
        const newRow = document.createElement('tr')
        newRow.innerHTML =  `
            <td  class="tabela__valores">${apolic.numero}</td>
            <td  class="tabela__valores">${apolic.inicio}</td>
            <td  class="tabela__valores">${apolic.fim}</td>
            <td  class="tabela__valores">${apolic.placa}</td>
            <td  class="tabela__valores">${apolic.valor}</td>
            <td>
                <button type="button" class="button green" id="edit-${index}">Editar</button>
                <button type="button" class="button red" id="delete-${index}" >Excluir</button>
            </td>
        `
        document.querySelector('#tableApolic>tbody').appendChild(newRow)
    }
    
    
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableApolic>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbApolic = readApolic()
    clearTable() 
    dbApolic.forEach(createRow)
}

const fillFields = (apolic) => {
    document.getElementById('numero').value = apolic.numero
    document.getElementById('inicio').value = apolic.inicio
    document.getElementById('fim').value = apolic.fim
    document.getElementById('placa').value = apolic.placa
    document.getElementById('valor').value = apolic.valor
    document.getElementById('numero').dataset.index = apolic.index
}

const editApolic = (index) => {
    const apolic = readApolic()[index]
    apolic.index = index
    fillFields(apolic)
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editApolic(index)
        } else {
            const apolic = readApolic()[index]
            const response = confirm(`Deseja realmente excluir o cliente ${apolic.nome}`)
            if (response) {
                deleteApolic(index)
                updateTable()
            }
        }
       
    }
    
}
console.log(editDelete)

updateTable()

// Eventos
document.getElementById('cadastrarApolice')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('cadastrar_apolice')
    .addEventListener('click', salvarApolic)

document.querySelector('#tableClient>tbody tr')
    .addEventListener('click', editDelete)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)
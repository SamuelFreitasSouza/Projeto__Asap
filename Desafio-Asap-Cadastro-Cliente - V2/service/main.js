const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}


//CRUD - create read update delete
const getLocalStorage = () => JSON.parse(localStorage.getItem('dbClient')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("dbClient", JSON.stringify(dbClient))

//CRUD - delete
const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
} 


//CRUD - update
const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

//CRUD - Read
const readClient = () => getLocalStorage()


//CRUD - Create
const createClient = (client) => {
    const dbClient = getLocalStorage() //vai ler as informações
    dbClient.push (client)
    setLocalStorage(dbClient)//Vai Enviar as informações
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//Interação com o layout

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('nome').dataset.index = 'new'
}
//Interação com o Usuario
const salvarClient = () => {
    debugger
    if (isValidFields()) {//verifica se os campos são validos
        const client = {
            nome: document.getElementById('nome').value,
            cpf: document.getElementById('cpf').value,
            cidade: document.getElementById('cidade').value,
            uf: document.getElementById('uf').value
        }
        const index = document.getElementById('nome').dataset.index
        if (index == 'new') {
            createClient(client)
            updateTable()
            closeModal()
        } else {
            updateClient(index, client)
            updateTable()
            closeModal()
        }
    }
}

const createRow = (client,index) => {
    if (document.querySelector('#tableClient>tbody')){
        const newRow = document.createElement('tr')
        newRow.innerHTML =  `
            <td  class="tabela__valores">${client.nome}</td>
            <td  class="tabela__valores">${client.cpf}</td>
            <td  class="tabela__valores">${client.cidade}</td>
            <td  class="tabela__valores">${client.uf}</td>
            <td>
                <button type="button" class="button green" id="edit-${index}">Editar</button>
                <button type="button" class="button red" id="delete-${index}" >Excluir</button>
            </td>
        `
        document.querySelector('#tableClient>tbody').appendChild(newRow)
    }
    
    
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbClient = readClient()
    dbClient.forEach(createRow)
}

const fillFields = (client) => {
    document.getElementById('nome').value = client.nome
    document.getElementById('cpf').value = client.cpf
    document.getElementById('cidade').value = client.cidade
    document.getElementById('uf').value = client.uf
    document.getElementById('nome').dataset.index = client.index
}

const editClient = (index) => {
    const client = readClient()[index]
    client.index = index
    fillFields(client)
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editClient(index)
        } else {
            const client = readClient()[index]
            const response = confirm(`Deseja realmente excluir o cliente ${client.nome}`)
            if (response) {
                deleteClient(index)
                updateTable()
            }
        }
       
    }
    
}

updateTable()

// Eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('cadastrar')
    .addEventListener('click', salvarClient)

document.querySelector('#tableClient>tbody tr')
    .addEventListener('click', editDelete)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)
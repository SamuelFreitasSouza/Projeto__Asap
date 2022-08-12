

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
    const fields = document.querySelectorAll('input')
    fields.forEach(field => field.value = "")
}
//Interação com o Usuario
const salvarClient = () => {
    if (isValidFields()) {//verifica se os campos são validos
        const client = {
            nome: document.getElementById('nome').value,
            cpf: document.getElementById('cpf').value,
            cidade: document.getElementById('cidade').value,
            uf: document.getElementById('uf').value
        }
            createClient(client)
            clearFields()
            
    }
}

const createRow = (client) => {
    if (document.querySelector('#tableClient tbody')){
        const newRow = document.createElement('tr')
        newRow.innerHTML =  `
            <td id="valor"class="tabela__valores">${client.nome}</td>
            <td class="tabela__valores">${client.cpf}</td>
            <td class="tabela__valores">${client.cidade}</td>
            <td class="tabela__valores">${client.uf}</td>
            <td>
                <button type="button" class="button green">editar</button>
                <button type="button" class="button red">deletar</button>
            </td>
        `
        document.querySelector('#tableClient tbody').appendChild(newRow)
    }
    
    
}

function clearTable() {
    const rows = document.querySelectorAll('#tableClient>tbody td')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbClient = readClient()
    clearTable() 
    dbClient.forEach(createRow)
}

updateTable()

// Eventos
document.getElementById('cadastrar')
    .addEventListener('click', salvarClient)


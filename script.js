

let items = JSON.parse(localStorage.getItem('items')) || [];

const balance = document.querySelector("#balance");
function saveToLocalStorage() {
    localStorage.setItem("items", JSON.stringify(items));
}
function additem(title, amount) {

    const item = {
        id: Date.now().toString(),
        title: title,
        amount: amount,
    };

    items.push(item);
    saveToLocalStorage();
    renderitems();
}
function updateitem(id, title, amount) {
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === id) {
            items[i].title = title;
            items[i].amount = amount;
            break;
        }
    }
    saveToLocalStorage();
    renderitems();
}
function deleteitem(id) {
    items = items.filter(function (item) {
        return item.id !== id;
    })
    saveToLocalStorage();
    renderitems();
}
function renderitems() {
    const tbody = document.getElementById("items-tbody");
    tbody.innerHTML = '';
    items.forEach(function (item) {
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${item.title}</td>
        <td>${item.amount}</td>
        <td>
            <button onclick = "edititem('${item.id}')">Edit</button>
            <button class = "delete" onclick = "deleteitem('${item.id}')">Delete</button>
        </td>
        `;
        tbody.appendChild(row);
    })
}

function handleFormSubmit(event) {
    event.preventDefault();

    const id = document.getElementById("item-id").value;
    const title = document.getElementById("title").value;
    const amount = document.getElementById("amount").value;

    if (id) {
        updateitem(id, title, amount)
    } else {
        additem(title, amount)
    }
    document.getElementById("form").reset();
    document.getElementById('item-id').value = '';
}

function edititem(id) {
    const item = items.find(function (b) {
        return b.id === id;
    })
    document.getElementById("item-id").value = item.id;
    document.getElementById("title").value = item.title;
    document.getElementById("amount").value = item.amount;

}
document.getElementById("form").addEventListener("submit", handleFormSubmit)

renderitems();
let items = [];

const itemsDiv = document.getElementById("items");
const input = document.getElementById("itemInput");
const storageKey = "items";

function renderItems() {
    itemsDiv.innerHTML = null;

    // pairs like [0, item1 ], [1, item 2]

    for (const [idx, item] of Object.entries(items)) {
        const container = document.createElement("div");
        container.style.marginBottom = "10px";

        const text = document.createElement("p");
        text.style.display = "inline";
        text.style.marginRight = "10px"; 
        text.textContent = item;

        const button = document.createElement("button");
        button.textContent = "Delete";
        button.style.backgroundColor = `rgb(${167}, ${160}, ${210})`;
        button.style.color = `rgb(${71}, ${18}, ${218})`;
        button.onclick = () => removeItem(idx); // call remove after click the button

        container.appendChild(text);
        container.appendChild(button);

        // push items into div
        itemsDiv.appendChild(container);
    }
}

renderItems();

function loadItems() {
    const oldItem = localStorage.getItem(storageKey);
    if (oldItem) {
        items = JSON.parse(oldItem);
    }
    renderItems();
}

function saveItems() {
    const stringitems = JSON.stringify(items);
    localStorage.setItem(storageKey, stringitems);
}

function addItem() {
    const value = input.value;

    if (!value) {
        alert("U cannot add an empty item!");
        return;
    }
    
    items.push(value);
    renderItems();
    input.value = "";
    saveItems();
}

function removeItem(idx) {
    // remove idxth element and remove only 1 element
    items.splice(idx, 1);
    renderItems();
    saveItems();
}

document.addEventListener("DOMContentLoaded", loadItems)
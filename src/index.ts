
import './styles.css';

const items: ShoppingItem[] = [
    { description: 'Toilet Paper' },
    { description: 'Hand Sanitizer' },
    { description: 'Beer' }
];

const theList = document.getElementById('the-list') as HTMLUListElement;
const theButton = document.getElementById('addButton') as HTMLButtonElement;
const itemToAdd = document.getElementById('itemToAdd') as HTMLInputElement;


drawList();

theButton.addEventListener('click', addToTheList);

function addToTheList() {
    const newItem: ShoppingItem = {
        description: itemToAdd.value
    };

    items.unshift(newItem);
    console.log(items);
    drawList();
}


function drawList() {
    items.forEach(item => {
        const newElem = document.createElement('li');
        newElem.classList.add('alert');
        newElem.classList.add('alert-info');

        const newSpan = document.createElement('span');
        newSpan.innerText = item.description;

        newElem.appendChild(newSpan);

        theList.appendChild(newElem);
    });
}

interface ShoppingItem {
    description: string;
}

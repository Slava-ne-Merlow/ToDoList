const inp = document.getElementById('inp');
const add = document.getElementById('add');
const list = document.getElementById('list');
var counter = 0;
var map = new Map([]);


window.addEventListener('load', () => {

    const b = localStorage.getItem('counter')
    if (b) {
        counter = parseInt(b)
    }

    const a = JSON.parse(localStorage.getItem('map'));
    if (a) {
        map = new Map(Object.entries(a));
    }
    renderMap(map);
})

add.addEventListener('click', ()=>{
    const v = inp.value.trim();
    if(!v) return;
    map.set(counter, v);
    localStorage.setItem('map', JSON.stringify(Object.fromEntries(map.entries())));
    counter+= 1;
    localStorage.setItem("counter", counter);
    renderMap(map)

    inp.value = '';
    inp.focus();
});

function renderMap(map){
    list.innerHTML = ``;
    map.forEach((item, id)=>{
        list.appendChild(createItem(id, item))
    })
}

function createItem(id, text){
    const li = document.createElement('li');
    li.id = id
    const span = document.createElement('span');
    span.textContent = text;
    span.className = 'text';
    span.addEventListener('click', ()=> span.classList.toggle('done'));

    const del = document.createElement('button');
    del.textContent = 'x';
    del.className = 'del';
    del.addEventListener('click', ()=> {
        li.remove();
        map.delete(id);
        localStorage.setItem('map', JSON.stringify(Object.fromEntries(map.entries())));
    });

    li.appendChild(span);
    li.appendChild(del);
    return li;
}

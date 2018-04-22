import  './css/index.css';
import  './css/other.css';
console.log('JavaScript was attached to the page!');
import axios from 'axios';

document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded. Ready to go!");

 showData();
 addData();


});

const todoUrl = 'http://localhost:3000/todo';

const addData = () => {
    
    const button = document.querySelector('.firstButton');
    const firstInput = document.querySelector('#firstInput');
    
    button.addEventListener("click", (event) => {
        event.preventDefault();
        const newTask = firstInput.value;
        

        axios.post(todoUrl, {   
         task: newTask})  
         .then((response) => {showData()})
    
         .catch((error) => {console.log(error);  });      

    });
}


const showData = () => {
    axios
.get(todoUrl)
.then((result) => { return result.data })
.then((data) => { 

    console.log('AXIOS');
    console.log(data); 
    const list = document.querySelector('.todolist');
    list.innerHTML = '';

    data.forEach(element => {
   
    const checkbox = document.createElement('input');
    const label = document.createElement('label');
    const deleteButton = document.createElement('button');

    checkbox.setAttribute('type','checkbox');
    checkbox.setAttribute('class','checkbox')
    checkbox.dataset.id = element.id;

    label.setAttribute('for',element.id)
    label.innerText = element.task;

    deleteButton.innerText = 'x';
    deleteButton.setAttribute('class','delete');
    deleteButton.dataset.id = element.id;
    
    list.appendChild(checkbox);
    list.appendChild(deleteButton);
    list.appendChild(label)
    
    });

    deleteTask();  

});

}

const deleteTask = () => {

const deleteButton = document.querySelectorAll('.delete')

deleteButton.forEach(element => {

element.addEventListener('click', (event) => {
const postId = element.getAttribute('data-id')

axios
.delete('http://localhost:3000/todo/' + postId);

 });

});
}
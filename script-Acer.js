const arrayContainer = document.getElementById('array-container');
const generateArrayButton = document.getElementById('generateArray');
const bubbleSortButton = document.getElementById('bubbleSort');
const selectionSortButton = document.getElementById('selectionSort');
const inputSize = document.getElementById('arraySize');
const clearButton = document.getElementById('clear');

// Initial speed (delay in milliseconds)
let sortingSpeed = 100;

// Function to update the sorting speed dynamically
function updateSpeed(newSpeed) {
  sortingSpeed = parseInt(newSpeed);
  document.getElementById("speedValue").innerText = `${sortingSpeed}ms`;
}

// Function to create a delay for animations
function delay() {
  return new Promise((resolve) => setTimeout(resolve, sortingSpeed));
}


let array = [];
function generateArray(){
    arrayContainer.innerHTML='';
    array = [];
    const arraySize = parseInt(inputSize.value);
    if(arraySize<5 || arraySize>100){
        alert('Enter valid array size');
        return;
    }
    for(let i = 0 ; i<arraySize ; i++){
        let value = Math.floor(Math.random()*300+1);
        array.push(value);
        const bar = document.createElement('div');
        bar.classList.add('array-bar');
        bar.style.height = `${value}px`;
        bar.style.width = `${800/arraySize*2}px`;
        arrayContainer.appendChild(bar);
    }
}

async function bubbleSort() {
    const bars = document.getElementsByClassName('array-bar');
    for(let i = 0 ; i < array.length-1 ; i++){
        for(let j = 0 ; j < array.length-i-1; j++){
            bars[j].classList.add('compared');
            bars[j+1].classList.add('compared');
            if(array[j] > array[j+1]){
                // swap the array
                [array[j] , array[j+1]] = [array[j+1] , array[j]];
                // swap the UI
                bars[j].style.height = `${array[j]}px`;
                bars[j+1].style.height = `${array[j+1]}px`;
            }
            await delay(); // delay
            bars[j].classList.remove('compared');
            bars[j+1].classList.remove('compared');
        }
        bars[array.length-i-1].classList.add('sorted');
    }
    bars[0].classList.add('sorted');
    document.getElementById('info').style.display = 'block';
}
generateArrayButton.addEventListener('click',()=>{
    document.getElementById('info').style.display = 'none';
    generateArray();
    // inputSize.value = '';
});

async function selectionSort() {
    const bars = document.getElementsByClassName('array-bar');
    for(let i = 0 ; i<array.length-1 ; i++){
        let minIdx = i;
        bars[i].style.backgroundColor = 'red';
        for(let j=i+1 ; j<array.length ; j++){
            bars[j].style.backgroundColor = 'yellow';
            await delay();
            if(array[j]<array[minIdx]){
                if(i!==minIdx) bars[minIdx].style.backgroundColor = "#007bff";
                minIdx = j;
                bars[minIdx].style.backgroundColor='green';
            }else{
                bars[j].style.backgroundColor = "#007bff";
            }
        }
        if(i!==minIdx){
            [array[i],array[minIdx]] = [array[minIdx],array[i]];
            bars[i].style.height = `${array[i]}px`;
            bars[minIdx].style.height = `${array[minIdx]}px`;
        }
        bars[minIdx].style.backgroundColor = "#007bff";
        bars[i].style.backgroundColor='purple';
    }
    bars[array.length-1].style.backgroundColor='purple';
    document.getElementById('info').style.display = 'block';
}

bubbleSortButton.addEventListener('click',()=>{
    bubbleSort();
});

selectionSortButton.addEventListener('click',()=>{
    selectionSort();
});

clearButton.addEventListener('click',()=>{
    document.getElementById('info').style.display = 'none';
    arrayContainer.innerHTML = '';
    inputSize.value  = '';
});

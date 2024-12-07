const arrayContainer = document.getElementById('array-container');
const generateArrayButton = document.getElementById('generateArray');
const bubbleSortButton = document.getElementById('bubbleSort');
const selectionSortButton = document.getElementById('selectionSort');
const insertionSortButton = document.getElementById('insertionSort');
const mergeSortButton = document.getElementById('mergeSort');
const inputSize = document.getElementById('arraySize');
const clearButton = document.getElementById('clear');
const generateArray2 = document.getElementById('generate-array');
const clear2 = document.getElementById('clear-all');
const startSortingButton = document.getElementById('startSorting');
let isSorting = false;
if(!isSorting){
    disableButtons();
    document.getElementById('generateArray').disabled = false;
    document.getElementById('clear').disabled = false;
    generateArray2.disabled = false;
    clear2.disabled=false;
}
function allowSorting(){
    disableButtons();
    document.getElementById('generateArray').disabled = false;
    document.getElementById('clear').disabled = false;
    generateArray2.disabled = false;
    clear2.disabled=false;
}

function disableButtons() {
    document.querySelectorAll("button").forEach((button) => {
      button.disabled = true;
    });
}
  
  // Enable all sorting buttons
function enableButtons() {
    document.querySelectorAll("button").forEach((button) => {
      button.disabled = false;
    });
}

let sortingSpeed = 100;
function updateSpeed(newSpeed){
    sortingSpeed = newSpeed;
    document.getElementById('speedValue').innerText = `${sortingSpeed}ms`;
}
function delay() {
    return new Promise((resolve) => setTimeout(resolve, sortingSpeed));
}

let array = [];
function generateArray(){
    arrayContainer.innerHTML='';
    array = [];
    const arraySize = parseInt(inputSize.value);
    if(arraySize<5 || arraySize>40){
        alert('Enter between 5 and 40');
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

async function selectionSort() {
    const bars = document.getElementsByClassName('array-bar');
    for(let i = 0 ; i< array.length-1 ; i++){

        let minIdx = i;

        bars[i].style.backgroundColor = 'red';

        for(let j = i+1 ; j<array.length ; j++){
            bars[j].style.backgroundColor = 'yellow';
            bars[j].style.transform = `scale(${1.1})`;

            await delay();

            if(array[j]<array[minIdx]){
                if(minIdx!==i) bars[minIdx].style.backgroundColor = '#007bff';
                minIdx = j;
                bars[minIdx].style.backgroundColor = 'purple';
            }else{
                bars[j].style.backgroundColor = '#007bff';
            }
            bars[j].style.transform = `scale(${1})`;
        }
        bars[minIdx].style.backgroundColor='#007bff';
        if(i!==minIdx){
            [array[i],array[minIdx]] = [array[minIdx],array[i]];
            bars[i].style.height = `${array[i]}px`;
            bars[minIdx].style.height = `${array[minIdx]}px`;
        }

        bars[i].style.backgroundColor = 'green';
    }
    bars[array.length-1].style.backgroundColor = 'green';
    document.getElementById('info').style.display = 'block';
    allowSorting();
}

async function insertionSort() {
    const bars = document.getElementsByClassName('array-bar');
    bars[0].style.backgroundColor = 'green';
    for(let i=0;i<array.length-1;i++){
        let j = i+1;
        bars[i+1].style.backgroundColor = 'red'; // compared
        while(j>0 && array[j-1]>array[j]){
           [array[j],array[j-1]] = [array[j-1],array[j]] // swap in array 
           
            bars[j].style.height = `${array[j]}px`;
            bars[j-1].style.height = `${array[j-1]}px`;
            await delay();
            j--;
        }
        bars[i+1].style.backgroundColor = 'green';
        bars[j].style.backgroundColor = 'green' // placed
    }
    document.getElementById('info').style.display = 'block';
    allowSorting();
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
    allowSorting();
}


async function merge(bars,left,mid,right) {
    let temp = [];
    let i = left , j = mid+1;
    for(let k=left; k<=right ; k++){
        bars[k].style.backgroundColor = 'yellow';
    }
    while(i<=mid && j<=right){
        let heightI = parseInt(bars[i].style.height);
        let heightJ = parseInt(bars[j].style.height);
        if(heightI<=heightJ){
            temp.push(heightI);
            i++;
        }
        else{
            temp.push(heightJ);
            j++;
        }
    }
    while(i<=mid) temp.push(parseInt(bars[i++].style.height));
    while(j<=right) temp.push(parseInt(bars[j++].style.height));

    for(let k=left ; k<=right ; k++){
        await delay();
        bars[k].style.height = `${temp[k-left]}px`;
        bars[k].style.backgroundColor = 'green';
    }
    allowSorting();
}

async function mergeSort(bars , left , right){
    if(left>=right) return;
    let mid = Math.floor((left+right)/2);
    await mergeSort(bars,left,mid);
    await mergeSort(bars,mid+1,right);
    await merge(bars,left,mid,right);
}

async function startMergeSort() {
    const bars = document.getElementsByClassName('array-bar');
    await mergeSort(bars,0,bars.length-1);
    document.getElementById('info-2').style.display = 'block';
}

generateArrayButton.addEventListener('click',()=>{
    const arraySizeInput = document.getElementById('arraySize').value;
    if (!arraySizeInput) {
        alert('Please enter array size');
        return;
    }
    enableButtons();
    document.getElementById('info').style.display = 'none';
    document.getElementById('info-2').style.display = 'none';
    generateArray();
    // inputSize.value = '';
});

generateArray2.addEventListener('click',()=>{
    const arraySizeInput = document.getElementById('arraySize').value;
    if (!arraySizeInput) {
        alert('Please enter array size');
        return;
    }
    enableButtons();
    document.getElementById('info').style.display = 'none';
    document.getElementById('info-2').style.display = 'none';
    startSortingButton.disabled=false;
    generateArray();
    // inputSize.value = '';
});

selectionSortButton.addEventListener('click',()=>{
    isSorting = true;
    disableButtons();
    document.getElementById('clear').disabled = false;
    selectionSort();
});

bubbleSortButton.addEventListener('click',()=>{
    isSorting = true;
    disableButtons();
    document.getElementById('clear').disabled = false;
    bubbleSort();
});

insertionSortButton.addEventListener('click',()=>{
    isSorting = true;
    disableButtons();
    document.getElementById('clear').disabled = false;
    insertionSort();
})

mergeSortButton.addEventListener('click',()=>{
    isSorting = true;
    disableButtons();
    startMergeSort();
})

clearButton.addEventListener('click',()=>{
    document.getElementById('info').style.display = 'none';
    document.getElementById('info-2').style.display = 'none';
    arrayContainer.innerHTML = '';
    inputSize.value  = '';
    document.getElementById('generateArray').disabled = false;
    // enableButtons();
});


clear2.addEventListener('click',()=>{
    document.getElementById('info').style.display = 'none';
    document.getElementById('info-2').style.display = 'none';
    arrayContainer.innerHTML = '';
    inputSize.value  = '';
    document.getElementById('generateArray').disabled = false;
    startSortingButton.disabled = true;
    generateArray2.disabled=false;
    // enableButtons();
});

startSortingButton.addEventListener('click', ()=>{
    isSorting = true;
    disableButtons();
    clear2.disabled = false;
    let selectedAlgorithm = document.getElementById("algorithmDropdown").value;
    if (selectedAlgorithm == "bubbleSort") bubbleSort();
    else if (selectedAlgorithm === "selectionSort") selectionSort();
    else if (selectedAlgorithm === "mergeSort") startMergeSort();
    else if (selectedAlgorithm === "insertionSort") insertionSort();
    else if (selectedAlgorithm === "quickSort") quickSort();
});

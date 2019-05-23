// bubble sort

let theNumbers = [5,15,3,8,9,1,20,7];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // console.log(bubbleSort(theNumbers));
}

function draw() {
  background(220);
}

function bubbleSort(someArray){
  console.log("start function")
  let sortNeeded = true;
  let swap = 0;
  while (sortNeeded){
    swap = 0;
    for (i = 0; i < someArray.length-1; i++){
      if (someArray[i]>someArray[i+1]){
        console.log('doing a swap')
        someArray.splice(i, 1, someArray[i]);
        someArray.splice(i+1, 1, someArray[i+1]);
        swap++;
      }
    }
    if (swap === 0){
      sortNeeded = false;
    }
    console.log(swap);
  }
  return someArray
}


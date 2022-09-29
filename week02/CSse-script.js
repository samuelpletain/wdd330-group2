
function displayResult(){
     let inputValue = document.getElementById("Text_input").value;
     document.getElementById("display").innerHTML = inputValue + "\nSum:" + sumAll(inputValue);
} 

function displaySum() {
    let [inputValue, inputValue2] = [parseInt(document.getElementById("Text_input").value),parseInt(document.getElementById("Text_input2").value)];
    document.getElementById("display").innerHTML = addNumbers(inputValue, inputValue2);


}

function sumAll(num) {

     let res=0;

     for(i=1;i<=num;i++) {
          res+=i;
     }
     return res;

}

function addNumbers(num, num2) {

     return num + num2
} 
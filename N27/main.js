var numbers = [];
var bias = 6;
var countOfNumbers = 1000;
var max = 10000;
var min = 1;


window.onload = function() {
    generateNumbers();
    var r = findMaxSum();
    alert(r.maxSum + " " + r.i + " " + r.j + " " + r.steps);

}
function generateNumbers() {
    for(var i = 0; i < countOfNumbers; i++) {
        var number = Math.floor(Math.random() * (max - min)) + min;
        numbers.push(number);
    }
}

function findMaxSum() {
    var result = 
    {
        maxSum: 0,
        i: 0,
        j: 0,
    };
    var steps = 0;
    for(i = 0; i < numbers.length; i++) {
        for(j = i + bias; j < numbers.length; j++) {
            if(i - j >= bias || i - j <= -bias){    
                var currentSum = numbers[i] + numbers[j];
                if(currentSum % 2 == 1 && currentSum > result.maxSum) {
                    result.maxSum = currentSum;
                    result.i = i;
                    result.j = j;
                }
            }
            steps++;
            
        }
    }
    result.steps = steps;
    return result;
}
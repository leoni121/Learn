
function makeSeq(){
    let　n = 10;
    let sum = 100;
    let result = [];
    let randNum = 0;
    while (n > 1) {
        // 6n <= sum <=12n
        randNum = (Math.random()*600 + 600) / 100;
        if((sum-randNum) >= 6* (n - 1) && (sum-randNum) <= 12* (n - 1)){
            sum -= randNum;
            n -= 1;
            result.push(randNum);
        }
    }
    result.push(randNum);
    return result;
}
console.log(makeSeq());

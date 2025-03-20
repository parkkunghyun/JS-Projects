let inputBox = document.getElementById("inputBox");
let buttons = document.querySelectorAll("button");

let string = "";
const operators = ["+", "-", "*", "/", "%", "."];
let isResultDisplayed = false; // 결과가 표시되었는지 여부

inputBox.addEventListener('keydown', function (e) {
    if (!/[\d\bArrowLeftArrowRightDelete]/.test(e.key)) {
        e.preventDefault();
    }
});

inputBox.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
});

// let a = 5;
// eval('a = 10'); // a는 10으로 변경
// console.log(a); // 10

// let a = 5;
// new Function('a = 10')(); // 외부 a 변수에 영향을 미치지 않음
// console.log(a); // 5
//new Function("return 5 + 3")() → 8


buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let value = e.target.innerHTML;

    // = 버튼 클릭 시 계산
    if (value === "=") {
      if (operators.includes(string.slice(-1))) return; // 마지막이 연산자면 계산 X
      try {
        let result = new Function("return " + string)();

        if (result === Infinity || result === -Infinity) {
          inputBox.value = "Cannot divide by 0";
          string = "";
        } else {
          string = result.toString(); // 결과 저장
          inputBox.value = string;
          isResultDisplayed = true; // 결과가 표시됨
        }
      } catch {
        inputBox.value = "Error";
        string = "";
      }
    }
    // AC 버튼: 전체 초기화
    else if (value === "AC") {
      string = "";
      inputBox.value = "0";
      isResultDisplayed = false;
    }
    // DEL 버튼: 마지막 문자 삭제
    else if (value === "DEL") {
      string = string.slice(0, -1);
      inputBox.value = string || "0";
    }
    // 연산자가 처음에 오는 것 방지
    else if (string.length === 0 && operators.includes(value)) {
      return;
    }
    // 연산자가 마지막에 오는 것 방지
    else if (operators.includes(value) && operators.includes(string.slice(-1))) {
      return;
    }
    // 결과 표시 후 연산자를 입력하는 경우 (계산 결과 뒤에 연산자 추가)
    else if (isResultDisplayed && operators.includes(value)) {
      string += value;
      inputBox.value = string;
      isResultDisplayed = false; // 연산자가 입력되면 새로운 연산 시작
    }
    // 결과 표시 후 숫자를 입력하는 경우 (새로운 수식 시작)
    else if (isResultDisplayed && /\d/.test(value)) {
      string = value; // 새로운 숫자로 시작
      inputBox.value = string;
      isResultDisplayed = false;
    }
    // 입력값 추가
    else {
      string += value;
      inputBox.value = string;
    }
  });
});

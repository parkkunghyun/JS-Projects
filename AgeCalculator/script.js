let userInput = document.getElementById("date");
let result = document.getElementById("result");

userInput.max = new Date().toISOString().split("T")[0];

// .toISOString() → YYYY-MM-DDTHH:MM:SS.sssZ 형식의 문자열로 변환
// .split("T")[0] → YYYY-MM-DD 형식만 추출
// userInput.max = ... → 사용자가 오늘 날짜 이후의 날짜를 선택할 수 없도록 설정



function calculateAge() {
    let birthDate = new Date(userInput.value);
    let d1 = birthDate.getDate();
    let m1 = birthDate.getMonth() + 1;
    let y1 = birthDate.getFullYear();

    let today = new Date();
    let d2 = today.getDate();
    let m2 = today.getMonth() + 1;
    let y2 = today.getFullYear();

    let d3, m3, y3;
    y3 = y2 - y1;
    if (m2 >= m1) {
        m3 = m2 - m1;
    } else {
        y3--;
        m3 = 12 + m2 - m1;
    }

    if (d2 >= d1) {
        d3 = d2 - d1;
    } else {
        m3--;
        d3 = getDaysInMonth(y1, m1) + d2 - d1;
    }

    if (m3 < 0 ) {
        m3 = 11;
        y3--;
    }
    result.innerHTML = `<span>${y3}</span>년, <span>${m3}</span>달 <span>${d3}</span>일 경과했습니다.`
}

function getDaysInMonth (year, month) {
    return new Date(year, month, 0).getDate();
}
// new Date(year, month, 0): 전달한 월(month)의 0번째 날짜를 가져옴 (즉, 해당 월의 마지막 날짜)
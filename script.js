let arr = [];
const path = "./cardimg/cardimg/";
let backImg = document.querySelectorAll(".backImg");

window.onload = function () {
  let showBtn = document.getElementById("show");
  let shuffle = document.getElementById("shuffle");

  random();
  flip(); // 선택한 카드 뒤집기
  let card = allShow();
  showBtn.onclick = allShow;
  shuffle.onclick = random;
};

// img태그의 src 경로를 back이미지로 지정하기
function backCard() {
  for (let i = 0; i < arr.length; i++) {
    backImg[i].src = path + "back.png";
  }
}

// 보이기 버튼 이벤트
function allShow() {
  for (let i = 0; i < arr.length; i++) {
    if (!isFront(arr)) {
      backImg[i].src = path + arr[i] + ".png";
    }
    setTimeout(function () {
      if (!completedCards.includes(arr[i])) {
        backImg[i].setAttribute("src", path + "back.png");
      }
    }, 2000);
  }
}

// 카드클릭함수
// 51장의카드를 랜덤으로 10장만 뽑는다
// arr를 set(가변인자)변경후 다시 arr에 저장(중복제거)
// 중복제거된 arr를 한번 복사해서 arr에 담는다
// arr를 반환
function onClick() {
  while (arr.length < 10) {
    arr = [...new Set(arr)];
    let num = (Math.random() * 51).toFixed(0);
    arr.push(num);
  }
  arr = arr.concat(arr);
  return arr;
}

// 섞기 버튼 이벤트
// onClick 함수를 사용해서 20장을 뽑는다
// 랜덤섞기실행
function random() {
  arr = [];
  onClick();
  arr.sort(function () {
    return Math.random() - 0.5;
  });
  allShow();
}

// back면 카드를 앞으로 뒤집는 함수
// img태그를 클릭한경우 이벤트 실행
// 선택한카드를 selectedCards에 담는다
// 선택한카드의 개수가 2개일경우
// checkOutTrue 같은카드인지 확인하는카드를실행
// checkOutCnt 한셋트의카드를 맞출때마다 count는 1씩증가
// checkOutCnt가 10이 될경우 알람
// checkOutFalse 선택한카드가 서로 다를경우 실행
let selectedCards = [];
let completedCards = [];
function flip() {
  for (let i = 0; i < backImg.length; i++) {
    backImg[i].onclick = function () {
      if (completedCards.includes(arr[i])) {
        return;
      }

      if (!isFront(arr)) {
        backImg[i].src = path + arr[i] + ".png";
        selectedCards.push(arr[i]);

        if (selectedCards.length == 2) {
          if (selectedCards[0] == selectedCards[1]) {
            checkOutTrue();
            completedCard();
          } else if (selectedCards[0] !== selectedCards[1]) {
            checkOutFalse();
          }
        }
      }
    };
  }
}

let checkOutCnt = 0;
function checkOutTrue() {
  completedCards.push(selectedCards[0]);
  completedCards.push(selectedCards[1]);
  selectedCards = [];

  setTimeout(function () {
    alert("두 카드가 일치합니다.");
  }, 200);

  checkOutCnt++;
}

function completedCard() {
  if (checkOutCnt == 10) {
    setTimeout(function () {
      alert("맞추기 성공~");
    }, 200);
  }
}

function checkOutFalse() {
  setTimeout(function () {
    alert("두 카드가 일치하지 않습니다.");
    for (let i = 0; i < backImg.length; i++) {
      if (!completedCards.includes(arr[i])) {
        backImg[i].setAttribute("src", path + "back.png");
      }
    }
  }, 200);
  selectedCards = [];
}

// 카드가 앞면이면 true, 뒷면이면 false;
function isFront(card) {
  return false;
}

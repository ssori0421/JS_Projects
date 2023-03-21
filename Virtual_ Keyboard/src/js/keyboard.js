export class keyboard {
  #swichEl; //Private class features(private필드 선언)
  #fontSelectEl;
  #containerEl;
  #keyboardEl;
  #inputGroupEl;
  #inputEl;
  #keyPress = false;
  #mouseDown = false;
  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  /* 이벤트 버블링 이용 */
  #assignElement() {
    this.#containerEl = document.getElementById("container"); //document 하위에 있는 element를 탐색
    this.#swichEl = this.#containerEl.querySelector("#switch"); //container 하위에 있는 element를 탐색
    this.#fontSelectEl = this.#containerEl.querySelector("#font"); //container 하위에 있는 element를 탐색
    this.#keyboardEl = this.#containerEl.querySelector("#keyboard");
    this.#inputGroupEl = this.#containerEl.querySelector("#input-group");
    this.#inputEl = this.#inputGroupEl.querySelector("#input");
  }

  #addEvent() {
    this.#swichEl.addEventListener("change", this.#onChangeTheme);
    this.#fontSelectEl.addEventListener("change", this.#onChangeFont);
    document.addEventListener("keydown", this.#onKeyDown.bind(this));
    document.addEventListener("keyup", this.#onKeyUp.bind(this));
    this.#inputEl.addEventListener("input", this.#onInput);
    this.#keyboardEl.addEventListener(
      "mousedown",
      this.#onMouseDown.bind(this)
    );
    document.addEventListener("mouseup", this.#onMouseUp.bind(this)); //눌렀던 키 외에서 mouseup을 할 수 도 있기 떄문에 document에 이벤트를 걸어줌
  }

  #onChangeTheme(event) {
    document.documentElement.setAttribute(
      "theme",
      event.target.checked ? "dark-mode" : ""
    );
  }

  #onChangeFont(event) {
    document.body.style.fontFamily = event.target.value;
  }

  //remove메소드 사용
  #onKeyUp(event) {
    if (this.#mouseDown) return; //마우스 눌리면 여기서 종결
    this.#keyPress = false;
    console.log(event.code);
    this.#keyboardEl
      .querySelector(`[data-code=${event.code}]`)
      ?.classList.remove("active");
  }

  //toggle메소드 사용=>한글입력 여부 확인
  // console.log(event.key, /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(event.key)); //test메소드 사용//toggle메소드 사용=>한글입력 여부 확인
  #onKeyDown(event) {
    if (this.#mouseDown) return; //마우스 눌리면 여기서 종결
    this.#keyPress = true;
    this.#inputGroupEl.classList.toggle(
      "error",
      /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(event.key)
    );
    this.#keyboardEl
      .querySelector(`[data-code=${event.code}]`)
      ?.classList.add("active"); //add메소드 사용
  }

  //replac메소드 사용=> 한글이 입력되는 순간 이벤트리스너가 동작해서 inputvalue에서 한글 값을 찾아내서 빈 스트링으로 바꿔줘서 마치 한글은 입력 안되는것 처럼 보이게 함
  #onInput(event) {
    event.target.value = event.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, "");
  }

  #onMouseDown(event) {
    if (this.#keyPress) return; //키가 눌리면 여기서 종결
    this.#mouseDown = true;
    event.target.closest("div.key")?.classList.add("active");
  }

  #onMouseUp(event) {
    if (this.#keyPress) return; //키가 눌리면 여기서 종결

    this.#mouseDown = false;
    const keyEl = event.target.closest("div.key"); //keyEl을 가져옴
    const isActive = !!keyEl?.classList.contains("active");
    const val = keyEl?.dataset.val; //data속성에 있는 값을 가져옴 (data-val="1" => dataset.val으로 값을 불러올 수 있음)
    if (isActive && !!val && val !== "Space" && val !== "Backspace") {
      this.#inputEl.value += val; //일반 키이면 원래 있던 값에다가 data속성에서 가져온 val을 더한것을 inputEl의 value를 넣어줘
    }
    if (isActive && val == "Space") {
      this.#inputEl.value += " "; //space키면 원래 있던 값에다가 공백을 더한것을 inputEl의 value를 넣어줘
    }
    if (isActive && val == "Backspace") {
      this.#inputEl.value = this.#inputEl.value.slice(0, -1); //Backspace키면 원래 있던 값에다가 value 마지막 글자를 뗀 것을 리턴해서 inputEl의 value를 넣어줘
    }
    this.#keyboardEl.querySelector(".active")?.classList.remove("active");
  }
}

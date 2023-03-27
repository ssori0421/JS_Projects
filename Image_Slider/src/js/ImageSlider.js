// 변수 선언(#은 private 변수)
export default class ImageSlider {
  #currentPostion = 0;

  #slideNumber = 0;

  #slideWidth = 0;

  #intervalId;

  #autoPlay = true;

  sliderWrapEl;

  sliderListEl;

  nextBtnEl;

  previousBtnEl;

  indicatorWrapEl;

  controlWrapEl;

  // 초기 설정
  constructor() {
    this.assignElement();
    this.initSliderNumber();
    this.initSlideWidth();
    this.initSliderListWidth();
    this.addEvent();
    this.createIndicator();
    this.setIndicator();
    this.initAutoplay();
  }

  // id 탐색
  assignElement() {
    this.sliderWrapEl = document.getElementById('slider-wrap');
    this.sliderListEl = this.sliderWrapEl.querySelector('#slider');
    this.nextBtnEl = this.sliderWrapEl.querySelector('#next');
    this.previousBtnEl = this.sliderWrapEl.querySelector('#previous');
    this.indicatorWrapEl = this.sliderWrapEl.querySelector('#indicator-wrap');
    this.controlWrapEl = this.sliderWrapEl.querySelector('#control-wrap');
  }

  initSliderNumber() {
    this.#slideNumber = this.sliderListEl.querySelectorAll('li').length;
  }

  initSlideWidth() {
    this.#slideWidth = this.sliderListEl.clientWidth;
  }

  initSliderListWidth() {
    this.sliderListEl.style.width = `${this.#slideNumber * this.#slideWidth}px`;
  }

  initAutoplay() {
    this.#intervalId = setInterval(this.moveToRight.bind(this), 3000);
  }

  addEvent() {
    this.nextBtnEl.addEventListener('click', this.moveToRight.bind(this));
    this.previousBtnEl.addEventListener('click', this.moveToLeft.bind(this));
    this.indicatorWrapEl.addEventListener(
      'click',
      this.onClickIndicator.bind(this),
    ); // event bubbling 활용해 indicatorWrapEl에 event 붙이기
    this.controlWrapEl.addEventListener('click', this.tooglePlay.bind(this));
  } // event bubbling 활용해 controlWrapEl에 event 붙이기

  // data-index가 string이라서 Numbet로 바꿔주기(10은 10진법으로 바꾸겠다의 의미)
  // indicator-wrap에서 list가 아닌 영역을 클릭해보면 undufined가 나옴
  // parseInt(undifined) // NaN
  // NaN을 가려내자 =>조건문 사용
  // indexPosition이 정수이면 currentPosition에 indexPosition을 넣어주고, 이미지를 넘기고, indicator 업데이트
  onClickIndicator(event) {
    const indexPosition = parseInt(event.target.dataset.index, 10);
    if (Number.isInteger(indexPosition)) {
      this.#currentPostion = indexPosition;
      this.sliderListEl.style.left = `-${
        this.#slideWidth * this.#currentPostion
      }px`;
      this.setIndicator();
    }
  }

  tooglePlay(event) {
    if (event.target.dataset.status === 'play') {
      this.#autoPlay = true;
      this.controlWrapEl.classList.add('play'); // play버튼 보이기
      this.controlWrapEl.classList.remove('pause'); // pause버튼 숨기기
      this.initAutoplay();
    } else if (event.target.dataset.status === 'pause') {
      this.#autoPlay = false;
      this.controlWrapEl.classList.add('pause'); // pause버튼 보이기
      this.controlWrapEl.classList.remove('play'); // play버튼 숨기기
      clearInterval(this.#intervalId); // interval 멈추기
    }
  }

  moveToRight() {
    this.#currentPostion += 1;
    if (this.#currentPostion === this.#slideNumber) {
      this.#currentPostion = 0;
    }
    this.sliderListEl.style.left = `-${
      this.#slideWidth * this.#currentPostion
    }px`;
    // autoPlay상태 일때
    // setinterval이 돌고 있는데 moveToRight버튼을 누르게 되면
    if (this.#autoPlay) {
      clearInterval(this.#intervalId); // Interval을 멈추고
      this.#intervalId = setInterval(this.moveToRight.bind(this), 3000); // setInterval 다시 시작
    }
    this.setIndicator(); // index따라 indicator 활성화
  }

  moveToLeft() {
    this.#currentPostion -= 1;
    if (this.#currentPostion === -1) {
      this.#currentPostion = this.#slideNumber - 1;
    }
    this.sliderListEl.style.left = `-${
      this.#slideWidth * this.#currentPostion
    }px`;
    // autoPlay상태 일때
    // setinterval이 돌고 있는데 moveToRight버튼을 누르게 되면
    if (this.#autoPlay) {
      clearInterval(this.#intervalId); // Interval을 멈추고
      this.#intervalId = setInterval(this.moveToRight.bind(this), 3000); // setInterval 다시 시작
    }
    this.setIndicator(); // index따라 indicator 활성화
  }

  createIndicator() {
    const docFragment = document.createDocumentFragment(); // <li>를 한번에 <ul>안에 넣기
    for (let i = 0; i < this.#slideNumber; i += 1) {
      const li = document.createElement('li');
      li.dataset.index = i;
      docFragment.appendChild(li);
    }
    this.indicatorWrapEl.querySelector('ul').appendChild(docFragment);
  }

  setIndicator() {
    this.indicatorWrapEl.querySelector('li.active')?.classList.remove('active');
    this.indicatorWrapEl
      .querySelector(
        `ul li:nth-child(${this.#currentPostion + 1})`, // nth-child는 0부터가 아닌 1부터 탐색하므로 +1해줌
      )
      .classList.add('active');
  }
}

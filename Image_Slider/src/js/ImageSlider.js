export default class ImageSlider {
  #currentPosition = 0;

  #slideNumber = 0;

  #slideWidth = 0;

  sliderWrapEl;

  sliderListEl;

  nextBtnEl;

  previousBtnEl;

  constructor() {
    this.assignElement();
    this.initSliderNumber();
    this.initSlideWidth();
    this.initSliderListWidth();
    this.addEvent();
  }

  assignElement() {
    this.sliderWrapEl = document.getElementById('slider-wrap');
    this.sliderListEl = this.sliderWrapEl.querySelector('#slider');
    this.nextBtnEl = this.sliderWrapEl.querySelector('#next');
    this.previousBtnEl = this.sliderWrapEl.querySelector('#previous');
  }

  initSliderNumber() {
    this.#slideNumber = this.sliderListEl.querySelectorAll('li').length; // slideNum 초기화
  }

  initSlideWidth() {
    this.#slideWidth = this.sliderListEl.clientWidth; // slideWidth 초기화
  }

  initSliderListWidth() {
    this.sliderListEl.style.width = `${this.#slideNumber * this.#slideWidth}px`;
  }

  addEvent() {
    this.nextBtnEl.addEventListhener('click', this.moveToRight.bind(this));
    this.previousBtnEl.addEventListhener('click', this.moveToLeft.bind(this));
  }

  // 0, 1, 2, 3, 4, 5, 6
  // 9px, -1000px, -2000px, -3000px, -4000px, -5000px, -6000px
  moveToRight() {
    this.#currentPosition += 1;
    if (this.#currentPosition === this.#slideNumber) {
      this.#currentPosition = 0; // 경계값 설정(슬라이드가 7이 되면 첫번째 슬라이드로 넘겨줌)
    }
    this.sliderListEl.style.left = `-${
      this.#slideWidth * this.#currentPosition
    }px`;
  }

  moveToLeft() {
    this.#currentPosition -= 1;
    if (this.#currentPosition === -1) {
      this.#currentPosition = this.#slideNumber - 1;
    } // 경계값 설정(슬라이드가 -1이 되면 마지막 슬리이드로 넘겨줌)
    this.sliderListEl.style.left = `-${
      this.#slideWidth * this.#currentPosition
    }px`;
  }
}

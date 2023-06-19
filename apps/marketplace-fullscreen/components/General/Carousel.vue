<template lang="pug">
div.carousel(ref="$el" )
  div.carousel-inner
    div.carousel-item(v-for="(item, index) in items" :key="'carousel_banner_'+index")
      a(:target="item.new_tab ? '_blank' : '_self'" :href="item.link")
        img(:src="item.image")
  div.carousel-controls(:class="{hideElement: !showArrowsValue}")
    span.prev
      PrevSvg
    span.next
      NextSvg
  div.carousel-indicators(:class="{hideElement: !showIndicatorsValue}")
</template>

<script lang="ts" setup>
import PrevSvg from '~/assets/carousel/prev.svg'
import NextSvg from '~/assets/carousel/next.svg'

const {items, interval, showArrows, showIndicators} = defineProps<{
  items: any,
  interval?: number,
  showArrows?: boolean,
  showIndicators?: boolean
}>()
const $el = ref<any>(null)

const showArrowsValue = ref(false)
const showIndicatorsValue = ref(false)
let intervalValue = interval || 2000

let carousel: any = null
let carouselInner: any = null
let prev: any = null
let next: any = null
let slides: any = null
let totalSlides: any = null
let step: any = null
let activeSlide = 0
let activeIndicator = 0
let direction = -1
let jump = 1
let time: any = null


const init = () => {
  if (!$el.value) return

  carousel = $el.value
  carouselInner = carousel.querySelector('.carousel-inner')
  prev = carousel.querySelector('.carousel-controls .prev')
  next = carousel.querySelector('.carousel-controls .next')
  slides = carousel.querySelectorAll('.carousel-inner .carousel-item')

  totalSlides = slides.length
  step = 100 / totalSlides

  showArrowsValue.value = totalSlides > 1 && showArrows
  showIndicatorsValue.value = totalSlides > 1 && showIndicators

  carouselInner.style.minWidth = (totalSlides * 100) + '%'
  carouselInner.style.height = 'auto'
  loadIndicators()
  loop(true)
  next.addEventListener('click', slideToNext)
  prev.addEventListener('click', slideToPrev)
  carouselInner.addEventListener('transitionend', transitionend)

  carousel.querySelectorAll('.carousel-indicators span').forEach((item: any)=>{
    item.addEventListener('click',indicatorsClick)
  })

  carousel.addEventListener('mouseover',() => {
    loop(false)
  })
  carousel.addEventListener('mouseout', () => {
    loop(true)
  })
}

const transitionend = () => {
  if(direction === -1){
    if(jump > 1){
      for(let i = 0; i < jump; i++){
        activeSlide++;
        carouselInner.append(carouselInner.firstElementChild);
      }
    }else{
      activeSlide++;
      carouselInner.append(carouselInner.firstElementChild);
    }
  }else if(direction === 1){
    if(jump > 1){
      for(let i = 0; i < jump; i++){
        activeSlide--;
        carouselInner.prepend(carouselInner.lastElementChild);
      }
    }else{
      activeSlide--;
      carouselInner.prepend(carouselInner.lastElementChild);
    }
  };

  carouselInner.style.transition = 'none';
  carouselInner.style.transform = 'translateX(0%)';
  setTimeout(()=>{
    jump = 1;
    carouselInner.style.transition = 'all ease .5s';
  });
  updateIndicators();
}

const indicatorsClick = (e: any) => {
  let slideTo = parseInt(e.target.dataset.slideTo);

  let indicators = carousel.querySelectorAll('.carousel-indicators span');

  indicators.forEach((item: any,index: number)=>{
    if(item.classList.contains('active')){
      activeIndicator = index
    }
  })

  if(slideTo - activeIndicator > 1){
    jump = slideTo - activeIndicator;
    step = jump * step;
    slideToNext();
  }else if(slideTo - activeIndicator === 1){
    slideToNext();
  }else if(slideTo - activeIndicator < 0){

    if(Math.abs(slideTo - activeIndicator) > 1){
      jump = Math.abs(slideTo - activeIndicator);
      step = jump * step;
      slideToPrev();
    }
    slideToPrev();
  }
  step = 100 / totalSlides;
}

const loadIndicators = () => {
  slides.forEach((slide: any,index: number)=>{
    if(index === 0){
      carousel.querySelector('.carousel-indicators').innerHTML +=
        `<span data-slide-to="${index}" class="active"></span>`;
    }else{
      carousel.querySelector('.carousel-indicators').innerHTML +=
        `<span data-slide-to="${index}"></span>`;
    }
  })
}

const updateIndicators = () => {
  if(activeSlide > (totalSlides - 1)){
    activeSlide = 0;
  }else if(activeSlide < 0){
    activeSlide = (totalSlides - 1);
  }
  carousel.querySelector('.carousel-indicators span.active').classList.remove('active');
  carousel.querySelectorAll('.carousel-indicators span')[activeSlide].classList.add('active');
}

const slideToNext = () => {
  if(direction === 1){
    direction = -1;
    carouselInner.prepend(carouselInner.lastElementChild);
  };

  carousel.style.justifyContent = 'flex-start';
  carouselInner.style.transform = `translateX(-${step}%)`;
}

const slideToPrev = () => {
  if(direction === -1){
    direction = 1;
    carouselInner.append(carouselInner.firstElementChild);
  };
  carousel.style.justifyContent = 'flex-end'
  carouselInner.style.transform = `translateX(${step}%)`;
}

const loop = (status: boolean) => {
  if(status === true && items.length > 1){
    time = setInterval(()=>{
      slideToNext();
    }, intervalValue);
  }else{
    clearInterval(time);
  }
}

onMounted(() => {
  init()
})

onUnmounted(() => {
  next.removeEventListener('click', slideToNext)
  prev.removeEventListener('click', slideToPrev)
  carouselInner.removeEventListener('transitionend', transitionend)

  carousel.querySelectorAll('.carousel-indicators span').forEach((item: any)=>{
    item.removeEventListener('click',indicatorsClick)
  })

  carousel.removeEventListener('mouseover',() => {
    loop(false)
  })
  carousel.removeEventListener('mouseout', () => {
    loop(true)
  })
})
</script>

<style scoped>
.hideElement {
  opacity: 0 !important;
  pointer-events: none !important;
}
.carousel {
  width: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: flex-start;
}
.carousel-inner {
  height: 0px;
  display: flex;
  transition: all ease 0.5s;
}
.carousel-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.carousel-item a {
  display: block !important;
  text-decoration: none !important;
  margin: 0 !important;
  width: 100% !important;
}
.carousel-item img {
  display: block !important;
  width: 100% !important;
  height: auto !important;
}
.carousel-controls .prev {
  display: inline-block;
  height: 39px;
  width: 39px;
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  opacity: 0.5;
}
.carousel-controls .next {
  display: inline-block;
  height: 39px;
  width: 39px;
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  opacity: 0.5;
}
.prev:hover, .next:hover {
  opacity: 1;
}
.carousel-indicators {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}
.carousel-indicators ::v-deep span{
  display: inline-block;
  background-color: #f9f9f9;
  width: 30px;
  height: 4px;
  border-radius: 2px;
  opacity: .5;
  cursor: pointer;
  margin: 3px;
}
.carousel-indicators ::v-deep span.active{
  opacity: 1;
}


</style>

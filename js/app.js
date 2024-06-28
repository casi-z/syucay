$(document).ready(function () {
  $('#birth-date').mask('00.00.0000');
});


sal({
  threshold: 0.1,

})


function interactiveMenu() {
  const menuItems = document.querySelectorAll('.menu .nav-link')

  menuItems.forEach(menuItem => {

    const href = menuItem.getAttribute('href')
    const target = document.querySelector(href)
    if (!target) {
      return
    }

    if (window.scrollY >= target.offsetTop - 300) {
      menuItems.forEach(item => {
        item.classList.remove('_active')
      })
      menuItem.classList.add('_active')
    }
  })
}

interactiveMenu()
window.addEventListener('scroll', interactiveMenu)
const swiper = new Swiper('#photo-slider', {
  // Optional parameters

  loop: true,
  autoplay: {
    delay: 1500,
    disableOnInteraction: false,
  },
  // Navigation arrows
  navigation: {
    nextEl: '.photo-slider-next-button',
    prevEl: '.photo-slider-prev-button',
  },


});
const eventSwiper = new Swiper('#event-slider', {
  // Optional parameters

  loop: true,
  // autoplay: {
  //   delay: 2000,
  //   disableOnInteraction: true,
  // },
  // Navigation arrows
  navigation: {
    nextEl: '.event-slider-next-button',
    prevEl: '.event-slider-prev-button',
  },


});


const pastEventSwiper = new Swiper('#past-event-slider', {
  // Optional parameters

  loop: true,
  slidesPerView: 1,
  breakpoints: {
    500: {
      slidesPerView: 2
    },
    1026: {
      slidesPerView: 3
    }
  },
  autoplay: {
    delay: 1000,
    disableOnInteraction: true,
  },
  // Navigation arrows
  navigation: {
    nextEl: '.past-event-slider-next-button',
    prevEl: '.past-event-slider-prev-button',
  },
  on: {
    slideNextTransitionStart: blurSlide,
    slidePrevTransitionStart: blurSlide,
    init() {
      blurSlide(this)
      this.el.addEventListener('mouseenter', () => {
        this.autoplay.stop();
      });

      this.el.addEventListener('mouseleave', () => {
        this.autoplay.start();
      });
    }
  },

});
function blurSlide(swiper){
  if(swiper.currentBreakpoint !== '1026'){
    return
  }
  const slideArray = swiper.el.querySelectorAll('.swiper-slide')
  const lastSlide = slideArray[swiper.activeIndex + 2]
  slideArray.forEach(slide => {
    slide.classList.remove('_blur')
  })
  lastSlide.classList.add('_blur')
}
const courseSwiper = new Swiper('#course-slider', {
  // Optional parameters

  loop: true,
  slidesOffsetAfter: 5000,
  breakpoints: {
    425: {
      slidesPerView: 2,
    },

    767: {
      slidesPerView: 4,
    },
  },
  autoplay: {
    delay: 100000,
    disableOnInteraction: true,

  },
  // Navigation arrows
  navigation: {
    nextEl: '.course-slider-next-button',
    prevEl: '.course-slider-prev-button',
  },
  on: {
    init() {

      this.el.addEventListener('mouseenter', () => {
        this.autoplay.stop();
      });

      this.el.addEventListener('mouseleave', () => {
        this.autoplay.start();
      });
    }
  },

});
const productSwiper = new Swiper('#product-slider', {
  // Optional parameters

  slidesPerView: 1,
  centeredSlides: true,
  loop: true,

  autoplay: {
    delay: 2000,
    disableOnInteraction: true,

  },
  breakpoints:{
    768:{
      slidesPerView: 2.57,
      spaceBetween: 41,
    }
  },
  // Navigation arrows
  navigation: {
    nextEl: '.course-slider-next-button',
    prevEl: '.course-slider-prev-button',
  },
  on: {
    init() {

      this.el.addEventListener('mouseenter', () => {
        this.autoplay.stop();
      });

      this.el.addEventListener('mouseleave', () => {
        this.autoplay.start();
      });
    }
  },

});


function sendForm() {
  const form = document.querySelector('#user-data')
  const name = form.querySelector('#name')
  const email = form.querySelector('#email')
  const phone = form.querySelector('#phone')
  const message = form.querySelector('#message')
  const formFields = form.querySelectorAll('.form-control')
  const checkbox = form.querySelector('#user-agreement')

  function validateForm() {
    const formFields = form.querySelectorAll('.form-control')
    const submitButton = form.querySelector('[type="submit"]')

    if (Array.from(formFields).every(formField => formField.classList.contains('is-valid')) && formFields.length > 0 && checkbox.checked) {
      submitButton.disabled = false
    } else {
      submitButton.disabled = true
    }
  }

  function setFormState(state) {
    const formContainer = document.querySelector('.form-container')

    formContainer.dataset.state = state
  }

  function setValid(input) {
    validateForm()
    input.classList.add('is-valid')
    input.classList.remove('is-invalid')
  }

  function setInvalid(input) {
    validateForm()
    input.classList.remove('is-valid')
    input.classList.add('is-invalid')
  }

  name.addEventListener('input', event => {

    if (name.value.length >= 2) {
      setValid(name)
    } else {
      setInvalid(name)
    }
  })

  email.addEventListener('input', event => {
    const emailRegExp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    if (emailRegExp.test(email.value)) {
      setValid(email)
    } else {
      setInvalid(email)
    }
  })

  phone.addEventListener('input', event => {
    const phoneRegExp = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}$/;
    console.log(phone.value)
    if (phoneRegExp.test(phone.value)) {
      setValid(phone)
    } else {
      setInvalid(phone)
    }
  })
  message.addEventListener('input', event => {
    if (message.value.length >= 2) {
      setValid(message)
    } else {
      setInvalid(message)
    }
  })

  form.addEventListener('submit', event => {
    event.preventDefault()
    //Выключаем форму чтобы юзер не поменял email во время загрузки
    setFormState('loading')

    const formData = new FormData(form)
    //Замедляем запрос на 1 секунду чтобы загрузка выглядела красиво :)
    setTimeout(async () => {

      //Отправляем email на сервер
      fetch('https://google.com', {
        method: 'POST',
        type: 'multipart/form-data',
        body: formData

      })
        //Выводим галочку в кноаку если ошибки нет
        .then(response => {

          if (response.ok) {
            setFormState('success')

          } else {
            Promise.reject(response.status)

          }

        })
        //Выводим ошибку в HTML
        .catch(error => {

          console.warn('SERVER ERROR:', error)

          setFormState('error')
          setTimeout(() => setFormState('default'), 2000)


        })


    }, 1000)
  })
  checkbox.addEventListener('click', validateForm)

}

sendForm()





function changeScrollBar() {
  const scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  ) / 4;
  const bodyData = document.body.dataset
  if (window.scrollY <= scrollHeight) {

    bodyData.scrollbar = 'blue'

  } else if (window.scrollY <= scrollHeight * 2) {

    bodyData.scrollbar = 'green'

  } else if (window.scrollY <= scrollHeight * 3) {

    bodyData.scrollbar = 'yellow'

  } else {
    bodyData.scrollbar = 'red'
  }

}

window.addEventListener('scroll', changeScrollBar)

let runInterval
export default class JSSlider {
	startSlideShow() {
		if (!runInterval) {
			let self = this
			runInterval = setInterval(
				(function int() {
					self.onImageNext()
					return int
				})(),
				2000
			)
		}
	}
	stopSlideShow() {
		clearInterval(runInterval)
		runInterval = null
		if (runInterval !== null) {
			runInterval = null
		}
	}
	run() {
		const imagesSelector = '.gallery__item'
		const sliderRootSelector = '.js-slider'
		const imagesList = document.querySelectorAll(imagesSelector)
		const sliderRootElement = document.querySelector(sliderRootSelector)
		this.initEvents(imagesList, sliderRootElement)
		this.initCustomEvents(imagesList, sliderRootElement, imagesSelector)
	}
	initEvents(imagesList, sliderRootElement) {
		imagesList.forEach(item => {
			item.addEventListener('click', e => {
				this.fireCustomEvent(e.currentTarget, 'js-slider-img-click')
			})
		})
		const navNext = sliderRootElement.querySelector('.js-slider__nav--next')
		navNext.addEventListener('click', event => {
			event.stopPropagation()
			this.onImageNext()
		})
		navNext.addEventListener('mouseenter', () => {
			this.stopSlideShow()
		})
		navNext.addEventListener('mouseleave', () => {
			this.startSlideShow()
		})
		const navPrev = sliderRootElement.querySelector('.js-slider__nav--prev')
		navPrev.addEventListener('click', event => {
			event.stopPropagation()
			this.onImagePrev()
		})
		navPrev.addEventListener('mouseenter', () => {
			this.stopSlideShow()
		})
		navPrev.addEventListener('mouseleave', () => {
			this.startSlideShow()
		})

		const zoom = sliderRootElement.querySelector('.js-slider__zoom')
		zoom.addEventListener('click', () => {
			this.stopSlideShow()
			this.onClose()
		})
	}

	fireCustomEvent(element, name) {
		console.log(element.className, '=>', name)
		const event = new CustomEvent(name, {
			bubbles: true,
		})
		element.dispatchEvent(event)
	}
	initCustomEvents(imagesList, sliderRootElement, imagesSelector) {
		imagesList.forEach(img => {
			img.addEventListener('js-slider-img-click', event => {
				this.onImageClick(event, sliderRootElement, imagesSelector)
			})
		})

		sliderRootElement.addEventListener('js-slider-img-next', this.onImageNext)
		sliderRootElement.addEventListener('js-slider-img-prev', this.onImagePrev)
		sliderRootElement.addEventListener('js-slider-close', () => {
			this.onClose()
			this.stopSlideShow()
		})
	}
	getGroupName(event, imagesSelector) {
		const currGroup = event.currentTarget.getAttribute('data-slider-group-name')
		const imagesList = Array.from(document.querySelectorAll(imagesSelector))
		const selectedImgs = imagesList.filter(img => img.getAttribute('data-slider-group-name') === currGroup)
		return selectedImgs
	}
	createThumbs(selectedImgs, currImg, currSrc) {
		const sliderThumbs = document.querySelector('.js-slider__thumbs')
		const sliderThumb = document.querySelector('.js-slider__thumbs-item')
		selectedImgs.forEach(img => {
			const prevImg = img.querySelector('img')
			const newThumb = sliderThumb.cloneNode([true])
			newThumb.classList.remove('js-slider__thumbs-item--prototype')
			const src = prevImg.getAttribute('src')
			const thumbImg = newThumb.querySelector('img')
			thumbImg.setAttribute('src', src)
			sliderThumbs.appendChild(newThumb)
		})
		const thumbImages = Array.from(sliderThumbs.querySelectorAll('img'))
		thumbImages.forEach(img => {
			const src = img.getAttribute('src')
			if (src === currSrc) {
				img.classList.add('js-slider__thumbs-image--current')
			} else {
				img.classList.remove('js-slider__thumbs-image--current')
			}
		})
	}
	onImageClick(event, sliderRootElement, imagesSelector) {
		sliderRootElement.classList.add('js-slider--active')
		const currImg = event.currentTarget.querySelector('img')
		const currSrc = this.setNewSrcForCurrImg(currImg)
		this.createThumbs(this.getGroupName(event, imagesSelector), currImg, currSrc)
		setTimeout(() => {
			this.startSlideShow()
		}, 2000)
	}
	toggleImgClasses(currImg, otherImg) {
		currImg.classList.remove("js-slider__thumbs-image--current");
		otherImg.classList.add("js-slider__thumbs-image--current");
	  }
	setNewSrcForCurrImg(img) {
		const sliderImg = document.querySelector('.js-slider__image')
		const newSrcCurr = img.getAttribute('src')
		sliderImg.setAttribute('src', newSrcCurr)
		return newSrcCurr
	}

	changeImg(newElement, startImg, currImg) {
		if (newElement && !newElement.classList.contains('js-slider__thumbs-item--prototype')) {
			const newImg = newElement.querySelector('img')
			if (newImg) {
				this.toggleImgClasses(currImg, newImg)
			}
			this.setNewSrcForCurrImg(newImg)
		} else {
			this.toggleImgClasses(currImg, startImg)
			this.setNewSrcForCurrImg(startImg)
		}
	}

	onImageNext(event) {
		const currImg = document.querySelector('.js-slider__thumbs-image--current')
		if (currImg) {
			const newElement = currImg.parentElement.nextElementSibling
			const startImg = currImg.parentElement.parentElement.querySelector('*:nth-child(2)').querySelector('img')
			this.changeImg(newElement, startImg, currImg)
		}
	}

	onImagePrev(event) {
		const currImg = document.querySelector('.js-slider__thumbs-image--current')
		const newElement = currImg.parentElement.previousElementSibling
		const startImg = currImg.parentElement.parentElement.lastElementChild.querySelector('img')
		this.changeImg(newElement, startImg, currImg)
	}

	removeActiveSlide() {
		const slider = document.querySelector('.js-slider')
		slider.classList.remove('js-slider--active')
	}

	removeSliderThumbs() {
		const sliderThumbsList = document.querySelectorAll('.js-slider__thumbs-item')
		sliderThumbsList.forEach(thumb => {
			if (!thumb.classList.contains('js-slider__thumbs-item--prototype')) {
				thumb.parentElement.removeChild(thumb)
			}
		})
	}

	onClose() {
		this.removeActiveSlide()
		this.removeSliderThumbs()
	}
}

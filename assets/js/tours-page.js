
//handling for item card (tour-item)
document.addEventListener('DOMContentLoaded', () => {

    const domesticTourWrapper = document.getElementById('domestic-tour-wrapper');
    const foreignTourWrapper = document.getElementById('foreign-tour-wrapper');
    const luxuryTourWrapper = document.getElementById('luxury-tour-wrapper')

    function formatPrice(price) {
        return price.toLocaleString('vi-VN') + 'đ';
    }

    function createTourItem(tour) {
        let tourHtml = '';
        tourHtml +=
            `<div class="tour-item swiper-slide">
                <div class="tour-item__link" id="${tour.ProductId}">
                    <img src="${tour.images[0]}" alt="" class="tour-item__img">
                    <h2 class="tour-item__heading">${tour.name}</h2>
                    <div class="tour-item__row">
                        <div class="tour-item__col1">Địa điểm khởi hành: </div>
                        <div class="tour-item__col2">${tour.locations[0]}</div>
                    </div>
                    <div class="tour-item__row">
                        <div class="tour-item__col1">Thời gian diễn ra: </div>
                        <div class="tour-item__col2">${tour.duration}</div>
                    </div>
                    <div class="tour-item__row">
                        <div class="tour-item__col1">Giá: </div>
                        <div class="tour-item__col2">${formatPrice(tour.price)}</div>
                    </div>
                    <div class="tour-item__row">
                        <div class="tour-item__col1">Chổ còn lại: </div>
                        <div class="tour-item__col2">${tour.availableSeats}</div>
                    </div>
                    <div class="tour-item__row">
                        <button class="tour-item__add-cart">Thêm vào giỏ</button>
                        <button class="tour-item__order">Đặt ngay</button>
                    </div>
                </div>
            </div>`
        return tourHtml;
    }

    function loadAndCreateSliderTours(wrapperElement, jsonPath, type) {
        if (!wrapperElement) {
            return;
        }
        fetch(jsonPath)
            .then(response => {
                return response.json();
            }).then(tours => {
                let toursHtml = '';
                tours.forEach(tour => {
                    if (tour.type == type){
                        toursHtml += createTourItem(tour);
                    }
                })
                wrapperElement.innerHTML = toursHtml;

                //use swiper framework
                const swiperContainer = wrapperElement.closest('.swiper');
                if (swiperContainer) {
                    new Swiper(swiperContainer, {
                        //loop: true, !not necessary
                        spaceBetween: 10,
                        // If we need pagination
                        pagination: {
                            el: '.swiper-pagination',
                        },
                        // Navigation arrows
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                        breakpoints: {
                            0: { slidesPerView: 1 },
                            540: { slidesPerView: 2 },
                            767: { slidesPerView: 3 }
                        }
                    });
                }else {
                    console.log('error to get swiper container');
                }
            }).catch(error => {
                console.log('error to load json');
                wrapperElement.innerHTML='can not load data';
            });
    }


    loadAndCreateSliderTours(domesticTourWrapper, toursJsonPath, 'domestic');
    loadAndCreateSliderTours(foreignTourWrapper, toursJsonPath, 'foreign');
    loadAndCreateSliderTours(luxuryTourWrapper, toursJsonPath, 'luxury');



    function linkToDetails(tourItem, pathLinks){
        let tourItemId = tourItem.id;
        location.href=`${pathLinks}?id=${tourItemId}&type=tours`;
    }

    //ADD EVENT LISTENER
    const mainContainer = document.querySelector('.main__container'); 
    if (mainContainer) {
        mainContainer.addEventListener('click', (event) => {
            const clickedTourLink = event.target.closest('.tour-item__link');
            if (clickedTourLink){
                const target = event.target;
                if (target.classList.contains('tour-item__add-cart') || 
                    target.classList.contains('tour-item__order')){
                    event.preventDefault();
                    event.stopPropagation();
                }else {
                    linkToDetails(clickedTourLink, 'details.html','tours')
                }
            }
        })
    } else {
        console.error('Không tìm thấy phần tử .main__container. Event Listener không được gắn.');
    }

    const readMoreButtons =Array.from(document.getElementsByClassName('tour__read-more-button'));
    readMoreButtons.forEach(readMoreButton => {
        readMoreButton.addEventListener('click', (event) => {
            const target = event.target;
            linkToDetails(target, 'tours.html')
        })
    })
})




document.addEventListener('DOMContentLoaded', () => {
    const urlParameter = new URLSearchParams(window.location.search);
    const tourId = urlParameter.get('id');

    function formatPrice(price) {
        return price.toLocaleString('vi-VN') + 'đ';
    }

    function createTourItem(tour) {
        let tourHtml = '';
        tourHtml +=
            `<div class="tour-item">
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

    function loadTourItems(toursContainer, jsonPath) {
        if (!toursContainer) {
            return;
        }
        fetch(jsonPath)
            .then(response => {
                return response.json();
            }).then(tours => {
                let toursHtml = '';
                tours.forEach(tour => {
                    if (tourId == tour.type) {
                        toursHtml += createTourItem(tour);
                    }
                })
                toursContainer.innerHTML = toursHtml;
            }).catch(error => {
                console.log('error to load json');
                toursContainer.innerHTML='can not load data';
            });
    }

    const container = document.getElementById('main__tours-container');
    loadTourItems(container, toursJsonPath)

    function linkToDetails(tourItem, pathLinks){
        let tourItemId = tourItem.id;
        location.href=`${pathLinks}?id=${tourItemId}&type=tours`;
    }

    const mainContainer = document.querySelector('.main__tours-container'); 
    if (mainContainer) {
        mainContainer.addEventListener('click', (event) => {
            const clickedTourLink = event.target.closest('.tour-item__link');
            if (clickedTourLink){
                const target = event.target;
                if (target.classList.contains('tour-item__add-cart') ||
                    target.classList.contains('tour-item__order')){
                    event.preventDefault();
                    event.stopPropagation();
                    return;
                }else {
                    linkToDetails(clickedTourLink, 'details.html')
                }
            }
        })
    } else {
        console.error('Không tìm thấy phần tử .main__container. Event Listener không được gắn.');
    }

})
document.addEventListener('DOMContentLoaded', () => {

    function formatPrice(price) {
        return price.toLocaleString('vi-VN') + 'đ';
    }

    function createHotelItem(hotel){
        let hotelHtml = '';
        hotelHtml+=
            `<div class="hotel-item">
                <div class="hotel-item__link" id="${hotel.ProductId}">
                    <img src="${hotel.images[0]}" alt="" class="hotel-item__img">
                    <h2 class="hotel-item__heading">${hotel.name}</h2>
                    <div class="hotel-item__info">
                        <div class="hotel-item__row star">${hotel.stars} sao</div>
                        <div class="hotel-item__row address">${hotel.address}</div>
                        <div class="hotel-item__row price">${formatPrice(hotel.pricePerNight)}</div>
                        <div class="hotel-item__row button">
                            <button class="hotel-item__add-cart">Thêm vào giỏ</button>
                            <button class="hotel-item__order">Đặt ngay</button>
                        </div>
                    </div>
                </div>
            </div>`
        return hotelHtml;
    }

    function loadHotelItems(hotelsContainer, jsonPath) {
        if (!hotelsContainer) {
            return;
        }
        fetch(jsonPath)
            .then(response => {
                return response.json();
            }).then(hotels => {
                let hotelsHtml = '';
                hotels.forEach(hotel => {
                    hotelsHtml += createHotelItem(hotel);
                })
                hotelsContainer.innerHTML = hotelsHtml;
            }).catch(error => {
                console.log('error to load json');
                hotelsContainer.innerHTML='can not load data';
            });
    }

    const container = document.getElementById('main__hotels-container');
    loadHotelItems(container, hotelsJsonPath)

    function linkToDetails(hotelItem, pathLinks){
        let hotelItemId = hotelItem.id;
        location.href=`${pathLinks}?id=${hotelItemId}&type=hotels`;
    }

    const mainContainer = document.querySelector('.main__hotels-container'); 
    if (mainContainer) {
        mainContainer.addEventListener('click', (event) => {
            const clickedTourLink = event.target.closest('.hotel-item__link');
            if (clickedTourLink){
                const target = event.target;
                if (target.classList.contains('hotel-item__add-cart') ||
                    target.classList.contains('hotel-item__order')){
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
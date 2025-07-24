

document.addEventListener('DOMContentLoaded', () => {
    const details = document.getElementById('main-product-details');
    const urlParameter = new URLSearchParams(window.location.search);
    const productId = urlParameter.get('id');
    const productType = urlParameter.get('type');

    //Price formatting
    function formatPrice(price) {
        return price.toLocaleString('vi-VN') + 'đ';
    }

    //handling for images swapping
    function swapImage(img1, img2) {
        const tempSrc = img1.src;
        img1.src = img2.src;
        img2.src = tempSrc;
    }

    // create for tour details
    function createTourItem(tour) {
        let tourHtml = '';
        tourHtml +=
            `<h1 class="tour-heading">${tour.name}</h1>
                <div class="product-details tours" id="${tour.ProductId}">
                    <div class="tour-images">
                        <div class="tour-images__aside">
                            <img class="aside__img" src="${tour.images[0]}" alt="">
                            <img class="aside__img" src="${tour.images[1]}" alt="">
                            <img class="aside__img" src="${tour.images[2]}" alt="">
                        </div>
                        <div class="tour-images__main">
                            <img class="main__img" id="main_img" src="${tour.images[3]}" alt="">
                        </div>
                    </div>
                    <div class="tour-info">
                        <div class="tour-info__row">
                            <div class="tour-info__col tour-info__col1">Địa điểm khởi hành: </div>
                            <div class="tour-info__col tour-info__col2">${tour.locations[0]}</div>
                        </div>
                        <div class="tour-info__row">
                            <div class="tour-info__col tour-info__col1">Ngày khởi hành: </div>
                            <div class="tour-info__col tour-info__col2">${tour.departureDates[0]}</div>
                        </div>
                        <div class="tour-info__row">
                            <div class="tour-info__col tour-info__col1">thời gian diễn ra tour: </div>
                            <div class="tour-info__col tour-info__col2">${tour.duration}</div>
                        </div>
                        <div class="tour-info__row">
                            <div class="tour-info__col tour-info__col1">Lịch trình: </div>
                            <div class="tour-info__col tour-info__col2">${tour.locations[0]} -> ${tour.locations[1]} -> ${tour.locations[2]} -> ${tour.locations[3]}</div>
                        </div>
                        <div class="tour-info__row">
                            <div class="tour-info__col tour-info__col1">Phương tiện: </div>
                            <div class="tour-info__col tour-info__col2">máy bay,....</div>
                        </div>
                        <div class="tour-info__row tour-info__row--price">
                            <div class="tour-info__price"><span>${formatPrice(tour.price)}</span>/Khách</div>
                        </div>
                        <div class="tour-info__row">
                            <div class="tour-info__col tour-info__col1 add-shopping-cart">
                                <button class="product-info__add-shopping-cart">
                                    Thêm vào giỏ
                                </button>
                            </div>
                            <div class="tour-info__col tour-info__col2 order">
                                <button class="product-info__order">
                                    Đặt chỗ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`
        return tourHtml;
    }

    // create for hotel details
    function createHotelItem(hotel){
        let hotelHtml=''
        hotelHtml +=
            `<h1 class="hotel-heading">${hotel.name}</h1>
            <div class="product-details hotels" id="${hotel.ProductId}">
                <div class="hotel-images">
                    <div class="hotel-images__aside">
                        <img class="aside__img" src="${hotel.images[0]}" alt="">
                        <img class="aside__img" src="${hotel.images[1]}" alt="">
                        <img class="aside__img" src="${hotel.images[2]}" alt="">
                    </div>
                    <div class="hotel-images__main">
                        <img class="main__img" id="main_img" src="${hotel.images[3]}" alt="">
                    </div>
                </div>
                <div class="hotel-info">
                    <div class="hotel-info__row">
                        ${hotel.description}
                    </div>
                    <div class="hotel-info__row">
                        ${hotel.amenities[0]}, ${hotel.amenities[1]}, ${hotel.amenities[2]}, ${hotel.amenities[3]}, ${hotel.amenities[4]}
                    </div>
                    <div class="hotel-info__row">
                        <div class="hotel-info__col hotel-info__col1">đánh giá: </div>
                        <div class="hotel-info__col hotel-info__col2">${hotel.stars} sao</div>
                    </div>
                    <div class="hotel-info__row">
                        <div class="hotel-info__col hotel-info__col1">địa chỉ </div>
                        <div class="hotel-info__col hotel-info__col2">${hotel.address}</div>
                    </div>
                    <div class="hotel-info__row">
                        <div class="hotel-info__col hotel-info__col1">số điện thoại: </div>
                        <div class="hotel-info__col hotel-info__col2">${hotel.contact.phone}</div>
                    </div>
                    <div class="hotel-info__row">
                        <div class="hotel-info__col hotel-info__col1">email: </div>
                        <div class="hotel-info__col hotel-info__col2">${hotel.contact.email}</div>
                    </div>
                    <div class="hotel-info__row hotel-info__row--price">
                        <div class="hotel-info__price"><span>${formatPrice(hotel.pricePerNight)}</span>/Đêm</div>
                    </div>
                    <div class="hotel-info__row">
                        <div class="hotel-info__col hotel-info__col1 add-shopping-cart">
                            <button class="product-info__add-shopping-cart">
                                Thêm vào giỏ
                            </button>
                        </div>
                        <div class="hotel-info__col hotel-info__col2 order">
                            <button class="product-info__order">
                                Đặt chỗ
                            </button>
                        </div>
                    </div>
                </div>
            </div>`
        return hotelHtml;
    }
    // create for rental car details
    function createRentalCarItem(rentalCar){
        let rentalCarHtml=''
        rentalCarHtml +=
            `<div class="product-details rentalCars" id="${rentalCar.ProductId}">
            <div class="rental-cars-image">
                <img class="main__img" id="main_img" src="${rentalCar.image}" alt="">
            </div>
            <div class="rental-cars-info">
                <div class="rental-cars-info__row">
                    <h2 class="rental-cars-info__heading">${rentalCar.carBrand} ${rentalCar.carName}</h2>
                </div>
                <div class="rental-cars-info__row">
                    <div class="rental-cars-info__col rental-cars-info__col1">Khu vực cho thuê: </div>
                    <div class="rental-cars-info__col rental-cars-info__col2">${rentalCar.provinceName}</div>
                </div>
                <div class="rental-cars-info__row">
                    <div class="rental-cars-info__col rental-cars-info__col1">Sô chỗ ngồi: </div>
                    <div class="rental-cars-info__col rental-cars-info__col2">${rentalCar.passengerCapacity + 1} chỗ</div>
                </div>
                <div class="rental-cars-info__row">
                    <div class="rental-cars-info__col rental-cars-info__col1">kiểu dáng xe: </div>
                    <div class="rental-cars-info__col rental-cars-info__col2">${rentalCar.vehicleType} </div>
                </div>
                <div class="rental-cars-info__row">
                    <div class="rental-cars-info__col rental-cars-info__col1">Sức chứa hành lý: </div>
                    <div class="rental-cars-info__col rental-cars-info__col2">${rentalCar.luggageCapacity} baggage</div>
                </div>
                <div class="rental-cars-info__row rental-cars-info__row--price">
                    <div class="rental-cars-info__price"><span>${formatPrice(rentalCar.dailyRentalPrice)}</span> / Ngày</div>
                </div>
                <div class="rental-cars-info__row">
                    <div class="rental-cars-info__col rental-cars-info__col1 add-shopping-cart">
                        <button class="product-info__add-shopping-cart">
                            Thêm vào giỏ
                        </button>
                    </div>
                    <div class="rental-cars-info__col rental-cars-info__col2 order">
                        <button class="product-info__order">
                            Đặt chỗ
                        </button>
                    </div>
                </div>
            </div>`
        return rentalCarHtml;
    }




    //loading for item details
    function loadItemDetails(productDetails, jsonPath, type) {
        if (!productDetails) {
            return;
        }
        fetch(jsonPath)
            .then(response => {
                return response.json();
            }).then(products => {
                console.log(products)
                let productsHtml = '';
                products.forEach(product => {
                    if (product.ProductId == productId){
                        if (type == 'tours'){
                            productsHtml += createTourItem(product);
                        }else if (type == 'hotels'){
                            productsHtml += createHotelItem(product);
                        }else if (type = "rentalCars"){
                            productsHtml += createRentalCarItem(product);
                        }
                        
                    }  
                })
                productDetails.innerHTML = productsHtml;
            }).catch(error => {
                console.log('error to load json');
                productDetails.innerHTML='can not load data';
            });
    }

    //get details container to create detail item
    if (productType == 'tours'){
        loadItemDetails(details, toursJsonPath, productType)
    }else if (productType == 'hotels'){
        loadItemDetails(details, hotelsJsonPath, productType)
    } else if (productType == 'rentalCars') {
        loadItemDetails(details, rentalCarsJsonPath, productType)
    }
    

    //add event to swap images (in tours)
    if (details) {
        details.addEventListener('click', (event) => {
            const clickedImages = event.target.closest('.product-details');
            if (clickedImages) {
                const target = event.target;
                if (target.classList.contains('aside__img')){
                    event.preventDefault();
                    event.stopPropagation();
                    const mainImage = document.getElementById('main_img');
                    swapImage(target, mainImage);
                }
            }
        })
    }
})
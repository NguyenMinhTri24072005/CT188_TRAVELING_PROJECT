document.addEventListener('DOMContentLoaded', () => {

    function removeVietnameseTones(str) {
        return str
            .normalize("NFD")                         
            .replace(/[\u0300-\u036f]/g, "")          
            .replace(/đ/g, "d")                       
            .replace(/Đ/g, "D")                       
            .replace(/[^a-zA-Z0-9\s]/g, "")           
            .replace(/\s+/g, " ")                     
            .trim();                             
    }

    const submitInput = document.getElementById('rental-cars-search-box__submit')
    function formatPrice(price) {
        return price.toLocaleString('vi-VN') + 'đ';
    }

    function createRentalCarItem(rentalCarItem){
        let rentalCarHtml = '';
        rentalCarHtml+=
            `<div class="rental-cars-item">
                <div class="rental-cars-item__link" id="${rentalCarItem.ProductId}">
                    <img src="${rentalCarItem.image}" alt="" class="rental-cars-item__img">
                    <h2 class="rental-cars-item__heading">${rentalCarItem.carBrand} ${rentalCarItem.carName}</h2>
                    <div class="rental-cars-item__row">
                        <div class="rental-cars-item__vehicle-type">${rentalCarItem.vehicleType}</div>
                        <div class="rental-cars-item__seat">${rentalCarItem.passengerCapacity} chổ</div>
                        <div class="rental-cars-item__price">${formatPrice(rentalCarItem.dailyRentalPrice)} / ngày</div>
                    </div>
                    <div class="rental-cars-item__row">
                        <button class="rental-cars-item__add-cart">Thêm vào giỏ</button>
                        <button class="rental-cars-item__order">Đặt ngay</button>
                    </div>
                </div>
            </div>`;
        return rentalCarHtml;
    }

    function loadRentalCarItems(rentalCarsContainer, jsonPath, rentalLocation) {
        if (!rentalCarsContainer) {
            return;
        }
        fetch(jsonPath)
            .then(response => {
                return response.json();
            }).then(rentalCars => {
                let rentalCarsHtml = '';
                rentalCars.forEach(rentalCar => {
                    console.log(rentalCar)
                    const rentalProvinceName = removeVietnameseTones(rentalCar.provinceName).trim().toLowerCase();
                    if (rentalProvinceName.includes(rentalLocation)) {
                        rentalCarsHtml += createRentalCarItem(rentalCar);
                    }
                })
                rentalCarsContainer.innerHTML = rentalCarsHtml;
            }).catch(error => {
                console.log('error to load json');
                rentalCarsContainer.innerHTML = 'can not load data';
            });
    }
    submitInput.addEventListener('click', (event) => {
        const rentalLocation = document.getElementById('rental-cars-search-box__rental-location');
        const receiveDate = document.getElementById('rental-cars-search-box__receive-date');
        const rentalDuration = document.getElementById('rental-cars-search-box__rental-duration');
        const container = document.getElementById('main__rental-cars-container');
        loadRentalCarItems(container, rentalCarsJsonPath, removeVietnameseTones(rentalLocation.value.trim().toLowerCase()))
    })


    function linkToDetails(rentalCarItem, pathLinks){
        let rentalCarItemId = rentalCarItem.id;
        location.href=`${pathLinks}?id=${rentalCarItemId}&type=rentalCars`;
    }
    //ADD EVENT LISTENER
    const mainContainer = document.querySelector('.main__rental-cars-container'); 
    if (mainContainer) {
        mainContainer.addEventListener('click', (event) => {
            console.log('co nhan')
            const clickedRentalCarLink = event.target.closest('.rental-cars-item__link');
            if (clickedRentalCarLink){
                const target = event.target;
                if (target.classList.contains('rental-cars-item__add-cart') || 
                    target.classList.contains('rental-cars-item__order')){
                    event.preventDefault();
                    event.stopPropagation();
                }else {
                    linkToDetails(clickedRentalCarLink, 'details.html')
                }
            }
        })
    } else {
        console.error('Không tìm thấy phần tử .main__container. Event Listener không được gắn.');
    }
})



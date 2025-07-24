document.addEventListener('DOMContentLoaded', () => {
    const submitInput = document.getElementById('shuttle-search-box__submit');

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

    function formatPrice(price) {
        return price.toLocaleString('vi-VN') + 'đ';
    }

    function createShuttleItem(shuttle) {
        let shuttleHtml = '';
        shuttleHtml += 
            `<div class="shuttle-item">
                    <div class="shuttle-item__link" id="${shuttle.ProductId}">
                        <div class="shuttle-item__overview">
                            <div class="shuttle-item__logo">
                                <img src="${shuttle.image}" alt="" class="shuttle-item__logo-img">
                            </div>
                            <div class="shuttle-item__overview-info">
                                <div class="shuttle-item__vehicle">${shuttle.carName}</div>
                                <div class="shuttle-item__transport">
                                    <div class="transport-item"><i class="fa fa-user"></i> ${shuttle.passengerCapacity} hành khách(s) </div>
                                    <div class="transport-item"><i class="fa-solid fa-suitcase"></i> ${shuttle.luggageCapacity} baggage(s)</div>
                                </div>
                            </div>
                            <div class="shuttle-item__payment">
                                <div class="shuttle-item__price">${formatPrice(shuttle.pricePerKm)}/ Km</div>
                                <button class="shuttle-item__add-cart">Thêm vào giỏ</button>
                                <button class="shuttle-item__order">Đặt xe</button>
                            </div>
                        </div>
                        <div class="shuttle-item__details">
                            <div class="shuttle-item__departure">${shuttle.airportName} (${shuttle.airportId})</div>
                            <div class="shuttle-item__detail-price-info">
                                chi phí bao gồm
                                <div class="shuttle-item__price-item"><i class="fa-solid fa-gas-pump"></i> Phí nhiên liệu</div>
                                <div class="shuttle-item__price-item"><i class="fa-solid fa-road"></i> Phí cầu đường</div>
                                <div class="shuttle-item__price-item"><i class="fa-solid fa-square-parking"></i> Phí đỗ xe</div>
                                <div class="shuttle-item__price-item"><i class="fa-solid fa-clock"></i> Phí chờ thêm thời gian</div>
                            </div>
                        </div>
                    </div>
                </div>`;
        return shuttleHtml
    }


    function loadHotelItems(shuttlesContainer, jsonPath, departure, destination) {
        if (!shuttlesContainer) {
            return;
        }
        fetch(jsonPath)
            .then(response => {
                return response.json();
            }).then(shuttles => {
                let shuttlesHtml = '';
                shuttles.forEach(shuttle => {
                    const shuttleAirportName = removeVietnameseTones(shuttle.airportName).trim().toLowerCase()
                    console.log('KIEM TRA')
                    console.log(departure);
                    console.log(destination);
                    console.log(shuttleAirportName);
                    console.log(shuttleAirportName.includes(departure))
                    console.log(departure != '')
                    console.log(shuttleAirportName.includes(destination))
                    console.log(destination != '')
                    console.log((shuttleAirportName.includes(departure) && departure != '') || (shuttleAirportName.includes(destination) && destination != ''))
                    
                    if ((shuttleAirportName.includes(departure) && departure != '') || 
                        (shuttleAirportName.includes(destination) && destination != '')) {
                        console.log('TRUNG')
                        console.log(shuttleAirportName);
                        shuttlesHtml += createShuttleItem(shuttle);
                    }
                })
                shuttlesContainer.innerHTML = shuttlesHtml;
            }).catch(error => {
                console.log('error to load json');
                shuttlesContainer.innerHTML = 'can not load data';
            });
    }



    submitInput.addEventListener('click', (event) => {
        const departureInput = document.getElementById('shuttle-search-box__departure');
        const destinationInput = document.getElementById('shuttle-search-box__destination');
        const pickupDateInput = document.getElementById('shuttle-search-box__pickup-date');
        const pickupTimeInput = document.getElementById('shuttle-search-box__pickup-time');
        if (departureInput.value == '') {
            alert('Please, fill in airport information')
            return;
        } else {
            const container = document.getElementById('main__shuttle-container');
            loadHotelItems(container, shuttlesJsonPath, removeVietnameseTones(departureInput.value.trim().toLowerCase()), removeVietnameseTones(destinationInput.value.trim().toLowerCase()))
        }
    })


    const details = document.getElementById('main__shuttle-container');
    console.log(details)
    if (details) {
        details.addEventListener('click', (event) => {
            const clickedShuttleTicketLink = event.target.closest('.shuttle-item__link');
            if (clickedShuttleTicketLink) {
                const target = event.target;
                if (target.classList.contains('shuttle-item__add-cart') ||
                    target.classList.contains('shuttle-item__order')) {
                    event.preventDefault()
                    event.stopPropagation();
                } else {
                    const shuttleHiddenDetail = clickedShuttleTicketLink.querySelectorAll('.shuttle-item__details')[0]
                    shuttleHiddenDetail.classList.toggle('active')
                }
            }
        })
    }
});
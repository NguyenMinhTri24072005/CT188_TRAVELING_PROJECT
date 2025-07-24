document.addEventListener('DOMContentLoaded', () => {
    //handing for details
    const details = document.getElementById('main__bus-tickets-container');
    console.log(details)
    if (details){
        details.addEventListener('click', (event) => {
            const clickedBusTicketLink = event.target.closest('.bus-ticket-item__link');
            if (clickedBusTicketLink){
                const target = event.target;
                if (target.classList.contains('bus-ticket-item__add-cart') ||
                    target.classList.contains('bus-ticket-item__order')){
                        event.preventDefault()
                        event.stopPropagation();
                }else {
                    const bussHiddenDetail = clickedBusTicketLink.querySelectorAll('.bus-ticket-item__details')[0]
                    bussHiddenDetail.classList.toggle('active')
                }
            }
        })
    }


    function formatPrice(price) {
        return price.toLocaleString('vi-VN') + 'đ';
    }

    function createBusTicketItem(ticket){
        let ticketHtml = ''
        ticketHtml +=
        `<div class="bus-ticket-item">
                <div class="bus-ticket-item__link" id="${ticket.ProductId}">
                    <div class="bus-ticket-item__overview">
                        <div class="bus-ticket-item__logo">
                            <img src="${ticket.imageLogo}" alt="" class="bus-ticket-item__img">
                        </div>
                        <div class="bus-ticket-item__planning">
                            <div class="bus-ticket-item__departure">${ticket.departureLocation} (${ticket.departureTime})</div>
                            <div class="bus-ticket-item__arrow fa-solid fa-arrow-right"></div>
                            <div class="bus-ticket-item__destination">${ticket.destinationLocation} (${ticket.arrivalTime})</div>
                        </div>
                        <div class="bus-ticket-item__price">${formatPrice(ticket.price)}/khách</div>
                        <div class="bus-ticket-item__payment">
                            <button class="bus-ticket-item__add-cart">thêm vào giỏ</button>
                            <button class="bus-ticket-item__order">đặt vé</button>
                        </div>
                    </div>
                    <div class="bus-ticket-item__details" id="bus-ticket-item__details">
                        <div class="bus-ticket-item__departure-address"><i class="fa-solid fa-location-dot"></i> ${ticket.departureLocationDetail} ${ticket.departureTime} ${ticket.departureDate}</div>
                        <div class="bus-ticket-item__info">
                            <div class="bus-ticket-item__brand"><i class="fa-solid fa-building"></i> nhà xe: ${ticket.company}</div>
                            <div class="bus-ticket-item__seat-type">${ticket.seatType}</div>
                            <div class="bus-ticket-item__facilities">${ticket.facilities[0]}</div>
                        </div>
                        <div class="bus-ticket-item__destination-address"><i class="fa-solid fa-location-dot"></i> ${ticket.destinationLocationDetail} ${ticket.arrivalTime}</div>
                    </div>
                </div>
            </div>`
        return ticketHtml;
    }

    function loadTourItems(ticketsContainer, jsonPath) {
        if (!ticketsContainer) {
            return;
        }
        fetch(jsonPath)
            .then(response => {
                return response.json();
            }).then(tickets => {
                let ticketsHtml = '';
                tickets.forEach(tour => {
                    ticketsHtml += createBusTicketItem(tour);
                })
                ticketsContainer.innerHTML = ticketsHtml;
            }).catch(error => {
                console.log('error to load json');
                ticketsContainer.innerHTML='can not load data';
            });
    }

    const container = document.getElementById('main__bus-tickets-container');
    loadTourItems(container, busTicketsJsonPath)
})
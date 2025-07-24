document.addEventListener('DOMContentLoaded', () => {
    //handing for details
    const details = document.getElementById('main__plane-tickets-container');
    console.log(details)
    if (details){
        details.addEventListener('click', (event) => {
            const clickedPlaneTicketLink = event.target.closest('.plane-ticket-item__link');
            if (clickedPlaneTicketLink){
                const target = event.target;
                if (target.classList.contains('plane-ticket-item__add-cart') ||
                    target.classList.contains('plane-ticket-item__order')){
                        event.preventDefault()
                        event.stopPropagation();
                }else {
                    const planeHiddenDetail = clickedPlaneTicketLink.querySelectorAll('.plane-ticket-item__details')[0]
                    planeHiddenDetail.classList.toggle('active')
                }
            }
        })
    }


    function formatPrice(price) {
        return price.toLocaleString('vi-VN') + 'đ';
    }


    function createPlaneTicketItem(ticket){
        let ticketHtml = ''
        ticketHtml +=
        `<div class="plane-ticket-item">
                <div class="plane-ticket-item__link" id="${ticket.ProductId}">
                    <div class="plane-ticket-item__overview">
                        <div class="plane-ticket-item__logo">
                            <img src="${ticket.imageLogo}" alt="" class="plane-ticket-item__img">
                        </div>
                        <div class="plane-ticket-item__planning">
                            <div class="plane-ticket-item__departure">${ticket.departureAirport} (${ticket.departureTime})</div>
                            <div class="plane-ticket-item__arrow fa-solid fa-arrow-right"></div>
                            <div class="plane-ticket-item__destination">${ticket.destinationAirport} (${ticket.arrivalTime})</div>
                        </div>
                        <div class="plane-ticket-item__price">${formatPrice(ticket.price)}/khách</div>
                        <div class="plane-ticket-item__payment">
                            <button class="plane-ticket-item__add-cart">thêm vào giỏ</button>
                            <button class="plane-ticket-item__order">đặt vé</button>
                        </div>
                    </div>
                    <div class="plane-ticket-item__details" id="plane-ticket-item__details">
                        <div class="plane-ticket-item__departure-airport">${ticket.departureAirportName} ${ticket.departureTime} ${ticket.departureDate}</div>
                        <div class="plane-ticket-item__info">
                            <div class="plane-ticket-item__brand"><i class="fa-solid fa-plane"></i>${ticket.airline}</div>
                            <div class="plane-ticket-item__class">${ticket.ticketClass}</div>
                            <div class="plane-ticket-item__checked-luggage"><i class="fa-solid fa-suitcase"></i> Hành lý ký gửi ${ticket.baggageAllowance.checked}</div>
                            <div class="plane-ticket-item__carry-luggage"><i class="fa-solid fa-suitcase-rolling"></i> Hành lý xách tay ${ticket.baggageAllowance.caryON}</div>
                        </div>
                        <div class="plane-ticket-item__destination-airport">${ticket.destinationAirportName} ${ticket.arrivalTime} ${ticket.arrivalDate}</div>
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
                    ticketsHtml += createPlaneTicketItem(tour);
                })
                ticketsContainer.innerHTML = ticketsHtml;
            }).catch(error => {
                console.log('error to load json');
                ticketsContainer.innerHTML='can not load data';
            });
    }

    const container = document.getElementById('main__plane-tickets-container');
    loadTourItems(container, planeTicketsJsonPath)
})
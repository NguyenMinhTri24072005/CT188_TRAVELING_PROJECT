document.addEventListener('DOMContentLoaded', () => {

    function formatPrice(price) {
        return price.toLocaleString('vi-VN') + 'đ';
    }
    function parseVietnameseCurrency(currencyString) {
        let cleanedString = currencyString.replace('đ', '');
        cleanedString = cleanedString.replace(/\./g, '');
        const parsedNumber = parseInt(cleanedString, 10);
        return parsedNumber;
    }

    function isExistedInCart(item, arrCart) {
        let myIndex = -1;
        arrCart.forEach((itemProduct, index) => {
            if (itemProduct.id == item.id) {
                myIndex = index;
            }
        });
        return myIndex;
    }


    function addTourToCart(tour) {
        let updateCart = [];
        let newCartTour = {
            id: tour.ProductId,
            name: tour.name,
            price: tour.price,
            locations: [
                tour.locations[0],
                tour.locations[1],
                tour.locations[2],
                tour.locations[3]
            ],
            departureDate: tour.departureDates[0],
            image: tour.images[0],
            quantity: 1
        }

        console.log(newCartTour)
        console.log('checked new item was added to newCartTour')
        console.log(tour.images[0])

        if (JSON.parse(localStorage.getItem('toursCart')) === null) {
            console.log('toursCart localStorage is not available yet')
            updateCart.push(newCartTour);
            localStorage.setItem('toursCart', JSON.stringify(updateCart));
            window.location.reload();
            console.log('toursCart was created')
        } else {
            console.log('toursCart localStorage is available')
            updateCart = JSON.parse(localStorage.getItem('toursCart'));

            if (isExistedInCart(newCartTour, updateCart) >= 0) {
                index = isExistedInCart(newCartTour, updateCart);
                console.log('this newCartTour is available in cart, increase quantity')
                updateCart[index].quantity++;
                console.log('this newCartTour is increased ')
            } else {
                console.log('this newCartTour is not available in cart, create new item')
                updateCart.push(newCartTour);
                console.log('this newCartTour was created')
            }

            localStorage.setItem('toursCart', JSON.stringify(updateCart));
            location.reload();
        }
    }

    function addHotelToCart(hotel) {
        let updateCart = [];
        let newCartHotel = {
            id: hotel.ProductId,
            name: hotel.name,
            price: hotel.pricePerNight,
            address: hotel.address,
            image: hotel.images[0],
            quantity: 1
        }

        console.log(newCartHotel)
        console.log('checked new item was added to newCartHotel')

        if (JSON.parse(localStorage.getItem('hotelsCart')) === null) {
            console.log('hotelsCart localStorage is not available yet')
            updateCart.push(newCartHotel);
            localStorage.setItem('hotelsCart', JSON.stringify(updateCart));
            window.location.reload();
            console.log('hotelsCart was created')
        } else {
            console.log('hotelsCart localStorage is available')
            updateCart = JSON.parse(localStorage.getItem('hotelsCart'));

            if (isExistedInCart(newCartHotel, updateCart) >= 0) {
                index = isExistedInCart(newCartHotel, updateCart);
                console.log('this newCartHotel is available in cart, increase quantity')
                updateCart[index].quantity++;
                console.log('this newCartHotel is increased ')
            } else {
                console.log('this newCartHotel is not available in cart, create new item')
                updateCart.push(newCartHotel);
                console.log('this newCartHotel was created')
            }

            localStorage.setItem('hotelsCart', JSON.stringify(updateCart));
            location.reload();
        }
    }

    function addPlaneTicketToCart(ticket) {
        let updateCart = [];
        let newPlaneTicket = {
            id: ticket.ProductId,
            airLine: ticket.airline,
            flightNumber: ticket.flightNumber,
            departureAirportName: ticket.departureAirportName,
            departureDate: ticket.departureDate,
            departureTime: ticket.departureTime,
            destinationAirportName: ticket.destinationAirportName,
            destinationDate: ticket.arrivalDate,
            destinationTime: ticket.arrivalTime,
            gate: ticket.gate,
            terminal: ticket.terminal,
            checkedLuggage: ticket.baggageAllowance.checked,
            carryOnLuggage: ticket.baggageAllowance.carryOn,
            class: ticket.ticketClass,
            price: ticket.price,
            image: ticket.imageLogo,
            quantity: 1
        }

        console.log(newPlaneTicket)
        console.log('checked new item was added to newCartPlaneTicket')

        if (JSON.parse(localStorage.getItem('planeTicketsCart')) === null) {
            console.log('planeTicketsCart localStorage is not available yet')
            updateCart.push(newPlaneTicket);
            localStorage.setItem('planeTicketsCart', JSON.stringify(updateCart));
            console.log('planeTicketsCart was created')
        } else {
            console.log('planeTicketsCart localStorage is available')
            updateCart = JSON.parse(localStorage.getItem('planeTicketsCart'));

            if (isExistedInCart(newPlaneTicket, updateCart) >= 0) {
                index = isExistedInCart(newPlaneTicket, updateCart);
                console.log('this newCartPlaneTicket is available in cart, increase quantity')
                updateCart[index].quantity++;
                console.log('this newCartPlaneTicket is increased ')
            } else {
                console.log('this newCartPlaneTicket is not available in cart, create new item')
                updateCart.push(newPlaneTicket);
                console.log('this newCartPlaneTicket was created')
            }

            localStorage.setItem('planeTicketsCart', JSON.stringify(updateCart));
        }
    }

    function addBusTicketToCart(ticket) {
        let updateCart = [];
        let newBusTicket = {
            id: ticket.ProductId,
            company: ticket.company,
            departureLocation: ticket.departureLocation,
            departureLocationAddress: ticket.departureLocationDetail,
            departureDate: ticket.departureDate,
            departureTime: ticket.departureTime,
            destinationLocation: ticket.destinationLocation,
            destinationLocationAddress: ticket.destinationLocationDetail,
            destinationDate: ticket.arrivalDate,
            destinationTime: ticket.arrivalTime,
            seatType: ticket.seatType,
            price: ticket.price,
            image: ticket.imageLogo,
            quantity: 1
        }

        console.log(newBusTicket)
        console.log('checked new item was added to newCartBusTicket')

        if (JSON.parse(localStorage.getItem('busTicketsCart')) === null) {
            console.log('busTicketsCart localStorage is not available yet')
            updateCart.push(newBusTicket);
            localStorage.setItem('busTicketsCart', JSON.stringify(updateCart));
            console.log('busTicketsCart was created')
        } else {
            console.log('busTicketsCart localStorage is available')
            updateCart = JSON.parse(localStorage.getItem('busTicketsCart'));

            if (isExistedInCart(newBusTicket, updateCart) >= 0) {
                index = isExistedInCart(newBusTicket, updateCart);
                console.log('this newCartBusTicket is available in cart, increase quantity')
                updateCart[index].quantity++;
                console.log('this newCartBusTicket is increased ')
            } else {
                console.log('this newCartBusTicket is not available in cart, create new item')
                updateCart.push(newBusTicket);
                console.log('this newCartBusTicket was created')
            }

            localStorage.setItem('busTicketsCart', JSON.stringify(updateCart));
        }
    }

    function addShuttleToCart(shuttle) {
        let updateCart = [];
        let newShuttle = {
            id: shuttle.ProductId,
            airportName: shuttle.airportName,
            airportCity: shuttle.airportCity,
            carName: shuttle.carName,
            name: shuttle.carName,
            price: shuttle.pricePerKm,
            passengerCapacity: shuttle.passengerCapacity,
            luggageCapacity: shuttle.luggageCapacity,
            image: shuttle.image,
            quantity: 1
        }

        console.log(newShuttle)
        console.log('checked new item was added to newCartShuttle')

        if (JSON.parse(localStorage.getItem('shuttlesCart')) === null) {
            console.log('shuttlesCart localStorage is not available yet')
            updateCart.push(newShuttle);
            localStorage.setItem('shuttlesCart', JSON.stringify(updateCart));
            console.log('shuttlesCart was created')
        } else {
            console.log('shuttlesCart localStorage is available')
            updateCart = JSON.parse(localStorage.getItem('shuttlesCart'));

            if (isExistedInCart(newShuttle, updateCart) >= 0) {
                index = isExistedInCart(newShuttle, updateCart);
                console.log('this newCartShuttle is available in cart, increase quantity')
                updateCart[index].quantity++;
                console.log('this newCartShuttle is increased ')
            } else {
                console.log('this newCartShuttle is not available in cart, create new item')
                updateCart.push(newShuttle);
                console.log('this newCartShuttle was created')
            }

            localStorage.setItem('shuttlesCart', JSON.stringify(updateCart));
        }
    }


    function addRentalCarToCart(rentalCar) {
        let updateCart = [];
        let newRentalCar = {
            id: rentalCar.ProductId,
            carName: rentalCar.carName,
            carBrand: rentalCar.carBrand,
            name: rentalCar.carName,
            passengerCapacity: rentalCar.passengerCapacity,
            luggageCapacity: rentalCar.luggageCapacity,
            vehicleType: rentalCar.vehicleType,
            luggageCapacity: rentalCar.luggageCapacity,
            price: rentalCar.dailyRentalPrice,
            image: rentalCar.image,
            quantity: 1
        }

        console.log(newRentalCar)
        console.log('checked new item was added to newCartRentalCar')

        if (JSON.parse(localStorage.getItem('rentalCarsCart')) === null) {
            console.log('rentalCarsCart localStorage is not available yet')
            updateCart.push(newRentalCar);
            localStorage.setItem('rentalCarsCart', JSON.stringify(updateCart));
            window.location.reload();
            console.log('rentalCarsCart was created')
        } else {
            console.log('rentalCarsCart localStorage is available')
            updateCart = JSON.parse(localStorage.getItem('rentalCarsCart'));

            if (isExistedInCart(newRentalCar, updateCart) >= 0) {
                index = isExistedInCart(newRentalCar, updateCart);
                console.log('this newCartRentalCar is available in cart, increase quantity')
                updateCart[index].quantity++;
                console.log('this newCartRentalCar is increased ')
            } else {
                console.log('this newCartRentalCar is not available in cart, create new item')
                updateCart.push(newRentalCar);
                console.log('this newCartRentalCar was created')
            }

            localStorage.setItem('rentalCarsCart', JSON.stringify(updateCart));
            location.reload();
        }
    }


    // handling add products cart
    const classifyProductToCart = (productId, jsonPath) => {
        alert(`your product ID: ${productId}`);
        if (Storage !== undefined) {
            fetch(jsonPath)
                .then(response => {
                    return response.json()
                }).then(products => {
                    console.log(products)
                    let checkProductInJson = false;
                    products.forEach(product => {
                        if (product.ProductId == productId) {
                            checkProductInJson = true;
                            if (product.class == 'tours') {
                                console.log('them tour')
                                let productTemp = product;
                                addTourToCart(product);
                            } else if (product.class == 'hotels') {
                                console.log('them hotel')
                                let productTemp = product;
                                addHotelToCart(product);
                            } else if (product.class == 'PlaneTickets') {
                                console.log('them plane tickets')
                                let productTemp = product;
                                addPlaneTicketToCart(product);
                            } else if (product.class == 'BusTickets') {
                                console.log('them bus tickets')
                                let productTemp = product;
                                addBusTicketToCart(product);
                            } else if (product.class == 'shuttles') {
                                console.log('them shuttles')
                                let productTemp = product;
                                addShuttleToCart(product);
                            } else if (product.class == 'rentalCars') {
                                console.log('them rentalCars')
                                let productTemp = product;
                                addRentalCarToCart(product);
                            } else {
                                console.log('we do not have this product');
                            }
                        }
                    })
                })
                .catch(error => {
                    console.log('error to connect database')
                })
        } else {
            alert('Storage is not working in your device')
        }
    }


    // handling click order for tours-page.html
    const mainContainer = document.querySelector('.main__container');
    if (mainContainer) {
        mainContainer.addEventListener('click', (event) => {
            const clickedButton = event.target.closest('.tour-item__link');
            if (clickedButton) {
                const target = event.target;
                if (target.classList.contains('tour-item__add-cart')) {
                    event.preventDefault();
                    event.stopPropagation();
                    classifyProductToCart(target.closest('.tour-item__link').id, toursJsonPath)
                    return;
                } else if (target.classList.contains('tour-item__order')) {
                    event.preventDefault();
                    event.stopPropagation();
                    classifyProductToCart(target.closest('.tour-item__link').id, toursJsonPath)
                    location.href = 'cart.html';
                    return;
                }
            }
        })
    }
    // handling click order for tours.html
    const mainToursContainer = document.querySelector('.main__tours-container');
    if (mainToursContainer) {
        mainToursContainer.addEventListener('click', (event) => {
            const clickedButton = event.target.closest('.tour-item__link');
            if (clickedButton) {
                const target = event.target;
                if (target.classList.contains('tour-item__add-cart')) {
                    event.preventDefault();
                    event.stopPropagation();
                    classifyProductToCart(target.closest('.tour-item__link').id, toursJsonPath);
                    return;
                } else if (target.classList.contains('tour-item__order')) {
                    event.preventDefault();
                    event.stopPropagation();
                    classifyProductToCart(target.closest('.tour-item__link').id, toursJsonPath)
                    location.href = 'cart.html';
                    return;
                }
            }
        })
    }
    // handling click order for hotels.html
    const mainHotelsContainer = document.querySelector('.main__hotels-container');
    if (mainHotelsContainer) {
        mainHotelsContainer.addEventListener('click', (event) => {
            const clickedButton = event.target.closest('.hotel-item__link');
            if (clickedButton) {
                const target = event.target;
                if (target.classList.contains('hotel-item__add-cart')) {
                    event.preventDefault();
                    event.stopPropagation();
                    classifyProductToCart(target.closest('.hotel-item__link').id, hotelsJsonPath);
                    return;
                } else if (target.classList.contains('hotel-item__order')) {
                    event.preventDefault();
                    event.stopPropagation();
                    classifyProductToCart(target.closest('.tour-item__link').id, toursJsonPath)
                    location.href = 'cart.html';
                    return;
                }
            }
        })
    }
    // handling click order for planeTickets.html
    const mainPlaneTicketsContainer = document.querySelector('.main__plane-tickets-container');
    if (mainPlaneTicketsContainer) {
        mainPlaneTicketsContainer.addEventListener('click', (event) => {
            const clickedButton = event.target.closest('.plane-ticket-item__link');
            if (clickedButton) {
                const target = event.target;
                if (target.classList.contains('plane-ticket-item__add-cart')) {
                    event.preventDefault();
                    event.stopPropagation();
                    classifyProductToCart(target.closest('.plane-ticket-item__link').id, planeTicketsJsonPath);
                    return;
                } else if (target.classList.contains('plane-ticket-item__order')) {
                    event.preventDefault();
                    event.stopPropagation();
                    classifyProductToCart(target.closest('.tour-item__link').id, toursJsonPath)
                    location.href = 'cart.html';
                    return;
                }
            }
        })
    }
    // handling click order for busTickets.html
    const mainBusTicketsContainer = document.querySelector('.main__bus-tickets-container');
    if (mainBusTicketsContainer) {
        mainBusTicketsContainer.addEventListener('click', (event) => {
            const clickedButton = event.target.closest('.bus-ticket-item__link');
            if (clickedButton) {
                const target = event.target;
                if (target.classList.contains('bus-ticket-item__add-cart')) {
                    event.preventDefault();
                    event.stopPropagation();
                    classifyProductToCart(target.closest('.bus-ticket-item__link').id, busTicketsJsonPath);
                    return;
                } else if (target.classList.contains('bus-ticket-item__order')) {
                    event.preventDefault();
                    event.stopPropagation();
                    classifyProductToCart(target.closest('.tour-item__link').id, toursJsonPath)
                    location.href = 'cart.html';
                    return;
                }
            }
        })
    }
    // handling click order for shuttles.html
    const mainShuttlesContainer = document.querySelector('.main__shuttle-container');
    if (mainShuttlesContainer) {
        mainShuttlesContainer.addEventListener('click', (event) => {
            const clickedButton = event.target.closest('.shuttle-item__link');
            if (clickedButton) {
                const target = event.target;
                if (target.classList.contains('shuttle-item__add-cart')) {
                    event.preventDefault();
                    event.stopPropagation();
                    classifyProductToCart(target.closest('.shuttle-item__link').id, shuttlesJsonPath);
                    return;
                } else if (target.classList.contains('shuttle-item__order')) {
                    event.preventDefault();
                    event.stopPropagation();
                    classifyProductToCart(target.closest('.tour-item__link').id, toursJsonPath)
                    location.href = 'cart.html';
                    return;
                }
            }
        })
    }
    // handling click order for details.html
    const mainDetails = document.getElementById('main-product-details');
    if (mainDetails) {
        mainDetails.addEventListener('click', (event) => {
            const clickedDetailButton = event.target.closest('.product-details');
            if (clickedDetailButton) {
                const target = event.target;
                if (target.classList.contains('product-info__add-shopping-cart')) {
                    event.preventDefault();
                    event.stopPropagation();
                    if (target.closest('.product-details').classList.contains('tours')) {
                        classifyProductToCart(target.closest('.product-details').id, toursJsonPath)
                    } else if (target.closest('.product-details').classList.contains('hotels')) {
                        classifyProductToCart(target.closest('.product-details').id, hotelsJsonPath)
                    } else if (target.closest('.product-details').classList.contains('rentalCars')) {
                        classifyProductToCart(target.closest('.product-details').id, rentalCarsJsonPath)
                    }
                    console.log()

                    return;
                } else if (target.classList.contains('product-info__order')) {
                    event.preventDefault();
                    event.stopPropagation();
                    classifyProductToCart(target.closest('.tour-item__link').id, toursJsonPath)
                    location.href = 'cart.html';
                    return;
                }
            }
        })
    }

    // this section for showCart
    function createCartItem(Item, no) {
        let cartItemHtml = '';
        cartItemHtml +=
            `<div class="cart-item" id="${Item.id}">
                    <div class="cart-item__no">${no}</div>
                    <div class="cart-item__image">
                        <img src="${Item.image}" alt="">
                    </div>
                    <div class="cart-item__name">${Item.name} ${Item.id}</div>
                    <div class="cart-item__price">${formatPrice(Item.price)}</div>
                    <div class="cart-item__quantity">${Item.quantity}</div>
                    <div class="cart-item__total-amount">${formatPrice(Item.price * Item.quantity)}</div>
                    <div class="cart-item__delete">
                        <input type="number" class="cart-item__delete-input" min="0">
                        <button class="cart-item__delete-button">Xóa</button>
                    </div>
                </div>`
        return cartItemHtml;
    }

    function loadItemToCart(container, carsName) {
        let no = 1;
        let containerHtml =
            `<div class="cart-heading cart-item">
                        <div class="cart-heading__no cart-item__no">STT</div>
                        <div class="cart-heading__image cart-item__image">Hình ảnh</div>
                        <div class="cart-heading__name cart-item__name">Tên dịch vụ</div>
                        <div class="cart-heading__price cart-item__price">Giá</div>
                        <div class="cart-heading__quantity cart-item__quantity">Số lượng</div>
                        <div class="cart-heading__total-amount cart-item__total-amount">Thành tiền</div>
                        <div class="cart-heading__delete cart-item__delete">Xóa</div>
                    </div>`;
        const cart = JSON.parse(localStorage.getItem(carsName))
        if (cart != null) {
            cart.forEach(cartItem => {
                console.log(cartItem)
                containerHtml += createCartItem(cartItem, no)
                no++;
            })
        }
        if (container == null) {
            return
        }
        container.innerHTML = containerHtml;
    }

    const toursCartSection = document.getElementById('cart-section__details--tours');
    loadItemToCart(toursCartSection, 'toursCart')

    const hotelsCartSection = document.getElementById('cart-section__details--hotels');
    loadItemToCart(hotelsCartSection, 'hotelsCart')

    const planeTicketsCartSection = document.getElementById('cart-section__details--plane-tickets');
    loadItemToCart(planeTicketsCartSection, 'planeTicketsCart')

    const shuttlesCartSection = document.getElementById('cart-section__details--shuttles');
    loadItemToCart(shuttlesCartSection, 'shuttlesCart')

    const busTicketsCartSection = document.getElementById('cart-section__details--bus-tickets');
    loadItemToCart(busTicketsCartSection, 'busTicketsCart')

    const rentalCarsCartSection = document.getElementById('cart-section__details--rental-cars');
    loadItemToCart(rentalCarsCartSection, 'rentalCarsCart')




    function deleteItemFromToursCart(item) {
        let cartUpdate = [];
        let Cart = JSON.parse(localStorage.getItem('toursCart'));
        if (Cart != null) {
            Cart.forEach(product => {
                if (product.id != item.id) {
                    cartUpdate.push(product);
                    console.log(cartUpdate)
                }
            });
        }
        console.log(cartUpdate)
        localStorage.setItem('toursCart', JSON.stringify(cartUpdate));
        location.reload();
    }
    function deleteItemFromHotelsCart(item) {
        let cartUpdate = [];
        let Cart = JSON.parse(localStorage.getItem('hotelsCart'));
        if (Cart != null) {
            Cart.forEach(product => {
                if (product.id != item.id) {
                    cartUpdate.push(product);
                }
            });
        }
        localStorage.setItem('hotelsCart', JSON.stringify(cartUpdate));
        location.reload();
    }
    function deleteItemFromPlaneTicketsCart(item) {
        let cartUpdate = [];
        let Cart = JSON.parse(localStorage.getItem('planeTicketsCart'));
        if (Cart != null) {
            Cart.forEach(product => {
                if (product.id != item.id) {
                    cartUpdate.push(product);
                }
            });
        }
        localStorage.setItem('planeTicketsCart', JSON.stringify(cartUpdate));
        location.reload();
    }
    function deleteItemFromShuttlesCart(item) {
        let cartUpdate = [];
        let Cart = JSON.parse(localStorage.getItem('shuttlesCart'));
        if (Cart != null) {
            Cart.forEach(product => {
                if (product.id != item.id) {
                    cartUpdate.push(product);
                }
            });
        }
        localStorage.setItem('shuttlesCart', JSON.stringify(cartUpdate));
        location.reload();
    }
    function deleteItemFromBusTicketsCart(item) {
        let cartUpdate = [];
        let Cart = JSON.parse(localStorage.getItem('busTicketsCart'));
        if (Cart != null) {
            Cart.forEach(product => {
                if (product.id != item.id) {
                    cartUpdate.push(product);
                }
            });
        }
        localStorage.setItem('busTicketsCart', JSON.stringify(cartUpdate));
        location.reload();
    }
    function deleteItemFromRentalCarsCart(item) {
        let cartUpdate = [];
        let Cart = JSON.parse(localStorage.getItem('rentalCarsCart'));
        if (Cart != null) {
            Cart.forEach(product => {
                if (product.id != item.id) {
                    cartUpdate.push(product);
                }
            });
        }
        localStorage.setItem('rentalCarsCart', JSON.stringify(cartUpdate));
        location.reload();
    }

    function deleteItemFromLocalStorage(items) {
        items.forEach(item => {
            deleteItemFromToursCart(item);
            deleteItemFromHotelsCart(item);
            deleteItemFromPlaneTicketsCart(item)
            deleteItemFromShuttlesCart(item);
            deleteItemFromBusTicketsCart(item);
            deleteItemFromRentalCarsCart(item)
        })
    }



    function deleteItemFromToursCart(item, quantity) {
        let cartUpdate = [];
        let Cart = JSON.parse(localStorage.getItem('toursCart'));
        if (Cart != null) {
            Cart.forEach(product => {
                if (product.id != item.id) {
                    cartUpdate.push(product);
                    console.log(cartUpdate)
                } else {
                    if (quantity < 0) {
                        cartUpdate.push(product);
                    } else if (product.quantity > quantity){
                        product.quantity -= quantity;
                        cartUpdate.push(product);
                    }
                }
            });
        }
        console.log(cartUpdate)
        localStorage.setItem('toursCart', JSON.stringify(cartUpdate));
        location.reload();
    }
    function deleteItemFromHotelsCart(item, quantity) {
        let cartUpdate = [];
        let Cart = JSON.parse(localStorage.getItem('hotelsCart'));
        if (Cart != null) {
            Cart.forEach(product => {
                if (product.id != item.id) {
                    cartUpdate.push(product);
                    console.log(cartUpdate)
                } else {
                    if (quantity < 0) {
                        cartUpdate.push(product);
                    } else if (product.quantity > quantity){
                        product.quantity -= quantity;
                        cartUpdate.push(product);
                    }
                }
            });
        }
        localStorage.setItem('hotelsCart', JSON.stringify(cartUpdate));
        location.reload();
    }
    function deleteItemFromPlaneTicketsCart(item, quantity) {
        let cartUpdate = [];
        let Cart = JSON.parse(localStorage.getItem('planeTicketsCart'));
        if (Cart != null) {
            Cart.forEach(product => {
                if (product.id != item.id) {
                    cartUpdate.push(product);
                    console.log(cartUpdate)
                } else {
                    if (quantity < 0) {
                        cartUpdate.push(product);
                    } else if (product.quantity > quantity){
                        product.quantity -= quantity;
                        cartUpdate.push(product);
                    }
                }
            });
        }
        localStorage.setItem('planeTicketsCart', JSON.stringify(cartUpdate));
        location.reload();
    }
    function deleteItemFromShuttlesCart(item, quantity) {
        let cartUpdate = [];
        let Cart = JSON.parse(localStorage.getItem('shuttlesCart'));
        if (Cart != null) {
            Cart.forEach(product => {
                if (product.id != item.id) {
                    cartUpdate.push(product);
                    console.log(cartUpdate)
                } else {
                    if (quantity < 0) {
                        cartUpdate.push(product);
                    } else if (product.quantity > quantity){
                        product.quantity -= quantity;
                        cartUpdate.push(product);
                    }
                }
            });
        }
        localStorage.setItem('shuttlesCart', JSON.stringify(cartUpdate));
        location.reload();
    }
    function deleteItemFromBusTicketsCart(item, quantity) {
        let cartUpdate = [];
        let Cart = JSON.parse(localStorage.getItem('busTicketsCart'));
        if (Cart != null) {
            Cart.forEach(product => {
                if (product.id != item.id) {
                    cartUpdate.push(product);
                    console.log(cartUpdate)
                } else {
                    if (quantity < 0) {
                        cartUpdate.push(product);
                    } else if (product.quantity > quantity){
                        product.quantity -= quantity;
                        cartUpdate.push(product);
                    }
                }
            });
        }
        localStorage.setItem('busTicketsCart', JSON.stringify(cartUpdate));
        location.reload();
    }
    function deleteItemFromRentalCarsCart(item, quantity) {
        let cartUpdate = [];
        let Cart = JSON.parse(localStorage.getItem('rentalCarsCart'));
        if (Cart != null) {
            Cart.forEach(product => {
                if (product.id != item.id) {
                    cartUpdate.push(product);
                    console.log(cartUpdate)
                } else {
                    if (quantity < 0) {
                        cartUpdate.push(product);
                    } else if (product.quantity > quantity){
                        product.quantity -= quantity;
                        cartUpdate.push(product);
                    }
                }
            });
        }
        localStorage.setItem('rentalCarsCart', JSON.stringify(cartUpdate));
        location.reload();
    }

    function deleteItemFromLocalStorage(item, quantity) {
            deleteItemFromToursCart(item, quantity);
            deleteItemFromHotelsCart(item, quantity);
            deleteItemFromPlaneTicketsCart(item, quantity)
            deleteItemFromShuttlesCart(item, quantity);
            deleteItemFromBusTicketsCart(item, quantity);
            deleteItemFromRentalCarsCart(item, quantity)
    }

    const cartSection = Array.from(document.getElementsByClassName('cart-section'));
    cartSection.forEach(cart => {
        cart.addEventListener('click', (event) => {
            const clickedProduct = event.target.closest('.cart-item')
            if (clickedProduct) {
                const target = event.target;
                if (target.classList.contains('cart-item__delete-button')){
                    event.preventDefault();
                    event.stopPropagation();
                    console.log('bam nut xoa')
                    console.log(target.previousElementSibling.value)
                    deleteItemFromLocalStorage(clickedProduct, target.previousElementSibling.value)
                }else if (target.classList.contains('cart-item__delete-input')){
                    event.preventDefault();
                    event.stopPropagation()
                }else {
                    event.preventDefault();
                    event.stopPropagation();
                    
                    if (!target.classList.contains('cart-heading')) {
                        clickedProduct.classList.toggle('clicked')
                        
                        const cashTotalAmount = document.getElementById('cash-register__total-amount');
                        const clickedProductItem = Array.from(document.getElementsByClassName('clicked'));
                        let totalAmount = 0;
                        clickedProductItem.forEach(item => {
                            console.log(item);
                            var temp = item.querySelector('.cart-item__total-amount')
                            console.log(temp)
                            console.log(parseVietnameseCurrency(temp.innerText))
                            totalAmount += parseVietnameseCurrency(temp.innerText)
                        })
                        console.log(totalAmount)
                        cashTotalAmount.innerText = formatPrice(totalAmount);

                    }
                    console.log(target);
                }
            } else {
                const cartSectionDetails = Array.from(cart.getElementsByClassName('cart-section__details'));
                cartSectionDetails[0].classList.toggle('active')
            }
        })
    })


    const paymentButton = document.getElementById('cash-register__button')
    paymentButton.addEventListener('click', () => {
        alert('Are you sure you want to pay?')
        const clickedItemToPayment = Array.from(document.getElementsByClassName('clicked'));
        deleteItemFromLocalStorage(clickedItemToPayment)
    })

})
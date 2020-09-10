//$ Pull items from the DOM
const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
// console.log(seats)
const count = document.querySelector('#count')
const total = document.querySelector('#total')
const titleSelect = document.querySelector('#movie')

let ticketPrice = +titleSelect.value // using `+` (alternatively ParseInt()) to force typeof to be `number`
// console.log(typeof ticketPrice)

//$ Save selected title and price to localstorage
function setTitleData(titleData, titlePrice) {
  localStorage.setItem('selectedTitleIndex', titleData)
  localStorage.setItem('selectedTitlePrice', titlePrice)
}

//$ Update total and count
/**
 * Updates the DOM with the number of selected seats and the corresponding price of those tickets
 */
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected')
  //   console.log(selectedSeats) // Test to see if the DOM is correctly tracking the number of selected seats

  // Copy selected seats into arr
  // Map through array
  // return a new array with indexes
  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat)
  })

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

  const selectedSeatsCount = selectedSeats.length
  //   console.log(selectedSeatsCount) // Test to see if the DOM is correctly tracking the number of selected seats
  count.innerText = selectedSeatsCount
  total.innerText = selectedSeatsCount * ticketPrice
}

//$ Event Listeners

//$ Title select event
titleSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value
  setTitleData(e.target.selectedIndex, e.target.value)
  updateSelectedCount()
})

//$ Seat click event
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    // console.log(e.target) // Test for click event triggering only on empty seats
    e.target.classList.toggle('selected')

    updateSelectedCount()
  }
})

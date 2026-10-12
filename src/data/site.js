export const restaurant = {
  name: 'Saffron House',
  established: 2014,
  seats: 48,
  maxParty: 8,
  closedDay: 1, // Date.getDay() uses 0 for Sunday, so Monday is 1
  closedDayLabel: 'Mondays',
  phone: '+91 22 4890 2210',
  phoneHref: 'tel:+912248902210',
  email: 'reservations@saffronhouse.example',
  emailHref: 'mailto:reservations@saffronhouse.example',
  addressLines: ["14, Kemp's Corner", 'Breach Candy', 'Mumbai 400026'],
  mapQuery: 'Breach Candy, Mumbai',
  lastSeating: '21:30',
  hours: [
    {
      label: 'Tuesday – Sunday',
      detail: 'Lunch 12:30–15:00 · Dinner 19:00–23:00',
    },
    {
      label: 'Monday',
      detail: 'Closed',
    },
  ],
  reservationTimes: {
    Lunch: ['12:30', '13:00', '13:30', '14:00'],
    Dinner: ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30'],
  },
  occasions: [
    { value: 'dinner', label: 'Dinner' },
    { value: 'celebration', label: 'Celebration' },
    { value: 'anniversary', label: 'Anniversary' },
    { value: 'business', label: 'Business' },
  ],
}

export const primaryNav = [
  { to: '/', label: 'Home', end: true },
  { to: '/menu', label: 'Menu', end: false },
  { to: '/story', label: 'Our Story', end: false },
  { to: '/visit', label: 'Visit Us', end: false },
]

export const footerNav = [
  ...primaryNav,
  { to: '/reserve', label: 'Reserve a Table', end: false },
]

export function allReservationTimes() {
  return Object.values(restaurant.reservationTimes).flat()
}

export function occasionLabel(value) {
  return restaurant.occasions.find((item) => item.value === value)?.label ?? ''
}

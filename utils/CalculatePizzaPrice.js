
const sizes = {
	S: 0.75,
	M: 1,
	L: 1.25
}

const CalculatePizzaPrice = (size, cents) => {
  return cents * sizes[size];
}

export default CalculatePizzaPrice;
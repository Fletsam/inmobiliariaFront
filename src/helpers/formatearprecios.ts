export const formatPrecio = () => {
	
	const formatter = new Intl.NumberFormat('en-US', {
	  style: 'currency',
	  currency: 'USD'
	})
}
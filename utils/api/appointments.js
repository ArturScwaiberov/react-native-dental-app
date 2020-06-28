import axios from '../../core/axios'

export default {
	get: () => axios.get('/appointments', { timeout: 3000 }),
	add: (values) => axios.post('/appointments', values),
	remove: (id) => axios.delete('/appointments/remove/' + id),
	update: (id, values) => axios.patch('appointments/update/' + id, values),
}

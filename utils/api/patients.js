import axios from '../../core/axios'

export default {
	get: () => axios.get('/patients', { timeout: 3000 }),
	add: (values) => axios.post('/patients', values),
	show: (id) => axios.get('/patients/show/' + id),
	remove: (id) => axios.delete('patients/remove/' + id),
}

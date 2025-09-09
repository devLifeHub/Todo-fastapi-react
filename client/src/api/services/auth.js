import api from '../index'

const authApi = {
    register: data => api.post('/auth/register', data),
    login: creds => api.post('/auth/login',
        new URLSearchParams(creds),
        { headers: { 
            'Content-Type':'application/x-www-form-urlencoded' 
            }
        }
    ),
    logout: () => api.post('/auth/logout'),
}

export default authApi

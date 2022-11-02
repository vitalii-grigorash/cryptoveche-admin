import { config } from '../config';

const API_URL = config.java_api_url;

// export const getNewTokens = (refreshToken) => {
//     return fetch(`${API_URL}/refresh_tokens`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${refreshToken}`,
//         },
//     })
//         .then(res => res.ok ? res : Promise.reject(res))
//         .then((res) => {
//             if (res.ok) {
//                 return res.json();
//             }
//         })
//         .then((data) => {
//             localStorage.removeItem('jwt');
//             return data;
//         })
//         .catch((err) => {
//             throw new Error(err.message);
//         });
// }

export const authorize = (email, password) => {
    return fetch(`${API_URL}/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,
            authAs: "user"
        })
    })
        .then(res => res.ok ? res : Promise.reject(res))
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((data) => {
            if (data.jwt) {
                localStorage.setItem('jwt', JSON.stringify(data.jwt));
            }
            return data;
        })
        .catch((err) => {
            if (err.status === 500) {
                throw new Error('Сервер временно недоступен');
            }
        });
};


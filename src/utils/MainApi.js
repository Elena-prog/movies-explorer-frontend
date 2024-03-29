class MainApi {
    constructor({baseUrl}){
        this._baseUrl = baseUrl;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`${res.status}`); 
        }
        return res.json();
    } 

    register(email, password, name) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({'email': email, 'password': password, 'name': name })
        })
        .then(this._getResponseData)
    }

    login(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'email': email, 'password': password})
        })
        .then(this._getResponseData)
    }

    logout() {
        return fetch(`${this._baseUrl}/signout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(this._getResponseData)
    }

    getMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(this._getResponseData)
    }

    like({
        country, 
        director, 
        duration, 
        year,
        description,
        image:{url: image },
        trailerLink,
        image:{formats:{thumbnail:{url:thumbnail}}},
        id: movieId,
        nameRU,
        nameEN
        }){
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                country, 
                director, 
                duration, 
                year,
                description,
                image,
                trailerLink,
                thumbnail,
                movieId,
                nameRU,
                nameEN
             })
        })
        .then(this._getResponseData)
    }

    deleteMovie(movieId) {
        return fetch(`${this._baseUrl}/movies/${movieId}`, {
            method: "DELETE",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(this._getResponseData)
    }

    updateUser(name, email) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"name": name,"email": email})
        })
        .then(this._getResponseData)
    }

}

const mainApi = new MainApi({
    // baseUrl: 'https://api.diploma.elena.nomoredomains.club'
    baseUrl: 'http://localhost:3001'
});

export default mainApi;




class MoviesApi {
    constructor({baseUrl}){
        this._baseUrl = baseUrl;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(res.status); 
        }
        return res.json();
    } 

    getMovies() {
        return fetch(this._baseUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(this._getResponseData)
    }

}
const moviesApi = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies'
})

export default moviesApi;
class MoviesApi {
    constructor(url) {
        this._url = url;
    }
    _getResponseData(response) {
        if (!response.ok) {
            return Promise.reject(`Ошибочка вышла: ${response.status}`); 
        }
        return response.json();
    } 
    getMovies() {
        const params = new URLSearchParams();
        return fetch(this._url + params)
            .then(response => this._getResponseData(response))
    }   
}

const moviesApi = new MoviesApi("https://api.nomoreparties.co/beatfilm-movies");
export default moviesApi;
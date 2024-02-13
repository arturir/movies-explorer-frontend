class MainApi {
    constructor(url) {
        this._url = url;
    }

    refreshToken(){
        return localStorage.getItem('jwt') ? `Bearer ${localStorage.getItem('jwt')}`: ''
    }

    _getResponseData(response) {
        if (!response.ok) {
            return Promise.reject(`Ошибочка вышла: ${response.status}`); 
        }
        return response.json();
    } 

    register(name, email, password) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
          })
          .then(response => this._getResponseData(response))
    }

    authorize (email, password) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        .then(response => this._getResponseData(response))
    }; 
    
    checkToken (token) {
      return fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
      })
      .then(response => this._getResponseData(response))
    }


    editProfile(name, email, password) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.refreshToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, email
            })
        })
        .then(response => this._getResponseData(response))
    }
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: this.refreshToken()
            }
        })
        .then(response => this._getResponseData(response))       
    }


    getCards() {
        return fetch(`${this._url}/movies`, {
            headers: {
                authorization: this.refreshToken()
            }
        })
        .then(response => this._getResponseData(response))
    }

    addNewCard(newMovie) {
        const {country, director, duration, year, description, image, trailerLink, thumbnail, id, nameRU, nameEN} = newMovie;
        const newFilm = {country, director, duration, year, description, image:  image.url, trailerLink, thumbnail:image.url, movieId: id, nameRU, nameEN};
        return fetch(`${this._url}/movies`, {
            method: 'POST',
            headers: {
              authorization: this.refreshToken(),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newFilm
            })
        })
        .then(response => this._getResponseData(response))
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/movies/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this.refreshToken()
            }
        })
        .then(response => this._getResponseData(response))
    }
}

const mainApi = new MainApi('http://localhost:3001');
export default mainApi;
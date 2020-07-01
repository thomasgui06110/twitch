import axios from 'axios'

let api = axios.create({
    headers: {
        'Client-ID': 'sgq8388k4sq06a5ex0s5szj3fevsd6',
        "Authorization": "Bearer c0dx1bimhojcx6jtwpzpe61y7u9ja3"
    }
})

/*
  'Client-ID': 'sgq8388k4sq06a5ex0s5szj3fevsd6'
  REDIRECT = 'http://127.0.0.1/'
  LIEN AUTH = https://id.twitch.tv/oauth2/authorize?client_id=sgq8388k4sq06a5ex0s5szj3fevsd6&redirect_uri=http://127.0.0.1/&response_type=token
*/

export default api
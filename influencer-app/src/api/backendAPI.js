import axios from 'axios'

// const token = JSON.parse(localStorage.getItem(token))
export default axios.create({
    baseURL: 'https://new-influencer-app.herokuapp.com/',


})
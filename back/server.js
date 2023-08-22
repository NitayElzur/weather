const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

app.get('/:query', async (req, res) => {
    try {
        const {query} = req.params;
        const data = await fetch(`http://api.weatherapi.com/v1/current.json?key=0dcc41d1094840c89be143524232008&q=${query}`).then(data => data.json())
        if (data.error) return res.status(400).send(data.error.message)
        const trimmed = {
            name: data.location.name,
            country: data.location.country,
            temp: data.current.temp_c,
            precipitation: data.current.precip_mm,
            humidity: data.current.humidity,
            wind: data.current.wind_kph
        }
        res.status(200).send(trimmed)
    }
    catch (err) {
        res.send(err.message)
    }
})

app.get('/', (req, res) => {
    res.status(400).send('No query was provided.')
})

app.listen(3000, () => {
    console.log('Server is running');
})
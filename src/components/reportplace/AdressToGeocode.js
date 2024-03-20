import axios from "axios";

const searchImages = async (street, city, state, postalcode, country) => {
    const response = await axios.get('https://geocode.maps.co/search?', {
        params: {
            street: street,
            city: city,
            state: state,
            postalcode: postalcode,
            country: country,
            api_key: "65f7ee2c4a612908541908nqm3d62d3"
        }
    });

    return [response.lat, response.lon];
};

export default searchImages;
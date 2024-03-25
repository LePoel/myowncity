import "./style.css";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {Icon} from "leaflet";
import PlaceReviewShow from "../placereviewshow/PlaceReviewShow";

// create custom icon
const customIcon = new Icon({
    // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconUrl: require("./images/icon.png"),
    iconSize: [38, 38] // size of the icon
});

function Map({placeReviews, imageUrls}) {
    return (
        <MapContainer center={[51.2277, 6.7735]} zoom={13}>
            <TileLayer
                attribution="Google Maps"
                url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
                maxZoom={20}
                subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />

            {/* Mapping through the markers */}
            {placeReviews.map((placeReview) => (
                <Marker position={[placeReview.latitude, placeReview.longitude]} icon={customIcon}>
                    <Popup>
                        <PlaceReviewShow
                            city={placeReview.city}
                            postalcode={placeReview.postalcode}
                            street={placeReview.street}
                            reviews={placeReview.reviews}
                            ratings={placeReview.ratings}
                            images={placeReview.imageRefs}/>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default Map;
import { useState } from "react";
import axios from "axios";
import { storage, db } from "../../config/firebase";
import {
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";
import {
    collection,
    addDoc,
    query,
    where,
    getDocs
} from "firebase/firestore";
import umlauteReplacer from "./UmlauteReplacer";

function ReportPlace() {
    //Storage and Database References
    const placeReviewCollectionRef = collection(db, "placereview");

    //New PlaceReview states
    const [newStreet, setNewStreet] = useState("");
    const [newPostalcode, setnewPostalcode] = useState(0);
    const [newCountry, setNewCountry] = useState("");
    const [newCity, setNewCity] = useState("");
    const [newState, setNewState] = useState("");
    const [newComment, setNewComment] = useState("");
    const [newRating, setNewRating] = useState(0);

    //New Image states
    const [imageUpload, setImageUpload] = useState(null);

    //Submission states
    const [submissionMessage, setSubmissionMessage] = useState("");

    const onSubmitPlaceReview = async () => {
        let latitude = 0.0;
        let longitude = 0.0;
        let newImageUrl = "";
        try {
            const response = await axios.get('https://geocode.maps.co/search?', {
                params: {
                    street: newStreet,
                    city: newCity,
                    state: newState,
                    postalcode: newPostalcode,
                    country: newCountry,
                    api_key: "65f7ee2c4a612908541908nqm3d62d3"
                }
            });

            longitude = Number(response.data[0].lon);
            latitude = Number(response.data[0].lat);
        } catch (err) {
            console.error("Gibt nen Fehler mit latitude, longitude" + err);
        }

        if (imageUpload != null) {
            try {
                const imageRef = ref(storage, `placeImages/${imageUpload.name + v4()}`);
                const snapshot = await uploadBytes(imageRef, imageUpload);
                newImageUrl = await getDownloadURL(snapshot.ref);
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }

        // Check if a place review with the same address already exists
        const placeQuery = query(placeReviewCollectionRef, where("street", "==", newStreet), where("postalcode", "==", newPostalcode), where("city", "==", newCity), where("state", "==", newState), where("country", "==", newCountry));
        const querySnapshot = await getDocs(placeQuery);


        if (!querySnapshot.empty) {
            // Place review already exists, update existing place review
            const existingPlaceReviewID = querySnapshot.docs[0].id;

            //Update Reviews
            if (newComment != null) {
                const reviewCollectionRef = collection(db, `placereview/${existingPlaceReviewID}/reviews`);
                await addDoc(reviewCollectionRef, { comment: newComment });
            }

            //Add the rating
            if (newRating != null) {
                const ratingCollectionRef = collection(db, `placereview/${existingPlaceReviewID}/rating`);
                await addDoc(ratingCollectionRef, { stars: newRating });
            }

            //Add the Image
            if (newImageUrl !== "") {
                const imagesCollectionRef = collection(db, `placereview/${existingPlaceReviewID}/imageRefs`);
                await addDoc(imagesCollectionRef, { imageUrl: newImageUrl });
            }
        } else {
            // Place review doesn't exist, create new place review
            const newPlaceReviewRef = await addDoc(placeReviewCollectionRef, {
                street: newStreet,
                city: newCity,
                country: newCountry,
                state: newState,
                postalcode: newPostalcode,
                longitude: longitude,
                latitude: latitude
            });

            //Add the comment
            const reviewCollectionRef = collection(newPlaceReviewRef, "reviews");
            await addDoc(reviewCollectionRef, { comment: newComment });

            //Add the rating
            const ratingCollectionRef = collection(newPlaceReviewRef, "rating");
            await addDoc(ratingCollectionRef, { stars: newRating });

            //Add the Image
            if (newImageUrl !== "") {
                const imagesCollectionRef = collection(newPlaceReviewRef, 'imageRefs');
                await addDoc(imagesCollectionRef, { imageUrl: newImageUrl });
            }
        }

        setSubmissionMessage("Review submitted successfully!");
    }
        ;

    return (
        <div className="p-4">
            <div className="row">
                <h1><span className="text-primary">Report</span> a place</h1>
                <p id="instruction">Came across a place you want to report? Please give us some informations about about the location and your experience
                    to help our community explore the city.</p>
            </div>
            <h4 className="text-secondary mt-4 mb-3">About the location</h4>
            <div className="row">
                <div className="col-12">
                    <label for="street" className="form-label">Street</label>
                    <input
                        placeholder="e.g. Musterstraße 1a" id="street" className="form-control"
                        onChange={(e) => setNewStreet(umlauteReplacer(e.target.value.toLowerCase()))}
                    />
                </div>
                <div className="col-sm-6">
                    <label for="postalcode" className="form-label">Postalcode</label>
                    <input
                        placeholder="e.g. 40215" className="form-control"
                        id="postalcode"
                        type="number"
                        onChange={(e) => setnewPostalcode(Number(e.target.value))}
                    />
                </div>
                <div className="col-sm-6">
                    <label for="city" className="form-label">City</label>
                    <input
                        placeholder="e.g. Düsseldorf" id="city" className="form-control"
                        onChange={(e) => setNewCity(umlauteReplacer(e.target.value.toLowerCase()))}
                    />
                </div>

                <div className="col-sm-6">
                    <label for="state" className="form-label">State</label>
                    <input
                        placeholder="e.g. Nordrhein-Westfalen" id="state" className="form-control"
                        onChange={(e) => setNewState(e.target.value.toLowerCase())}
                    />
                </div>
                <div className="col-sm-6">
                    <label for="country" className="form-label">Country</label>
                    <input
                        placeholder="e.g. Deutschland" id="country" className="form-control"
                        onChange={(e) => setNewCountry(e.target.value.toLowerCase())}
                    />
                </div>

                <h4 className="text-secondary mt-4 mb-3">Your Review</h4>
                <div className="form-group mb-3">
                    <textarea onChange={(e) => setNewComment(e.target.value.toLowerCase())}
                        className="form-control" id="textarea" rows="3" placeholder="Tell us some more details about the place
                        you want to review"></textarea>
                </div>
                <div class="form-group mb-2">
                    <p>Overall, how would you rate the place?</p>
                    <input
                        placeholder="-"
                        type="number"
                        min="0" max="5"
                        onChange={(e) => setNewRating(Number(e.target.value))}
                    />
                </div>
                <h4 className="text-secondary mt-4 mb-3">Upload a picture</h4>
                <div class=" form-group mb-2">
                    <input
                        className="form-control form-control-sm" id="formFileSm" type="file"
                        onChange={(event) => {
                            setImageUpload(event.target.files[0]);
                        }}
                    />
                </div>

                <div className="d-grid mt-5 mb-5">
                    <button className="btn btn-primary btn-lg rounded-5" onClick={onSubmitPlaceReview}> Submit Review</button>
                    {submissionMessage && <p>{submissionMessage}</p>}
                </div>

            </div>
        </div>
    );
}

export default ReportPlace;
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
            <input
                placeholder="Street"
                onChange={(e) => setNewStreet(umlauteReplacer(e.target.value.toLowerCase()))}
            />
            <input
                placeholder="Postalcode"
                type="number"
                onChange={(e) => setnewPostalcode(Number(e.target.value))}
            />
            <input
                placeholder="City"
                onChange={(e) => setNewCity(umlauteReplacer(e.target.value.toLowerCase()))}
            />
            <input
                placeholder="State"
                onChange={(e) => setNewState(e.target.value.toLowerCase())}
            />
            <input
                placeholder="Country"
                onChange={(e) => setNewCountry(e.target.value.toLowerCase())}
            />
            <input
                placeholder="Comment"
                onChange={(e) => setNewComment(e.target.value.toLowerCase())}
            />
            <input
                placeholder="Rating"
                type="number"
                min="0" max="5"
                onChange={(e) => setNewRating(Number(e.target.value))}
            />
            <input
                type="file"
                onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                }}
            />
            <button onClick={onSubmitPlaceReview}> Submit Place Review</button>
            {submissionMessage && <p>{submissionMessage}</p>}
        </div>
    );
}

export default ReportPlace;
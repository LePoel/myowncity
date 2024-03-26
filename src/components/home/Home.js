import Map from "../map/Map";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { getDocs, collection, query } from "firebase/firestore"
import PlaceReviewShow from "../placereviewshow/PlaceReviewShow";
function Home() {
    const [placeReviews, setPlaceReviews] = useState([]);

    const placeReviewsRef = collection(db, "placereview");

    const getPlaceReviews = async () => {
        try {
            const data = await getDocs(placeReviewsRef);
            const placeReviewData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));

            //Fetch reviews, ratings and pictures for each place
            const placeReviewWithRatingsAndReviewsAndPictures = await Promise.all(
                placeReviewData.map(async placereview => {
                    // Fetch ratings for each place
                    const ratingsCollection = await getDocs(
                        query(
                            collection(db, 'placereview', placereview.id, 'rating')
                        )
                    );
                    const ratingsData = ratingsCollection.docs.map(doc => doc.data());

                    // Fetch reviews for each place
                    const reviewCollection = await getDocs(
                        query(
                            collection(db, 'placereview', placereview.id, 'reviews')
                        )
                    );
                    const reviewData = reviewCollection.docs.map(doc => doc.data());

                    // Fetch images for the place review from the 'imageRefs' subcollection
                    const imagesCollection = await getDocs(
                        collection(db, 'placereview', placereview.id, 'imageRefs')
                    );
                    const imagesData = imagesCollection.docs.map(doc => doc.data());


                    return { ...placereview, ratings: ratingsData, reviews: reviewData, imageRefs: imagesData };
                }));
            setPlaceReviews(placeReviewWithRatingsAndReviewsAndPictures);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getPlaceReviews();
    }, []);



    const renderedPlaceReviews = placeReviews.map((placeReview) => {
        return <PlaceReviewShow
            city={placeReview.city}
            postalcode={placeReview.postalcode}
            street={placeReview.street}
            reviews={placeReview.reviews}
            ratings={placeReview.ratings}
            images={placeReview.imageRefs} />
    })

    return (
        <div className='home container-fluid p-4'>
            <div className="row">
                <div className="col-md-4">
                    <div className="row">
                        <div className="col-xs-12 text-center align-content-center text-primary fs-5 mt-1 mt-md-5 mb-3 mb-md-5" id="einleitung">
                            <p className="m-0">Navigate with <span className="fw-bold">care</span>, </p>
                            <p className="m-0">live with <span className="fw-bold">confidence</span>!</p>
                        </div>
                        <div className="col-xs-12 text-center" id="erläuterung">
                            <p id="erklärung">MyCity operates an interactive map that shows places in your neighborhood that have been rated by our community.</p>
                            <p className="fw-semibold">Came across a place you want to tell our community about?</p>
                        </div>
                        <div className="col text-center mb-3">
                            <a className="btn btn-primary btn-lg rounded-5" href="/src/pages/reportPlace/reportPlace.html" role="button">Report a place</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <Map placeReviews={placeReviews} /> {renderedPlaceReviews}
                </div>
            </div>
        </div>
    );
};

export default Home;
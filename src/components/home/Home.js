import Map from "../map/Map";
import {db} from "../../config/firebase";
import {useEffect, useState} from "react";
import {getDocs, collection, query } from "firebase/firestore"
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


                    return { ...placereview, ratings: ratingsData, reviews: reviewData, imageRefs: imagesData};
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
            images={placeReview.imageRefs}/>
    })

    return (
        <div className='home'>
            <Map placeReviews={placeReviews}/>
            {renderedPlaceReviews}
        </div>
    );
};

export default Home;
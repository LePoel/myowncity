import Map from "../map/Map";
import { db } from "../../config/firebase";
import React, { useEffect, useState } from "react";
import { getDocs, collection, query } from "firebase/firestore"
import PlaceReviewShow from "../placereviewshow/PlaceReviewShow";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
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

    const chunks = placeReviews.reduce((acc, _, index, array) => {
        if (index % 3 === 0) {
            acc.push(array.slice(index, index + 3));
        }
        return acc;
    }, []);

    return (
        <div className="home container-fluid m-0 p-0">
            <div className="row m-3 m-md-5 pt-3 pt-md-5">
                <div className="col-md-5 mb-4 mt-md-4 p-3">
                    <div className="row">
                        <div className="col-xs-12 mb-md-3 text-center align-content-center text-primary fs-5 " id="einleitung">
                            <p className="m-0">Navigate with <span className="fw-bold">care</span>, </p>
                            <p className="m-0">live with <span className="fw-bold">confidence</span>!</p>
                        </div>
                        <div className="col-xs-12 text-center p-3" id="erläuterung">
                            <p id="erklärung">MyCity operates an interactive map that shows places in your neighborhood that have been rated by our community.</p>
                            <p className="fw-semibold">Came across a place you want to tell our community about?</p>
                        </div>
                        <div className="col text-center pt-md-3">
                            <Link to="/reportplace" className="btn btn-primary btn-lg rounded-5" role="button">Report a Place</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-7 m-0 p-0">
                    <div className="bg-light rounded-3 p-3">
                        <Map placeReviews={placeReviews} />
                    </div>
                </div>
            </div>
            <div className="row m-3 m-md-5">
                <div className="col bg-light rounded-3 mt-3 mt-md-0 mb-3 p-3">
                    <h4 className="fw-medium">Newest Community Reviews</h4>
                    <Carousel indicators={false}>
                        {chunks.map((chunk, index) => (
                            <Carousel.Item key={index}>
                                <div className="d-flex">
                                    {chunk.map((placeReview, innerIndex) => (
                                        <PlaceReviewShow
                                            key={innerIndex}
                                            city={placeReview.city}
                                            postalcode={placeReview.postalcode}
                                            street={placeReview.street}
                                            reviews={placeReview.reviews}
                                            ratings={placeReview.ratings}
                                            images={placeReview.imageRefs}
                                        />
                                    ))}
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>

            </div>
        </div>
    );
}

export default Home;
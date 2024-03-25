function PlaceReviewShow({city, postalcode, street, reviews, ratings, images}) {
    return (
        <div>
            <h2>Address: {street}, {postalcode} {city}</h2>
            <h2>Ratings:</h2>
            <ul>
                {ratings.map((rating, index) => (
                    <li key={index}>{rating.stars}</li>
                ))}
            </ul>
            <h2>Reviews:</h2>
            <ul>
                {reviews.map((review, index) => (
                    <li key={index}>{review.comment}</li>
                ))}
            </ul>
            <h2>Pictures:</h2>
            <ul>
                {images.map((image, index) => (
                    <img src={image.imageUrl} alt="Place picture" key={index}/>
                ))}
            </ul>
        </div>
    );
}

export default PlaceReviewShow;
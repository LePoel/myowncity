function PlaceReviewShow({review, rating, imageUrls}) {
    return (
        <div>
            <p>Rating ist: {rating} Sterne</p>
            <p>{review}</p>
            <img src={imageUrls} alt="images"/>
        </div>
    );
}

export default PlaceReviewShow;
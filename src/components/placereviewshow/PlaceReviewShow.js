import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap-icons/font/bootstrap-icons.css';
import defaultImageUrl from './images/defaultImage.png';

function StarRating({ rating }) {
    const numStars = 5;
    const fullStars = Math.floor(rating);
    const halfStars = Math.ceil(rating - fullStars);
    const emptyStars = numStars - fullStars - halfStars;

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
        stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
    }
    if (halfStars === 1) {
        stars.push(<i key={fullStars} className="bi bi-star-half text-warning"></i>);
    }
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<i key={fullStars + halfStars + i} className="bi bi-star text-warning"></i>);
    }

    return <div>{stars}</div>;
}


function PlaceReviewShow({ city, postalcode, street, reviews, ratings, images, map = false }) {
    const totalStars = ratings.reduce((acc, curr) => acc + curr.stars, 0);
    const averageRating = totalStars / ratings.length;
    return (
        <Card border={map ? "0" : "grey"} className={map ? "m-2 border-0" : "m-2"}>
            {images.length > 0 ? (
                <Carousel style={{ width: "40%" }}>
                    {images.map((image, index) => (
                        <Carousel.Item key={index} >
                            <Card.Img variant="top" className="img-responsive"
                                src={image.imageUrl}
                                alt={"Picture of a place"}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            ) : (
                <Card.Img
                    src={defaultImageUrl}
                    alt={"Default Picture"}
                    className="img-responsive"
                    style={{ width: "40%" }}
                />
            )}
            <Card.Body>
                <Card.Title
                    className="text-secondary fs-6">{street.charAt(0).toUpperCase() + street.slice(1)}</Card.Title>
                <Card.Text>
                    <h5>Average Rating </h5>
                    <div className="mb-3"><StarRating rating={averageRating} /></div>
                    <h5>Review comments</h5>
                    <div>
                        {reviews.map((review, index) => (
                            <div key={index} className="shadow-sm bg-light mb-3">
                                <div className="card-body p-2">
                                    <p className="m-0">"{review.comment}"</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default PlaceReviewShow;
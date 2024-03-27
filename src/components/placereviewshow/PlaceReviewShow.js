import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap-icons/font/bootstrap-icons.css';

function StarRating({rating}) {
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


function PlaceReviewShow({city, postalcode, street, reviews, ratings, images}) {
    const totalStars = ratings.reduce((acc, curr) => acc + curr.stars, 0);
    const averageRating = totalStars / ratings.length;
    return (
        <Card style={{width: '18rem'}}>
            <Carousel>
                {images.map((image, index) => (
                    <Carousel.Item key={index}>
                        <Card.Img variant="top"
                                  src={image.imageUrl}
                                  alt={"Picture of a place"}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
            <Card.Body>
                <Card.Title>{street.charAt(0).toUpperCase() + street.slice(1)}</Card.Title>
                <Card.Text>
                    <h2>Average Rating: <StarRating rating={averageRating}/></h2>
                    <h2>Reviews:</h2>
                    {reviews.map((review, index) => (
                        <div key={index} className="card shadow-sm mb-4">
                            <div className="card-body">
                                <p className="card-text">{review.comment}</p>
                            </div>
                        </div>
                    ))}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default PlaceReviewShow;
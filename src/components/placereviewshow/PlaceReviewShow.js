import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';


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
                    <h2>Average Rating: {averageRating}</h2>
                    <h2>Reviews:</h2>
                    <ul>
                        {reviews.map((review, index) => (
                            <li key={index}>{review.comment}</li>
                        ))}
                    </ul>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default PlaceReviewShow;
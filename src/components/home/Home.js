import Map from "../map/Map";
import {db, storage} from "../../config/firebase";
import {useEffect, useState} from "react";
import {getDocs, collection} from "firebase/firestore"
import PlaceReviewShow from "../placereviewshow/PlaceReviewShow";
import { listAll, ref, getDownloadURL } from "firebase/storage";
function Home() {
    const [placeReviews, setPlaceReviews] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);

    const placeReviewsRef = collection(db, "placereview")

    const imagesRef = ref(storage, "placeImages/")

    const getPlaceReviews = async () => {
        try {
            const data = await getDocs(placeReviewsRef);
            const filterdData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));
            setPlaceReviews(filterdData);
        } catch (err) {
            console.error(err);
        }
    };

    const getAllImageUrls = () => {
        listAll(imagesRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                  setImageUrls((prev) => [...prev, url])
                })
            })
        })
    };

    useEffect(() => {
        getPlaceReviews();
        getAllImageUrls();
    }, []);



    const renderedPlaceReviews = placeReviews.map((placeReview) => {
        return <PlaceReviewShow review={placeReview.review} rating={placeReview.rating} imageUrls={imageUrls}/>
    })

    return (
        <div className='home'>
            <Map placeReviews={placeReviews} imageUrls={imageUrls}/>
            <div>{renderedPlaceReviews}</div>
        </div>
    );
};

export default Home;
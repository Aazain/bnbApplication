import { Card, Button } from "react-bootstrap";
import Link from "next/link";
import useSWR from "swr";

export default function ArtworkCard({ objectID }){
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)

    if(error){
        return <Error statusCode={404}/>
    }

    if (!data){
        return null;
    }
    else{
        const image = data.primaryImageSmall || "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
        const title = data.title || "N/A"
        const date = data.objectDate || "N/A"
        const classification = data.classification || "N/A"
        const medium = data.medium || "N/A"
        return(
            <>
                    <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={image} />
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>
                            Date: {date}
                            <br/>
                            Classification: {classification}
                            <br/>
                            Medium: {medium}
                        </Card.Text>
                        <Link href={`/artwork/${objectID}`} passHref>
                            <Button variant="btn btn-outline-dark">ID: {objectID}</Button>
                        </Link>
                    </Card.Body>
                    </Card>
            </>
        )
    }


}
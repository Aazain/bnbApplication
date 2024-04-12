import { Card, Button } from "react-bootstrap";
import Link from "next/link";
import useSWR from "swr";
import { useState } from "react";
import { useAtom } from "jotai";
import { favoritesAtom } from "../../store";
import { addToFavourties, removeFromFavourties } from "../../lib/userData";
import { useEffect } from "react";

export default function ArtworkCard({ objectID }){
    const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null);

    const [favoritesList, setFavouritesList] = useAtom(favoritesAtom)
    const [showAdded, setShowAdded] = useState(false);

    useEffect(()=>{
        setShowAdded(favoritesList?.includes(objectID))
    }, [favoritesList])

    async function favoritesClicked(){
        console.log("1")
        if (showAdded) {
            setFavouritesList(await removeFromFavourties(objectID))
            console.log("2")
        }
        else{
            setFavouritesList(await addToFavourties(objectID))     
            console.log("3")       
        }
    }

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
        const artist = data.artistDisplayName || "N/A"
        const creditLine = data.creditLine || "N/A"
        const dimensions = data.dimensions || "N/A"
        const artistURL = data.artistWikidata_URL || "N/A"
        return(
            <>
            <Card>
                {image != "https://via.placeholder.com/375x375.png?text=[+Not+Available+]" &&(
                    <Card.Img variant="top" src={image} />                    
                )}
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    Date: {date}
                    <br/>
                    Classification: {classification}
                    <br/>
                    Medium: {medium}
                    <br/>
                    <br/>
                    Artist: {artist}( 
                    <a href={artistURL} target="_blank" rel="noreferrer" >wiki</a>
                    )
                    <br/>
                    Credit Line: {creditLine}
                    <br/>
                    Dimensions: {dimensions}
                    <br/>
                    <br/>
                    <Button
                        variant={showAdded ? "primary" : "outline-primary"}
                        onClick={favoritesClicked}
                    >
                        {showAdded ? "+ Favorite (added)" : "+ Favorite"}
                    </Button>
                </Card.Text>
            </Card.Body>
            </Card>
            </>
        )
    }
}
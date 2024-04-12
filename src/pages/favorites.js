import { Card, Col, Row } from "react-bootstrap";
import { favoritesAtom } from "../../store";
import { useAtom } from "jotai";
import ArtworkCard from "../components/ArtworkCard";

export default function Favorites(){
    const [favoritesList] = useAtom(favoritesAtom);
    if(!favoritesList) return null;

    return (
        <>
        {favoritesList.length > 0 ? (
            <Row className="gy-4">
                {favoritesList.map((currentObjectID) => (
                    <Col lg={3} key={currentObjectID}>
                    <ArtworkCard objectID={currentObjectID} />
                    </Col>
                ))}
            </Row>
        ) : (
            <Card>
              <Card.Body>
                <h5>Nothing Here</h5>
                Try searching for something else.
              </Card.Body>
            </Card>
        )}
        </>
      );
}


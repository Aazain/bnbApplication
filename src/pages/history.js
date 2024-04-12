import { useAtom } from "jotai";
import { searchHistoryAtom } from "../../store";
import { useRouter } from "next/router";
import { Card, Button } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { removeFromHistory } from "../../lib/userData";
import styles from '../styles/Home.module.css';

export default function history(){
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();
    if(!searchHistory) return null;

    let parsedHistory = [];

    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    const historyClicked = (index) => {
        router.push(`/artwork?title=true&q=${searchHistory[index]}`);
    }

    const removeHistoryClicked = async (e, index) => {
        e.stopPropagation(); // stop the event from trigging other events
        setSearchHistory(await removeFromHistory(searchHistory[index]))
    }

    return(
        <>
            <Card>
                <Card.Body>
                    {parsedHistory.length != 0 ? (
                        <ListGroup>
                            {parsedHistory.map((historyItem, index) => (
                                <ListGroup.Item onClick={()=>{historyClicked(index)}} className={styles.historyListItem}>
                                    {Object.keys(historyItem).map(key => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))}
                                    <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (<p>Nothing Here.</p>)}
                </Card.Body>
            </Card>
        </>
    );
}
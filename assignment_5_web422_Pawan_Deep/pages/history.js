import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store.js';
import { useRouter } from 'next/router';
import { ListGroup, Button } from 'react-bootstrap';
import styles from '../styles/History.module.css';
import {  Card } from "react-bootstrap"

export default function History() {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    let parsedHistory = [];
    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });
    const router = useRouter();
    function historyClicked(e,index){
        router.push(`/artwork?${searchHistory[index]}`);
    }
    function removeHistoryClicked(e,index){
        e.stopPropagation(); // stop the event from trigging other events
        setSearchHistory(current => {
            let x = [...current];
            x.splice(index, 1)
            return x;
        });
    }
    if (parsedHistory.length==0) {
        return(
            <Card>
                <Card.Body><h4>Nothing Here</h4> 
                Try searching for some artwork
                </Card.Body>
            </Card>
        )
    }
    else if(parsedHistory.length>0){
        return (
            <ListGroup>
               {parsedHistory.map((historyItem, index) => (
                <ListGroup.Item className={styles.historyListItem} key={historyItem} onClick={(e)=>historyClicked(e,index)}>{Object.keys(historyItem).map(key => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))}
                <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
                </ListGroup.Item>
               ))}
            </ListGroup>
          );
    }
}
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useState } from 'react';
import { useRouter } from "next/router";
import { authenticateUser } from "../../lib/authenticate";
import { favoritesAtom, searchHistoryAtom } from "../../store"
import { getFavourites, getHistory } from "../../lib/userData";
import { useAtom } from 'jotai';

export default function Login(props){

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState('');
  const [favouritesList, setFavouritesList] = useAtom(favoritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const router = useRouter()
  
  async function updateAtoms(){
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await authenticateUser(user, password)
    if(res == true){
      await updateAtoms();
      router.push('/favorites')
    }
    else{
      setWarning(res.message);
    }
  }
  return (
    <>
      <Card bg="light">
        <Card.Body><h2>Login</h2>Enter your login information below:</Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User:</Form.Label><Form.Control type="text" value={user} id="userName" name="userName" onChange={e => setUser(e.target.value)} />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label><Form.Control type="password" value={password} id="password" name="password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        { warning && ( <><br /><Alert variant="danger">{warning}</Alert></> )}
        <br />
        <Button variant="primary" className="pull-right" type="submit">Login</Button>
      </Form>
    </>
  );
}
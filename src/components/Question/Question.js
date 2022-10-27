import React, {useState, useEffect} from 'react'
import { useStore } from '../../context/StorageContext'
import { useAuth } from '../../context/AuthContext';
import './styles.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { addDoc, getDocs, collection, query, where } from "firebase/firestore"; 
import { db } from '../../firebase';
import ReactMarkdown from 'react-markdown';
import {CircularProgress} from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function Question() {
    const {curr, setTag} = useStore();
    const {currentUser} = useAuth();
    const [body,setBody] = useState();
    const [answers,setAnswers] = useState([]);
    const [loader,setLoader] = useState(false);
    const navigate = useNavigate();

    function username(u){
      return (u).slice(0,u.indexOf('@'));
    }

    useEffect(() => {
      getAnswers();
      console.log(answers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loader])
    

    async function getAnswers(){
      const q = query(collection(db, "answers"), where("qid", "==", curr.qid));
      const querySnapshot = await getDocs(q);
      let newAnswers = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        newAnswers.push(doc.data());
        setAnswers(newAnswers);
      });
    }


    async function createAnswer(){
      if(body === "")
      {
        alert("Answer body cannot be empty");
        return;
      }
      const d = new Date();
      try {
          setLoader(true);
          const docRef = await addDoc(collection(db, "answers"), {              
          body : body,
          votes : 0,
          uid : currentUser.uid,
          user : currentUser.email,
          aid : currentUser.uid+Date.now(d),
          qid : curr.qid,
          time : Date.now(d)
          });
          console.log("Document written with ID: ", docRef.id);
          setLoader(false);
        } catch (e) {
          console.error("Error adding document: ", e);
  }
  }
  console.log(curr);
  return (
    <div className='body-h'>
    <div className='navbar-h'>
    <div onClick={()=>navigate('/')} className="logo">CodePasta 🍝</div>
    </div>
    <div className='box-q margin-top'>
    <div className='title'>
      {curr.title}
    </div>
    <div className='box-q'>
    <ReactMarkdown children={curr.body}/>
    </div>
    <div className='tags-container'>
    {curr.tags.map((i)=><span className='tag' key={i} onClick={()=>{setTag(i);
        navigate('/tag')}}>{i}</span>)}
    </div>
    </div>
    {`Posted by user: ${username(curr.user)}`}
    <br></br>
    <div className='ans-list'>
    <>Answers</>
      {answers.map((ans)=>{
        return(
          <div key={ans.aid} className='box-q'>
            <div>
            <ReactMarkdown children={ans.body}/>
            </div>
            <div className='by'>- {username(ans.user)}</div>
          </div>
        )
      })}
    </div>
    {curr.uid !== currentUser.uid &&
    <div className='box-q ans-input'>
    <TextField label="Answer" variant='outlined' color='warning' multiline minRows={4} onChange={(e)=>setBody(e.target.value)}/>
    <Button variant='contained' color='secondary' onClick={()=>createAnswer()}>
    {!loader ? "Submit" : <CircularProgress color="info" size="sm" />}
    </Button>
    </div>
    }
    </div>
  )
}

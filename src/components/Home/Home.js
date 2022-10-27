import React, {useState, useEffect} from 'react'
import { useAuth } from '../../context/AuthContext'
import { useStore } from '../../context/StorageContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import { CircularProgress } from '@mui/material';


import './styles.css';

export default function LoggedIn() {
    //const {logout} = useAuth();
    const {createQuestion, getQuestions, questions, setCurr, loader} = useStore();
    const {currentUser, logout} = useAuth();
    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');
    const [tags,setTags] = useState([]);
    const [tagValue,setTagValue] = useState('');
    const [preview,setPreview] =  useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      getQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loader])
    


    function del(item){
      setTags(tags.filter((i)=>i!==item));
    }

    function HandleSubmit(){
      if(title !== '' && body !== '')
      {
        createQuestion(title,body,tags,currentUser);
        setTitle('');
        setBody('');
        setTags([]);
        setTagValue('');
        setPreview(false);
      }
    }

  return (
    <div className='body-h'>
    <div className='navbar-h'>
    <div className='logo'>CodePasta 🍝</div>
    <div className='nav-flex'>
    <div onClick={()=>logout()}>Logout</div>
    <div onClick={()=>navigate('/my')}>My Questions</div>
    </div>
    </div>
    <div className='feed'>
    {!preview?     
    <div className='box-h create-question'>
    <TextField variant='outlined' color='warning' label="Title" size='small' value={title} onChange={(e)=>setTitle(e.target.value)}/>
    <TextField variant='outlined' color='warning' label="Description" size='small' multiline maxRows={4} minRows={2} value={body} onChange={(e)=>setBody(e.target.value)} />
    <TextField variant='outlined' color='warning' label="Tags" size='small' value={tagValue}
      helperText="Press enter key to add tag"
      onKeyDown ={ (e) =>{
            if(e.key === 'Enter' && tagValue !== '')
            {
                setTags([...tags,tagValue]);
                setTagValue('');
            }
        }}
        onChange={(e)=>{
            setTagValue(e.target.value);
        }}
    />
    <div className='tag-container'>
      {tags.map((i)=><span className='tag' onClick={()=>del(i)} key={i}>{i}</span>)}
    </div>
    <div className='flex-row'>
    <Button variant="contained" color="secondary" onClick={()=>setPreview(true)}>Preview</Button>
    <Button variant="contained" color="secondary" onClick={()=>HandleSubmit()}>
    {!loader? "Post" : <CircularProgress color="info" size="sm" />}
    </Button>
    </div>
    </div>
    :
    <div className='box-h create-question'>
    <div className='box-h'>{title}</div>
    <div className='width-check'>
    <ReactMarkdown children={body}/>
    </div>
    <div className='tag-container'>
      {tags.map((i)=><span className='tag' onClick={()=>del(i)} key={i}>{i}</span>)}
    </div>
    <div className='flex-row'>
    <Button variant="contained" color="secondary" onClick={()=>setPreview(false)}>Edit</Button>
    <Button variant="contained" color="secondary" onClick={()=>HandleSubmit()}>
    {!loader? "Post" : <CircularProgress color="info" size="sm" />}</Button>
    </div>
    </div>
    }
    </div>
    <div className='listview'>
    {questions.map((q)=>{
      return(
        <div className='box-h' key={q.qid} onClick={()=>{
          setCurr(q);
          navigate('/question');
        }}>
        <div className='heading'>{q.title}</div>
        <div className='tag-container'>
        {q.tags.map((i)=><span className='tag' key={i}>{i}</span>)}
        </div>
      </div>
      );
    })}
    </div>
    </div>
  )
}

import React, {useEffect} from 'react'
import { useAuth } from '../../context/AuthContext'
import { useStore } from '../../context/StorageContext';
import { useNavigate } from "react-router-dom";

export default function TaggedQuestions() {

    const {getQuestions, questions, setCurr, loader, tag, setTag} = useStore();
    const {logout} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      getQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loader])

  return (
    <div className='body-h'>
    <div className='navbar-h'>
    <div onClick={()=>navigate('/')} className='logo' >CodePasta 🍝</div>
    <div onClick={()=>logout()}>Logout</div>
    </div>
    <div className='feed'>
    </div>
    <div className='listview'>
    {questions.filter((q)=>q.tags.includes(tag)).map((q)=>{
      return(
        <div className='box-h' key={q.qid} >
        <div className='heading' onClick={()=>{
          setCurr(q);
          navigate('/question');
        }}>{q.title}</div>
        <div className='tag-container'>
        {q.tags.map((i)=><span className='tag' key={i} onClick={()=>{setTag(i);
        navigate('/tag')}}>{i}</span>)}
        </div>
      </div>
      );
    })}
    </div>
    </div>
  )
}


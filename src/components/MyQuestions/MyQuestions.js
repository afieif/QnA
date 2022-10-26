import React, {useEffect} from 'react'
import { useAuth } from '../../context/AuthContext'
import { useStore } from '../../context/StorageContext';
import { useNavigate } from "react-router-dom";

export default function MyQuestions() {

    const {getQuestions, questions, setCurr, loader} = useStore();
    const {currentUser, logout} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      getQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loader])

  return (
    <div className='body-h'>
    <div className='navbar-h'>
    <div onClick={()=>navigate('/')}>CodePasta 🍝</div>
    <div onClick={()=>logout()}>Logout</div>
    </div>
    <div className='feed'>
    </div>
    <div className='listview'>
    {questions.filter((q)=>q.uid === currentUser.uid).map((q)=>{
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

import React, { useContext , useState} from 'react';
import { collection, addDoc, getDocs, orderBy, query } from "firebase/firestore"; 
import { db } from '../firebase';


const StorageContext = React.createContext();

export function useStore(){
    return useContext(StorageContext)
}


export function StorageProvider({children}) {

    const [questions,setQuestions] = useState([]);
    const [curr,setCurr] = useState({});
    const [loader,setLoader] = useState(false);
    const [tag,setTag] = useState('git');

    async function createQuestion(title,body,tags,currentUser){
        const d = new Date();
        console.log(currentUser.uid,currentUser.email,d,title,body,tags);
        try {
            setLoader(true);
            const docRef = await addDoc(collection(db, "questions"), {              
            title : title,
            body : body,
            tags : tags,
            votes : 0,
            uid : currentUser.uid,
            user : currentUser.email,
            qid : currentUser.uid+Date.now(d),
            time : Date.now(d)
            });
            console.log("Document written with ID: ", docRef.id);
            setLoader(false);
          } catch (e) {
            console.error("Error adding document: ", e);
    }
    }

    async function getQuestions(){
        const q = query(collection(db, "questions"),orderBy("time", "desc"));
        const querySnapshot = await getDocs(q);
        let newQues = [];
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        newQues.push(doc.data());
        setQuestions(newQues);
        });
    }

    const value = {
        createQuestion,
        getQuestions,
        questions,
        setCurr,
        curr,
        loader,
        tag,
        setTag
    }

    return (
        <StorageContext.Provider value={value}>
          {children}
        </StorageContext.Provider>
        );
}
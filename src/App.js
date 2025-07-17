import axios from 'axios';
import './App.css';
import React, { useState } from 'react';



function App() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    // Here you would typically handle the question submission,
    // such as sending it to an API or processing it further.
    console.log( question );
    axios.post('https://gemini-app-pink.vercel.app/getResponse',{
      question: question
    }).then(res=>{
      console.log(res.data.response);
      // You can handle the response here, e.g., update state with the response
      setResponse(res.data.response);
      setQuestion(''); // Clear the question input after submission
    }).catch(err =>{
      console.error("Error fetching response:", err);
      // Handle error appropriately, e.g., show an error message to the user
    })
  }
  
  const speakHandler = () => {
    if (!response) {
      console.error("No response to speak");
      return;
    }
    const speech = new SpeechSynthesisUtterance(response);
    speech.lang = 'en-US'; // Set the language for the speech
    window.speechSynthesis.speak(speech);
  }

  return (
    <div className="App">
     <div className='box'>
       <div className="profile-pic">
        <img className='pic' src={require('../src/assets/vecteezy_impressive-distinguished-man-with-a-beard-wearing-a-casual_60417008.png')} alt="profile pic" />
       </div>
       <p className='label'>Question</p>
       <textarea value={question} onChange={(e)=>{setQuestion(e.target.value)}} />
       <button onClick={submitHandler} >Send</button>
     </div>
     <div className='box'>
               <div className="profile-pic">
        <img className='pic' src={require('../src/assets/vecteezy_technology-ai-artificial-intelligence-ship-in-brain-hi-tech_22587498.png')} alt="profile pic" />
       </div>
       <p className='label'>AI Response</p>
       <textarea value={response} />
       <button onClick={speakHandler}>Speak</button>
     </div>
    </div>
  );
}

export default App;

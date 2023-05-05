import {React, Fragment, useState} from "react";
import {MdExpandMore, MdExpandLess} from 'react-icons/md';
import './Quiz.css';

const questions = [
    {
    text: "1. What kind of action you prefer?",
      options: [
        { id: 0, name: 'q1', text: "Improvised", checked: true, value: 2},
        { id: 1, name: 'q1', text: "Well-Planed", checked: false, value: 0},
      ],
    },
    {
    text: "2. What kind of music you prefer?",
        options: [
      { id: 0, name: 'q2', text: "Blues", checked: true, value: 2 },
      { id: 1, name: 'q2', text: "Dance", checked: false, value: 0 },
    ],
    },
    {
    text: "3. Where you prefer listening to music?",
      options: [
        { id: 0, name: 'q3', text: "In completly smoked club at basement", checked: true, value: 2 },
        { id: 1, name: 'q3', text: "In Filharmony", checked: false, value: 0 },
      ],
    },
    {
    text: "4. What is more important for You in music?",
      options: [
        { id: 0, name: 'q4', text: "Invoked by music emotions", checked: true, value: 2 },
        { id: 1, name: 'q4', text: "Perfectly played every notes", checked: false, value: 0 },
      ],
    },
  ];

const Quiz = () => {

    const [expand, setExpand] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(true);
    // const [question, setQuestion] = useState(questions);
    const [answear, setAnswear] = useState({})

    // changin visibility of section
    const expandMoreHandler = () => {
        setExpand(false)
    };

    const expandLessHandler = () => {
        setExpand(true)
    };    

    const answearHandler = (event) => {
        // const checked = event.target.checked
        questions[currentQuestion].options.map(answear => {
            if(answear.value===2){
                setAnswear(prevAnswear => ({
                    ...prevAnswear,
                    [answear.name]: 2,
                }))
            }else{
                setAnswear(prevAnswear => ({
                    ...prevAnswear,
                    [answear.name]: 0,
                }))
            }
        })
    };

    const nextQuestionHandler = (event) => {
        event.preventDefault();
        if (currentQuestion + 1 < questions.length){
            setCurrentQuestion(currentQuestion + 1)
            // reset input radio in next question and without influence on questions key 'checked'
            const input = document.querySelectorAll("input[type='radio']");
            input.forEach((input) => {
                input.checked = false;
            })
            console.log(answear);
        } else {
            setShowScore(false);
            console.log(answear);

        };
    }

    return (
        <Fragment>
            {expand ? 
                <section id="quiz" className='container'>
                    <div className="container-tittle">    
                        <h2>Questions</h2>
                        <button className="expand-more-button" onClick={expandMoreHandler}>
                            <MdExpandMore />
                        </button>
                    </div>
                </ section>
            :
                <section id="quiz" className='container'>
                    <div className="container-title">    
                        <h2>Questions</h2>
                        <button className="expand-more-button" onClick={expandLessHandler}>
                            <MdExpandLess className="expand-more-button-component"/>
                        </button>
                    </div>
                    {showScore ?
                        <form className="form-container" >
                            <div className="question">
                                <h3 className="question-title">{questions[currentQuestion].text}</h3>
                                    {questions[currentQuestion].options.map(options => {
                                        return (
                                            <ul key={options.id}>
                                                <input 
                                                    className="question-input" 
                                                    name ={options.name} 
                                                    type="radio"
                                                    value = {options.value}
                                                    onClick={answearHandler}
                                                />
                                                <label 
                                                    className="question-label" 
                                                    key={options.id}>
                                                    {options.text}
                                                </label>
                                            </ul>
                                        )
                                    })}
                            </div>
                            <div className="question-button">
                                <button type="submit" onClick={nextQuestionHandler}>Next question please!</button>
                            </div>
                        </form>
                    :
                        <form className="form-container false" >
                            <div className="question">
                                <h3>Go to the music player section!</h3>
                            </div>
                        </form>
                    }
                </section>}
        </Fragment>
    )
}

export default Quiz;
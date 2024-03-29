import {React, Fragment, useState} from "react";
import './Result.css';

const Result = ({name, surname, date, gender, email, phone, country, job, questionQuizScore, audioQuizScore, showTask}) => {

  //  DISPLAY USESTATE
  const [expand, setExpand] = useState(true);
  const [displayName, setDisplayName] = useState(name);
  const [displaySurname, setDisplaySurname] = useState(surname);
  const [displayDate, setDisplayDate] = useState(date);
  const [displayGender, setDisplayGender] = useState(gender);
  const [displayEmail, setDisplayEmail] = useState(email);
  const [displayPhone, setDisplayPhone] = useState(phone);
  const [displayJob, setDisplayJob] = useState(job);
  const [displayCountry, setDisplayCountry] = useState(country);
  const [displayScore, setDisplayScore] = useState(0);
  //  RECORD SCORES - TODO in future
  // const [result, setResult] = useState([]);
  
  /* 
      changin visibility of section by click event
  */

  const onClickHandler = (e) => {
    e.preventDefault();
    setDisplayName(name);
    setDisplaySurname(surname);
    setDisplayDate(date);
    setDisplayGender(gender);
    setDisplayEmail(email);
    setDisplayPhone(phone);
    setDisplayJob(job);
    setDisplayCountry(country)
    setDisplayScore(Math.floor(((questionQuizScore + audioQuizScore)/14)*100));
    setExpand(false);
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight)
    }, 300)
  };

  const refreshPage = () => {
    window.scrollTo(0,0)
    setTimeout(() => {
      window.location.reload(true);
    }, 760)
    
  }

    return (
      <Fragment>
        {expand ? 
          <section id="result" className="container">
            <div className="result-container-title">    
                <h2>Result</h2>
            </div>
            <div className="button-container__result">
              {showTask ? '' : <p>{name}, if you have passed all three stages, click button below!</p>}
              <button type="submit" onClick={onClickHandler}>Show Result</button> 
            </div>
          </section>
        :
          <section id="result" className="container">
            <div className="result-container-title">    
                <h2>Result</h2>
            </div>
            <div className="data-container">
              {name === '' ? '' : <p className="data-name">Name: <span>{displayName}</span></p>}
              {surname === '' ? '' : <p className="data-surname">Surname: <span>{displaySurname}</span></p>}
              {date === '' ? '' : <p className="data-date">Birth Date: <span>{displayDate}</span></p>}
              {gender === '' ? '' : <p className="data-gender">Gender: <span>{displayGender}</span></p>}
              {email === '' ? '' : <p className="data-email">Email: <span>{displayEmail}</span></p>}
              {phone === '' ? '' : <p className="data-phone">Phone Number: <span>{displayPhone}</span></p>}
              {country === '' ? '' : <p className="data-country">Country: <span>{displayCountry}</span></p>}
              {job === '' ? '' : <p className="data-job">Job: <span>{displayJob}</span></p>}
              <p className="data-result">Your Score: <span>{displayScore}%</span></p>
            </div>
            <div className="button-container__result">
              <button className="data-button" type="submit" onClick={refreshPage}>Try again!</button>
            </div>
            
          </section>
        }
      </Fragment>
    );
};

export default Result;
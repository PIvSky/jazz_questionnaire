import {Fragment, React, useEffect, useState}from "react";
import {MdExpandMore, MdExpandLess} from 'react-icons/md';
import './UserData.css';

const UserData = ({onNameChange, onSurnameChange, onDateChange, selectedGender, onGenderChange, selectedJob, onJobChange}) => {

    const [expand, setExpand] = useState(false);
    const [job, setJob] = useState(true);
    const [musician, setMusician] = useState(true);
    const [avatar, setAvatar] = useState([])

    // passing datas in form
    const nameChangeHandler = (event) => {
        onNameChange(event.target.value);
    };

    const surnameChangeHandler = (event) => {
        onSurnameChange(event.target.value);
    };

    const dateChangeHandler = (event) => {
        onDateChange(event.target.value);
    };

    const genderChangeHandler = (event) => {
        onGenderChange(event.target.value);
    }

    const jobChangeHandler = (event) => {
        onJobChange(event.target.value)
    } 

    // const genderHandler = (event) => {
    //     onGenderChange(event.target.value)
    //     console.log(event.target.value)
    // }

    // changin visibility of section
    const expandMoreHandler = () => {
        setExpand(false)
    };

    const expandLessHandler = () => {
        setExpand(true)
    };

    // passing job - button action
    const MusicianHandler = (event) => {
        event.preventDefault();
        setMusician(false);
        onJobChange(event.target.value)
    }

    const NonMusicianHandler = (event) => {
        event.preventDefault();
        setJob(false);
    };

    // enter button handler
    const onButtonHandler = () => {
        window.scrollTo({
            top: window.scrollY + 350,
            behavior: 'smooth'
        })
    }

    // avatars fetching
    const avatarNames = ['Snuggles', 'Zoe', 'Mittens']
    const imageUrl = 'https://api.dicebear.com/7.x/bottts/svg?seed=';

    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                const avatarPromise = avatarNames.map(name => {
                    return fetch(`${imageUrl}${name}`)
                        .then(response => response.text())
                        .catch(err => console.log(err))
            })
                // we wait for completed all API fetching
                const avatarAll = await Promise.all(avatarPromise);
                setAvatar(avatarAll);
            } catch (error) {
                console.error('Error fetching avatars:', error);
            }

        }
        fetchAvatar()
    });

    // const handleAvatarClick = (event) => {
    //     // Handle the avatar click based on the index
    //     event.preventDefault()
    //     console.log('Clicked')
    //     setSelectedAvatar(false)
    //   };


  const handleAvatarClick = (event) => {
    event.preventDefault();
  };

    return (
        <Fragment>
            {expand ? 
                <section id="data" className='container'>
                    <div className="data-container-tittle">    
                        <h2>User Date</h2>
                        <button className="expand-more-button" onClick={expandMoreHandler}>
                            <MdExpandMore />
                        </button>
                    </div>
                </ section>
                :    
                <section id="data" className='container'>
                    <div className="data-container-tittle">    
                        <h2>User Data</h2>
                        <button className="expand-more-button" onClick={expandLessHandler}>
                            <MdExpandLess className="expand-more-button-component"/>
                        </button>
                    </div>
                    <div className="form-instruction">
                        <h3 className="form-instruction__item">Please, enter your data!</h3>
                    </div>
                    <form className="form">
                        <div className="form-row-one">
                            <div className="form-name">
                                <label>Name</label>
                                <input type="text" onChange={nameChangeHandler} />
                            </div>
                            <div className="form-surname">
                                <label>Surname</label>
                                <input type="text" onChange={surnameChangeHandler} />
                            </div>
                            <div className='form-date'>
                                <label>Birth Date</label>
                                <input type="date" min="1940-01-01" step="2023-05-22" onChange={dateChangeHandler}/>
                            </div>
                            <div className="form-gender">
                                <label>Gender</label>
                                <select className="form-gender__select" value={selectedGender} onChange={genderChangeHandler}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-avatar">
                                    <label>Choose your avatar!</label>
                                    <div className="form-avatar__items">
                                        {avatar.map((svg, index) => (
                                            <button 
                                                className='form-avatar__button' 
                                                onClick={handleAvatarClick} 
                                                key={index}
                                                // id={`avatar-${index + 1}`} 
                                            >
                                                <div 
                                                    className="form-avatar__img"
                                                    style={{backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`}}
                                                    alt={`Avatar ${index}`}
                                                >
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                            </div>
                        </div>
                        <div className="form-row-two">
                            <div className="form-job">
                                {musician ?
                                <Fragment>
                                {job ?
                                <Fragment>
                                    <label>Are you a musician?</label> 
                                    <div className="form-job__buttons">
                                        <button onClick={MusicianHandler} value='Musician'>Yes</button>
                                        <button onClick={NonMusicianHandler}>No</button>
                                    </div>
                                </Fragment>
                                :
                                <Fragment>
                                    <label>Job</label>
                                    <select className="form-job__selector" value={selectedJob} onChange={jobChangeHandler}>
                                        <option hidden>Select Your Job</option>
                                        <option value='Lawyer'>Lawyer</option>
                                        <option value='Athlete'>Athlete</option>
                                        <option value='Doctor'>Doctor</option>
                                        <option value='Own Buisness'>Own Buisness</option>
                                        <option value='Other'>Other</option>
                                    </select>
                                </Fragment>
                                }
                                </Fragment>
                                :
                                <Fragment>
                                    <p>Maybe you are poor, but althought happy!</p>
                                </Fragment>
                                }
                            </div>
                        </div>
                    </form> 
                    <div className="button-container__data">
                        <button onClick={onButtonHandler}>Enter Data!</button>
                    </div>
                </section>
                }
        </ Fragment>
    )
};

export default UserData;
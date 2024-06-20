import React, {useState} from 'react';
import {createAthlete, updateAthlete} from '../../services/requests';
import '../../styles/components/AthleteForm.css'; // Import the CSS file

const AthleteForm = ({athlete}) => {
    const [name, setName] = useState(athlete ? athlete.athlete.name : '');
    const [age, setAge] = useState(athlete ? athlete.athlete.age : '');
    const [weightCategory, setWeightCategory] = useState(athlete ? athlete.athlete.weightCategory : '');
    const [city, setCity] = useState(athlete ? athlete.athlete.city : '');
    const [achievements, setAchievements] = useState(athlete ? athlete.athlete.achievements : '');
    const [image, setImage] = useState(athlete ? athlete.athlete.imageUrl: null);
    const [username, setUsername] = useState(athlete ? athlete.user.username : '');
    const [email, setEmail] = useState(athlete ?  athlete.user.email : '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        const reqBody = {};

        reqBody['name'] = name;
        reqBody['age'] = age;
        reqBody['weight_category'] = weightCategory;
        reqBody['city'] = city;
        reqBody['achievements'] = achievements;
        reqBody['username'] = username; // Add username to form data
        reqBody['email'] = email; // Add email to form data
        reqBody['password'] = password.length > 1 ? password : athlete?.user?.password; // Add password to form data
        if (image) {
            reqBody['image'] = image;
        }

        try {
            if (athlete) {
                await updateAthlete(athlete.athlete.id, reqBody);
            } else {
                await createAthlete(reqBody);
            }

            setName('');
            setAge('');
            setWeightCategory('');
            setCity('');
            setAchievements('');
            setImage(null);
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error("Error saving athlete:", error);
        }
    };


    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setImage(base64);
    };

    return (
        <form className="athlete-form" onSubmit={handleSubmit}>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div>
                <label>FIO:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div>
                <label>Age:</label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)}/>
            </div>
            <div>
                <label>Weight Category:</label>
                <input type="text" value={weightCategory} onChange={(e) => setWeightCategory(e.target.value)}/>
            </div>
            <div>
                <label>City:</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)}/>
            </div>
            <div>
                <label>Achievements:</label>
                <textarea value={achievements} onChange={(e) => setAchievements(e.target.value)}/>
            </div>
            <div>
                <label>Image:</label>
                <input type="file" onChange={(e) => handleFileUpload(e)}/>
            </div>
            {/* New fields for username, email, and password */}
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div>
                <label>Confirm Password:</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default AthleteForm;

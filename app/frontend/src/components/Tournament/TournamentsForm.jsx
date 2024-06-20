import React, { useState } from 'react';
import { createTournament, updateTournament } from "../../services/requests";
import "../../styles/components/AthleteForm.css";

const TournamentsForm = ({ tournament, onSave }) => {
    const [title, setTitle] = useState(tournament ? tournament.title : '');
    const [description, setDescription] = useState(tournament ? tournament.description : '');
    const [contacts, setContacts] = useState(tournament ? tournament.contacts : '');
    const [yandexLocation, setYandexLocation] = useState(tournament ? tournament.yandexLocation : '');
    const [startAt, setStartAt] = useState(tournament ? tournament.startAt : '');
    const [endAt, setEndAt] = useState(tournament ? tournament.endAt : '');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reqData = {
            title,
            description,
            contacts,
            yandexLocation,
            startAt,
            endAt,
            userId: 1 // Example userId, should be replaced with actual user ID
        };

        try {
            if (tournament) {
                await updateTournament(tournament.id, reqData);
            } else {
                await createTournament(reqData);
            }
            if (onSave) {
                onSave();
            }
            setTitle('');
            setDescription('');
            setContacts('');
            setYandexLocation('');
            setStartAt('');
            setEndAt('');
            alert('Турнир успешно сохранен!');
        } catch (error) {
            console.error('Error saving tournament:', error);
            setErrorMessage('Ошибка при сохранении турнира.');
        }
    };

    return (
        <form className="athlete-form" onSubmit={handleSubmit}>
            <h2>{tournament ? 'Обновить турнир' : 'Создать турнир'}</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <label>
                Заголовок:
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </label>
            <label>
                Описание:
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </label>
            <label>
                Контакты:
                <textarea
                    value={contacts}
                    onChange={(e) => setContacts(e.target.value)}
                ></textarea>
            </label>
            <label>
                Yandex Location:
                <textarea
                    value={yandexLocation}
                    onChange={(e) => setYandexLocation(e.target.value)}
                ></textarea>
            </label>
            <label>
                Дата начала:
                <input
                    type="datetime-local"
                    value={startAt}
                    onChange={(e) => setStartAt(e.target.value)}
                    required
                />
            </label>
            <label>
                Дата окончания:
                <input
                    type="datetime-local"
                    value={endAt}
                    onChange={(e) => setEndAt(e.target.value)}
                    required
                />
            </label>
            <button type="submit">{tournament ? 'Обновить' : 'Создать'}</button>
        </form>
    );
};

export default TournamentsForm;

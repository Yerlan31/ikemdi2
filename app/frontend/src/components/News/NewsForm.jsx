import React, { useState } from 'react';
import { createNews, updateNews } from "../../services/requests";
import "../../styles/components/AthleteForm.css";
const AdminNewsForm = ({ newsItem }) => {
    const [title, setTitle] = useState(newsItem ? newsItem.title : '');
    const [content, setContent] = useState(newsItem ? newsItem.content : '');
    const [image, setImage] = useState(newsItem ? newsItem.image : null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reqData = {
            title,
            content,
            image
        };

        try {
            if (newsItem) {
                await updateNews(newsItem.id, reqData);
            } else {
                await createNews(reqData);
            }

            setTitle('');
            setContent('');
            setImage(null);
            alert('Новость успешно сохранена!');
        } catch (error) {
            console.error('Error saving news:', error);
            setErrorMessage('Ошибка при сохранении новости.');
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
            <h2>{newsItem ? 'Обновить новость' : 'Создать новость'}</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <br/>
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
                Содержание:
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                ></textarea>
            </label>
            <label>
                Изображение:
                <input
                    type="file"
                    onChange={(e) => handleFileUpload(e)}
                />
            </label>
            <button type="submit">{newsItem ? 'Обновить' : 'Создать'}</button>
        </form>
    );
};

export default AdminNewsForm;

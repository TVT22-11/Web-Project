import React, { useState } from 'react';
import '../Home/News.css';

const apiUrl = process.env.REACT_APP_FINNKINO_API_URL;

function ChatPage() {
  const [currentNews, setCurrentNews] = useState(null);

  const fetchSingleNews = async () => {
    try {
      const response = await fetch(apiUrl);
      const xmlData = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
      const newsNode = xmlDoc.querySelector('NewsArticle');

      const rawPublishDate = newsNode.querySelector('PublishDate').textContent;
      const trimmedPublishDate = trimTimeFromDate(rawPublishDate);

      const newsData = {
        title: newsNode.querySelector('Title').textContent,
        publishDate: trimmedPublishDate,
        articleURL: newsNode.querySelector('ArticleURL').textContent,
        imageURL: newsNode.querySelector('ImageURL').textContent,
        description: newsNode.querySelector('HTMLLead').textContent,
      };

      setCurrentNews(newsData);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  function trimTimeFromDate(dateString) {
    const date = new Date(dateString);
    const trimmedDate = date.toLocaleDateString('fi-FI', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return trimmedDate;
  }

  const handleAddUser = () => {
    // Implement the logic for adding a user
    console.log('Add User button clicked');
  };

  const handleDeleteUser = () => {
    // Implement the logic for deleting a user
    console.log('Delete User button clicked');
  };

  return (
    <div>
      <div>
        <button onClick={fetchSingleNews}>Fetch News Article</button>
      </div>

      {currentNews && (
        <div>
          <img src={currentNews.imageURL} alt={`News`} />
          <div>
            <strong>
              <a href={currentNews.articleURL} target="_blank" rel="noopener noreferrer">
                {currentNews.title}
              </a>
            </strong>
            <p>{currentNews.publishDate}</p>
            <p>{currentNews.description}</p>
          </div>
        </div>
      )}

      <div>
        <button onClick={handleAddUser}>Add Member</button>
        <button onClick={handleDeleteUser}>Delete Member</button>
      </div>
    </div>
  );
}

export default ChatPage;

// components/News/News.js
import React, { useEffect, useState } from 'react';
import './News.css';

function News({ area, categoryID, eventID }) {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Construct the URL with optional parameters
        const url = new URL('https://www.finnkino.fi/xml/News/');
        if (area) url.searchParams.append('area', area);
        if (categoryID) url.searchParams.append('categoryID', categoryID);
        if (eventID) url.searchParams.append('eventID', eventID);

        const response = await fetch(url);
        const xmlData = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
        const newsNodes = xmlDoc.querySelectorAll('NewsArticle');

        const newsData = Array.from(newsNodes).map((node) => ({
          title: node.querySelector('Title').textContent,
          publishDate: node.querySelector('PublishDate').textContent,
          articleURL: node.querySelector('ArticleURL').textContent,
          imageURL: node.querySelector('ImageURL').textContent,
          thumbnailURL: node.querySelector('ThumbnailURL').textContent,
        }));

        setNews(newsData);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [area, categoryID, eventID]);

  return (
    <div className='News-Box'>
      <h2>News</h2>
      <ul>
        {news.map((item, index) => (
          <li key={index}>
            <strong>{item.title}</strong>
            <p>{item.publishDate}</p>
            <img src={item.imageURL} alt={`News ${index}`} />
            <p>{item.articleURL}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default News;

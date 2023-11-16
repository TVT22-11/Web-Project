// components/News/News.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Grid, Image } from 'semantic-ui-react'
import './News.css';

function News({ area, categoryID, eventID }) {
  const [news, setNews] = useState([]);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);


  useEffect(() => {
    const fetchNews = async () => {
      try {

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


  const autoTransition = () => {
    setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % news.length);
  };


  useEffect(() => {
    const intervalId = setInterval(autoTransition, 8000);

    return () => clearInterval(intervalId); 
  }, [news]);

  return (
    <div className='News-Box'>
      <h2 className='News-title'>News</h2>

      {news.map((item, index) => (
        <div
          key={index}
          className={index === currentNewsIndex ? 'active' : ''}
          style={{ opacity: index === currentNewsIndex ? 1 : 0 }}
        >
          <Image src={item.imageURL} alt={`News ${index}`} />
          <div className='Article-desc'>
            <strong className='Article-title'>{item.title}</strong>
            <p className='Article-date'>{item.publishDate}</p>
            <p className='Article-url'>
              <Link to={item.articleURL}>{item.articleURL}</Link>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default News;
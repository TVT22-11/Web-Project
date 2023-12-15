import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './EnhancedNews.css';

const apiUrl = process.env.REACT_APP_FINNKINO_API_URL;

function EnhancedNews({ area, categoryID, eventID, sorting, onFiltering }) {
  const [sortedNews, setSortedNews] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const [sortByDropdownVisible, setSortByDropdownVisible] = useState(false);
  

  const openDropdown = () => {
    setSortByDropdownVisible(!sortByDropdownVisible);
  };
  

  const closeDropdown = () => {
    setSortByDropdownVisible(false);
  };

  const openModal = (content) => {
    setModalContent(content);
    closeDropdown(); // Close dropdown when modal is opened
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const onSortingInternal = (type) => {
    console.log(`Sorting by ${type}`);
    let sortedNewsData = [...sortedNews];

    switch (type) {
      case 'newest':
        sortedNewsData = sortedNewsData.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
        break;
      case 'oldest':
        sortedNewsData = sortedNewsData.sort((a, b) => new Date(a.publishDate) - new Date(b.publishDate));
        break;
      default:
        break;
    }

    console.log('Original News:', sortedNews.map((item) => item.publishDate));
    console.log('Sorted News:', sortedNewsData.map((item) => item.publishDate));

    setSortedNews([...sortedNewsData]); // Update the state correctly here
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const url = new URL(apiUrl);

        if (area) url.searchParams.append('area', area);
        if (categoryID) url.searchParams.append('categoryID', categoryID);
        if (eventID) url.searchParams.append('eventID', eventID);

        const response = await fetch(url);
        const xmlData = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
        const newsNodes = xmlDoc.querySelectorAll('NewsArticle');

        const newsData = Array.from(newsNodes).map((node) => {
          const titleNode = node.querySelector('Title');
          const publishDateNode = node.querySelector('PublishDate');
          const articleURLNode = node.querySelector('ArticleURL');
          const imageURLNode = node.querySelector('ImageURL');
          const htmlLeadNode = node.querySelector('HTMLLead');

          return {
            title: titleNode ? titleNode.textContent : 'No Title',
            publishDate: publishDateNode ? trimTimeFromDate(publishDateNode.textContent) : 'No Publish Date',
            articleURL: articleURLNode ? articleURLNode.textContent : '#',
            imageURL: imageURLNode ? imageURLNode.textContent : '',
            description: htmlLeadNode ? htmlLeadNode.textContent : 'No Description',
            EventID: node.querySelector('EventID') ? node.querySelector('EventID').textContent : '0',
          };
        });

        setSortedNews(newsData);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [area, categoryID, eventID]);

  useEffect(() => {
    // Ensure sorting is applied when sorting prop changes
    onSortingInternal(sorting);
  }, [sorting]);

  useEffect(() => {
    console.log('Rendering with sortedNews:', sortedNews);
  }, [sortedNews]);

  function trimTimeFromDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Check if there are no news to display
  if (sortedNews.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className='EnhancedNews-Container'>
      <div className='sorting-buttons'>
        <div className='sorting-button' onClick={openDropdown}>
          Sort By
        </div>
        {sortByDropdownVisible && (
          <div className='dropdown-menu'>
            <div className='dropdown-title'>Sort By</div>
            <div className='dropdown-item' onClick={() => onSortingInternal('newest')}>
              Newest
            </div>
            <div className='dropdown-item' onClick={() => onSortingInternal('oldest')}>
              Oldest
            </div>
          </div>
        )}
      </div>
      {sortedNews.map((item, index) => (
        <div key={index} className='EnhancedNews-Box'>
          <img className='News-Image' src={item.imageURL} alt={`News ${index}`} />
          <div className='Article-full-enhanced'>
            <Link to={item.articleURL}>
              <strong className='Article-title'>{item.title}</strong>
            </Link>
            <p className='Article-date'>{item.publishDate}</p>
            <p className='Article-desc'>{item.description}</p>
          </div>
          {modalContent && (
            <div className='Modal'>
              <div className='Modal-content'>
                <span className='ReadMoreBtn' onClick={closeModal}>
                  Close
                </span>
                <img className='Modal-img' src={modalContent.imageURL} alt='News' />
                <div className='Modal-text'>
                  <h2>{modalContent.title}</h2>
                  <p>{modalContent.publishDate}</p>
                  <p>{modalContent.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default EnhancedNews;

import React, { useEffect, useState } from 'react';
import './index.scss';

function HomeScene() {
  const [userCards, setUserCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [support, setSupportData] = useState({});
  const [searchQuery, setsearchQuery] = useState('');

  const fetchUserCards = async (page) => {
    await fetch(`https://reqres.in/api/users?page=${page}`)
      .then(response => response.json())
      .then(cardsData => {
        setUserCards(cardsData.data)
        setCurrentPage(cardsData.page);
        setTotalPages(cardsData.total_pages);
        setSupportData(cardsData.support);
      });
  }

  const loadData = async (page) => {
    fetchUserCards(page);
  }

  useEffect(() => {
    fetchUserCards(currentPage);
  }, [currentPage]);

  return (
    <div className='homeContainer'>
      <div className='searchBarWrapper'>
        <input className='searchBar' placeholder='Enter email to search' onChange={(e) => setsearchQuery(e.target.value.toLowerCase())} />
      </div>
      <div className='cardsWrapper'>
        {
          userCards.filter((entry) => entry.email.includes(searchQuery)).map((card) => {
            return (
              <div key={card.id} className='mycard animate__animated animate__zoomIn'>
                <img src={card.avatar} alt='avatar' className='myavatar' />
                <div>
                  <div className='name'>{card.first_name} {card.last_name}</div>
                  <div>Email: {card.email}</div>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className='actionBtn'>
        {Array.from(Array(totalPages).keys()).map((value => {
          return (
            <div className={`btn ${value + 1 === currentPage ? 'active' : 'allowed'}`} role='presentation' onClick={() => loadData(value + 1)}>
              {value + 1}
            </div>
          )
        }))}
      </div>
      <div className='supportWrapper'>
        {support.text}
        <a href={support.url}>{support.url}</a>
      </div>
    </div >
  )
}

export default HomeScene;
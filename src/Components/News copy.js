import React, { useEffect, useState } from 'react'
import { NewsItem } from './NewsItem'
import { Spinner } from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  let url, data, parsedData;

  let updateNews = async (page) => {
    url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=20b68ebe15be42eea0c3e1784d561c6e&category=${props.category}&page=${page}&pageSize=${props.pageSize}`;
    data = await fetch(url);
    parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(true);
    console.log(parsedData.totalResults);
  }

  const fetchMoreData = async () => {
    setPage(page+1);
    url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=20b68ebe15be42eea0c3e1784d561c6e&category=${props.category}&page=${page+1}&pageSize=${props.pageSize}`;
    setLoading(true);
    data = await fetch(url);
    parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };
 
  useEffect(() => {
    updateNews();
  }, [])

  const handlePreviousClick =  () => {
    setPage(page - 1);
    updateNews(page - 1);
  }
  const handleNextClick =  () => {
     setPage(page+1)
     updateNews(page+1);
  }

  return (

    <div className='container container-my-5'>
      <h2 className='text-center'>Daily News - Top Headlines</h2>
      {!loading  && !articles.length && <Spinner/>}

      <div className='row my-4 newsItems'>
        {
          articles.map((element) => (
            <div className='col-md-4' key={element.url}>
              <NewsItem title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 88):""} imageUrl={element.urlToImage?element.urlToImage:"https://via.placeholder.com/300x150"} source={element.source.name} author={element.author} date={element.publishedAt} />
            </div>
          ))
        }
      </div>
      <div className="action-wrap d-flex justify-content-between">

            <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePreviousClick} >&#8249; Previous</button>

            <button disabled={page>=Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &#8250;</button>

        </div>
    </div>
  )
}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
};

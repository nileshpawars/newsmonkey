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

  const updateNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=7c482d18847f462d9b5a0548d507e4ea&category=${props.category}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(true);
  }

  const fetchMoreData = async () => {
    setPage(page+1);
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=7c482d18847f462d9b5a0548d507e4ea&category=${props.category}&page=${page+1}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };

  useEffect(() => {
    updateNews();
  }, [])

  return (
    <InfiniteScroll
    dataLength={articles.length}
    next={fetchMoreData}
    hasMore={articles.length !== totalResults}
    loader={<Spinner/>}
  >
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
    </div>
    </InfiniteScroll>
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

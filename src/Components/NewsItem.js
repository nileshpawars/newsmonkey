import React from 'react'

export const NewsItem = (props) => {
    let { imageUrl, title, description, newsUrl, source, author, date } = props;
  return (
    <div>
        <div className="card">
            <span className="badge bg-danger">{source}</span>
            <img className="card-img-top" src={imageUrl} alt="Card cap" />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className='text-muted'>By {author} on {new Date(date).toGMTString()}</p>
                    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark btn-sm">Read more</a>
                </div>
        </div>
    </div>
  )
}

import image from './assets/news.jpg';

const NewsItem = ({ title, description, src, url }) => {
  // Fallbacks
  const safeTitle = title ? title.slice(0, 50) : "Untitled News";
  const safeDescription = description
    ? description.slice(0, 90)
    : "Current event. Information about something that just happened.";
  const safeUrl = url || "#";

  return (
    <div
      className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3 px-2 py-2"
      style={{ maxWidth: "345px" }}
    >
      <img
        src={src || image}
        style={{ height: "200px", width: "325px" }}
        className="card-img-top"
        alt="News"
      />
      <div className="card-body">
        <h5 className="card-title">{safeTitle}</h5>
        <p className="card-text">{safeDescription}</p>
        <a href={safeUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsItem;

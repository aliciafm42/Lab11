const Card = ({ title, description, image }) => (
  <div className="card">
    {image && <img src={image} alt={title} className="card-image" />}
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
);

export default Card;

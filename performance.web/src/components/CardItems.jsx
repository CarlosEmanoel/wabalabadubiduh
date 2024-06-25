function CardItems(props) {
  return (
    <div className="col-4 md-4 flex justify-center  flex-col">
      <div className="card text-center">
        <img src={props.image} className="card-img-top px-4 py-2" />
        <div className="card-body">
          <h5 className="card-title font-bold">{props.title}</h5>
          <p className="card-text">{props.text}</p>
          <a href={props.href} className="btn btn-primary">
            Ver mais
          </a>
        </div>
      </div>
    </div>
  );
}

export default CardItems;

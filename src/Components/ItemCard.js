import "../css/ItemCard.css";
export default function ItemCard(props) {
  console.log(props);
  return (
    <div className="">
      <div className="grid-item">
        <h2 className="item">Name: {props.details.name}</h2>
        <h2 className="item">Price: ${props.details.price}</h2>
        <h4 className="item">Description: {props.details.description}</h4>
        <p className="item">Location: {props.details.location}</p>
      </div>
    </div>
  );
}

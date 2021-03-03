export default function ItemCard(props){
    const { item } = props
    return (

        <div>
          <h2>{item.itemName}</h2>
          <h4>${item.price}</h4>
          <p>{item.description}</p>
        </div>
    )
}
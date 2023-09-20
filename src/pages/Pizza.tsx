import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Pizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://65031248a0f2c1f3faeb617d.mockapi.io/items/` + id
        );
        setPizza(data);
      } catch (error) {
        console.log("error: ", error);
        navigate("/");
      }
    }
    fetchPizza();
  }, [id, navigate]);

  if (!pizza) return <>"Loading"</>;

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt={pizza.title} />
      <h2>{pizza.title}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor obcaecati
        iusto ea eligendi voluptas est distinctio consequuntur modi alias
        inventore aspernatur recusandae porro consectetur nobis vitae saepe
        sequi, veniam similique?
      </p>
      <h4>{pizza.price}</h4>
    </div>
  );
};

export default Pizza;

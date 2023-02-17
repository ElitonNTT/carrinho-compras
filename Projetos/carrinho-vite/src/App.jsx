import { useState, useEffect } from "react";
import TableRow from "./components/TableRow";
import PageHeader from "./layout/PageHeader";
import PageTitle from "./layout/PageTitle";
import Resumo from "./layout/Resumo";
import "./styles.scss";

import { api } from "./provider";
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function App() {
  const [cart, setCart] = useState([]);

  const productObject = {
    name: "produto",
    categoria: "categoria",
    price: randomNumber(50, 1000),
    quantity: 1,
  };

  const fetchData = () => {
    api
      .get("./cart")
      .then((response) => setCart(response.data))
      .catch((err) => console.log(err));
  };

  const handleAddItem = () => {
    console.log("Handle Item Funcionando");
    api.post("./cart", productObject).then((response) => {
      console.log(response);
      fetchData();
    });
  };

  const handleRemoveItem = (item) => {
    api.delete(`/cart/${item._id}`).then((response) => {
      console.log("Item Deletado");
      fetchData();
    });
  };

  const handleUpdateItem = (item, action) => {
    console.log(item);
    let newQuantity = item.quantity;

    if (action === "decrease") {
      if (newQuantity === 1) {
        return;
      }
      newQuantity -= 1;
    }
    if (action === "increase") {
      newQuantity += 1;
    }
    const newData = { ...item, quantity: newQuantity };
    delete newData._id;

    console.log("novo data", newData);

    api.put(`/cart/${item._id}`, newData).then((response) => {
      console.log(response);
      fetchData();
    });
  };

  const getTotal = () => {
    let sum = 0;
    for (let item of cart) {
      sum += item.price * item.quantity;
    }
    return sum;
  };

  const cartTotal = getTotal();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <PageHeader />
      <main>
        <PageTitle titulo={"Seu Carrinho"} />
        <div className="content">
          <section>
            <button
              onClick={handleAddItem}
              style={{ padding: "5px 10px", marginBottom: "15px" }}
            >
              Adicionar ao Carrinho
            </button>
            <table>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Preco</th>
                  <th>Quantidade</th>
                  <th>Total</th>
                  <th>-</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <TableRow
                    key={item._id}
                    data={item}
                    handleRemoveItem={handleRemoveItem}
                    handleUpdateItem={handleUpdateItem}
                  />
                ))}
                {cart.length === 0 && (
                  <tr colSpan="5" style={{ textAlign: "center" }}>
                    <td>
                      <b>Seu Carrinho esta vazio!</b>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
          <aside>
            <Resumo total={cartTotal} />
          </aside>
        </div>
      </main>
    </>
  );
}

export default App;

export default function Resumo({ total }) {
  return (
    <>
      <div className="box">
        <div className="hero">Resumo da Compra</div>
        <div className="info">
          <div>
            <span>Sub-Total</span>
            <span>R$ {total}</span>
          </div>
          <div>
            <span>Frete</span>
            <span>Gratuito</span>
          </div>
          <div>
            <button>
              Adicionar Cupom de Desconto
              <i className="bx bx-right-arrow-alt"></i>
            </button>
          </div>
        </div>
        <footer>
          <span>Total</span>
          <span>R${total}</span>
        </footer>
      </div>
      <button className="finalizar">Finalizar Compra</button>
    </>
  );
}

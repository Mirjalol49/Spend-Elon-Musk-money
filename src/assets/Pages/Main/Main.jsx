import Products from "./Products/Products";

const Main = ({ cart, onInteract, onSetQuantity }) => {
    return (
        <main>
            <section>
                <Products cart={cart} onInteract={onInteract} onSetQuantity={onSetQuantity} />
            </section>
        </main>
    );
}

export default Main;
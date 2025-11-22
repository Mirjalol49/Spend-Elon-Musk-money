import Products from "./Products/Products";

const Main = ({ cart, onInteract }) => {
    return (
        <main>
            <section>
                <Products cart={cart} onInteract={onInteract} />
            </section>
        </main>
    );
}

export default Main;
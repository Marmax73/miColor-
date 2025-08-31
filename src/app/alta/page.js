

export default function Alta(){
    return (
        <form className="max-w-md mx-auto p-4">
            <div>
                <label htmlFor="name">Nombre:</label>
                <input type="text" id="name" name="name" required />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
            </div>
            <button type="submit">Enviar</button>
        </form>
    )
}
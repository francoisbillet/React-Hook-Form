export function CreateHubvisor() {
  return (
    <main>
      <h1>Créer un nouvel Hubvisor</h1>
      <form>
        <div className="flex ">
          <label>
            Nom:
            <input type="text" />
          </label>
          <label>
            Prénom:
            <input type="text" />
          </label>
        </div>
        <label>
          Adresse mail:
          <input type="text" />
        </label>
        <label>
          Ancienneté (années):
          <input type="number" />
        </label>
        <button type="submit">Créer</button>
      </form>
    </main>
  );
}

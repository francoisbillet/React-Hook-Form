export function CreateHubvisorVanilla() {
  return (
    <main>
      <h1>Créer un nouvel Hubvisor</h1>
      <form>
        <h2>Infos personnelles</h2>
        <div className="flex ">
          <label>
            Nom:
            <input type="text" />
          </label>
          <label>
            Prénom:
            <input type="text" />
          </label>
          <label>
            Adresse mail:
            <input type="text" />
          </label>
        </div>
        <h2>Hub</h2>
        <label>
          Practice:
          <select>
            <option value="epic">Epic</option>
            <option value="source">Source</option>
            <option value="atom">Atom</option>
          </select>
        </label>
        <label>
          Manager:
          <select>
            <option value="epic">Charles</option>
            <option value="source">Source</option>
            <option value="atom">Atom</option>
          </select>
        </label>
        <label>
          Ancienneté (années):
          <input type="number" />
        </label>
        <div>
          <h2>Expertises</h2>
        </div>
        <button type="submit">Créer</button>
      </form>
    </main>
  );
}

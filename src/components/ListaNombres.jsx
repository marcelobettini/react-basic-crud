import React, { Fragment, useState } from "react";
import uniqid from "uniqid";

const ListaNombres = () => {
  const [nombre, setNombre] = useState("");
  const [listaNombres, setListaNombres] = useState([]);
  const [edicion, setEdicion] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(null)

  function addNombre(e) {
    e.preventDefault();
    const nombreUnico = {
      id: uniqid(),
      nombre: nombre,
    };
    if (!nombre.trim()) {
      setError("nombre debe tener algo, man");
    } else {
      setListaNombres([...listaNombres, nombreUnico]); //spread operator instead of concat method
      setError(null)
      setNombre("");
    }
    
    
  }

  function deleteNombre(id) {
    const arrMenosUno = listaNombres.filter((item) => item.id !== id);
    setListaNombres(arrMenosUno);
  }

  function setForEdit(item) {
    setEdicion(true);
    setNombre(item.nombre);
    setId(item.id);
  }

  function editNombre(e) {
    e.preventDefault();
    if (!nombre.trim()) {
      setError("nombre debe tener algo, man");
    } else {
      const arrEdited = listaNombres.map((item) =>
        item.id === id ? { id: id, nombre: nombre } : item
      );
      setListaNombres(arrEdited);
      setEdicion(false);
      setNombre("");  
      setError(null)    
    }
  }
  return (
    <Fragment>
      <h3 className="display-6">CRUD Basic App</h3>
      <div className="row">
        <div className="col">
          <h4>Listado de nombres</h4>
          <ul className="list-group">
            {listaNombres.map((item) => (
              <li key={item.id} className="list-group-item">
                {item.nombre}
                <button
                  onClick={() => deleteNombre(item.id)}
                  className="btn btn-sm btn-danger float-end"
                >
                  X
                </button>
                <button
                  onClick={() => setForEdit(item)}
                  className="btn btn-sm btn-success float-end"
                >
                  ||
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col">
          <h4>Formulario para añadir nombres</h4>
          <form
            onSubmit={edicion ? editNombre : addNombre}
            className="form-group"
          >
            <input
              onChange={(e) => setNombre(e.target.value)}
              className="form-control mt-2"
              id="input"
              type="text"
              placeholder="Introduce el nombre"
              value={nombre}
            />
            <div className="d-grid">
              {
                error != null ? (<div className="alert alert-danger">{error}</div>) : (<div></div>)   
              }
              <input
                className="btn btn-primary mt-2"
                type="submit"
                value={edicion ? "Modificar" : "Agregar"}
              />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ListaNombres;

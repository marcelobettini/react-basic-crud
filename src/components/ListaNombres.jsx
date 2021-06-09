import React, { Fragment, useState } from "react"
import uniqid from 'uniqid' 

const ListaNombres = () => {
  const [nombre, setNombre] = useState('')
  const [listaNombres, setListaNombres] = useState([])
  function addNombre(e) {
    e.preventDefault()
    const nombreUnico = {
      id: uniqid(),
      nombre:nombre
    }
    setListaNombres([...listaNombres, nombreUnico]) //spread operator instead of concat method
    setNombre('')    
  }
  function deleteNombre(id) {
    const arrMenosUno = listaNombres.filter( item => item.id !== id)
    setListaNombres(arrMenosUno)
  }
  return (
    <Fragment>
      <h3 className="display-6">CRUD Basic App</h3>
      <div className="row">
        <div className="col">
          <h4>Listado de nombres</h4>
          <ul className="list-group">            
              {
              listaNombres.map(item => 
                <li key={item.id} className="list-group-item">{item.nombre} 
                <button onClick={ () => deleteNombre(item.id)} className="btn btn-sm btn-danger float-end">X</button>
                </li>)

              }
          </ul>
        </div>
        <div className="col">
          <h4>Formulario para añadir nombres</h4>
          <form onSubmit={(e) => addNombre(e)} className="form-group">
            <input
              onChange={(e) => setNombre(e.target.value)}
              className="form-control mt-2"         
              id="input"     
              type="text"
              placeholder="Introduce el nombre"
              value={nombre}
            />
            <div className="d-grid">
              <input                
                className="btn btn-primary mt-2"
                type="submit"
                value="Agregar"
              />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ListaNombres;

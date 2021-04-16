import React from 'react'

class Home extends React.Component {

    render() {
        return(
            <div className="card">
                <div className="card-header">
                    Aposta
                </div>
                <div className="card-body">
                    <div className="row">
                    <div className="col-md-4">
                            <div className="form-group">
                                <label>Nome: *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={''}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label>Telefone: *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={''}
                                />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <label>Número: *</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    defaultValue={0}
                                />
                            </div>
                        </div>
                        <div className="col-md-1">
                            <div className="form-group">
                                <label>&nbsp;</label>
                                <button type="button" className="btn btn-primary">Enviar</button>
                            </div>
                        </div>
                        <div className="col-md-1">
                            <div className="form-group">
                                <label>&nbsp;</label>
                                <button type="button" className="btn btn-secondary">Limpar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default Home;
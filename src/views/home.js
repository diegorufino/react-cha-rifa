import React, { useState } from 'react'
import axios from 'axios'
import InputMask from "react-input-mask";

const Home = () => {

    const [nome, setNome] = useState('')
    const [celular, setCelular] = useState('')
    const [numero, setNumero] = useState(0)
    const [sucesso, setSucesso] = useState(false)

    const min = 1;
    const max = 100;

    const salvar = (aposta) => {
        axios.post('http://rest-api-cha-rifa.herokuapp.com/apostas', aposta, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response)
                response.status == 201 && setSucesso(true)
            }).catch(erro => {
                console.log(erro)
        })
    }

    const submit = (event) => {
        event.preventDefault();

        const value_num = Math.max(Number(min), Math.min(Number(max), Number(numero)));

        const aposta = {
            numero: value_num,
            codigo: `0004-${numero}`,
            id_sorteio: 4,
            celular: celular,
            data_pagamento: null
        }
        salvar(aposta)
    }

    return(
        <div className="card">
            <div className="card-header">
                Aposta
            </div>
            <div className="card-body">

                {sucesso &&
                    <div className="alert alert-dismissible alert-success">
                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                    <h4 className="alert-heading">Sucesso!</h4>
                        <p className="mb-0">Aposta realizada com sucesso. O código da sua aposta é: #COD001.</p>
                    </div>
                }                
                
                <div className="row">
                <div className="col-md-4">
                        <div className="form-group">
                            <label>Nome: *</label>
                            <input
                                type="text"
                                className="form-control"
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Celular: *</label>
                            <InputMask 
                                type="text"
                                className="form-control"
                                value={celular}
                                onChange={e => setCelular(e.target.value)}
                                mask="(99) 9 9999-9999"
                            />
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label>Número: *</label>
                            <input
                                type="number"
                                className="form-control"
                                value={numero}
                                onChange={e => setNumero(e.target.value)}
                                min={min}
                                max={max}
                            />
                        </div>
                    </div>
                    <div className="col-md-1">
                        <div className="form-group">
                            <label>&nbsp;</label>
                            <button type="button" onClick={submit} className="btn btn-primary">Enviar</button>
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

export default Home;
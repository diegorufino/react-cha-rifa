import React, { useEffect, useState } from 'react'
import axios from 'axios'
import InputMask from "react-input-mask";
import Card from '../components/card'
import { pad_with_zeroes } from '../utils'

const Home = () => {

    const [nome, setNome] = useState('')
    const [celular, setCelular] = useState('')
    const [numero, setNumero] = useState(0)
    const [sucesso, setSucesso] = useState(false)
    const [errors, setErros] = useState([])
    const id_sorteio = 4
    const min = 1;
    const max = 100;

    function ErroValidacao(errors) {
        this.errors = errors;
    }

    const validar = (aposta) => {
        const errors = []

        if (!nome) {
            errors.push('O campo Nome é obrigatório.')
        }

        if (!celular) {
            errors.push('O campo Celular é obrigatório.')
        }

        if (!numero || numero <= min || numero > max) {
            errors.push(`O campo Número deve receber um igual ou maior que ${min} e menor o igual a ${max}.`)
        }

        if (errors.length > 0) {
            throw new ErroValidacao(errors)
        }
    }

    const limpaCampos = () => {
        setNome('')
        setCelular('')
        setNumero(0)
    }

    const fecharMsgErro = () => {
        setErros([])
    }

    const fecharMsgSucesso = () => {
        setSucesso(false)
    }

    const salvar = (aposta) => {
        validar(aposta)

        axios.post('http://rest-api-cha-rifa.herokuapp.com/apostas', aposta, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                response.status === 201 && setSucesso(true)
            }).catch(erro => {
                console.log(erro)
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const value_num = Math.max(Number(min), Math.min(Number(max), Number(numero)));
        const codigo = `${pad_with_zeroes(id_sorteio, 4)}-${pad_with_zeroes(numero)}`
        const celular_num = celular.replace(/\D/gim, '')

        const aposta = {
            numero: value_num,
            codigo: codigo,
            id_sorteio: 4,
            nome: nome,
            celular: celular_num,
            data_pagamento: null
        }
        try {
            salvar(aposta)
            limpaCampos()
        } catch (erro) {
            const errors = erro.errors
            setErros(errors)
        }
        
    }

    useEffect(() => {
        sucesso && setTimeout(fecharMsgSucesso, 7000)
    } )

    return(
        <Card header='Aposta'>
            <div className="card-body">
                {sucesso &&
                    <div className="alert alert-dismissible alert-success">
                    <button
                        type="button"
                        className="close"
                        onSubmit={fecharMsgSucesso}
                        data-dismiss="alert">&times;
                    </button>
                    <h4 className="alert-heading">Sucesso!</h4>
                        <p className="mb-0">Aposta realizada com sucesso. O código da sua aposta é: #COD001.</p>
                    </div>
                }
                {
                    errors.length > 0 &&
                    errors.map(msg => {
                        return (
                            <div className="alert alert-dismissible alert-danger">
                                <button
                                    type="button"
                                    className="close"
                                    onSubmit={fecharMsgErro}
                                    data-dismiss="alert">&times;</button>
                            <h4 className="alert-heading">Erro!</h4>
                                <p className="mb-0">{msg}</p>
                            </div>
                        )
                    })
                    
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
                            <button type="button" onClick={onSubmit} className="btn btn-primary">Enviar</button>
                        </div>
                    </div>
                    <div className="col-md-1">
                        <div className="form-group">
                            <label>&nbsp;</label>
                            <button type="button" onClick={limpaCampos} className="btn btn-secondary">Limpar</button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )    
}

export default Home;
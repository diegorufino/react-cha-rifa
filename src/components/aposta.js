import React, { useEffect, useState } from 'react'
import axios from 'axios'
import InputMask from "react-input-mask";
import { pad_with_zeroes } from '../utils'

const API_BASE_URL = 'http://rest-api-cha-rifa.herokuapp.com'

const Aposta = () => {
    const id_sorteio = 1
    const [sorteioTamanho, setSorteioTamanho] = useState(0)
    const [apostas, setApostas] = useState([])
    const [checked, setChecked] = useState([])
    const [nome, setNome] = useState('')
    const [celular, setCelular] = useState('')
    const [sucesso, setSucesso] = useState(false)
    const [errors, setErros] = useState([])

    function ErroValidacao(errors) {
        this.errors = errors;
    }

    const fecharMsgErro = () => {
        setErros([])
    }

    const fecharMsgSucesso = () => {
        setSucesso(false)
    }

    const validar = (aposta) => {
        const errors = []

        if (!nome) {
            errors.push('O campo Nome é obrigatório.')
        }

        if (!celular) {
            errors.push('O campo Celular é obrigatório.')
        }

        if (checked==='') {
            errors.push('Selecione pelo menos um número.')
        }

        if (errors.length > 0) {
            throw new ErroValidacao(errors)
        }
    }

    const dadosSorteio = () => {
        axios.get(`${API_BASE_URL}/sorteios/${id_sorteio}`)
            .then(response => {
                const listaDeSorteios = response.data
                setSorteioTamanho(listaDeSorteios.sorteios.tamanho)
            }).catch(erro => {
                console.log(erro)
        })
    }

    const listarApostas = () => {
        axios.get(`${API_BASE_URL}/apostas`)
            .then(response => {
                const listaDeApostas = response.data
                setApostas(listaDeApostas.response.apostas)
            }).catch(erro => {
                console.log(erro)
        })
    }
    
    const checkList = (num) => {
        checked.find(v => v === num) ?
            setChecked(checked.filter(c => c !== num))
            : setChecked([num].concat(checked))
        console.log(checked)
    }

    let rows = []
    for (let i = 1; i < sorteioTamanho; i++){
        rows.push(i)
    }

    const salvar = (aposta) => {
        console.log('errors', errors)
        validar(aposta)

        axios.post(`${API_BASE_URL}/apostas`, aposta, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                response.status === 201 && setSucesso(true)
            }).catch(erro => {
                console.log('erro', erro)
        })
    }

    const limpaCampos = () => {
        setNome('')
        setCelular('')
        setChecked([])
    }

    const onSubmit = () => {
        checked.forEach(e => {
            const codigo = `${pad_with_zeroes(id_sorteio, 1)}-${pad_with_zeroes(e)}`

            const aposta = {
                numero: e,
                codigo: codigo,
                id_sorteio: 1,
                nome: nome,
                celular: celular.replace(/\D+/g, ""),
                data_pagamento: null
            }
            try {
                salvar(aposta)
                limpaCampos()
            } catch (erro) {
                const errors = erro.errors
                setErros(errors)
            }
        })
    }

    useEffect(() => {
        listarApostas()
        dadosSorteio()
        sucesso && setTimeout(fecharMsgSucesso, 7000)
    }, [sucesso])
    
    return (
        <>
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
                        <p className="mb-0">Aposta realizada com sucesso.</p>
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
                </div>
            </div>
            
            <div className="card-body">
                {rows.map(e =>
                    <button
                        style={{ margin: 1 }}
                        type="button"
                        key={e}
                        value={e}
                        onClick={event => checkList(Number(event.target.value))}
                        disabled={apostas.find(a => a.numero === e) ? "disabled" : ""}
                        className={ checked.find(c => c === e) ? "btn btn-danger disabled" : "btn btn-primary"}>
                    { e } 
                    </button>
                )}
            </div>

            <div className="row">
                <div className="col-md-1">
                    <div className="form-group">
                        <label>&nbsp;</label>
                        <button
                            type="button"
                            onClick={onSubmit}
                            className="btn btn-primary"
                            disabled={checked.length > 0 && nome !== '' && celular !== '' ? '' : 'disabled'}
                        >Enviar</button>
                    </div>
                </div>

                <div className="col-md-1">
                    <div className="form-group">
                        <label>&nbsp;</label>
                        <button
                            type="button"
                            onClick={limpaCampos}
                            className="btn btn-secondary"
                            disabled={checked.length > 0 || nome !== '' || celular !== '' ? '' : 'disabled'}
                        >Limpar</button>
                    </div>
                </div> 
            </div>
        </>
    )    
}

export default Aposta;
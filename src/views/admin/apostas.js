import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../../components/card'
import { maskPhone } from '../../utils'

const API_URL = 'http://rest-api-cha-rifa.herokuapp.com/apostas'

const ConsultaApostas = props => {

    const [apostas, setApostas] = useState([])

    const listarApostas = () => {
        axios.get(API_URL)
            .then(response => {
                const listaDeApostas = response.data
                setApostas(listaDeApostas.response.apostas)
            }).catch(erro => {
                console.log(erro)
        })
    }

    const alterarStatus = (id) => {
        axios.patch(`${API_URL}/${id}`, null, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            listarApostas()
        }).catch(erro => {
            console.log(erro)
        })
    }

    useEffect(() => {
        listarApostas()
    }, [])
    
    return (
        <Card header='Consulta Apostas'>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Código</th>
                        <th>Número</th>
                        <th>Sorteio</th>
                        <th>Data Aposta</th>
                        <th>Apostador</th>
                        <th>Celular</th>
                        <th>Pagamento</th>
                    </tr>
                </thead>
                <tbody>
                    {apostas.map(aposta => {
                        return (
                            <tr>
                                <td>{aposta.id_aposta}</td>
                                <td>{aposta.codigo}</td>
                                <td>{aposta.numero}</td>
                                <td>{aposta.id_sorteio}</td>
                                <td>{aposta.data_criado}</td>
                                <td>{aposta.nome}</td>
                                <td>{maskPhone(aposta.celular)}</td>
                                <td>
                                    {
                                        aposta.data_pagamento ?
                                            aposta.data_pagamento :
                                            <button onClick={e => alterarStatus(aposta.id_aposta)} type="button" className="btn btn-success">Add Pag</button>
                                    }
                                </td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </table>
        </Card>
        
    )
}

export default ConsultaApostas
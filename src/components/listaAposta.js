import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { maskPhone } from '../utils'

const API_BASE_URL = 'http://rest-api-cha-rifa.herokuapp.com'

const ListaAposta = () => {
    const [apostas, setApostas] = useState([])

    const listarApostas = () => {
        axios.get(`${API_BASE_URL}/apostas`)
            .then(response => {
                const listaDeApostas = response.data
                setApostas(listaDeApostas.response.apostas)
            }).catch(erro => {
                console.log(erro)
        })
    }

    const alterarStatus = (id) => {
        axios.patch(`${API_BASE_URL}/apostas/${id}`, null, {
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
        apostas.map(aposta => {
            return (
                <tr key={aposta.id_aposta}>
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
        })
    )
}

export default ListaAposta
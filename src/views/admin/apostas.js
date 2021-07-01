import React, { useEffect } from 'react'
import Card from '../../components/card'

import ListaAposta from '../../components/listaAposta'

const ConsultaApostas = (props) => {
    const { history } = props;
    const login = localStorage.getItem('login')

    useEffect(() => {
        !login &&
            history.push('/login')
    }, [login, history])

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
                    <ListaAposta />
                </tbody>
            </table>
        </Card>
        
    )
}

export default ConsultaApostas
import React from 'react'
import Card from '../components/card'
import Aposta from '../../src/components/aposta'
import Descricao from '../../src/components/descricao'

const Home = () => {
    return (
        <>
            <Card header='Login'>
                <Descricao />
                <Aposta />
            </Card>
        </>
    )    
}

export default Home;
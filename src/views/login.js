import React, { useState, useCallback} from 'react'
import Card from '../components/card'
import MensagemRetorno from '../components/mensagemRetorno';

const Login = props => {
    const { history } = props;

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [msgErro, setMsgErro] = useState(false)

    const passwordHash = require('password-hash');
    const hashedEmail = 'sha1$4e5cb2e6$1$3159858042a77f6410a5ee48baabff7f6fe89281'
    const hashedPassword = 'sha1$1a968806$1$f9921c926a2dafc13f849bf9fbf5c4042e362103'
        
    const handleSignIn = event => {
        
        event.preventDefault();
        
        passwordHash.verify(email, hashedEmail) && passwordHash.verify(senha, hashedPassword) ?
            localStorage.setItem('login', true) &&
            localStorage.setItem('email_usuario_logado', email) &&
            memoizedCallback()
            :
            setMsgErro(true)
    }

    const memoizedCallback = useCallback(
        () => {
            alert('sadasd')
            localStorage.getItem('login') &&
            history.push('/consulta-apostas')
        },
        [history],
    );

    return ( 
        <>
            <Card header='Aposta'>
                {msgErro &&
                    <MensagemRetorno
                        result={msgErro}
                        title='Erro!'
                        description='E-mail ou senha não incorreto(s), tente mais tarde.'
                    />}
                
                <div className="form-group">
                    <label
                        htmlFor="exampleInputEmail1"
                        className="form-label mt-4">
                        E-mail
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        onChange={e => setEmail(e.target.value)}
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Entre com e-mail" />
                </div>
                <div className="form-group">
                    <label
                        htmlFor="exampleInputPassword1"
                        className="form-label mt-4"> Senha
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        onChange={e => setSenha(e.target.value)}
                        id="exampleInputPassword1"
                        placeholder="Senha" />
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        onClick={handleSignIn}
                        className="btn btn-primary">Entrar
                    </button>
                </div>
            </Card>
        </>
    )    
}

export default Login;
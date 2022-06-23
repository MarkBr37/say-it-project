import { useParams } from 'react-router-dom';

function Middleware({component: Component}){

    const parame = useParams()
    return <Component parame={parame} />

}

export default Middleware;
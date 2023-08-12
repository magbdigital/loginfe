import React, { useContext, useState } from 'react';
import getHeadersAndToken from '../../utils/getHeadersAndToken'
import { AppContext } from '../../context/AppContext'
const Login = () => {
    const { role, user } = useContext(AppContext);
    const [errores, setErrores] = useState(false);
    const fetchData = fetch('http://localhost:8081/api/v1/customers',
        {
            method: 'GET',
            headers: getHeadersAndToken()
        }
    )

    fetchData.then(response => {
        if (!response.ok) {
            throw new Error("Error")
        }
        return response.json();
    }).then(data => {
        console.log(data)
    }
    ).catch(error => {

        setErrores(true);
    })

    return (
<>
        <h1>Empreass usuario {user} con role : {role}</h1>
        {errores && <h1>Error algun</h1>}
        </>

    );
}


export default Login;
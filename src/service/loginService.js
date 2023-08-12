
const login = async (credentials) => {
    const response = await fetch('http://localhost:8081/api/v1/auth/authenticate'
        , {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                //'authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IkFETUlOIiwic3ViIjoiZGFnYXJheTFAbWFpbC5jb20iLCJpYXQiOjE2OTE4MTcyMDIsImV4cCI6MTY5MTgxODY0Mn0.8-CIoeRBQKMWhg6nyDkVPm0RP5QaaajOjShcn4_4Cxc',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }
    );
    const data = await response.json();
    return data;
}


export {
    login

}
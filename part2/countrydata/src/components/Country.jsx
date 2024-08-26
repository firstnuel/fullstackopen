const Country = ({country}) => {

    return(
        <div>
            <h1>{country.name.common}</h1>
            capital {country.capital.join('')}<br />
            area {country.area}
            <h2>languages</h2>
            <ul>
                {Object.keys(country.languages).map(key => <li key={key}>{country.languages[key]}</li> )}
            </ul>
            <img src={country.flags.png}
            alt={country.flags.alt}
            ></img>
        </div>
        
    )
}

export default Country
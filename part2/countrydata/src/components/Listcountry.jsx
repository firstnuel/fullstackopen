import Country from "./Country";

const Listcountry = ({country, handleclick, expand}) => {

    return(
        <div>
            {country.name.common}
            <button onClick={handleclick}
            >{expand ? "hide": "show"}</button>
            {expand && <Country country={country}/>}
        </div>
    )
}

export default Listcountry;
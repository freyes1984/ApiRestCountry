//Freyes 22/04/2024
import React from "react";

const ListCardCountries = ({ listCountries, setGetCountry }) => {

    const eventClick = (e) => {
        if (e.target && e.target.tagName === "BUTTON") {
            const nameCountry = e.target.getAttribute("data-country");
            const dataCountry = listCountries.filter(a => a.name === nameCountry);
            setGetCountry(dataCountry[0]);
        }
    }

    return (
        <div id="cardList" className="row">
            {
                listCountries.map((country, key) =>
                    <div key={key} className="col-sm-3 mt-5">
                        <div className="card text-center bg-light mb-3" style={{ width: "20rem" }}>
                            <div className="card-header"><strong>{country.name} {country.flagmini}</strong></div>
                            <div id="card-body" className="card-body">
                                <h6 className="card-title"><small>Capital: {country.capital}</small></h6>
                                <h6 className="card-title"><small>Continent: {country.continents}</small></h6>
                                <button
                                    data-country={country.name}
                                    onClick={eventClick}
                                    type="button"
                                    className="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                >
                                    More Info
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ListCardCountries;
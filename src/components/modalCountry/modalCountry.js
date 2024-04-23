//Freyes 22/04/2024
import React from "react";

const ModalCountry = ({ dataCountries }) => {

    return (
        <><div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{dataCountries.name}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <img style={{ margin: "auto", display: "block", width: "240px" }} src={dataCountries.flagSVG} alt={dataCountries.name} />
                        <div style={{ margin: "10px 0 10px 0" }}>
                            <p><strong>Oficial Name:</strong> {dataCountries.oficialName}</p>
                            <p><strong>Region:</strong> {dataCountries.region}</p>
                            <p><strong>Subregion:</strong> {dataCountries.subregion}</p>
                            <p><strong>Capital:</strong> {dataCountries.capital}</p>
                            <p><strong>Population:</strong> {dataCountries.population}</p>
                            <p><strong>Area:</strong> {dataCountries.area}</p>
                            <p><strong>Map:</strong>
                                <a href={dataCountries.maps} target="_blank" rel="noreferrer" className="link-underline-dark">
                                    <abbr>view map</abbr>
                                </a>
                            </p>
                            <p><strong>Languages:</strong></p>
                            <ul>
                                {
                                    dataCountries.languages ? Object.keys(dataCountries.languages)
                                        .map(
                                            key => <li key={dataCountries.languages[key]}><strong>{key}</strong> - {dataCountries.languages[key]}</li>
                                        ) : ''
                                }
                            </ul>
                        </div>
                    </div>
                    {/* <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div> */}
                </div>
            </div>
        </div></>
    )
}

export default ModalCountry;
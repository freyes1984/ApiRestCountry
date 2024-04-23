//Freyes 22/04/2024
import React from "react";

const SelectContinents = ({ contienets, eventSelect }) => {
    return (
        <select style={{ width: "200px" }} id='selectRegion' className="form-select" onChange={eventSelect}>
            <option defaultValue="Select Continent">Select Continent</option>
            {
                contienets.map((a, k) => {
                    return <option key={k} value={a}>{a}</option>
                })
            }
        </select>
    )
}

export default SelectContinents;
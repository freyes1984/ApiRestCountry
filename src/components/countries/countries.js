//Freyes 22/04/2024
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import SelectContinents from '../selectContinents/selectContienents';
import InputSearch from '../inputSearch/inputSearch';
import ModalCountry from '../modalCountry/modalCountry';
import LoadingComponent from '../loading/loading';
import ListCardCountries from '../listcardcountries/listcardcountries';

const Countries = () => {

    const [countries, setCountries] = useState([]);
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState(true);
    const [getCountry, setGetCountry] = useState([]);
    const [loading, setLoading] = useState(false);

    const ref = useRef(null);

    const continents = [
        'Europe',
        'Asia',
        'North America',
        'South America',
        'Antarctica',
        'Africa',
        'Oceania'
    ].sort();

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const data = await axios.get('https://restcountries.com/v3.1/all');
                const newArrayCountry = data.data.map(country => {
                    return {
                        name: country.name.common,
                        oficialName: country.name.official,
                        languages: country.languages,
                        population: country.population,
                        area: country.area,
                        flagmini: country.flag,
                        region: country.region,
                        subregion: country.subregion,
                        continents: country.continents,
                        capital: country.capital,
                        flagPNG: country.flags.png,
                        flagSVG: country.flags.svg,
                        maps: country.maps.googleMaps
                    }
                }).sort((a, b) => a.name > b.name ? 1 : -1);
                setLoading(false);
                setCountries(newArrayCountry);
            } catch (er) {
                setLoading(false);
                console.log(er.message)
            }
        }

        getData();

    }, []);

    const generatePDF = () => {
        const doc = new jsPDF('p', 'pt', 'a4');

        const filename = new Date();

        const dataTable = countries.map(a => {
            return {
                country: a.name,
                region: a.region,
                subregion: a.subregion,
                population: a.population,
                area: a.area,
                capital: a.capital
            }
        });

        autoTable(doc, {
            styles: { fontSize: 9 },
            body: dataTable,
            columns: [
                { header: 'Country', dataKey: 'country' },
                { header: 'Region', dataKey: 'region' },
                { header: 'Subregion', dataKey: 'subregion' },
                { header: 'Population', dataKey: 'population' },
                { header: 'Area', dataKey: 'area' },
                { header: 'Capital', dataKey: 'capital' }
            ],
        })

        doc.save(`CountriesPDF_${filename.toISOString()}.pdf`)
    }

    const handleSelectContinent = (e) => {
        const optionSelect = document.getElementById("selectRegion").value;
        const inputSearch = ref.current.value;

        const arrayFilter = countries.filter((a) => {
            if (optionSelect === 'Select Continent' && inputSearch !== '')
                return a.name.toLowerCase().includes(inputSearch.toLowerCase());
            if (optionSelect !== 'Select Continent' && inputSearch !== '')
                return a.continents[0] === optionSelect && a.name.toLowerCase().includes(inputSearch.toLowerCase());
            if (optionSelect === 'Select Continent' && inputSearch === '')
                return countries
            return a.continents[0] === optionSelect;
        });

        if (arrayFilter.length === 0) {
            setEvents([]);
        } else {
            setFilter(false);
            setEvents(arrayFilter.sort((a, b) => a.name > b.name ? 1 : -1));
        }
    }

    const handleOnChangeSearch = (e) => {
        const stringSearch = e.target.value;
        const optionSelect = document.getElementById("selectRegion").value;

        const filterCountry = countries.filter(country => {
            if (stringSearch === '' && optionSelect !== 'Select Continent')
                return country.continents[0] === optionSelect
            if (stringSearch !== '' && optionSelect === 'Select Continent')
                return country.name.toLowerCase().includes(stringSearch.toLowerCase())
            if (stringSearch !== '' && optionSelect !== 'Select Continent')
                return country.continents[0] === optionSelect && country.name.toLowerCase().includes(stringSearch.toLowerCase())
            if (stringSearch === '' && optionSelect === 'Select Continent')
                return countries
            return country.name.toLowerCase().includes(stringSearch.toLowerCase())
        });

        if (filterCountry.length === 0) {
            setEvents([]);
        } else {
            setFilter(false);
            setEvents(filterCountry.sort());
        }
    }

    const stateCountries = filter ? countries : events;

    return (
        <>
            <div className="row" style={{ marginTop: "20px" }}>
                <div className="col">
                    <div className="form-group">
                        <InputSearch referenc={ref} eventOnChange={handleOnChangeSearch} />
                    </div>
                </div>
                <div className="col">
                    <div className="form-group">
                        <SelectContinents contienets={continents} eventSelect={handleSelectContinent} />
                    </div>
                </div>
                <div className="col">
                    <div className="form-group">
                        <button className="btn btn-primary" type="primary" onClick={generatePDF}>
                            PDF Countries
                        </button>
                    </div>
                </div>
            </div>
            {loading ? (
                <LoadingComponent />
            ) : (
                <ListCardCountries listCountries={stateCountries} setGetCountry={setGetCountry} />
            )}
            <ModalCountry dataCountries={getCountry} />
        </>
    )
}

export default Countries;
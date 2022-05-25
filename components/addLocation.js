import { useState } from "react";

const AddLocation = ({ pullRefresh, loading }) => {
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [population, setPopulation] = useState("");
    const [flag, setFlag] = useState("");

    const onCountryHandler = (e) => {
        setCountry(e.target.value);
    };

    const onCityHandler = (e) => {
        setCity(e.target.value);
    };

    const onPopulationHandler = (e) => {
        setPopulation(e.target.value);
    };

    const onCountryFlagHandler = (e) => {
        setFlag(e.target.value);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        loading(true);
        // Need to push this data to google sheet.
        const response = await fetch("/api/posts/[post]", {
            method: "POST",
            body: JSON.stringify({
                country,
                city,
                population
            })
        });

        // Clear the fields on submission
        setCountry("");
        setCity("");
        setPopulation("");
        if (pullRefresh) {
            pullRefresh();
            loading(false);
        }
    };

    return (
        <>
            <h1>Add a new location</h1>
            <form onSubmit={submitHandler}>
                <div className="input">
                    <p>Country:</p>
                    <input type="text" onChange={onCountryHandler} value={country} />
                </div>
                <div className="input">
                    <p>City:</p>
                    <input type="text" onChange={onCityHandler} value={city} />
                </div>
                <div className="input">
                    <p>Population:</p>
                    <input type="text" onChange={onPopulationHandler} value={population} />
                </div>
                <div className="input">
                    <p>Country flag:</p>
                    <p>To add a flag, please add country code. This can be found <a href="https://www.iso.org/obp/ui/#search" target="_blank">here</a></p>
                    <input type="text" onChange={onCountryFlagHandler} value={flag} />
                </div>
                <button>Submit a location</button>
            </form>
        </>
    );
};

export default AddLocation;
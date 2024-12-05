import React from "react";
import NavBarComponent from "../Navbar/Navbar";
import Summary from "./Summary/Summary";
import Filter from "./Filter/Filter";
import Graph from "./Graph/Graph";
import './Home.css'

const Home = () => {
    return (
        <>
        <NavBarComponent/>
            <div className="home">
                <div className="home-container">
                    <div className="Summary">
                        <Summary />
                    </div>
                    <div className="Filter">
                        <Filter />
                    </div>
                </div>
                <div className="graph-section">
                    <Graph />
                </div>
            </div>
        </>
    )
}

export default Home;
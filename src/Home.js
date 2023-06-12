import React, {useState} from 'react';

import {SimulationParamForm} from './SimulationParamForm'
import {ReportSimulationStatus} from "./ReportSimulationStatus";

export const Home = () => {
    // Set the state of the simulation & monitoring interval. Only one simulation running at a time on the backend.
    // Example: {inProgress: true, monitorInterval: 5 }
    const [processing, setProcessing] = useState({inProgress: false});

    return (
        <div className="flex flex-col h-screen">
            <h1 className="text-center text-xl font-bold my-5">SMS Simulation</h1>
            <div className="mx-auto grid grid-rows-n">
                <SimulationParamForm processing={processing}
                                     setSimStart={(interval) => setProcessing({inProgress: true, monitorInterval: interval })}/>

                { processing.inProgress &&
                    <ReportSimulationStatus processing={processing} processingComplete={() => setProcessing({inProgress: false})}/>
                }
            </div>
        </div>
    );
}


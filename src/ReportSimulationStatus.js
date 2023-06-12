import React, {useEffect, useRef, useState} from 'react';
import moment from "moment";
import axios from "axios";

const tableHeaderStyle = "text-left pr-1 w-72";
export const ReportSimulationStatus = ({processing, processingComplete}) => {

    const [update, setUpdate] = useState({}); // To store status updates
    const statusUpdateIntervalRef = useRef();   // Reference to timer for status updates at specified interval
    const getSimulationStatus = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + "sim/status")

            // Update simulation stats
            setUpdate({
                ...response.data.stats, ...{
                    isActive: response.data.isActive,
                    updateTime: moment().format("DD:MM:YYYY HH:mm:ss")
                }
            });

        } catch (e) {
            setUpdate({message: "Unknown error from server. Cannot retrieve status"});
        }
    }

    useEffect(() => {
        async function getSimulationStatusWrapper() {
            await getSimulationStatus()
        }

        // Get the first update after which updates are fetched at every 'processing.monitorInterval' seconds
        getSimulationStatusWrapper();

        statusUpdateIntervalRef.current = setInterval(getSimulationStatus, processing.monitorInterval * 1000);
        return () => clearInterval(statusUpdateIntervalRef.current);
    }, [processing.monitorInterval]);


    useEffect(() => {
        // If there are no new updates from server disable server updates
        if (update.hasOwnProperty("isActive") && !update["isActive"]) {
            clearInterval(statusUpdateIntervalRef.current);
        }
    }, [update]);

    return (
        <div className="flex flex-col my-5 mx-auto">
            <div className="my-1 text-center text-lg font-bold">Simulation Status</div>
            {!update.hasOwnProperty("message") &&
                <div className="p-5 rounded-md bg-gray-100 text-sm md:text-md">
                    <>
                        <table className="table-auto w-80 md:w-96">
                            <tbody>
                            <tr>
                                <th className={tableHeaderStyle}>Received</th>
                                <td>{update["received"]}</td>
                            </tr>
                            <tr>
                                <th className={tableHeaderStyle}>Processed</th>
                                <td>{update["processed"]}</td>
                            </tr>
                            <tr>
                                <th className={tableHeaderStyle}>Errors</th>
                                <td>{update["errors"]}</td>
                            </tr>
                            <tr>
                                <th className={tableHeaderStyle}>Avg Processing time (seconds)</th>
                                <td>{update["avgProcessingTime"]}</td>
                            </tr>
                            <tr>
                                <th className={tableHeaderStyle}>Status</th>
                                <td className={`font-semibold ${update["isActive"] ? 'text-green-600' : 'text-red-400'}`}>{update["isActive"] ? "Active" : "In-Active"}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div className="text-left pt-3 text-xs font-bold">
                            Last updated
                            <span className="pl-5 font-medium">{update["updateTime"]}</span>
                        </div>
                    </>
                </div>
            }

            <div className="flex flex-col p-5 text-sm md:text-md">
                {update.hasOwnProperty("message") && update["message"].length &&
                    <div className="text-center pt-3 text-sm font-bold text-red-500">
                        {update.message}
                    </div>
                }
                {(update.hasOwnProperty("isActive") && !update["isActive"]) &&
                    <div>
                        <div className="flex justify-center mt-5">
                            <button
                                className="align-center px-5 py-2 bg-gray-300 text-sm font-semibold text-gray-700 rounded-sm"
                                onClick={() => processingComplete()}
                            >
                                Quit
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}


import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import axios from "axios";

const labelStyle = "pb-1 text-sm font-semibold";
const formErrorPlaceholder = "my-1 py-2 leading-4 text-sm";
const formErrorStyle = "py-1 leading-4 text-sm text-red-500";

export const SimulationParamForm = ({processing, setSimStart}) => {
    const {register, reset, handleSubmit, formState: {errors}} = useForm();
    const [disableForm, setDisableForm] = useState(false);
    const [message, setMessage] = useState(undefined);

    const inputStyle = `flex bg-white px-2 py-1 text-sm rounded-sm ${processing.inProgress || disableForm ? 'text-gray-400' : 'text-black'}`
    const submitButtonStyle = `font-semibold px-2 py-2 my-2 rounded-sm ${processing.inProgress || disableForm ? 'bg-blue-300 text-gray-300' : 'bg-blue-700 text-white'}`

    useEffect(() => {
        let defaultValues = {};
        defaultValues.numMessages = 1000;
        reset({...defaultValues});
    }, [reset]);

    const submitJob = async (data) => {
        try {
            const customConfig = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const response = await axios.post(process.env.REACT_APP_API_URL + "sim/start", data, customConfig);
            return response.data.status;
        } catch (e) {
            console.log("ERROR: " + e);
        }

        return "FAILURE";
    }

    const onSubmit = async (data) => {
        setMessage(undefined);
        setDisableForm(true);
        const status = await submitJob(data);

        if (status === "SUCCESS")
            setSimStart(data.monitorInterval);
        else if (status === "CONFLICT")
            setMessage("Simulation is already running");
        else if (status === "INVALID")
            setMessage("Invalid parameters");
        else
            setMessage("Unknown error submitting job");
        setDisableForm(false);
    }

    return (
        <div className="m-auto">
            <form className="flex flex-col bg-blue-100 p-5 rounded-md" onSubmit={handleSubmit(onSubmit)}>

                <div className="flex flex-col">
                    <label className={labelStyle}>Number of messages</label>
                    <input
                        className={inputStyle}
                        placeholder="Number of messages"
                        disabled={processing.inProgress}
                        {...register("numMessages", {required: false, min: 1, pattern: /^\d+$/})}
                    />
                    {!errors.numMessages && <span className={formErrorPlaceholder}></span>}
                    {errors.numMessages?.type &&
                        <span className={formErrorStyle}>Required number. Minimum 1</span>}
                </div>

                <div className="flex flex-col">
                    <label className={labelStyle}>Failure Percentage</label>
                    <input
                        className={inputStyle}
                        placeholder="Failure percentage"
                        disabled={processing.inProgress}
                        {...register("failurePct", {required: true, min: 0, max: 100, pattern: /^\d+$/})}
                    />
                    {!errors.failurePct && <span className={formErrorPlaceholder}></span>}
                    {errors.failurePct?.type &&
                        <span className={formErrorStyle}>Required number. Range 0 to 100</span>}
                </div>

                <div className="flex flex-col">
                    <label className={labelStyle}>Number of senders</label>
                    <input
                        className={inputStyle}
                        placeholder="Number of senders"
                        disabled={processing.inProgress}
                        {...register("numSenders", {required: true, min: 1, max: 256, pattern: /^\d+$/})}
                    />
                    {!errors.numSenders && <span className={formErrorPlaceholder}></span>}
                    {errors.numSenders?.type &&
                        <span className={formErrorStyle}>Required number. Range 1 to 256</span>}
                </div>

                <div className="flex flex-col">
                    <label className={labelStyle}>Status monitoring interval (seconds)</label>
                    <input
                        className={inputStyle}
                        placeholder="Monitoring interval (secs)"
                        disabled={processing.inProgress}
                        {...register("monitorInterval", {required: true, min: 1, max: 600, pattern: /^\d+$/})}
                    />
                    {!errors.monitorInterval && <span className={formErrorPlaceholder}></span>}
                    {errors.monitorInterval?.type &&
                        <span className={formErrorStyle}>Required number. Range 1 to 600</span>}
                </div>

                <button className={submitButtonStyle}
                        disabled={processing.inProgress}
                        type="submit">Submit
                </button>
            </form>
            {message &&
                <div className="py-2 text-red-600 text-sm font-bold">{message}</div>
            }
        </div>
    );
}


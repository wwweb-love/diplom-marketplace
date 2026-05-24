import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"

export const useFetchData = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)

    const fetchData = async (request, actionError, actionData, requestArguments=[] ) => {
        setIsLoading(true)

        try {
            const { data, error } = await request(...requestArguments)
            if (error) {
                dispatch(actionError(error));
                navigate("/errors");
            } else {
                dispatch(actionData(data));
            }
        } catch (err) {
            dispatch(actionError(err.message));
            navigate("/errors");
        } finally {
            setIsLoading(false);
        }

    }


    const fetchMultiplyData = async (requestsArray, actionError, actionsArray = [], requestArguments = []) => {
        setIsLoading(true)

        try {
            const promises = requestsArray.map((request, index) => {
                const args = requestArguments[index]
                return request(...args)
            })

            const results = await Promise.all(promises)

            results.forEach((result, index) => {
                const { data, error } = result
                const action = actionsArray[index]
                if (error) {
                    dispatch(actionError(error))
                    navigate("/errors")
                } else if (action) {
                    dispatch(action(data))
                }
            })

            
        } catch (e) {
            dispatch(actionError(err.message));
            navigate("/errors");
        } finally {
            setIsLoading(false);
        }
    }

    return { fetchData, fetchMultiplyData, isLoading };
}

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import { selectorNotificationMessage } from "../../selectors";
import { actionNotificationMessage } from "../../actions";

const NotificationContainer = ({ className, children }) => {
    const dispatch = useDispatch()

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            dispatch(actionNotificationMessage(""))
        }, 3000); // 3 секунды

        // Очистка таймера при размонтировании
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className={className}>
            {children}
        </div>
    )
}

export const Notification = styled(NotificationContainer)`
    max-width: 400px;
    position: fixed;
    bottom: 50px;
    right: 50px;
    font-size: 18px;
    padding: 12px 20px;
    border-radius: 15px;
    color: white;
    background-color: green;
    // background-color: red;
    
`
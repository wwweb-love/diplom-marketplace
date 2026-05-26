const initialStateAdmin = {
    adminData: "", // данные от users/products/categories
    adminDataModal: "", // редлактируемые данные от users/products/categories
    adminDataType: "users", // выбранная категория данных users/products/categories
    notificationMessage: "", // сообщение после редактирования/удаления
    showModalAdminData: false, // состояние показа модального окна редактирования данных
    methodSaveModalAdminData: "" // метод сохранения данных edit/edit-user-pass/create
}

export const admin = (state = initialStateAdmin, action) => {
    switch (action.type) {
        // cases
        case "SET_ADMIN_DATA": {
            return {
                ...state,
                adminData: action.payload
            }
        }

        case "SET_ADMIN_DATA_MODAL": {
            return {
                ...state,
                adminDataModal: action.payload
            }
        }   

        case "SET_ADMIN_DATA_TYPE": {
            return {
                ...state,
                adminDataType: action.payload
            }
        }

        case "SET_NOTIFICATION_MESSAGE": {
            return {
                ...state,
                notificationMessage: action.payload
            }
        }

        case "SET_SHOW_MODAL_ADMIN_DATA": {
            return {
                ...state,
                showModalAdminData: action.payload
            }
        }

        case "METHOD_SAVE_MODAL_ADMIN_DATA": {
            return {
                ...state,
                methodSaveModalAdminData: action.payload
            }
        }

        default: 
            return state
    }
}
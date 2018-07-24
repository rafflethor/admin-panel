import { Map } from 'immutable'

/**
 * Possible types of action
 */
export const actionTypes = {
    MODAL: {
        OPEN: '@rafflethor/MODAL/OPEN',
        CLOSE: '@rafflethor/MODAL/CLOSE'
    }
}


/**
 * Initial reducer state
 */
export const initialState = Map({
    isLoading: false,
    error: null,
    openModalId: '',
    isModalOpen: false
})

/**
 */
const modalReducers = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.MODAL.OPEN:
            return state
                .set('isLoading', false)
                .set('isModalOpen', true)
                .set('openModalId', action.openModalId)

        case actionTypes.MODAL.CLOSE:
            return state
                .set('isLoading', false)
                .set('isModalOpen', false)

        default:
            return state
    }
}

export const actionCreators = {
    openModal: (openModalId) => {
        return { type: actionTypes.MODAL.OPEN, openModalId }
    },
    closeModal: () => {
        return { type: actionTypes.MODAL.CLOSE }
    },
}

export default modalReducers

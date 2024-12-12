import { createSlice } from '@reduxjs/toolkit';

const openFunction = (state, action) => {    
    if (state) {
        Object.keys(state).forEach((key) => {
            state[key].isOpen = false;
        });
    }

    if (action.payload && action.payload.id) {
        state[action.payload.id] = { isOpen: true };
    }
};

const closeFunction = (state, action) => {
    const { id } = action.payload;
    
    if (state[id]) {
        state[id].isOpen = false;
    }
};

const initialLibraryOptions = JSON.parse(localStorage.getItem("libraryOptions")) || {
    'view-mode': 'list',
    'sort-by': 'recents',
};

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        subContext: {
            contexts: {
                profile: { isOpen: false },
                'create-playlist': { isOpen: false },
                'track-list-view-as': { isOpen: false },
                'library-options': { isOpen: false },
            }  
        },
        dialog: { isOpen: false },
        modal: { 
            'login-prompt': { isOpen: false },
            'edit-playlist': { isOpen: false },
        },
        notification: { isOpen: false },
        viewMode: 'compact',
        'library-options': initialLibraryOptions,
    },
    reducers: {
        openSubContext: (state, action) => openFunction(state.subContext.contexts, action),
        closeSubContext: (state) => {
            if (state.subContext.contexts) {
                Object.keys(state.subContext.contexts).forEach((key) => {
                    state.subContext.contexts[key].isOpen = false;
                });
            }
        },
        closeSpecificSubContext: (state, action) => closeFunction(state.subContext.contexts, action),
        openModal: (state, action) => openFunction(state.modal, action),
        closeModal: (state, action) => closeFunction(state.modal, action),
        openDialog: (state) => {
            state.modal.isOpen = true;
        },
        closeDialog: (state) => {
            state.modal.isOpen = false;
        },
        setViewMode: (state, action) => {
            state.viewMode = action.payload; 
        },
        setLibraryOptions: (state, action) => {
            state['library-options']['view-mode'] = action.payload['view-mode'];
            state['library-options']['sort-by'] = action.payload['sort-by'];
            localStorage.setItem("libraryOptions", JSON.stringify(state['library-options']));
        }
    }
});

export const {
  openSubContext,
  closeSubContext,
  closeSpecificSubContext,
  openModal,
  closeModal,
  setViewMode,
  setLibraryOptions,
} = uiSlice.actions;
export default uiSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const openFunction = (state, action) => {    
    if (state) {
        Object.keys(state).forEach((key) => {
            state[key].isOpen = false;
        });
    }

    if (action.payload && action.payload.name) {
        state[action.payload.name].isOpen = true;

        if (action.payload.id) {
            state[action.payload.name].id = action.payload.id;
        }
    }
};

const closeFunction = (state, action) => {
    const { name } = action.payload;
    
    if (state[name]) {
        state[name].isOpen = false;
        state[name].id = '';
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
                'library-item-menu': {
                    isOpen: false,
                    id: '',
                }
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
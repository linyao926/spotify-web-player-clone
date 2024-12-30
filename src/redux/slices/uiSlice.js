import { createSlice } from '@reduxjs/toolkit';

const openFunction = (state, action) => {
    if (!state) return;

    Object.keys(state).forEach((key) => {
        state[key].isOpen = false;
    });

    const { name, id } = action.payload || {};

    if (name && state[name]) {
        state[name].isOpen = true;
        if (id !== undefined) {
            state[name].id = id;
        }
    } else {
        console.warn(`Key "${name}" không tồn tại trong state.`);
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
            profile: { isOpen: false },
            'create-playlist': { isOpen: false },
            'track-list-view-as': { isOpen: false },
            'library-options': { isOpen: false },
            'normal-card-menu': {
                isOpen: false,
                id: '',
            },
            'library-card-menu': {
                isOpen: false,
                id: '',
            } 
        },
        modal: { 
            'login-prompt': { isOpen: false },
            'edit-playlist': { isOpen: false },
            'track-credit': { isOpen: false },
        },
        notification: { isOpen: false },
        viewMode: 'compact',
        'library-options': initialLibraryOptions,
        panel: {
            'queue': { isOpen: false, nowPlayingIsOpen: false },
            'now-playing': { isOpen: false },
        }
    },
    reducers: {
        openSubContext: (state, action) => openFunction(state.subContext, action),
        closeSubContext: (state) => {
            if (state.subContext) {
                Object.keys(state.subContext).forEach((key) => {
                    state.subContext[key].isOpen = false;
                });
            }
        },
        closeSpecificSubContext: (state, action) => closeFunction(state.subContext, action),
        openModal: (state, action) => openFunction(state.modal, action),
        closeModal: (state, action) => closeFunction(state.modal, action),
        openPanel: (state, action) => {
            Object.keys(state.panel).forEach((key) => {
                if (key === 'now-playing') {
                    state.panel['queue'].nowPlayingIsOpen = state.panel[key].isOpen;
                }
                state.panel[key].isOpen = false;
            });
        
            const { name } = action.payload || {};
        
            if (name && state.panel[name]) {
                state.panel[name].isOpen = true;
            }
        },
        closePanel: (state, action) => {
            const { name } = action.payload;

            if (name === 'queue') {
                state.panel['now-playing'].isOpen = state.panel['queue'].nowPlayingIsOpen;
            }
    
            if (state.panel[name]) {
                state.panel[name].isOpen = false;
            }
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
  openPanel,
  closePanel,
  setViewMode,
  setLibraryOptions,
} = uiSlice.actions;
export default uiSlice.reducer;
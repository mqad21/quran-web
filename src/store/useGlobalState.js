import React, { useState } from 'react';

function useGlobalStore() {
    const [state, setState] = useState(
        {
            fontSize: localStorage.getItem('fontSize') || 1,
            darkMode: localStorage.getItem('darkMode') || false,
            savedSurah: JSON.parse(localStorage.getItem('savedSurah')) || { surah: null, ayat: null },
            snack: { open: false, message:"" },
            scrollTo: false
        }
    );

    React.useEffect(() => {
        localStorage.setItem('fontSize', state.fontSize);
    }, [state.fontSize]);

    React.useEffect(() => {
        localStorage.setItem('darkMode', state.darkMode);
    }, [state.darkMode]);

    React.useEffect(() => {
        localStorage.setItem('savedSurah', JSON.stringify(state.savedSurah));
        console.log(state.savedSurah)
    }, [state.savedSurah]);

    const actions = (action) => {
        const { type, payload } = action;
        switch (type) {
            case 'setState':
                return setState(payload);
            default:
                return state;
        }
    }
    return { state, actions };
}

export default useGlobalStore;
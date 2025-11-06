export const loadState = (key: string) => {
    try {
        const serializedState = localStorage.getItem(key);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        console.warn('Error loading data from localStorage:', error);
        return undefined;
    }
};

export const saveState = (key: string, state: any) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(key, serializedState);
    } catch (error) {
        console.warn('Error saving data to localStorage:', error);
    }
};

export const clearState = (key: string) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.warn('Error clearing data from localStorage:', error);
    }
};
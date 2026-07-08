import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export const clientsStore = createSlice({
    name: 'clients',
    initialState: {
        profile: null,
    },
    reducers: {
        setProfile: (state, action: PayloadAction<any>) => {
            state.profile = action.payload
        }
    }
})

export default clientsStore.reducer
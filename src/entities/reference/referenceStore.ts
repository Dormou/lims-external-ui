import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

import type { BranchMeta } from "../../features/applications/api/types/types"

interface InitialState {
  metadata: BranchMeta
}

const initalState: InitialState = {
  metadata: undefined as unknown as BranchMeta,
}

export const referenceStore = createSlice({
  name: 'reference',
  initialState: {
    metadata: initalState.metadata,
  },
  reducers: {
    setMetadata: (state, action: PayloadAction<BranchMeta>) => {
      state.metadata = action.payload
    }
  }
})

export default referenceStore.reducer
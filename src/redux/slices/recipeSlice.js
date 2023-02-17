import { createSlice } from "@reduxjs/toolkit";
import { getUniqueId } from "../../Common/Constants";

const initialState = {
  id: "",
  title: "",
  type: "",
  ingredients: [],
  steps: [
    {
      id: getUniqueId(),
      errors: [],
      imgSrc: "",
      value: null,
    },
  ],
  finish: { errors: [], imgSrc: "", value: null },
  createdAt: "",
};
export const recipeSlice = createSlice({
  name: "recipe_slice",
  initialState: initialState,
  reducers: {
    handlePrimitiveState: (state, action) => {
      let { name, value } = action.payload;
      state[name] = value;
    },
    addItem: (state, action) => {
      let { name, value } = action.payload;
      state[name].push(value);
    },
    editItem: (state, action) => {
      let { name, value } = action.payload;
      state[name].map((item, ind) => {
        if (item.id === value.id) {
          state[name][ind] = value;
        }
      });
    },
    editStep: (state, action) => {
      let { id, val, type } = action.payload;
      state.steps.map((item, ind) => {
        if (item.id === id) {
          if (type == "image") {
            state.steps[ind]["imgSrc"] = val;
          } else {
            state.steps[ind]["value"] = val;
          }
        }
      });
    },
    editFinish: (state, action) => {
      let { val, type } = action.payload;
      if (type == "image") {
        state.finish["imgSrc"] = val;
      } else {
        state.finish["value"] = val;
      }
    },
    handleStepValidation: (state, action) => {
      state.steps.map((item, ind) => {
        state.steps[ind]["errors"] = [];
        if (!Boolean(item.value)) {
          state.steps[ind]["errors"].push({
            message: "* Please fill this step",
          });
        }
      });
    },
    handleFinishValidation: (state, action) => {
      state.finish["errors"] = [];
      if (!Boolean(state.finish.value)) {
        state.finish["errors"].push({
          message: "Please fill the final step",
        });
      }
      if (!Boolean(state.finish.imgSrc)) {
        state.finish["errors"].push({
          message: "Please Upload the final image",
        });
      }
    },
  },
});

export const getRecipe = (state) => state.recipeReducer;
export const {
  addItem,
  editItem,
  editStep,
  editFinish,
  handlePrimitiveState,
  handleStepValidation,
  handleFinishValidation,
} = recipeSlice.actions;
export default recipeSlice.reducer;

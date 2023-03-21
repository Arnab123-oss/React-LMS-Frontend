import { createReducer } from '@reduxjs/toolkit';

export const adminReducer = createReducer(
  {},
  {
    createCourseRequest: state => {
      state.loading = true;
    },
    createCourseSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    createCourseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteCourseRequest: state => {
        state.loading = true;
      },
      deleteCourseSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      deleteCourseFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      
      addLecturesRequest: state => {
        state.loading = true;
      },
      addLecturesSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      addLecturesFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },

      deleteLecturesRequest: state => {
        state.loading = true;
      },
      deleteLecturesSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      deleteLecturesFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },

      clearError: state => {
        state.error = null;
      },
      clearMessage: state => {
        state.message = null;
      },
  }
);

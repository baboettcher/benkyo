export default function reducer( state = {
  profile: {},
  enrolledClasses: {},
  all_assignments: [],
  active_assignment: null
  }, action ) {

  switch (action.type) {
    case 'SET_CURRENT_PROFILE': {
      return {...state,
        profile: action.payload.profile
      }
    }
    case 'SET_CURRENT_CLASSES': {
      return {...state,
        enrolledClasses: action.payload.enrolledClasses
      }
    }
    case 'SET_CURRENT_ASSIGNMENTS': {
      return {...state,
        all_assignments: action.payload.all_assignments
      }
    }
    case 'STUDENT_LOG_OUT': {
      return {...state,
        profile: {},
        enrolledClasses: {},
        all_assignments: []
      }
    }
    case 'SET_ACTIVE_ASSIGNMENT': {
      return {...state, 
        active_assignment: action.payload.active_assignment
      }
    }
  }
  return state;
}
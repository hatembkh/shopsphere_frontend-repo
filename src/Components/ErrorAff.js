// ErrorAff.js
import Alert from 'react-bootstrap/Alert';
import { useSelector, useDispatch } from 'react-redux';
import './ErrorAff.css'; // We'll create this CSS file next
import { CLEARERROR, START_ERROR_REMOVAL } from '../Redux/ActionTypes/errorActionTypes';

const ErrorAff = () => {
  console.log("ErrorAff component rendering")
  // const errors = useSelector(state => state.ErrorReducer || []);
     const errors = useSelector(state => {
        console.log('Redux error state:', state.ErrorReducer); // Debug 6
        return state.ErrorReducer || [];
    });
  const dispatch = useDispatch();

  return (
    <div className="error-container">
      {errors.map((error) => (
        <Alert
          key={error.id}
          variant="danger"
          dismissible
          onClose={() => {
            dispatch({ type: START_ERROR_REMOVAL, payload: error.id });
            setTimeout(() => dispatch({ type: CLEARERROR, payload: error.id }), 300);
          }}
          className={`error-alert ${error.removing ? 'animate-out' : 'animate-in'}`}
        >
          {error.msg}
        </Alert>
      ))}
    </div>
  );
};

export default ErrorAff;


// const ErrorAff = () => {

//     const errors = useSelector(state => state.ErrorReducer)
//     return (
//         <div>
//             {errors && errors.map((el,i,t) => (
//                 <Alert key={i} variant='danger'>
//                     {el.msg}
//                 </Alert>
//             ))}
//         </div>
//     )
// }

// export default ErrorAff
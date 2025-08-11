import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../Redux/Actions/authActions';
import ErrorAff from './ErrorAff';
import { clearAll } from '../Redux/Actions/ErrorActions';
import { CLEAR_SUCCESS } from '../Redux/ActionTypes/authActionTypes';



const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageFile, setImageFile] = useState(null)
  const [adress, setAdress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState(0)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loading = useSelector(state => state.AuthReducer.loading || false);
  const success = useSelector(state => state.AuthReducer.success)


  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password, adress, phoneNumber, imageFile }, navigate));
  };

  useEffect(() => {
    dispatch(clearAll());
    return () => dispatch(clearAll());
  }, [dispatch]);

  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.readAsDataURL(file)
    }
  }
    useEffect(()=>{
      if (success) {
        const timer = setTimeout(()=>{
          dispatch({type: CLEAR_SUCCESS})
        },3000)
        return ()=> clearTimeout(timer)
      }
      
    },[success,dispatch])

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Register</h2>
        <ErrorAff />
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter your name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your Password"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Adress</Form.Label>
            <Form.Control
              onChange={(e) => setAdress(e.target.value)}
              type="text"
              placeholder="Enter your Adress"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="number"
              placeholder="Enter your Phone Number"

            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              onChange={handleImageChange}
              type="file"

            />
          </Form.Group>

          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              Adding New Account...
            </>
          ) :
            <Button onClick={handleRegister} variant="dark" type="submit" className="register-btn">
              Register
            </Button>

          }
        </Form>
      </div>
    </div>
  );
};

export default Register;


import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { current, editUser } from '../Redux/Actions/authActions';
import { CLEAR_SUCCESS } from '../Redux/ActionTypes/authActionTypes';


const EditUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(current());
  }, [dispatch]);

  const user = useSelector((state) => state.AuthReducer.user);
  const errors = useSelector(state => state.AuthReducer.errors || []);
  const loading = useSelector(state => state.AuthReducer.loading || false);
  const success = useSelector(state => state.AuthReducer.success)

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [adress, setAdress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  // Helper function to get error message for a specific field
  const getErrorMessage = (fieldPath) => {
    if (!Array.isArray(errors)) return null;
    const error = errors.find(err => err.path === fieldPath);
    return error ? error.msg : null;
  };

  useEffect(() => {
    if (user && Object.keys(user).length >0) {
      setName(user.name || '');
      setEmail(user.email || '');
      setAdress(user.adress || '');
      setPhoneNumber(user.phoneNumber || '');

      // Set existing image preview if user has one
      if (user.image && user.image.path) {
        setImagePreview(user.image.path);
      }
    }
  }, [user]);

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(editUser(user?._id, {
      name,
      email,
      adress,
      phoneNumber,
      imageFile
    }, navigate));
  };



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(()=>{
    if (success) {
      const timer = setTimeout(()=>{
        dispatch({type: CLEAR_SUCCESS})
      },3000)
      return ()=> clearTimeout(timer)
    }
    
  },[success,dispatch])

  return (
    
    // <div className="edit-user-container">
    <div className="edit-user-container vh-100 d-flex justify-content-center align-items-center p-4 bg-light">
      
      

      <div className="edit-user-card bg-white p-4 p-md-5 border-0 shadow-sm" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className="edit-user-title text-center mb-4 text-uppercase fw-light">Edit Profile</h2>
        <Form onSubmit={handleEdit}>

          {/* Name Field */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">
              <i className="fas fa-user me-2 text-primary"></i>
              Full Name <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter your full name"
              isInvalid={!!getErrorMessage('name')}
              className="form-control-lg"
              required
            />
            {getErrorMessage('name') && (
              <Form.Control.Feedback type="invalid">
                {getErrorMessage('name')}
              </Form.Control.Feedback>
            )}
            {name && !getErrorMessage('name') && (
              <Form.Text className="text-success">
                <i className="fas fa-check-circle me-1"></i>
                Name looks good!
              </Form.Text>
            )}
          </Form.Group>

          {/* Email Field */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">
              <i className="fas fa-envelope me-2 text-primary"></i>
              Email Address <span className="text-danger">*</span>
              <small className="text-muted ms-2">(for order notifications)</small>
            </Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email address"
              isInvalid={!!getErrorMessage('email')}
              className="form-control-lg"
              required
            />
            {getErrorMessage('email') && (
              <Form.Control.Feedback type="invalid">
                {getErrorMessage('email')}
              </Form.Control.Feedback>
            )}
            {email && !getErrorMessage('email') && email.includes('@') && (
              <Form.Text className="text-success">
                <i className="fas fa-check-circle me-1"></i>
                We'll send order updates here
              </Form.Text>
            )}
          </Form.Group>

          {/* Address Field */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">
              <i className="fas fa-map-marker-alt me-2 text-primary"></i>
              Delivery Address <span className="text-danger">*</span>
              <small className="text-muted ms-2">(where we'll ship your orders)</small>
            </Form.Label>
            <Form.Control
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
              type="text"
              placeholder="Enter your complete delivery address"
              isInvalid={!!getErrorMessage('adress')}
              className="form-control-lg"
              required
              as="textarea"
              rows={2}
            />
            {getErrorMessage('adress') && (
              <Form.Control.Feedback type="invalid">
                {getErrorMessage('adress')}
              </Form.Control.Feedback>
            )}
            {adress && !getErrorMessage('adress') && adress.length > 10 && (
              <Form.Text className="text-success">
                <i className="fas fa-check-circle me-1"></i>
                Address looks complete
              </Form.Text>
            )}
            <Form.Text className="text-muted">
              <i className="fas fa-info-circle me-1"></i>
              Include street, city, state, and postal code for accurate delivery
            </Form.Text>
          </Form.Group>

          {/* Phone Number Field */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">
              <i className="fas fa-phone me-2 text-primary"></i>
              Phone Number <span className="text-danger">*</span>
              <small className="text-muted ms-2">(for delivery updates & support)</small>
            </Form.Label>
            <PhoneInput
              country={'us'}
              value={phoneNumber}
              onChange={setPhoneNumber}
              inputStyle={{
                width: '100%',
                height: '48px', // Larger size
                fontSize: '16px',
                border: getErrorMessage('phoneNumber') ? '1px solid #dc3545' : '1px solid #ced4da',
                borderRadius: '0.375rem',
                paddingLeft: '48px',
              }}
              containerStyle={{
                width: '100%'
              }}
              buttonStyle={{
                border: getErrorMessage('phoneNumber') ? '1px solid #dc3545' : '1px solid #ced4da',
                borderRadius: '0.375rem 0 0 0.375rem',
                height: '48px', // Match input height
              }}
              dropdownStyle={{
                zIndex: 1000
              }}
              placeholder="Enter your phone number"
              enableSearch={true}
              searchPlaceholder="Search countries..."
              autoFormat={true}
              countryCodeEditable={false}
              specialLabel=""
            />
            {getErrorMessage('phoneNumber') && (
              <div className="invalid-feedback d-block">
                {getErrorMessage('phoneNumber')}
              </div>
            )}
            {phoneNumber && phoneNumber.length > 6 && !getErrorMessage('phoneNumber') && (
              <Form.Text className="text-success">
                <i className="fas fa-check-circle me-1"></i>
                We'll contact you at: +{phoneNumber}
              </Form.Text>
            )}
          </Form.Group>

          {/* Profile Image Field */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">
              <i className="fas fa-camera me-2 text-primary"></i>
              Profile Picture
              <small className="text-muted ms-2">(optional)</small>
            </Form.Label>

            {/* Image Preview */}
            {imagePreview && (
              <div className="mb-3">
                <div className="d-flex align-items-center">
                  <img
                    src={imagePreview}
                    alt="Profile preview"
                    className="rounded-circle me-3"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                  <div>
                    <p className="mb-1 fw-medium">Current Photo</p>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => {
                        setImagePreview(null);
                        setImageFile(null);
                      }}
                    >
                      <i className="fas fa-trash me-1"></i>
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <Form.Control
              onChange={handleImageChange}
              type="file"
              accept="image/*"
              className="form-control-lg"
            />
            <Form.Text className="text-muted">
              <i className="fas fa-info-circle me-1"></i>
              Upload a clear photo (JPG, PNG). Max 5MB.
            </Form.Text>
          </Form.Group>

          {/* Submit Button */}
          <div className="d-grid gap-2 pt-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="edit-user-btn"
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Updating Profile...
                </>
              ) : (
                <>
                  <i className="fas fa-save me-2"></i>
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </Form>
      </div>
    </div>
    
  );
};

export default EditUser;
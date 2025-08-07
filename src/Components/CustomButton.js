// components/CustomButton.js
import { Button } from 'react-bootstrap';
import './CustomButton.css';

const CustomButton = ({ children, ...props }) => {
  return (
    <Button {...props} className={`custom-btn ${props.className || ''}`}>
      {children}
    </Button>
  );
};

export default CustomButton;
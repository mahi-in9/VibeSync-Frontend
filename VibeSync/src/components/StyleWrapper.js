import styled from 'styled-components';
export const CTAButton = styled.button`
  background-color: #6b4eff;
  color: white;
  font-size: 1rem;
  font-weight: 700;
  padding: 14px 30px;
  border-radius: 2em;
  cursor: pointer;
  border: none;
  display: inline-flex;
  align-items: center;
  box-shadow: 1px 5px 0 0 #4e36b8;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 1px 8px 0 0 #4e36b8;
  }

  &:active {
    transform: translateY(3px);
    box-shadow: 0 0 0 0 #4e36b8;
  }
`;

export const VibeButton = styled.button`
background-color: #6b4eff;
  color: white;
  font-size: 1rem;
  text-align:center;
  justyfy-content:center;
  font-weight: 700;
  padding: 14px 60px;
  border-radius: 2em;
  cursor: pointer;
  border: none;
  width:100%;
  display: inline-flex;
  align-items: center;
  box-shadow: 1px 5px 0 0 #4e36b8;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 1px 8px 0 0 #4e36b8;
  }

  &:active {
    transform: translateY(3px);
    box-shadow: 0 0 0 0 #4e36b8;
  }
`;

export const CTASection = styled.section`
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #e9e8ff 0%, #f6f5ff 50%, #dbd2fa 100%);
  padding: 0 20px;
  text-align: center;
`;

export const CTAContent = styled.div`
  max-width: 700px;
  color: #5e44b3ff;
  text-align: center;
  margin-top: 60px;

  h2 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 20px;
    line-height: 1.2;
  }

  p {
    font-size: 1.2rem;
    color: gray;
    margin-bottom: 40px;
    line-height: 1.6;
  }
`;



export const Content = styled.div`
  max-width: 700px;
  color: #5e44b3ff;

  h2 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 20px;
    line-height: 1.2;
  }

  p {
    font-size: 1.2rem;
    color: gray;
    margin-bottom: 40px;
    line-height: 1.6;
  }
`;

export const StyledWrapper = styled.div`
  button {
    background-color: #6b4eff;
    color: white;
    font-size: 15px;
    font-weight: bold;
    padding: 10px 18px;
    border-radius: 2em;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 1px 5px 0 0 #4e36b8;
  }
  button:hover {
    transform: translateY(-3px);
    box-shadow: 1px 8px 0 0 #4e36b8;
  }
  button:active {
    transform: translateY(3px);
    box-shadow: 0 0 0 0 #4e36b8;
  }
`;

export const StyledButton = styled.button`
  width: 100%;
  background-color: #6b4eff;
  color: white;
  font-size: 1rem;
  font-weight: 700;
  padding: 14px 30px;
  border-radius: 2em;
  cursor: pointer;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 5px 0 0 #4e36b8;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 1px 8px 0 0 #4e36b8;
  }

  &:active:not(:disabled) {
    transform: translateY(3px);
    box-shadow: 0 0 0 0 #4e36b8;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: linear-gradient(135deg, #e9e8ff 0%, #f6f5ff 50%, #dbd2fa 100%);
`;
export const Card = styled.div`
  max-width: 400px;
  width: 100%;
  padding: 2.5rem;
  border-radius: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #f9f8ff 0%, #f3f1ff 50%, #e5ddff 100%);
`;
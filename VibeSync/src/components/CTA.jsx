import React from "react";
import styled from "styled-components";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <CTASection>
      <Content>
        <h2>Ready to Plan Your Next Adventure?</h2>
        <p>
          Join thousands of groups already using VibeSync to coordinate amazing
          experiences. Plan, vote, and decide in minutes with your friends.
        </p>
        <Link to="/startVibe">
          <CTAButton>
            Get Started free <ArrowRight size={18} style={{ marginLeft: "8px" }} />
          </CTAButton>
        </Link>
      </Content>
    </CTASection>
  );
};

export default CTA;

// Styled Components
const CTASection = styled.section`
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #e9e8ff 0%, #f6f5ff 50%, #dbd2fa 100%);
  padding: 0 20px;
  text-align: center;
`;

const Content = styled.div`
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

const CTAButton = styled.button`
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

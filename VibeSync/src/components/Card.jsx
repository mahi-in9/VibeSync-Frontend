import React from 'react';
import styled from 'styled-components';

const Card = ({ title, description, icon }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="container-card bg-yellow-box">
          <div className="icon">{icon}</div>
          <p className="card-title">{title}</p>
          <p className="card-description">{description}</p>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    max-width: 400px;
    border: 0;
    width: 100%;
    margin-inline: auto;
  }

  .container-card {
    position: relative;
    border: 2px solid transparent;
    background: linear-gradient(71deg, #080509, #1a171c, #080509);
    background-clip: padding-box;
    border-radius: 45px;
    padding: 40px;
    text-align: center;
  }

  .bg-yellow-box {
    position: relative;
  }

  .bg-yellow-box::after {
    position: absolute;
    top: -1px;
    bottom: -1px;
    left: -1px;
    right: -1px;
    content: "";
    z-index: -1;
    border-radius: 45px;
    background: linear-gradient(71deg, #110e0e, #afa220, #110e0e);
  }

  .icon {
    font-size: 40px;
    margin-bottom: 16px;
  }

  .card-title {
    font-weight: 600;
    color: white;
    letter-spacing: -0.02em;
    line-height: 40px;
    font-size: 28px;
    margin-bottom: 8px;
  }

  .card-description {
    font-weight: 600;
    line-height: 32px;
    color: hsla(0, 0%, 100%, 0.7);
    font-size: 16px;
  }
`;

export default Card;

import React from 'react';
import styled from 'styled-components';

const Card = () => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="container-card bg-yellow-box">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 120 120" height={80} width={80}>
            <rect strokeWidth={2} stroke="url(#paint1_radial_1366_4557)" fillOpacity="0.15" fill="url(#paint0_linear_1366_4557)" rx={24} height={118} width={118} y={1} x={1} />
            <path fill="#FFEE24" d="M74.2105 36C73.373 36 72.5698 35.6839 71.9776 35.1213C71.3853 34.5587 71.0526 33.7956 71.0526 33C71.0526 32.2044 71.3853 31.4413 71.9776 30.8787C72.5698 30.3161 73.373 30 74.2105 30H86.8421C87.6796 30 88.4829 30.3161 89.0751 30.8787C89.6673 31.4413 90 32.2044 90 33V45C90 45.7956 89.6673 46.5587 89.0751 47.1213C88.4829 47.6839 87.6796 48 86.8421 48C86.0046 48 85.2014 47.6839 84.6091 47.1213C84.0169 46.5587 83.6842 45.7956 83.6842 45V40.242L65.3905 57.621C64.7983 58.1834 63.9953 58.4994 63.1579 58.4994C62.3205 58.4994 61.5175 58.1834 60.9253 57.621L52.1053 49.242L35.3905 65.121C34.7949 65.6675 33.9972 65.9699 33.1693 65.963C32.3413 65.9562 31.5492 65.6407 30.9637 65.0845C30.3782 64.5282 30.0461 63.7758 30.0389 62.9892C30.0317 62.2026 30.35 61.4448 30.9253 60.879L49.8726 42.879C50.4648 42.3166 51.2679 42.0006 52.1053 42.0006C52.9426 42.0006 53.7457 42.3166 54.3379 42.879L63.1579 51.258L79.219 36H74.2105ZM36.3158 78V87C36.3158 87.7957 35.9831 88.5587 35.3909 89.1213C34.7986 89.6839 33.9954 90 33.1579 90C32.3204 90 31.5171 89.6839 30.9249 89.1213C30.3327 88.5587 30 87.7957 30 87V78C30 77.2043 30.3327 76.4413 30.9249 75.8787C31.5171 75.3161 32.3204 75 33.1579 75C33.9954 75 34.7986 75.3161 35.3909 75.8787C35.9831 76.4413 36.3158 77.2043 36.3158 78ZM52.1053 66C52.1053 65.2043 51.7726 64.4413 51.1803 63.8787C50.5881 63.3161 49.7849 63 48.9474 63C48.1098 63 47.3066 63.3161 46.7144 63.8787C46.1222 64.4413 45.7895 65.2043 45.7895 66V87C45.7895 87.7957 46.1222 88.5587 46.7144 89.1213C47.3066 89.6839 48.1098 90 48.9474 90C49.7849 90 50.5881 89.6839 51.1803 89.1213C51.7726 88.5587 52.1053 87.7957 52.1053 87V66ZM64.7368 69C65.5744 69 66.3776 69.3161 66.9698 69.8787C67.562 70.4413 67.8947 71.2043 67.8947 72V87C67.8947 87.7957 67.562 88.5587 66.9698 89.1213C66.3776 89.6839 65.5744 90 64.7368 90C63.8993 90 63.0961 89.6839 62.5039 89.1213C61.9117 88.5587 61.5789 87.7957 61.5789 87V72C61.5789 71.2043 61.9117 70.4413 62.5039 69.8787C63.0961 69.3161 63.8993 69 64.7368 69ZM83.6842 57C83.6842 56.2044 83.3515 55.4413 82.7593 54.8787C82.1671 54.3161 81.3638 54 80.5263 54C79.6888 54 78.8856 54.3161 78.2933 54.8787C77.7011 55.4413 77.3684 56.2044 77.3684 57V87C77.3684 87.7957 77.7011 88.5587 78.2933 89.1213C78.8856 89.6839 79.6888 90 80.5263 90C81.3638 90 82.1671 89.6839 82.7593 89.1213C83.3515 88.5587 83.6842 87.7957 83.6842 87V57Z" />
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" y2="119.817" x2="119.899" y1="-0.102528" x1="-0.0208152" id="paint0_linear_1366_4557">
                <stop stopOpacity="0.7" stopColor="#FFE34B" />
                <stop stopOpacity={0} stopColor="#FFE34B" offset="0.510417" />
                <stop stopOpacity="0.7" stopColor="#FFE34B" offset={1} />
              </linearGradient>
              <radialGradient gradientTransform="translate(60 60) rotate(96.8574) scale(122.674 149.921)" gradientUnits="userSpaceOnUse" r={1} cy={0} cx={0} id="paint1_radial_1366_4557">
                <stop stopColor="#FFEE24" />
                <stop stopOpacity="0.2" stopColor="#302A1A" offset={1} />
              </radialGradient>
            </defs>
          </svg>
          <p className="card-title">Get Yield on Deposits</p>
          <p className="card-description">
            While your collateral is deposited, delegate it to earn the highest yield
            available in the Solana ecosystem.
          </p>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container-title {
    text-align: center;
    padding: 0 !important;
    margin-bottom: 40px;
    font-size: 40px;
    color: #fff;
    font-weight: 600;
    line-height: 60px;
  }

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
    img {
      margin-bottom: 32px;
    }
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
  }

  .bg-yellow-box::after {
    background: linear-gradient(71deg, #110e0e, #afa220, #110e0e);
  }

  .card-title {
    font-weight: 600;
    color: white;
    letter-spacing: -0.02em;
    line-height: 40px;
    font-style: normal;
    font-size: 28px;
    padding-bottom: 8px;
  }

  .card-description {
    font-weight: 600;
    line-height: 32px;
    color: hsla(0, 0%, 100%, 0.5);
    font-size: 16px;
    max-width: 470px;
  }`;

export default Card;

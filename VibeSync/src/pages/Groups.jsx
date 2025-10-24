import React from "react";
import styled from "styled-components";

const Groups = () => {
  const userGroups = ["Group 1", "Group 2", "Group 3"];

  return (
    <GroupsSection>
      <Header>
        <h1>Groups</h1>
        <p>Manage your groups and keep everyone in sync.</p>
      </Header>

      <ActionButtons>
        <PrimaryButton>Create Group</PrimaryButton>
        <PrimaryButton>Join Group</PrimaryButton>
        <PrimaryButton>Leave Group</PrimaryButton>
      </ActionButtons>

      <GroupsList>
        <h2>Your Groups</h2>
        <CardsContainer>
          {userGroups.map((group, i) => (
            <GroupCard key={i}>{group}</GroupCard>
          ))}
        </CardsContainer>
      </GroupsList>
      
    </GroupsSection>
  );
};

export default Groups;

// Styled Components
const GroupsSection = styled.div`
  min-height: 100vh;
  padding: 60px 20px;
  background: linear-gradient(135deg, #e9e8ff 0%, #f6f5ff 50%, #dbd2fa 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Poppins", sans-serif;
  color: #333;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;

  h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 10px;
    color: #6b4eff;
  }

  p {
    font-size: 1.2rem;
    color: #555;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 50px;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
  background-color: #6b4eff;
  color: white;
  padding: 12px 28px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 2em;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 1px 5px 0 0 #4e36b8;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 1px 8px 0 0 #4e36b8;
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 0 0 0 0 #4e36b8;
  }
`;

const GroupsList = styled.div`
  width: 100%;
  max-width: 900px;
  text-align: center;

  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: #6b4eff;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

const GroupCard = styled.div`
  background: white;
  padding: 20px 30px;
  border-radius: 1rem;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  min-width: 180px;
  font-weight: 600;
  color: #6b4eff;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

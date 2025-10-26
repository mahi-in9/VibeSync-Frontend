import React from "react";
import {CTASection,CTAButton,Content} from "./StyleWrapper";
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
        <Link to="/Signup">
          <CTAButton>
            Get Started free <ArrowRight size={18} style={{ marginLeft: "8px" }} />
          </CTAButton>
        </Link>
      </Content>
    </CTASection>
  );
};

export default CTA;





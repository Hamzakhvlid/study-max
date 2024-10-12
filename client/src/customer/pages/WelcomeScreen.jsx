import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import Typewriter from "typewriter-effect";

const WelcomeScreen = ({ username }) => {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Hide the welcome screen after 5 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  if (!showWelcome) return null;

  return (
    <div style={styles.welcomeContainer}>
      <Confetti numberOfPieces={500} recycle={false} />
      <Typography sx={{ fontSize: "5rem" }}>
        Welcome,{" "}
        <span style={styles.username}>
          <Typewriter
            options={{
              strings: [username],
              autoStart: true,
              loop: true,
            }}
          />
        </span>
      </Typography>
    </div>
  );
};

const styles = {
  welcomeContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    textAlign: "center",
  },
  username: {
    color: "#f39c12",
    fontSize: "3rem",
    fontWeight: "900",
  },
};

export default WelcomeScreen;

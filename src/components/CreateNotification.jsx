import { useState } from "react";
import { TextField, Button, MenuItem, Typography } from "@mui/material";
import axios from "axios";

const eventTypes = ["LIKE", "COMMENT", "FOLLOW"];

const CreateNotification = ({ userId, onSent }) => {
  const [targetUserId, setTargetUserId] = useState("");
  const [type, setType] = useState("LIKE");
  const [comment, setComment] = useState("");

  const handleSend = async () => {
    if (!targetUserId) return alert("Enter Target User ID");

    const data = {
      type,
      sourceUserId: userId,
      targetUserId,
      data: { comment },
    };

    try {
      await axios.post("https://insydbackend-xz0o.onrender.com/events", data);
      setTargetUserId("");
      setComment("");
      onSent();
    } catch (err) {
      console.error(err);
      alert("Failed to send event");
    }
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Trigger Event
      </Typography>

      <TextField
        label="Target User ID"
        value={targetUserId}
        onChange={(e) => setTargetUserId(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        select
        label="Event Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        fullWidth
        margin="normal"
      >
        {eventTypes.map((ev) => (
          <MenuItem key={ev} value={ev}>
            {ev}
          </MenuItem>
        ))}
      </TextField>

      {type === "COMMENT" && (
        <TextField
          label="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          fullWidth
          margin="normal"
        />
      )}

      <Button variant="contained" fullWidth onClick={handleSend}>
        Send Event
      </Button>
    </div>
  );
};

export default CreateNotification;




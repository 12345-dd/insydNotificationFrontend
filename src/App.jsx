import { useEffect, useState } from "react";
import { Container, Typography, Divider, Button, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { io } from "socket.io-client";
import NotificationList from "./components/NotificationList";
import CreateNotification from "./components/CreateNotification";

function App() {
  const [userId, setUserId] = useState("");
  const [socket, setSocket] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const { control, handleSubmit } = useForm({
    defaultValues: { userId: "" },
  });

  const onSubmit = (data) => setUserId(data.userId);

  useEffect(() => {
    if (!userId) return;

    const socketIo = io("https://insydbackend-xz0o.onrender.com");
    socketIo.emit("register", userId);
    setSocket(socketIo);

    socketIo.on("connect", () => console.log("Connected to Socket.IO"));
    socketIo.on("disconnect", () => console.log("Disconnected"));

    return () => socketIo.disconnect();
  }, [userId]);

  return (
    <Container maxWidth="sm" style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom align="center">
        Insyd Notification System (POC)
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="userId"
          control={control}
          rules={{ required: "User ID is required" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Enter your User ID"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!fieldState.error}
              helperText={fieldState.error ? fieldState.error.message : null}
            />
          )}
        />
        <Button type="submit" variant="contained" fullWidth>
          Set User ID
        </Button>
      </form>

      {userId && (
        <>
          <NotificationList userId={userId} socket={socket} refreshKey={refreshKey} />
          <Divider style={{ margin: "30px 0" }} />
          <CreateNotification
            userId={userId}
            onSent={() => setRefreshKey((prev) => prev + 1)}
          />
        </>
      )}
    </Container>
  );
}

export default App;




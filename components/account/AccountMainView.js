import { useUser } from "@auth0/nextjs-auth0";
import {
  Box,
  Divider,
  Container,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import useAccount from "../../controls/accountControl";
import AvatarBig from "../elements/AvatarBig";

function AccountMainPage() {
  const { user } = useUser();
  const { getAccountDetails, updateField, details } = useAccount();

  useEffect(() => {
    if (user) {
      getAccountDetails(user?.email);
    }
  }, [user]);

  return (
    <Container maxWidth="md">
      <div className="p-5 m-2 bg-white flex-1 shadow-md rounded-xl">
        <Box className="mb-3">
          <Typography variantd="h6">My Profile</Typography>
          {/* <Typography variant="body2">Manage my profile</Typography> */}
        </Box>
        <Stack justifyItems={"center"} alignItems="center" flexDirection="row">
          <AvatarBig src={user?.picture} dname={user?.nickname} />
          <Typography variant="h6">{user?.nickname}</Typography>
        </Stack>
        <hr />
        <Box>
          <Updatable disabled label="Email" value={user?.email} />
          <Updatable
            onUpdate={(value) => updateField({ userName: value }, user?.email)}
            label="Username"
            value={details?.userName || user?.name}
          />
          <Divider />
          <Stack spacing={2} direction="column" sx={{ marginTop: 2 }}>
            <Typography dvariant="h6">Shipping Address</Typography>
            <Updatable
              label="Country"
              value={details?.country}
              onUpdate={(value) => updateField({ country: value }, user?.email)}
            />
            <Updatable
              label="City"
              value={details?.city}
              onUpdate={(value) => updateField({ city: value }, user?.email)}
            />
            <Updatable
              label="Street"
              value={details?.street}
              onUpdate={(value) => updateField({ street: value }, user?.email)}
            />
            <Updatable
              label="House Number"
              value={details?.houseNumber || "none"}
              onUpdate={(value) =>
                updateField({ houseNumber: value }, user?.email)
              }
            />
          </Stack>
        </Box>
      </div>
    </Container>
  );
}

function Updatable({ value, label, onUpdate, disabled }) {
  const [editing, setEditing] = useState(false);
  const [value_, setValue] = useState(value);

  const onClickHandler = (e) => {
    if (editing) {
      setEditing(false);
      onUpdate(value_);
    } else {
      setEditing(true);
    }
  };

  function romio() {
    return "what is this";
  }

  return (
    <div>
      <Stack
        className="max-w-[400px]"
        direction="row"
        spacing={2}
        alignItems="stretch"
        justifyContent="space-between"
        m
        // divider={<Divider orientation="vertical" flexItem />}
      >
        {!editing && <Typography variant="body1">{label}</Typography>}
        {!editing && <Typography ml>{value}</Typography>}
        {editing && (
          <TextField
            onChange={(e) => setValue(e.target.value)}
            value={value_}
            defaultValue={value}
            autoFocus
            label={label}
            size="small"
            fullWidth
          />
        )}

        {!disabled && (
          <Button onClick={onClickHandler} size="small" variant="outlined">
            {editing ? "Update" : "Edit"}
          </Button>
        )}
        {!disabled && editing && (
          <Button
            onClick={(_) => setEditing(false)}
            color="warning"
            size="small"
          >
            Cancel
          </Button>
        )}
      </Stack>
    </div>
  );
}

export default AccountMainPage;

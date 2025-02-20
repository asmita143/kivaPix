import * as React from "react";
import { Tabs, Tab, Box } from "@mui/material";

interface SettingTabsProps {
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const SettingTabs: React.FC<SettingTabsProps> = ({ value, onChange }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={onChange}
          aria-label="setting tabs"
          sx={{
            backgroundColor: "transparent",
            "& .MuiTabs-indicator": {
              backgroundColor: "#1976d2",
            },
            "& .MuiTab-root": {
              color: "#333",
              fontWeight: "bold",
              fontSize: "16px",
              textTransform: "none", // Keep text in natural case
              "&:hover": {
                color: "#1976d2",
              },
            },
            "& .MuiTab-root.Mui-selected": {
              color: "#1976d2",
            },
          }}
        >
          <Tab
            label="General"
            id="tab-0"
            aria-controls="tabpanel-0"
            disableRipple
          />

          <Tab
            label="Notifications"
            id="tab-1"
            aria-controls="tabpanel-2"
            disableRipple
          />
          <Tab
            label="Profile list"
            id="tab-2"
            aria-controls="tabpanel-2"
            disableRipple
          />
        </Tabs>
      </Box>
    </Box>
  );
};

export default SettingTabs;

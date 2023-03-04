import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import * as React from "react";
import JSONView from "react-json-view";

export const RawJSONAccordion: React.FC<{ src: any }> = ({ src }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Accordion expanded={open}>
      <AccordionSummary
        onClick={() => {
          setOpen(!open);
        }}
      >
        RAW data
      </AccordionSummary>
      <AccordionDetails>
        {open ? <JSONView src={src} collapsed={false} /> : null}
      </AccordionDetails>
    </Accordion>
  );
};

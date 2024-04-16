import React, { useState } from "react";
import BurnInput from "./BurnInput";
import { VStack } from "@chakra-ui/react";

type BurnFormProps = {
  handleChange: (numberAsValue: number) => void;
  hasInsufficientWhale: boolean;
};

const BurnForm = ({ handleChange, hasInsufficientWhale }: BurnFormProps) => {
  const [burnValueAsString, setBurnValueAsString] = useState("");

  return (
    <VStack>
      <BurnInput
        label="You burn"
        tokenLabel="LAB"
        tokenIcon="icons/fuel-icon.png"
        isReadOnly={false}
        onChange={(valueAsString: string, valueAsNumber: number) => {
          setBurnValueAsString(valueAsString);

          if (valueAsString.length == 0) {
            handleChange(0);
          } else {
            handleChange(valueAsNumber);
          }
        }}
        isInvalid={hasInsufficientWhale}
      />
      <BurnInput
        label="You get"
        tokenLabel="ashLAB"
        tokenIcon="icons/ash-icon.png"
        isReadOnly={true}
        value={burnValueAsString}
      />
    </VStack>
  );
};

export default BurnForm;

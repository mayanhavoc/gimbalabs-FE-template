import { Button } from "@chakra-ui/react";

const WalletButton = (props: any) => {

    return (
      <Button
        colorScheme='red'
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </Button>
    );
  };

  export default WalletButton;